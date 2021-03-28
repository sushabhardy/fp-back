import dotenv from 'dotenv'
dotenv.config()

/**
 * 'submissions' table Handler
 * @param {makeDb} makeDb
 */
const makeSubmissionsDb = ({ makeDb }) => {
  /**
   * Add submissions
   * @param {submissions}
   * @returns {modifiedCount}
   */
  const addSubmissions = async ({ submissions }, transaction) => {
    console.log(submissions)
    if (!Array.isArray(submissions) || !submissions.length) {
      return { modifiedCount: 0 }
    }
    const db = await makeDb()
    const [, modifiedCount] = await db.query(
      `
      INSERT INTO submissions(
        id,
        submission_time,
        submission_type,
        submission_url,
        applicant_id,
        audition_id
      ) VALUES ${submissions.map(a => '(?)').join(',')}
      ;
      `, {
        replacements: submissions,
        transaction
      }
    )
    return { modifiedCount }
  }

  return Object.freeze({
    addSubmissions
  })
}

export default makeSubmissionsDb
