import {
  getAuditionsHandler, createAuditionHandler, getRecentAuditionsHandler,
  getPostedAuditionsHandler, getAppliedAuditionsHandler, applyAuditionHandler, getApplicantsHandler, addJudgeHandler,
  scoreApplicantHandler, getResultsHandler
} from '../controller/auditions/index.js'
import { auditionValidations } from '../validation/index.js'

/**
 * Auditions routes
 * @param { router }
 */
const makeAuditionsRoutes = ({ router }) => {
  router.get('/api/v1/auditions', auditionValidations.GET_AUDITIONS_VALIDATIONS, getAuditionsHandler)
  router.get('/api/v1/posted-auditions', auditionValidations.GET_AUDITIONS_VALIDATIONS, getPostedAuditionsHandler)
  router.get('/api/v1/applied-auditions', auditionValidations.GET_AUDITIONS_VALIDATIONS, getAppliedAuditionsHandler)
  router.post('/api/v1/auditions/createAudition', auditionValidations.CREATE_AUDITION_VALIDATIONS, createAuditionHandler)
  router.get('/api/v1/recentAuditions', auditionValidations.GET_RECENT_AUDITIONS_VALIDATIONS, getRecentAuditionsHandler)
  router.post('/api/v1/auditions/applyAudition', auditionValidations.APPLY_AUDITIONS_VALIDATIONS, applyAuditionHandler)
  router.get('/api/v1/auditions/getApplicants', auditionValidations.GET_APPLICANTS_VALIDATIONS, getApplicantsHandler)
  router.post('/api/v1/auditions/addJudge', auditionValidations.ADD_JUDGE_VALIDATIONS, addJudgeHandler)
  router.post('/api/v1/auditions/scoreApplicant', auditionValidations.SCORE_APPLICANT_VALIDATIONS, scoreApplicantHandler)
  router.get('/api/v1/auditions/score', auditionValidations.GET_SCORE_VALIDATIONS, getResultsHandler)
  return router
}

export default makeAuditionsRoutes
