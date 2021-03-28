// TODO
const makeNewsfeedValidations = ({ body, check, param }) => {
  const GET_POSTS_VALIDATIONS = [
    // check('uid').exists()
  ]
  const GET_LIKERS_VALIDATIONS = [
    check('postId').exists()
  ]
  const GET_COMMENTS_VALIDATIONS = [
    check('postId').exists()
  ]
  const POST_LIKES_VALIDATIONS = [
    body('postId').exists()
  ]
  const CREATE_POST_VALIDATIONS = [
    body('post').exists()
  ]
  const ADD_COMMENT_VALIDATIONS = [
    body('comment').exists()
  ]

  const UPDATE_POST_VALIDATIONS = [
    body('post').exists()
  ]

  return Object.freeze({
    GET_POSTS_VALIDATIONS,
    GET_COMMENTS_VALIDATIONS,
    POST_LIKES_VALIDATIONS,
    CREATE_POST_VALIDATIONS,
    ADD_COMMENT_VALIDATIONS,
    GET_LIKERS_VALIDATIONS,
    UPDATE_POST_VALIDATIONS
  })
}

export default makeNewsfeedValidations
