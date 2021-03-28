import dotenv from 'dotenv'
dotenv.config()

const DEFAULT_AFTER = process.env.DEFAULT_AFTER
const DEFAULT_LIMIT = process.env.DEFAULT_LIMIT

/**
 * 'user_videos' table handler
 * @param {makeDb}
 */
const makeUserVideosDb = ({ makeDb }) => {
  /**
   * Get user videos for a user
   * @param {uid, after, limit}
   * @returns {videos, videosCount, since}
   */
  const getUserVideos = async ({ uid, after = DEFAULT_AFTER, limit = DEFAULT_LIMIT }) => {
    if (!uid) {
      return { videos: [], videosCount: 0 }
    }
    const db = await makeDb()
    const [results, { rowCount }] = await db.query(
      `SELECT 
        user_id as "userId",
        src 
      FROM 
        user_videos
      WHERE 
        user_id  = :uid and id > :after
      LIMIT :limit
      `, {
        replacements: {
          uid,
          after,
          limit
        }
      })

    // 'id' of the last record will be used for 'after' value
    const since = results[rowCount - 1] ? results[rowCount - 1].id : after
    return { videos: results, videosCount: rowCount, since }
  }

  return Object.freeze({
    getUserVideos
  })
}

export default makeUserVideosDb
