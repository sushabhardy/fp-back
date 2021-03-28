import dotenv from 'dotenv'
import sequelize from 'sequelize'
import makeAuditionsDb from './auditions-db.js'
import makeCommentsDb from './comments-db.js'
import makeOtpDb from './otp-db.js'
import makePostsDb from './posts-db.js'
import makeUsersDb from './users-db.js'
import makeLikesDb from './likes-db.js'
import makePostPhotosDb from './post-photos-db.js'
import makeUserLinksDb from './user-links-db.js'
import makeUserPhotosDb from './user-photos-db.js'
import makeUserVideosDb from './user-videos-db.js'
import makeFollowersDb from './followers-db.js'
import makeApplicantsDb from './applicants-db.js'
import makeSubmissionsDb from './submissions-db.js'
import makeJudgesDb from './judges-db.js'
import makeAuditionResultsDb from './audition-results-db.js'
import makeVerificationApplicationsDb from './verification-applications-db.js'
import makePresenceDb from './presence-db.js'
import makePostVideosDb from './post-videos-db.js'

const { Sequelize, Transaction } = sequelize

dotenv.config()
let client

/**
 * Get DB Handler
 */
const makeDb = async () => {
  try {
    client && await client.authenticate()
    if (!client) throw new Error('DB Handler not authenticated')
  } catch (e) {
    client = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        pool: {
          // TODO : move to .env
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false
      })
  }
  return client
}

/**
 * Get Transaction Handler
 * TODO change isolation type based on usecase
 */
const makeTransaction = async callback => {
  const db = await makeDb()
  return db.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE
  }, callback)
}

const otpDb = makeOtpDb({ makeDb })
const postsDb = makePostsDb({ makeDb })
const usersDb = makeUsersDb({ makeDb })
const commentsDb = makeCommentsDb({ makeDb })
const auditionsDb = makeAuditionsDb({ makeDb })
const likesDb = makeLikesDb({ makeDb })
const postPhotosDb = makePostPhotosDb({ makeDb })
const userLinksDb = makeUserLinksDb({ makeDb })
const userPhotosDb = makeUserPhotosDb({ makeDb })
const userVideosDb = makeUserVideosDb({ makeDb })
const followersDb = makeFollowersDb({ makeDb })
const applicantsDb = makeApplicantsDb({ makeDb })
const submissionsDb = makeSubmissionsDb({ makeDb })
const judgesDb = makeJudgesDb({ makeDb })
const verificationApplicationsDb = makeVerificationApplicationsDb({ makeDb })
const auditionResultsDb = makeAuditionResultsDb({ makeDb })
const presenceDb = makePresenceDb({ makeDb })
const postVideosDb = makePostVideosDb({ makeDb })

export {
  otpDb,
  usersDb,
  postsDb,
  commentsDb,
  auditionsDb,
  likesDb,
  postPhotosDb,
  userLinksDb,
  userPhotosDb,
  userVideosDb,
  followersDb,
  applicantsDb,
  postVideosDb,
  submissionsDb,
  judgesDb,
  auditionResultsDb,
  verificationApplicationsDb,
  presenceDb,
  makeTransaction
}
