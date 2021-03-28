import {
  otpDb, usersDb, followersDb, postsDb, commentsDb, auditionsDb, likesDb, postPhotosDb,
  userLinksDb, userPhotosDb, userVideosDb, applicantsDb, submissionsDb, judgesDb, makeTransaction, auditionResultsDb,
  verificationApplicationsDb, presenceDb, postVideosDb
} from '../db-access/index.js'
import jwt from 'jsonwebtoken'
import { authenticator } from 'otplib'
import CATEGORIES from '../utils/categories.js'
import sgMail from '@sendgrid/mail'
import { authAdmin } from '../middleware/index.js'
import axios from '../axios/axios.js'
import makeSendOTP from './send-otp.js'
import makeVerifyOTP from './verify-otp.js'
import makeSendSMS from './send-sms.js'
import makeGenerateSpToken from './generate-sp-token.js'
import makeGetPosts from './get-posts.js'
import makeGetUsers from './get-users.js'
import makeVerifySSO from './verify-sso.js'
import makeGetComments from './get-comments.js'
import makeGetAuditions from './get-auditions.js'
import makeAddLike from './like-post.js'
import makeGetProfile from './get-profile.js'
import calculateProfilePercentage from './calculate-profile-percentage.js'
import makeGetPostsBookmarkedByUser from './get-posts-bookmarked-by-user.js'
import makeGetPostsLikedByUser from './get-posts-liked-by-user.js'
import makeGetPostsCreatedByUser from './get-posts-created-by-user.js'
import makeCreatePost from './create-post.js'
import makeCreateAudition from './create-audition.js'
import makeGetRecentAuditions from './get-recent-auditions.js'
import makeGetProfilePercentage from './get-profile-percentage.js'
import makeGetUserPhotos from './get-user-photos.js'
import makeGetUserVideos from './get-user-videos.js'
import makeGetUserLinks from './get-user-links.js'
import makeGetUsersBySubstring from './get-user-by-subtring.js'
import makeAddComment from './add-comment.js'
import makeGetPostedAuditions from './get-posted-auditions.js'
import makeIncreaseProfileViews from './increase-profile-views.js'
import makeGetAppliedAuditions from './get-applied-auditions.js'
import makeFollowUser from './follow-user.js'
import makeApplyAudition from './apply-audition.js'
import makeGetUsersByFirstNameOrLastName from './get-users-by-firstname-or-lastname.js'
import makeSendEmail from './send-email.js'
import makeGetLikers from './get-likers.js'
import makeResendOTP from './resend-otp.js'
import makeCompleteProfile from './complete-profile.js'
import makeUpdatePost from './update-post.js'
import makeGetApplicants from './get-applicants.js'
import makeUpdatePhotos from './update-photos.js'
import makeAddJudge from './add-judge.js'
import makeScoreApplicant from './score-applicant.js'
import makeGetResults from './get-results.js'
import makeCheckUsernameAvailable from './check-username-available.js'
import makeApplyForVerification from './apply-for-verification.js'
import makeUpdateUserPresence from './update-user-presence.js'
import makeGetUserPresence from './get-user-presence.js'
import makeUpdateProfile from './update-profile.js'

sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

/**
 * OTP Maker using random digits
 */
const generateOtp = () => {
  return ([0, 0, 0, 0, 0, 0])
    .map(d => parseInt(Math.random() * 10))
    .join('')
}

/**
 * Username generator using timestamp
 */
const generateUsername = ({ firstName }) => {
  return firstName.split(' ')[0] + (new Date()).getTime().toFixed(0).toString().substring(5, 5)
}

/**
 * Judge secret generator using otplib
 */
const generateSecret = () => {
  return authenticator.generateSecret()
}

const generateCustomToken = authAdmin.generateCustomToken
const verifyIdpToken = authAdmin.verifyIdpToken

