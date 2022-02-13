import { NotFoundError } from 'errors/not-found-error';
import { CacheOptionAreaEnum, CacheOptionServiceEnum } from 'infrastructure/cache/cache-options.infra';
import { Post } from 'models/posts/post.model';


export async function postDetailsService ( slug: string ) {
  const post = await Post.findOne( { slug } ).cache( CacheOptionAreaEnum.ADMIN, CacheOptionServiceEnum.POST );
  if ( !post ) throw new NotFoundError();
  return post;
}