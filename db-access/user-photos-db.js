import dotenv from 'dotenv'
dotenv.config()

const DEFAULT_AFTER = process.env.DEFAULT_AFTER
const DEFAULT_LIMIT = process.env.DEFAULT_LIMIT

/**
 * 'user_photos' table handler
 * @param {makeDb}
 */
const makeUserPhotosDb = ({ makeDb }) => {
  /**
   * Get user photos for a user
   * @param {uid, after, limit}
   * @returns {photos, photosCount, since}
   */
  const getUserPhotos = async ({ uid, after = DEFAULT_AFTER, limit = DEFAULT_LIMIT }, transaction) => {
    if (!uid) {
      return { photos: [], photosCount: 0 }
    }
    const db = await makeDb()
    const [results, { rowCount }] = await db.query(
      `SELECT 
        user_id as "userId",
        src 
      FROM 
        user_photos
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
    return { photos: results, photosCount: rowCount, since }
  }

  /**
   * Remove photos of a user
   * @param {userId}
   * @returns {modifiedCount}
   */
  const removePhotos = async ({ userId }, transaction) => {
    const db = await makeDb()
    const [, modifiedCount] = await db.query(
      `
      DELETE FROM
        user_photos
      WHERE
        user_id = :userId`, {
        replacements: {
          userId
        },
        transaction
      }
    )
    return { modifiedCount }
  }

  /**
   * Add photos of a user
   * @param {userId}
   * @returns {modifiedCount}
   */
  const addPhotos = async ({ photos }, transaction) => {
    if (!Array.isArray(photos) || !photos.length) {
      return { modifiedCount: 0 }
    }
    const db = await makeDb()
    const [, modifiedCount] = await db.query(
      `
      INSERT INTO user_photos(
        id,
        src,
        upload_time,
        user_id
      ) VALUES ${photos.map(a => '(?)').join(',')}
      ;
      `, {
        replacements: photos,
        transaction
      }
    )
    return { modifiedCount }
  }

  return Object.freeze({
    getUserPhotos,
    removePhotos,
    addPhotos
  })
}

export default makeUserPhotosDb
