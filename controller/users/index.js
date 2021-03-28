import { validationResult } from 'express-validator'
import {
  getUsers, getProfile, getProfilePercentage, getUserPhotos, getUserVideos,
  getUserLinks, getUsersBySubstring, followUser, getUsersByFirstNameOrLastName, sendEmail,
  completeProfile, updatePhotos, checkUsernameAvailable, increaseProfileViews, applyForVerification,
  updateUserPresence, getUserPresence, updateProfile
} from '../../use-cases/index.js'
import makeGetUsersHandler from './get-users.js'
import makeGetProfileHandler from './get-profile.js'
import makeGetProfilePercentHandler from './get-profile-percent.js'
import makeGetUserPhotosHandler from './get-user-photos.js'
import makeGetUserVideosHandler from './get-user-videos.js'
import makeGetUserLinksHandler from './get-user-links.js'
import makeGetUsersBySubstringHandler from './get-users-by-substring.js'
import makeFollowUserHandler from './follow-user.js'
import makeGetUsersByFirstNameOrLastNameHandler from './get-users-by-firstname-or-lastname.js'
import makeSendEmailHandler from './send-email.js'
import makeCompleteProfileHandler from './complete-profile.js'
import makeCheckUsernameAvailableHandler from './check-username-available.js'
import makeUpdatePhotosHandler from './update-photos.js'
import makeInreaseProfileViewsHandler from './increase-profile-views.js'
import makeUpdateProfileHandler from './update-profile.js'
import makeApplyForVerificationHandler from './apply-for-verification.js'
import makeUpdateUserPresenceHandler from './update-user-presence.js'
import makeGetUserPresenceHandler from './get-user-presence.js'

const getUsersHandler = makeGetUsersHandler({ getUsers, validationResult })
const getProfileHandler = makeGetProfileHandler({ getProfile, validationResult })
const getProfilePercentHandler = makeGetProfilePercentHandler({ getProfilePercentage, validationResult })
const getUserPhotosHandler = makeGetUserPhotosHandler({ getUserPhotos, validationResult })
const getUserVideosHandler = makeGetUserVideosHandler({ getUserVideos, validationResult })
const getUserLinksHandler = makeGetUserLinksHandler({ getUserLinks, validationResult })
const getUsersBySubstringHandler = makeGetUsersBySubstringHandler({ getUsersBySubstring, validationResult })
const followUserHandler = makeFollowUserHandler({ followUser, validationResult })
const getUsersByFirstNameOrLastNameHandler = makeGetUsersByFirstNameOrLastNameHandler({ getUsersByFirstNameOrLastName, validationResult })
const sendEmailHander = makeSendEmailHandler({ sendEmail, validationResult })
const completeProfileHandler = makeCompleteProfileHandler({ completeProfile, validationResult })
const updatePhotosHandler = makeUpdatePhotosHandler({ updatePhotos, validationResult })
const checkUsernameAvailableHandler = makeCheckUsernameAvailableHandler({ checkUsernameAvailable, validationResult })
const increaseProfileViewsHandler = makeInreaseProfileViewsHandler({ increaseProfileViews, validationResult })
const applyForVerificationHandler = makeApplyForVerificationHandler({ applyForVerification, validationResult })
const updateProfileHandler = makeUpdateProfileHandler({ updateProfile, validationResult })
const updateUserPresenceHandler = makeUpdateUserPresenceHandler({ updateUserPresence, validationResult })
const getUserPresenceHandler = makeGetUserPresenceHandler({ getUserPresence, validationResult })

export {
  getUserPresenceHandler,
  getUsersHandler,
  getProfileHandler,
  getProfilePercentHandler,
  getUserPhotosHandler,
  getUserVideosHandler,
  getUserLinksHandler,
  getUsersBySubstringHandler,
  followUserHandler,
  getUsersByFirstNameOrLastNameHandler,
  sendEmailHander,
  completeProfileHandler,
  updatePhotosHandler,
  checkUsernameAvailableHandler,
  increaseProfileViewsHandler,
  applyForVerificationHandler,
  updateProfileHandler,
  updateUserPresenceHandler
}