const generateSpToken = makeGenerateSpToken({ jwt })
const sendSMS = makeSendSMS({ axios })
const sendOTP = makeSendOTP({ otpDb, usersDb, generateOtp, sendSMS, generateCustomToken, makeTransaction })
const resendOTP = makeResendOTP({ otpDb, usersDb, generateOtp, sendSMS, makeTransaction })
const verifyOTP = makeVerifyOTP({ otpDb, usersDb, generateSpToken, verifyIdpToken, makeTransaction })
const getPosts = makeGetPosts({ postsDb, postVideosDb, postPhotosDb, makeTransaction })
const getComments = makeGetComments({ commentsDb, makeTransaction })
const getUsers = makeGetUsers({ usersDb, CATEGORIES, makeTransaction })
const getAuditions = makeGetAuditions({ auditionsDb, CATEGORIES, makeTransaction })
const verifySSO = makeVerifySSO({ usersDb, generateSpToken, generateUsername })
const addLike = makeAddLike({ likesDb, makeTransaction })
const getProfile = makeGetProfile({ usersDb, userLinksDb, userPhotosDb, makeTransaction })
const getPostsBookmarkedByUser = makeGetPostsBookmarkedByUser({ postsDb, postPhotosDb, makeTransaction })
const getPostsLikedByUser = makeGetPostsLikedByUser({ postsDb, postPhotosDb, makeTransaction })
const getPostsCreatedByUser = makeGetPostsCreatedByUser({ postsDb, postPhotosDb, makeTransaction })
const createPost = makeCreatePost({ postsDb, postPhotosDb, makeTransaction })
const createAudition = makeCreateAudition({ auditionsDb, makeTransaction })
const getProfilePercentage = makeGetProfilePercentage({ usersDb, calculateProfilePercentage })
const getRecentAuditions = makeGetRecentAuditions({ auditionsDb, makeTransaction })
const getUserPhotos = makeGetUserPhotos({ userPhotosDb, makeTransaction })
const getUserVideos = makeGetUserVideos({ userVideosDb, makeTransaction })
const getUserLinks = makeGetUserLinks({ userLinksDb, makeTransaction })
const getUsersBySubstring = makeGetUsersBySubstring({ usersDb, makeTransaction })
const addComment = makeAddComment({ commentsDb, makeTransaction })
const getPostedAuditions = makeGetPostedAuditions({ auditionsDb, makeTransaction })
const getAppliedAuditions = makeGetAppliedAuditions({ auditionsDb, makeTransaction })
const followUser = makeFollowUser({ followersDb, makeTransaction })
const applyAudition = makeApplyAudition({ applicantsDb, submissionsDb, makeTransaction })
const getUsersByFirstNameOrLastName = makeGetUsersByFirstNameOrLastName({ usersDb, makeTransaction })
const sendEmail = makeSendEmail({ sgMail })
const getLikers = makeGetLikers({ likesDb, makeTransaction })
const completeProfile = makeCompleteProfile({ usersDb, userPhotosDb, makeTransaction })
const updatePost = makeUpdatePost({ postsDb, postPhotosDb, makeTransaction })
const getApplicants = makeGetApplicants({ applicantsDb, makeTransaction })
const updatePhotos = makeUpdatePhotos({ userPhotosDb, makeTransaction })
const addJudge = makeAddJudge({ judgesDb, generateSecret, makeTransaction })
const scoreApplicant = makeScoreApplicant({ auditionResultsDb, makeTransaction })
const getResults = makeGetResults({ auditionResultsDb, makeTransaction })
const checkUsernameAvailable = makeCheckUsernameAvailable({ usersDb, makeTransaction })
const increaseProfileViews = makeIncreaseProfileViews({ usersDb, makeTransaction })
const applyForVerification = makeApplyForVerification({ verificationApplicationsDb, makeTransaction })
const updateUserPresence = makeUpdateUserPresence({ presenceDb, makeTransaction })
const getUserPresence = makeGetUserPresence({ presenceDb, makeTransaction })
const updateProfile = makeUpdateProfile({ usersDb, makeTransaction })

export {
  sendOTP,
  verifyOTP,
  generateSpToken,
  sendSMS,
  getPosts,
  getUsers,
  getComments,
  getAuditions,
  verifySSO,
  addLike,
  updateProfile,
  getRecentAuditions,
  getProfile,
  updateUserPresence,
  getPostsBookmarkedByUser,
  getPostsLikedByUser,
  getPostsCreatedByUser,
  createPost,
  getUserPresence,
  createAudition,
  getProfilePercentage,
  getUserPhotos,
  getUserVideos,
  getUserLinks,
  getUsersBySubstring,
  addComment,
  increaseProfileViews,
  getPostedAuditions,
  followUser,
  getAppliedAuditions,
  applyAudition,
  getUsersByFirstNameOrLastName,
  sendEmail,
  getLikers,
  resendOTP,
  completeProfile,
  updatePost,
  getApplicants,
  updatePhotos,
  addJudge,
  scoreApplicant,
  getResults,
  checkUsernameAvailable,
  applyForVerification
}
