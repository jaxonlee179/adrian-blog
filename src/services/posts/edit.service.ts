import { Post, PostAttrs, PostStatusEnum } from "../../models/posts/post.model";
import mongoose from 'mongoose';
import { BadRequestError } from "../../errors/bad-request-error";
import { CoreLocaleEnum } from "../../locales/service-locale-keys/core.locale";
import { NotFoundError } from "../../errors/not-found-error";
import { PostLocaleEnum } from "../../locales/service-locale-keys/posts.locale";
import slugify from "slugify";
import { clearCache } from "../../infrastructure/cache/clear-cache.infra";
import { CacheOptionAreaEnum, CacheOptionServiceEnum } from "../../infrastructure/cache/cache-options.infra";
import { scheduledPostsQueue } from "./post-queue.service";

export type PostEditService = Omit<PostAttrs, "createdBy" | "createdByIp">;

export async function postEditService ( data: PostEditService ) {
  const {
    slug, title, subtitle, excerpt, content, visibility,
    status, scheduledFor, commentAllowed, viewCount, type,
    isPinned, child, parent, taxonomies, attachments, postmeta,
    updatedBy, updatedByIp, userAgent
  } = data;

  if ( !mongoose.isValidObjectId( updatedBy ) ) {
    throw new BadRequestError( "User id must be a standard id", CoreLocaleEnum.ERROR_USER_ID );
  }

  const post = await Post.findOne( { slug } );
  if ( !post ) throw new NotFoundError();

  const duplicatePostTitles = await Post.find( { title } );
  if ( duplicatePostTitles.length ) {
    duplicatePostTitles.forEach( p => {
      if ( p.slug !== slug ) {
        throw new BadRequestError( "Duplicate post title is not allowed", PostLocaleEnum.ERROR_DUPLICATE_POST );
      }
    } );
  }

  const isScheduled = scheduledFor && scheduledFor.getTime() > Date.now();
  const slugified = slugify( title );

  post.set( {
    title,
    subtitle,
    excerpt,
    content,
    visibility,
    slug: slugified,
    status: isScheduled ? PostStatusEnum.FUTURE : status,
    scheduledFor,
    commentAllowed,
    viewCount,
    type,
    isPinned,
    child,
    parent,
    taxonomies,
    attachments,
    postmeta,
    updatedBy,
    updatedByIp,
    userAgent
  } );

  await post.save();
  if ( isScheduled ) {
    await scheduledPostsQueue.add( {
      postId: post.id
    }, {
      delay: new Date( post.scheduledFor! ).getTime() - new Date().getTime()
    } );
  }
  clearCache( CacheOptionAreaEnum.ADMIN, CacheOptionServiceEnum.POST );
  return post;
}