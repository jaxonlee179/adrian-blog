import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { CoreLocaleEnum } from "infrastructure/locales/service-locale-keys/core.locale";
import { commaSeparatedToArray } from "infrastructure/string-utils/comma-separated-to-array";
import { FilterQuery, Model } from "mongoose";
import { ParsedQs } from 'qs';

// Input params
export interface IListQueryParams<T> {
  model: Model<T>;                                                  // Mongoose Model (T is type of the Model's Document)
  fieldsToExclude: string[];                                        // Model fields we do not want to use for filtering
  cache?: IListQueryCache;                                          // Enable or disable Redis cache for the result
  queryStringParams: ParsedQs;                                      // Query string params to use for filtering (req.query)
  preDefinedFilters?: IListQueryPreDefinedFilters[];                 // Pre-defined filters to apply
}

// Result type
export interface IListQueryResult<T> {
  data: T[];                                                        // List of documents after processing
  metadata: IListQueryMetadata;                                     // Metadata
}

// Result metadata
export interface IListQueryMetadata {
  total: number;                                                    // Total number of documents after filtering
  page: number;                                                     // Number of the page
  totalPages: number;                                               // Total number of pages
  numberPerPage: number;                                            // Number of documents per page
  currentPageResultsNumber: number;                                 // Number of current page returned results
  skipped: number;                                                  // Number of skipped results
}

// Cache params type
interface IListQueryCache {
  useCache: boolean;
  cacheOptionService: CacheOptionServiceEnum;
}

// Pre-defined filters type
interface IListQueryPreDefinedFilters {
  filterBy: string;
  filterParam: string;
}

// Filter Object Type
interface IFilterQuery {
  [ key: string ]: RegExp | { $gte: Date; $lte: Date; } | number | string;
}

// Sort Object Type
interface ISortQuery {
  [ key: string ]: 1 | -1;
}

/**
 * 
 * Generate conditional list (filtered, sorted, TimeSpanned and paginated) from a specific mongoose model
 * 
 * @param {IListQueryParams<T>} params - Params to generate conditional list of type `IListQueryParams<T>`
 * @returns {Promise<IListQueryResult<T>>} A Promise of type `IListQueryResult<T>`
 */
