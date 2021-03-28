import dotenv from 'dotenv'
dotenv.config()

/**
 * 'followers' table handler
 * @param {makeDb}
 */
const makeFollowersDb = ({ makeDb }) => {
  /**
   * Add follow
   * @param {id, followerId, followeeId, followTime}
   * @returns {modifiedCount}
   */
  const addFollow = async ({ id, followerId, followeeId, followTime }, transaction) => {
    const db = await makeDb()
    if (!followerId || !followeeId) {
      return { modifiedCount: 0 }
    }
    const [, modifiedCount] = await db.query(
      `INSERT INTO followers(
        id,
        follower_id, 
        followee_id, 
        follow_time
        ) 
      VALUES (
          :id,
          :followerId, 
          :followeeId, 
          :followTime
      )`, {
        replacements: {
          id,
          followerId,
          followeeId,
          followTime
        },
        transaction
      }
    )
    return { modifiedCount }
  }

  /**
   * Check if a follow with given followerId and followeeId is present in the followers table
   * @param { followerId, followeeId }
   * @returns { id }
   */
  const fetchByFollowerIdAndFolloweeId = async ({ followerId, followeeId }, transaction) => {
    if (!followerId || !followeeId) {
      return { id: null }
    }
    const db = await makeDb()
    const likeIdObject = await db.query(
      `SELECT 
        id
      FROM
        followers
      WHERE
        follower_id = :followerId AND followee_id = :followeeId`, {
        replacements: {
          followerId,
          followeeId
        },
        transaction
      }
    )
    if (likeIdObject[0].length === 0) {
      return { id: null }
    }
    const [[{ id }]] = likeIdObject
    return { id }
  }
  /**
   * Unfollow
   * @param { id }
   * @returns { modifiedCount }
   */
  const deleteFollow = async ({ id }, transaction) => {
    if (!id) {
      return { modifiedCount: 0 }
    }
    const db = await makeDb()
    const [, modifiedCount] = await db.query(
      `
      DELETE FROM
        followers
      WHERE
        id = :id`, {
        replacements: {
          id
        },
        transaction
      }
    )
    return { modifiedCount }
  }

  return Object.freeze({
    addFollow,
    fetchByFollowerIdAndFolloweeId,
    deleteFollow
  })
}

export default makeFollowersDb
