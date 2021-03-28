const makeUsersValidations = ({ body, check, param }) => {
  // TODO
  const GET_USERS_VALIDATIONS = []
  const FOLLOW_VALIDATIONS = [
    param('followeeId').exists()
  ]
  const GET_PROFILE_VALIDATIONS = [
    param('uid').exists()
  ]
  const GET_PROFILE_PERCENT_VALIDATION = [
  ]
  const GET_USERS_PHOTOS_VALIDATION = [
    param('uid').exists()
  ]
  const GET_USERS_VIDEOS_VALIDATION = [
    param('uid').exists()
  ]
  const GET_USERS_LINKS_VALIDATION = [
    param('uid').exists()
  ]

  const COMPLETE_PROFILE_VALIDATIONS = [
    body('profile').exists()
  ]

  const UPDATE_PHOTOS_HANDLER = [
    body('userId').exists(),
    body('photos').exists()
  ]

  const CHECK_USERNAME_AVAILABLE_VALIDATIONS = [
    check('username').exists()
  ]

  const GET_EMAIL_VALIDATIONS = []
  const INCREASE_VIEWS_VALIDATIONS = [
    check('userId').exists()
  ]

  const APPLY_FOR_VERIFICATION_VALIDATIONS = []
  const UPDATE_PROFILE_VALIDATIONS = []
  const PRESENCE_VALIDATIONS = []

  return Object.freeze({
    GET_USERS_VALIDATIONS,
    GET_PROFILE_VALIDATIONS,
    GET_PROFILE_PERCENT_VALIDATION,
    GET_USERS_PHOTOS_VALIDATION,
    GET_USERS_VIDEOS_VALIDATION,
    GET_USERS_LINKS_VALIDATION,
    FOLLOW_VALIDATIONS,
    GET_EMAIL_VALIDATIONS,
    COMPLETE_PROFILE_VALIDATIONS,
    UPDATE_PHOTOS_HANDLER,
    CHECK_USERNAME_AVAILABLE_VALIDATIONS,
    INCREASE_VIEWS_VALIDATIONS,
    APPLY_FOR_VERIFICATION_VALIDATIONS,
    UPDATE_PROFILE_VALIDATIONS,
    PRESENCE_VALIDATIONS
  })
}

export default makeUsersValidations
