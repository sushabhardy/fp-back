import dotenv from 'dotenv'
dotenv.config()

const DEFAULT_AFTER = process.env.DEFAULT_AFTER
const DEFAULT_LIMIT = process.env.DEFAULT_LIMIT

/**
 * 'posts' table Handler
 * @param {makeDb} makeDb
 */
const makePostsDb = ({ makeDb }) => {
  /**
   * Find all posts
   * @param {userId, after, limit}
   * @returns {posts, postsCount, since}
   */
  const findPosts = async ({ userId, after = DEFAULT_AFTER, limit = DEFAULT_LIMIT }) => {
    const db = await makeDb()
    const [results, { rowCount }] = await db.query(
      `SELECT 
        post.title,
        post.body,
        post.id,
        post.creator_id,
        users.pp as "ppSrc",
        concat(users.first_name, ' ', users.last_name) as "creatorName",
        users.username as "creatorUsername",
        post.created_time as "createdTime",
        post.updated_time as "updatedTime",
        count(distinct likes.id) as "likesCount",
        count(distinct comments.id) as "commentsCount",
        false as "isLiked"
      FROM
        posts post
      FULL OUTER JOIN likes ON
        likes.post_id = post.id
      FULL OUTER JOIN comments ON
        comments.post_id = post.id
      INNER JOIN users ON
        users.id = post.creator_id
      WHERE 
        post.id ${after === '0' ? '>' : '<'} :after
      GROUP BY 
        post.id, 
        post.title, 
        post.body, 
        post.creator_id, 
        post.created_time, 
        post.updated_time, 
        users.first_name, 
        users.last_name,
        users.username,
        users.pp
      ORDER BY
        post.created_time desc
      LIMIT :limit
      `, {
        replacements: {
          userId,
          after,
          limit
        }
      }
    )
    // 'id' of the last record will be used for 'after' value
    const since = results[rowCount - 1] ? results[rowCount - 1].id : after
    return { posts: results, postsCount: rowCount, since }
  }

  /**
   * Find all posts created by user with userId
   * @param {userId, after, limit}
   * @returns {posts, postsCount, since}
   */
  const findPostsCreatedByUser = async ({ userId, after = DEFAULT_AFTER, limit = DEFAULT_LIMIT }) => {
    if (!userId) {
      return { posts: [], postsCount: 0 }
    }
    const db = await makeDb()
    const [results, { rowCount }] = await db.query(
      `SELECT 
        post.title,
        post.body,
        post.id,
        post.creator_id as "creatorId",
        concat(users.first_name, ' ', users.last_name) as "creatorName",
        post.created_time as "createdTime",
        post.updated_time as "updatedTime",
        count(distinct likes.id) as "likesCount",
        count(distinct comments.id) as "commentsCount"
      FROM
        posts post
      FULL OUTER JOIN likes ON
        likes.post_id = post.id
      FULL OUTER JOIN comments ON
        comments.post_id = post.id
      INNER JOIN users ON
        users.id = post.creator_id
      WHERE 
        post.creator_id > :userId
      AND
        post.id > :after
      GROUP BY
        post.id, 
        post.title, 
        post.body, 
        post.creator_id, 
        post.created_time, 
        post.updated_time, 
        users.first_name, 
        users.last_name
      LIMIT :limit
      `, {
        replacements: {
          userId,
          after,
          limit
        }
      }
    )
    // 'id' of the last record will be used for 'after' value
    const since = results[rowCount - 1] ? results[rowCount - 1].id : after
    return { posts: results, postsCount: rowCount, since }
  }

  /**
   * Find all posts liked by user with userId
   * @param {userId, after, limit}
   * @returns {posts, postsCount, since}
   */
  const findPostsLikedByUser = async ({ userId, after = DEFAULT_AFTER, limit = DEFAULT_LIMIT }) => {
    if (!userId) {
      return { posts: [], postsCount: 0 }
    }
    const db = await makeDb()
    const [results, { rowCount }] = await db.query(
      `SELECT 
        post.title,
        post.body,
        post.id,
        post.creator_id as "creatorId",
        concat(users.first_name, ' ', users.last_name) as "creatorName",
        post.created_time as "createdTime",
        post.updated_time as "updatedTime",
        count(distinct likes.id) as "likesCount",
        count(distinct comments.id) as "commentsCount"
      FROM
        posts post
      FULL OUTER JOIN likes ON
        likes.post_id = post.id
      FULL OUTER JOIN comments ON
        comments.post_id = post.id
      INNER JOIN users ON
        users.id = post.creator_id
      WHERE 
        likes.liker_id = :userId
      AND
        post.id > :after
      GROUP BY 
        post.id, 
        post.title, 
        post.body, 
        post.creator_id, 
        post.created_time, 
        post.updated_time, 
        users.first_name, 
        users.last_name
      LIMIT :limit
      `, {
        replacements: {
          userId,
          after,
          limit
        }
      }
    )
    // 'id' of the last record will be used for 'after' value
    const since = results[rowCount - 1] ? results[rowCount - 1].id : after
    return { posts: results, postsCount: rowCount, since }
  }

  /**
   * Find all posts bookmarked by user with userId
   *  @param {userId, after, limit}
   *  @returns {posts, postsCount, since}
   */
  const findPostsBookmarkedByUser = async ({ userId, after = DEFAULT_AFTER, limit = DEFAULT_LIMIT }) => {
    if (!userId) {
      return { posts: [], postsCount: 0 }
    }
    const db = await makeDb()
    const [results, { rowCount }] = await db.query(
      `SELECT 
        post.title,
        post.body,
        post.id,
        post.creator_id as "creatorId",
        concat(users.first_name, ' ', users.last_name) as "creatorName",
        post.created_time as "createdTime",
        post.updated_time as "updatedTime",
        count(distinct likes.id) as "likesCount",
        count(distinct comments.id) as "commentsCount"
      FROM
        posts post
      FULL OUTER JOIN likes ON
        likes.post_id = post.id
      FULL OUTER JOIN comments ON
        comments.post_id = post.id
      INNER JOIN users ON
        users.id = post.creator_id
      INNER JOIN bookmarks ON
        post.id = bookmarks.post_id
      WHERE
        bookmarks.user_id = :userId
      AND
        post.id > :after
      GROUP BY 
        post.id, 
        post.title, 
        post.body, 
        post.creator_id, 
        post.created_time, 
        post.updated_time, 
        users.first_name, 
        users.last_name
      LIMIT :limit
      `, {
        replacements: {
          userId,
          after,
          limit
        }
      }
    )
    // 'id' of the last record will be used for 'after' value
    const since = results[rowCount - 1] ? results[rowCount - 1].id : after
    return { posts: results, postsCount: rowCount, since }
  }

  /**
   * Create a new post
   *  @param {id, body, title, createdTime, updatedTime}
   *  @returns {modifiedCount}
   */
  const addPost = async ({
    id,
    body,
    title,
    createdTime,
    updatedTime,
    creatorId
  }, transaction) => {
    const db = await makeDb()
    const [, modifiedCount] = await db.query(`
      INSERT INTO posts(
        id,
        body,
        title,
        created_time,
        updated_time,
        creator_id
      ) VALUES (
        :id,
        :body,
        :title,
        :createdTime,
        :updatedTime,
        :creatorId
      )
    `, {
      replacements: {
        id: id,
        body: body,
        title: title,
        createdTime: createdTime,
        updatedTime: updatedTime,
        creatorId: creatorId
      },
      transaction
    })
    return { modifiedCount }
  }

  /**
   *  Update post
   *  @param {id, body, title, updatedTime}
   *  @returns {modifiedCount}
   */
  const updatePost = async ({
    id,
    body,
    title,
    updatedTime
  }, transaction) => {
    const db = await makeDb()
    const [, { rowCount }] = await db.query(`
      UPDATE posts SET
        body = :body,
        title = :title,
        updated_time = :updatedTime,
      WHERE id = :id
    `, {
      replacements: {
        id,
        body,
        title,
        updatedTime
      },
      transaction
    })
    return { rowCount }
  }

  return Object.freeze({
    findPosts,
    findPostsCreatedByUser,
    findPostsLikedByUser,
    findPostsBookmarkedByUser,
    addPost,
    updatePost
  })
}

export default makePostsDb
