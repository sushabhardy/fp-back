import {
  getUsersHandler, getProfileHandler, getProfilePercentHandler, getUserPhotosHandler,
  getUserVideosHandler, getUserLinksHandler, getUsersBySubstringHandler, followUserHandler,
  getUsersByFirstNameOrLastNameHandler, sendEmailHander, completeProfileHandler, updatePhotosHandler,
  checkUsernameAvailableHandler, increaseProfileViewsHandler, applyForVerificationHandler, updateProfileHandler,
  updateUserPresenceHandler, getUserPresenceHandler
} from '../controller/users/index.js'
import {
  usersValidations
} from '../validation/index.js'

/**
 * Users routes
 * @param { router }
 */
const makeUsersRoutes = ({ router }) => {
  router.get('/api/v1/users', usersValidations.GET_USERS_VALIDATIONS, getUsersHandler)
  router.get('/api/v1/usersByString', usersValidations.GET_USERS_VALIDATIONS, getUsersBySubstringHandler)
  router.get('/api/v1/usersByFirstNameOrLastName', usersValidations.GET_USERS_VALIDATIONS, getUsersByFirstNameOrLastNameHandler)
  router.get('/api/v1/profile/:uid', usersValidations.GET_PROFILE_VALIDATIONS, getProfileHandler)
  router.get('/api/v1/profilePercent', usersValidations.GET_PROFILE_PERCENT_VALIDATION, getProfilePercentHandler)
  router.get('/api/v1/users/photos/:uid', usersValidations.GET_USERS_PHOTOS_VALIDATION, getUserPhotosHandler)
  router.get('/api/v1/users/videos/:uid', usersValidations.GET_USERS_VIDEOS_VALIDATION, getUserVideosHandler)
  router.get('/api/v1/users/links/:uid', usersValidations.GET_USERS_LINKS_VALIDATION, getUserLinksHandler)
  router.put('/api/v1/follow/:followeeId', usersValidations.FOLLOW_VALIDATIONS, followUserHandler)
  router.post('/api/v1/sendEmail', usersValidations.GET_EMAIL_VALIDATIONS, sendEmailHander)
  router.post('/api/v1/completeProfile', usersValidations.COMPLETE_PROFILE_VALIDATIONS, completeProfileHandler)
  router.post('/api/v1/users/updatePhotos', usersValidations.UPDATE_PHOTOS_HANDLER, updatePhotosHandler)
  router.get('/api/v1/users/checkUsernameAvailable', usersValidations.CHECK_USERNAME_AVAILABLE_VALIDATIONS, checkUsernameAvailableHandler)
  router.get('/api/v1/users/increaseViews', usersValidations.INCREASE_VIEWS_VALIDATIONS, increaseProfileViewsHandler)
  router.post('/api/v1/users/applyForVerification', usersValidations.APPLY_FOR_VERIFICATION_VALIDATIONS, applyForVerificationHandler)
  router.put('/api/v1/users/updateProfile', usersValidations.UPDATE_PROFILE_VALIDATIONS, updateProfileHandler)
  router.put('/api/v1/users/updatePresence', usersValidations.PRESENCE_VALIDATIONS, updateUserPresenceHandler)
  router.get('/api/v1/users/presence', usersValidations.PRESENCE_VALIDATIONS, getUserPresenceHandler)
  return router
}

export default makeUsersRoutes
