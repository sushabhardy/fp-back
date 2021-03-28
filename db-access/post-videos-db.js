import dotenv from 'dotenv'
dotenv.config()

/**
 * 'post_videos' table Handler
 * @param {makeDb} makeDb
 */
const makePostVideosDb = ({ makeDb }) => {
  /**
   * Find all postVideos
   * @param {postIds}
   * @returns {videos, videosCount}
   */
  const findVideos = async ({ postIds }) => {
    if (!Array.isArray(postIds) || !postIds.length) {
      return { videos: [], videosCount: 0 }
    }
    const db = await makeDb()
    const [results, { rowCount }] = await db.query(
      `SELECT 
        src,
        post_id as "postId",
        thumbnail as "thumbnail"
      FROM
        post_videos
      WHERE 
        post_id in (:postIds)
      `, {
        replacements: {
          postIds
        }
      }
    )
    return { videos: results, videosCount: rowCount }
  }

  /**
   * Add post videos
   * @param {videos}
   * @returns {modifiedCount}
   */
  const addPostVideos = async ({ videos }, transaction) => {
    if (!Array.isArray(videos) || !videos.length) {
      return { modifiedCount: 0 }
    }
    const db = await makeDb()
    const [, modifiedCount] = await db.query(
      `
      INSERT INTO post_videos(
        id,
        src,
        upload_time,
        thumbnail,
        post_id
      ) VALUES ${videos.map(a => '(?)').join(',')}
      ;
      `, {
        replacements: videos,
        transaction
      }
    )
    return { modifiedCount }
  }

  /**
   * Remove videos of a post
   * @param {postId}
   * @returns {modifiedCount}
   */
  const removePostVideos = async ({ postId }, transaction) => {
    const db = await makeDb()
    const [, modifiedCount] = await db.query(
      `
      DELETE FROM
        post_videos
      WHERE
        post_id = :postId`, {
        replacements: {
          postId
        },
        transaction
      }
    )
    return { modifiedCount }
  }

  return Object.freeze({
    findVideos,
    addPostVideos,
    removePostVideos
  })
}

export default makePostVideosDb
