import dotenv from 'dotenv'
dotenv.config()

/**
 * 'Presence' table Handler
 * @param {makeDb} makeDb
 */
const makePresenceDb = ({ makeDb }) => {
  /**
   * Log that user is now online/offline
   * @param {userId, status, lastSignInTime}
   * @returns { rowCount }
   */
  const updateUserStatus = async ({ userId, status = 'OFFLINE', lastSignInTime = new Date() }, transaction) => {
    if (!userId) {
      return { rowCount: 0 }
    }
    const db = await makeDb()
    const [, { rowCount }] = await db.query(
      `
      UPDATE 
        presence 
      SET
        status = :status, 
        last_sign_in_time = :lastSignInTime
      WHERE 
        user_id = :userId`, {
        replacements: {
          userId,
          lastSignInTime,
          status
        },
        transaction
      }
    )
    return { rowCount }
  }

  /**
   * Log that user is now online/offline
   * @param {userId, status, lastSignInTime}
   * @returns { rowCount }
   */
  const addUserStatus = async ({ userId, status = 'ONLINE', lastSignInTime = new Date() }, transaction) => {
    if (!userId) {
      return { rowCount: 0 }
    }
    const db = await makeDb()
    const [, modifiedCount] = await db.query(
      `
      INSER INTO 
        presence(id, user_id, status, last_sign_in_time)
      VALUES (
        :id,
        :userId,
        :status, 
        :lastSignInTime
      )`, {
        replacements: {
          userId,
          lastSignInTime,
          status
        },
        transaction
      }
    )
    return { modifiedCount }
  }

  const userPresenceExists = async ({ userId }) => {
    const db = await makeDb()
    const [[{ ...presence }]] = await db.query(
      `SELECT 
        id
      FROM 
        users 
      WHERE user_id = :userId`, {
        replacements: {
          userId
        }
      }
    )
    return { present: Object.keys(presence).length ? presence : null }
  }

  const getUserStatus = async ({ userId }, transaction) => {
    const db = await makeDb()
    const [[{ ...presence }]] = await db.query(
      `
      SELECT 
        status as "status",
        last_sign_in_time as "lastSignInTime"
      FROM
        presence
      WHERE
        user_id = :userId
      `, {
        replacements: {
          userId
        },
        transaction
      }
    )
    return { status: presence.status, lastSignInTime: presence.lastSignInTime }
  }

  return Object.freeze({
    userPresenceExists,
    updateUserStatus,
    addUserStatus,
    getUserStatus
  })
}

export default makePresenceDb
