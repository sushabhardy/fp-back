import dotenv from 'dotenv'
dotenv.config()

const DEFAULT_AFTER = process.env.DEFAULT_AFTER
const DEFAULT_LIMIT = process.env.DEFAULT_LIMIT

/**
 * 'user_links' table handler
 * @param {makeDb}
 */
const makeUserLinksDb = ({ makeDb }) => {
  /**
   * Get user links for a user
   * @param {uid, after, limit}
   * @param {links, linksCount, since}
   */
  const getUserLinks = async ({ uid, after = DEFAULT_AFTER, limit = DEFAULT_LIMIT }, transaction) => {
    if (!uid) {
      return { links: [], linksCount: 0 }
    }
    const db = await makeDb()
    const [results, { rowCount }] = await db.query(
      `SELECT 
        user_id as "userId",
        src 
      FROM 
        user_links
      WHERE 
        user_id  = :uid and id > :after
      LIMIT :limit
      `, {
        replacements: {
          uid,
          after,
          limit
        },
        transaction
      })

    // 'id' of the last record will be used for 'after' value
    const since = results[rowCount - 1] ? results[rowCount - 1].id : after
    return { links: results, linksCount: rowCount, since }
  }

  return Object.freeze({
    getUserLinks
  })
}

export default makeUserLinksDb
