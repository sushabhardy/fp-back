import dotenv from 'dotenv'
dotenv.config()

const DEFAULT_AFTER = process.env.DEFAULT_AFTER
const DEFAULT_LIMIT = process.env.DEFAULT_LIMIT

/**
 * 'Likes' table Handler
 * @param {makeDb} makeDb
 */
const makeLikesDb = ({ makeDb }) => {
  /**
   * Log that Like is made on the post
   * @param { likerId, postId, likeTime }
   * @returns { modifiedCount }
   */
  const insertLike = async ({ id, likerId, postId, likeTime }, transaction) => {
    if (!likerId || !likeTime || !postId) {
      return { modifiedCount: 0 }
    }
    const db = await makeDb()
    const [, modifiedCount] = await db.query(
      `INSERT INTO likes(
        id,
        liker_id, 
        post_id, 
        like_time
        ) 
      VALUES (
          :id,
          :likerId, 
          :postId, 
          :likeTime
      )`, {
        replacements: {
          id,
          likeTime,
          postId,
          likerId
        },
        transaction
      }
    )
    return { modifiedCount }
  }

  /**
   * Check if a like with given likerId and postId is present in the like table
   * @param { likerId, postId }
   * @returns { likeId }
   */
  const fetchByLikerIdAndPostId = async ({ likerId, postId }, transaction) => {
    if (!likerId || !postId) {
      return { likeId: null }
    }
    const db = await makeDb()
    const likeIdObject = await db.query(
      `SELECT 
        id as "likeId" 
        FROM
          likes
        WHERE
          liker_id = :likerId AND post_id = :postId`, {
        replacements: {
          likerId,
          postId
        },
        transaction
      }
    )
    if (likeIdObject[0].length === 0) {
      return { likeId: null }
    }
    const [[{ likeId }]] = likeIdObject
    return { likeId }
  }

  /**
   * Delete Like with id = LikeId
   * @param { likeId }
   * @returns { modifiedCount }
   */
  const deleteLike = async ({ likeId }, transaction) => {
    if (!likeId) {
      return { modifiedCount: 0 }
    }
    const db = await makeDb()
    const [, modifiedCount] = await db.query(
      `
      DELETE FROM
        likes
      WHERE
        id = :likeId`, {
        replacements: {
          likeId
        },
        transaction
      }
    )
    return { modifiedCount }
  }

  /**
   * Get likers for a post
   * @param {postId, after, limit}
   * @returns {likers, likersCount, since}
   */
  const getLikers = async ({ postId, after = DEFAULT_AFTER, limit = DEFAULT_LIMIT }, transaction) => {
    if (!postId) {
      return { likers: [], likersCount: 0 }
    }
    const db = await makeDb()
    const [results, { rowCount }] = await db.query(
      `SELECT 
        concat(users.first_name, ' ', users.last_name) as "likerName", 
        likes.id, 
        likes.like_time as "likeTime", 
        likes.post_id as "postId"
      FROM 
        likes
      INNER JOIN users ON 
        users.id = likes.liker_id
      WHERE 
        post_id = :postId AND
        likes.id > :after
      LIMIT :limit
      `, {
        replacements: {
          postId,
          after,
          limit
        },
        transaction
      })

    // 'id' of the last record will be used for 'after' value
    const since = results[rowCount - 1] ? results[rowCount - 1].id : after
    return { likers: results, likersCount: rowCount, since }
  }

  return Object.freeze({
    insertLike,
    fetchByLikerIdAndPostId,
    deleteLike,
    getLikers
  })
}

export default makeLikesDb
