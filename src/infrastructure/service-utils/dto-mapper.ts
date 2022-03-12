/**
 * 
 * Map source object to destination class
 * 
 * @param {T} source - Source object to map from
 * @param {U} destination - Destination class to map to
 * @returns {U} An object of type U
 */
export function dtoMapper<T, U> ( source: T, destination: new () => U ): U;
/**
 * 
 * Map source object to destination class
 * 
 * @param {T[]} source  - Source array of objects to map from
 * @param {U} destination - Destination class to which map each object from the source
 * @returns {U[]} An array of type U
 */
export function dtoMapper<T, U> ( source: T[], destination: new () => U ): U[];

export function dtoMapper<T, U> ( source: T | T[], destination: new () => U ): U | U[] {
  if ( Array.isArray( source ) ) {
    return source.map( s => {
      return mapper( s, new destination() );
    } );
  }
  return mapper( source, new destination() );
}

// Mapper to map source to destination
function mapper<T, U> ( source: T, destination: U ): U {
  Object.keys( destination ).forEach( key => {
    destination[ key as keyof U ] = <any>source[ key as keyof T ];
  } );

  return destination;
}