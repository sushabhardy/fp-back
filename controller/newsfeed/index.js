import { validationResult } from 'express-validator'
import { getPosts, getComments, getLikers, addLike, addComment, updatePost, getPostsCreatedByUser, createPost, getPostsLikedByUser, getPostsBookmarkedByUser } from '../../use-cases/index.js'
import makeGetCommentsHandler from './get-comments.js'
import makeGetPostsHandler from './get-posts.js'
import makeLikeHandler from './like-post.js'
import makeGetPostsCreatedByUserHandler from './get-posts-created-by-user.js'
import makeGetPostsLikedByUserHandler from './get-posts-liked-by-user.js'
import makeGetPostsBookmarkedByUserHandler from './get-posts-bookmarked-by-user.js'
import makeCreatePostHandler from './create-post.js'
import makeAddCommentHandler from './add-comment.js'
import makeGetLikersHandler from './get-likers.js'
import makeUpdatePostHandler from './update-post.js'

const getPostsHandler = makeGetPostsHandler({ getPosts, validationResult })
const getCommentsHandler = makeGetCommentsHandler({ getComments, validationResult })
const postLikesHandler = makeLikeHandler({ addLike, validationResult })
const getPostsCreatedByUserHandler = makeGetPostsCreatedByUserHandler({ getPostsCreatedByUser, validationResult })
const getPostsLikedByUserHandler = makeGetPostsLikedByUserHandler({ getPostsLikedByUser, validationResult })
const getPostsBookmarkedByUserHandler = makeGetPostsBookmarkedByUserHandler({ getPostsBookmarkedByUser, validationResult })
const createPostHandler = makeCreatePostHandler({ createPost, validationResult })
const addCommentHandler = makeAddCommentHandler({ addComment, validationResult })
const getLikersHandler = makeGetLikersHandler({ getLikers, validationResult })
const updatePostHandler = makeUpdatePostHandler({ updatePost, validationResult })

export {
  getPostsHandler,
  getCommentsHandler,
  postLikesHandler,
  getPostsCreatedByUserHandler,
  getPostsLikedByUserHandler,
  getPostsBookmarkedByUserHandler,
  createPostHandler,
  addCommentHandler,
  getLikersHandler,
  updatePostHandler
}
