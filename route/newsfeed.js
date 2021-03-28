import {
  getCommentsHandler, getPostsHandler, postLikesHandler, getPostsCreatedByUserHandler,
  getPostsLikedByUserHandler, getPostsBookmarkedByUserHandler, createPostHandler, addCommentHandler,
  getLikersHandler, updatePostHandler
} from '../controller/newsfeed/index.js'
import { newsfeedValidations } from '../validation/index.js'

/**
 * Newsfeed routes
 * @param { router }
 */
const makeNewsfeedRoutes = ({ router }) => {
  router.get('/api/v1/newsfeed', newsfeedValidations.GET_POSTS_VALIDATIONS, getPostsHandler)
  router.get('/api/v1/newsfeed/comments', newsfeedValidations.GET_COMMENTS_VALIDATIONS, getCommentsHandler)
  router.post('/api/v1/newsfeed/likes', newsfeedValidations.POST_LIKES_VALIDATIONS, postLikesHandler)
  router.get('/api/v1/createdPosts', newsfeedValidations.GET_POSTS_VALIDATIONS, getPostsCreatedByUserHandler)
  router.get('/api/v1/likedPosts', newsfeedValidations.GET_POSTS_VALIDATIONS, getPostsLikedByUserHandler)
  router.get('/api/v1/bookmarkedPosts', newsfeedValidations.GET_POSTS_VALIDATIONS, getPostsBookmarkedByUserHandler)
  router.post('/api/v1/newsfeed/createPost', newsfeedValidations.CREATE_POST_VALIDATIONS, createPostHandler)
  router.post('/api/v1/newsfeed/comment', newsfeedValidations.ADD_COMMENT_VALIDATIONS, addCommentHandler)
  router.get('/api/v1/newsfeed/likers', newsfeedValidations.GET_LIKERS_VALIDATIONS, getLikersHandler)
  router.put('/api/v1/newsfeed/updatePost', newsfeedValidations.UPDATE_POST_VALIDATIONS, updatePostHandler)
  return router
}

export default makeNewsfeedRoutes
