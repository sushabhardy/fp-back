
const makeAuditionValidations = ({ body, check, param }) => {
  const GET_AUDITIONS_VALIDATIONS = [
  ]
  const CREATE_AUDITION_VALIDATIONS = [
    body('audition').exists()
  ]
  const GET_RECENT_AUDITIONS_VALIDATIONS = [
  ]
  const APPLY_AUDITIONS_VALIDATIONS = [
    body('applicant').exists()
  ]
  const GET_APPLICANTS_VALIDATIONS = [
    check('auditionId').exists()
  ]

  const ADD_JUDGE_VALIDATIONS = [
    body('judge').exists()
  ]

  const SCORE_APPLICANT_VALIDATIONS = [
    body('score').exists(),
    body('applicantId').exists(),
    body('judgeId').exists(),
    body('auditionId').exists()
  ]

  const GET_SCORE_VALIDATIONS = [
    check('applicantId').exists(),
    check('auditionId').exists()
  ]

  return Object.freeze({
    GET_AUDITIONS_VALIDATIONS,
    GET_RECENT_AUDITIONS_VALIDATIONS,
    CREATE_AUDITION_VALIDATIONS,
    GET_APPLICANTS_VALIDATIONS,
    APPLY_AUDITIONS_VALIDATIONS,
    ADD_JUDGE_VALIDATIONS,
    SCORE_APPLICANT_VALIDATIONS,
    GET_SCORE_VALIDATIONS
  })
}

export default makeAuditionValidations
