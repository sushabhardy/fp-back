import dotenv from 'dotenv'
dotenv.config()

const DEFAULT_AFTER = process.env.DEFAULT_AFTER
const DEFAULT_LIMIT = process.env.DEFAULT_LIMIT

/**
 * 'applicants' table handler
 * @param {makeDb}
 */
const makeApplicantsDb = ({ makeDb }) => {
  /**
   * Add applicant
   * @param {applicantId, auditionId, transactionId}
   * @returns {modifiedCount}
   */
  const addApplicant = async ({ id, applicantId, auditionId, transactionId }, transaction) => {
    const db = await makeDb()
    if (!applicantId || !auditionId) {
      return { modifiedCount: 0 }
    }
    const [, modifiedCount] = await db.query(
      `INSERT INTO applicants(
        id,
        applicant_id, 
        audition_id, 
        transaction_id
      ) VALUES (
        :id,
        :applicantId, 
        :auditionId, 
        :transactionId
      )`, {
        replacements: {
          id,
          applicantId,
          auditionId,
          transactionId
        },
        transaction
      }
    )
    return { modifiedCount }
  }

  /**
   * Get applicants
   * @param {auditionId, after, limit}
   * @returns {applicants, applicantsCount, since}
   */
  const getApplicants = async ({ auditionId, after = DEFAULT_AFTER, limit = DEFAULT_LIMIT }, transaction) => {
    const db = await makeDb()
    const [results, { rowCount }] = await db.query(
    `SELECT 
      applicant.applicant_id as "applicantId", 
      concat(users.first_name, ' ', users.last_name) as "name",
      users.username,
      users.pp,
      users.gender,
      users.about
    FROM
      applicants applicant
    INNER JOIN users ON
      users.id = applicant.applicant_id  
    WHERE
      applicant.id > :after AND applicant.audition_id = :auditionId
    LIMIT :limit
    `, {
      replacements: {
        auditionId,
        after,
        limit
      },
      transaction
    }
    )
    // 'id' of the last record will be used for 'after' value
    const since = results[rowCount - 1] ? results[rowCount - 1].id : after
    return { applicants: results, applicantsCount: rowCount, since }
  }

  return Object.freeze({
    addApplicant,
    getApplicants
  })
}

export default makeApplicantsDb
