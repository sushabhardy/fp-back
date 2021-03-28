import dotenv from 'dotenv'
dotenv.config()

/**
 * 'audition_results' table handler
 * @param {makeDb}
 */
const makeAuditionResultsDb = ({ makeDb }) => {
  /**
   * Add applicant's audition result
   * @param {score, applicantId, judgeId, auditionId}
   * @returns {modifiedCount}
   */
  const addResult = async ({ id, score, applicantId, judgeId, auditionId }, transaction) => {
    const db = await makeDb()
    if (!applicantId || !auditionId || !judgeId) {
      return { modifiedCount: 0 }
    }
    const [, modifiedCount] = await db.query(
      `INSERT INTO audition_results(
        id,
        applicant_id, 
        audition_id, 
        judge_id,
        score
      ) VALUES (
        :id,
        :applicantId, 
        :auditionId, 
        :judgeId,
        :score
      )`, {
        replacements: {
          id,
          applicantId,
          auditionId,
          judgeId,
          score
        },
        transaction
      }
    )
    return { modifiedCount }
  }

  /**
   * Fetch result
   * @param {auditionId, after, limit}
   * @returns {applicants, applicantsCount, since}
   */
  const fetchResult = async ({ applicantId, judgeId, auditionId }, transaction) => {
    const db = await makeDb()
    const [[results]] = await db.query(
    `SELECT 
      result.id as "resultId"
    FROM
      audition_results result
    WHERE
      result.applicant_id = :applicantId AND 
      result.judge_id = :judgeId AND
      result.audition_id = :auditionId
    LIMIT 1
    `, {
      replacements: {
        auditionId,
        judgeId,
        applicantId
      },
      transaction
    }
    )
    const { resultId } = results ? results[0] : { resultId: null }
    return { resultId }
  }

  /**
   * Update result
   * @param {score, resultId}
   * @returns {rowCount}
   */
  const updateResult = async ({ score, resultId }, transaction) => {
    const db = await makeDb()
    const [, { rowCount }] = await db.query(
      `UPDATE 
        audition_results 
      SET 
        score = :score 
      WHERE 
        id = :resultId`, {
        replacements: {
          score,
          resultId
        },
        transaction
      })
    return { rowCount }
  }

  const getApplicantScores = async ({ auditionId, applicantId }, transaction) => {
    const db = await makeDb()
    const [results, { rowCount }] = await db.query(
      `SELECT 
        result.judge_id as "judgeId",
        result.score
      FROM
        audition_results result
      WHERE
        result.applicant_id = :applicantId AND 
        result.audition_id = :auditionId
      LIMIT 1
      `, {
        replacements: {
          auditionId,
          applicantId
        },
        transaction
      }
    )
    return { results: results, resultsCount: rowCount }
  }

  return Object.freeze({
    addResult,
    updateResult,
    fetchResult,
    getApplicantScores
  })
}

export default makeAuditionResultsDb