export async function docListGenerator<T> ( params: IListQueryParams<T> ): Promise<IListQueryResult<T>> {
  const { model, fieldsToExclude, queryStringParams, cache, preDefinedFilters } = params;

  let modelKeys = [ ...Object.keys( model.schema.paths ) ];
  const page = queryStringParams.page ? parseInt( queryStringParams.page.toString() ) : 1;
  const size = queryStringParams.size ? parseInt( queryStringParams.size.toString() ) : 10;
  const filterBy = queryStringParams.filterBy;
  const orderBy = queryStringParams.orderBy?.toString() || "createdAt";
  const orderParam = queryStringParams.orderParam ? parseInt( queryStringParams.orderParam.toString() ) : -1;
  const dateFields = modelKeys.filter( key => model.schema.path( key ).instance === "Date" );

  if ( fieldsToExclude.length ) {
    if ( fieldsToExclude.includes( "createdAt" ) ) {
      throw new BadRequestError(
        "Excluding `createdAt` while generating list query params is not allowed",
        CoreLocaleEnum.ERROR_400_MSG
      );
    }
    modelKeys = modelKeys.filter( field => !fieldsToExclude.includes( field ) );
  }

  const dateFieldsVal = dateFields && dateFields.length ? dateFields : [ 'createdAt', 'updatedAt' ];
  const isFilterByArray = Array.isArray( filterBy );

  let filterByVal = [];
  if ( isFilterByArray ) {
    filterByVal = Array.from( new Set( modelKeys.filter( key => filterBy.includes( key as any ) ) ) );
  } else {
    const filterByAsArray = filterBy ? [ filterBy.toString() ] : [];
    filterByVal = filterByAsArray.length
      ? Array.from( new Set( modelKeys.filter( key => filterByAsArray.includes( key as any ) ) ) )
      : [];
  }

  const nonDateFilterBy = filterByVal.filter( f => !dateFieldsVal.includes( f ) );
  const dateFilterBy = filterByVal.filter( f => dateFieldsVal.includes( f ) );

  const nonDatePreDefinedFilterBY = preDefinedFilters?.filter( pdf => !dateFieldsVal.includes( pdf.filterBy ) );
  const datePreDefinedFilterBY = preDefinedFilters?.filter( pdf => dateFieldsVal.includes( pdf.filterBy ) );

  const orderByVal = orderBy && modelKeys.includes( orderBy.toString() ) ? orderBy : "createdAt";
  const orderParamVal = ( orderParam !== 1 && orderParam !== -1 ) ? -1 : orderParam;

  const filter: IFilterQuery = {};

  let resultsList: T[] = [];
  let total = 0;
  let currentPageResultsNumber = 0;

  if ( nonDateFilterBy.length ) {
    nonDateFilterBy.forEach( nonDateFilter => {
      if ( queryStringParams[ nonDateFilter ] ) {
        const filterValue = isNaN( parseInt( queryStringParams[ nonDateFilter ]!.toString() ) )
          ? new RegExp( queryStringParams[ nonDateFilter ]!.toString() )
          : queryStringParams[ nonDateFilter ]!.toString();
        filter[ nonDateFilter ] = filterValue;
      }
    } );
  }

  if ( nonDatePreDefinedFilterBY && nonDatePreDefinedFilterBY.length ) {
    nonDatePreDefinedFilterBY.forEach( pdf => {
      const filterValue = isNaN( parseInt( pdf.filterParam ) )
        ? new RegExp( pdf.filterParam )
        : pdf.filterParam;
      filter[ pdf.filterBy ] = filterValue;
    } );
  }

  if ( dateFilterBy.length ) {
    dateFilterBy.forEach( dateFilter => {
      if ( queryStringParams[ dateFilter ] ) {
        let qStrParam = commaSeparatedToArray( queryStringParams[ dateFilter ]!.toString() );
        const isStartDateValid = Array.isArray( qStrParam ) && qStrParam.length === 2
          ? !isNaN( new Date( qStrParam[ 0 ].toString() ).getTime() )
          : false;
        const isEndDateValid = Array.isArray( qStrParam ) && qStrParam.length === 2
          ? !isNaN( new Date( qStrParam[ 1 ].toString() ).getTime() )
          : false;
        if ( isStartDateValid && isEndDateValid && Array.isArray( qStrParam ) ) {
          filter[ dateFilter ] = { $gte: new Date( qStrParam[ 0 ].toString() ), $lte: new Date( qStrParam[ 1 ].toString() ) };
        }
      }
    } );
  }

  if ( datePreDefinedFilterBY && datePreDefinedFilterBY.length ) {
    datePreDefinedFilterBY.forEach( pdf => {
      let datesToArr = commaSeparatedToArray( pdf.filterParam );
      const isStartDateValid = Array.isArray( datesToArr ) && datesToArr.length === 2
        ? !isNaN( new Date( datesToArr[ 0 ].toString() ).getTime() )
        : false;
      const isEndDateValid = Array.isArray( datesToArr ) && datesToArr.length === 2
        ? !isNaN( new Date( datesToArr[ 1 ].toString() ).getTime() )
        : false;
      if ( isStartDateValid && isEndDateValid ) {
        filter[ pdf.filterBy ] = { $gte: new Date( datesToArr[ 0 ].toString() ), $lte: new Date( datesToArr[ 1 ].toString() ) };
      }
    } );
  }

  total = await model.find( filter as FilterQuery<T> ).count();

  let limit = 10;
  if ( size < 1 ) {
    limit = 1;
  } else if ( size > 100 ) {
    limit = 100;
  } else {
    limit = size;
  }

  const totalPages = Math.ceil( total / limit );
  let pageVal = 1;
  if ( page < 1 ) {
    pageVal = 1;
  } else if ( page > totalPages ) {
    pageVal = totalPages > 0 ? totalPages : 1;
  } else {
    pageVal = 1;
  }
  const skip = ( pageVal - 1 ) * limit;

  const sort: ISortQuery = {};
  sort[ orderByVal ] = orderParamVal;

  if ( cache && cache?.useCache ) {
    resultsList = await model.find( filter as FilterQuery<T>, null, { skip, limit, sort } ).cache( cache.cacheOptionService );
    currentPageResultsNumber = resultsList.length;
  } else {
    resultsList = await model.find( filter as FilterQuery<T>, null, { skip, limit, sort } );
    currentPageResultsNumber = resultsList.length;
  }

  return {
    metadata: {
      page: pageVal,
      totalPages,
      total,
      numberPerPage: limit,
      currentPageResultsNumber,
      skipped: skip
    },
    data: resultsList
  };
}