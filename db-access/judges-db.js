import dotenv from 'dotenv'
dotenv.config()

/**
 * 'judges' table Handler
 * @param {makeDb} makeDb
 */
const makeJudgesDb = ({ makeDb }) => {
  /**
   * Add judge
   * @param {id, name, auditionId, secret}
   * @returns {modifiedCount}
   */
  const addJudge = async ({ id, name, auditionId, secret }, transaction) => {
    const db = await makeDb()
    const [, modifiedCount] = await db.query(
      `
      INSERT INTO judges(
        id,
        audition_id,
        name,
        secret
      ) VALUES (
        :id, 
        :auditionId, 
        :name, 
        :secret
      );
      `, {
        replacements: {
          id,
          name,
          auditionId,
          secret
        },
        transaction
      }
    )
    return { modifiedCount }
  }

  return Object.freeze({
    addJudge
  })
}

export default makeJudgesDb
