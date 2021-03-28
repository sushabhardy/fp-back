import { body, param, check } from 'express-validator'
import makeAuditionValidations from './auditions/index.js'
import makeAuthValidations from './auth/index.js'
import makeNewsfeedValidations from './newsfeed/index.js'
import makeUsersValidations from './users/index.js'

const newsfeedValidations = makeNewsfeedValidations({ body, check, param })
const usersValidations = makeUsersValidations({ body, check, param })
const auditionValidations = makeAuditionValidations({ body, check, param })
const authValidations = makeAuthValidations({ body, check, param })

export {
  newsfeedValidations,
  usersValidations,
  authValidations,
  auditionValidations
}
