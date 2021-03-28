import { validationResult } from 'express-validator'
import {
  getAuditions, createAudition, getRecentAuditions, getResults,
  getPostedAuditions, getAppliedAuditions, applyAudition,
  getApplicants, addJudge, scoreApplicant
} from '../../use-cases/index.js'
import makeScoreApplicantHandler from './score-applicant.js'
import makeGetAuditionsHandler from './get-auditions.js'
import makeCreateAuditionHandler from './create-audition.js'
import makeGetRecentAuditionsHandler from './get-recent-auditions.js'
import makeGetPostedAuditionsHandler from './get-posted-auditions.js'
import makeGetAppliedAuditionsHandler from './get-applied-auditions.js'
import makeApplyAuditionHandler from './apply-audition.js'
import makeGetApplicantsHandler from './get-applicants.js'
import makeAddJudgeHandler from './add-judge.js'
import makeGetResultsHandler from './get-results.js'

const getAuditionsHandler = makeGetAuditionsHandler({ getAuditions, validationResult })
const createAuditionHandler = makeCreateAuditionHandler({ createAudition, validationResult })
const getRecentAuditionsHandler = makeGetRecentAuditionsHandler({ getRecentAuditions, validationResult })
const getPostedAuditionsHandler = makeGetPostedAuditionsHandler({ getPostedAuditions, validationResult })
const getAppliedAuditionsHandler = makeGetAppliedAuditionsHandler({ getAppliedAuditions, validationResult })
const applyAuditionHandler = makeApplyAuditionHandler({ applyAudition, validationResult })
const getApplicantsHandler = makeGetApplicantsHandler({ getApplicants, validationResult })
const addJudgeHandler = makeAddJudgeHandler({ addJudge, validationResult })
const scoreApplicantHandler = makeScoreApplicantHandler({ scoreApplicant, validationResult })
const getResultsHandler = makeGetResultsHandler({ getResults, validationResult })

export {
  getAuditionsHandler,
  createAuditionHandler,
  getRecentAuditionsHandler,
  getPostedAuditionsHandler,
  getAppliedAuditionsHandler,
  applyAuditionHandler,
  getApplicantsHandler,
  addJudgeHandler,
  scoreApplicantHandler,
  getResultsHandler
}
