import buildMakePost from './post.js'
import buildMakePostPhoto from './post-photo.js'
import makeId from 'cuid'
import buildMakeUser from './user.js'
import buildMakeOtp from './otp.js'
import buildMakeAudition from './audition.js'
import buildMakeLike from './like.js'
import buildMakeComment from './comment.js'
import buildMakeFollow from './follow.js'
import buildMakeApplicant from './applicant.js'
import buildMakeSubmission from './submission.js'
import buildMakeUserPhoto from './user-photo.js'
import buildMakeJudge from './judge.js'
import buildMakeAuditionResult from './audition-result.js'
import buildMakeVerificationApplication from './verification-application.js'

const makePost = buildMakePost({ makeId })
const makePostPhoto = buildMakePostPhoto({ makeId })
const makeUser = buildMakeUser({ makeId })
const makeOtp = buildMakeOtp({ makeId })
const makeAudition = buildMakeAudition({ makeId })
const makeLike = buildMakeLike({ makeId })
const makeComment = buildMakeComment({ makeId })
const makeFollow = buildMakeFollow({ makeId })
const makeApplicant = buildMakeApplicant({ makeId })
const makeSubmission = buildMakeSubmission({ makeId })
const makeUserPhoto = buildMakeUserPhoto({ makeId })
const makeJudge = buildMakeJudge({ makeId })
const makeAuditionResult = buildMakeAuditionResult({ makeId })
const makeVerificationApplication = buildMakeVerificationApplication({ makeId })

export {
  makePost,
  makePostPhoto,
  makeUser,
  makeOtp,
  makeAudition,
  makeLike,
  makeComment,
  makeFollow,
  makeApplicant,
  makeSubmission,
  makeUserPhoto,
  makeJudge,
  makeAuditionResult,
  makeVerificationApplication
}
