import dotenv from 'dotenv'
dotenv.config()

const DEFAULT_AFTER = process.env.DEFAULT_AFTER
const DEFAULT_LIMIT = process.env.DEFAULT_LIMIT

/**
 * 'comments' table handler
 * @param {makeDb}
 */
const makeCommentsDb = ({ makeDb }) => {
  /**
   * Get comments for a post
   * @param {postId, after, limit}
   * @returns {comments, commentsCount, since}
   */
  const getComments = async ({ postId, after = DEFAULT_AFTER, limit = DEFAULT_LIMIT }, transaction) => {
    if (!postId) {
      return { comments: [], commentsCount: 0 }
    }
    const db = await makeDb()
    const [results, { rowCount }] = await db.query(
      `SELECT 
        comments.comment, 
        comments.id, 
        comments.created_time as "createdTime", 
        comments.post_id as postId, 
        concat(users.first_name, ' ', users.last_name) as "commentorName" 
      FROM 
        comments as comments
      INNER JOIN users ON 
        users.id = comments.commentor_id
      WHERE 
        post_id = :postId AND
        comments.id > :after
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
    return { comments: results, commentsCount: rowCount, since }
  }

  /**
   * Add comment
   * @param {postId, commentorId, createdTime, updatedTime}
   * @returns {modifiedCount}
   */
  const addComment = async ({ id, postId, commentorId, createdTime, updatedTime }, transaction) => {
    const db = await makeDb()
    if (!postId || !commentorId) {
      return { modifiedCount: 0 }
    }
    const [, modifiedCount] = await db.query(
      `INSERT INTO comments(
        id,
        commentor_id, 
        post_id, 
        created_time,
        updated_time
        ) 
      VALUES (
          :id,
          :commentorId, 
          :postId, 
          :createdTime,
          :updatedTime
      )`, {
        replacements: {
          id,
          commentorId,
          postId,
          createdTime,
          updatedTime
        },
        transaction
      }
    )
    return { modifiedCount }
  }

  return Object.freeze({
    getComments,
    addComment
  })
}

export default makeCommentsDb
