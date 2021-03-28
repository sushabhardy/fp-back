import dotenv from 'dotenv'
dotenv.config()

/**
 * 'post_photos' table Handler
 * @param {makeDb} makeDb
 */
const makePostPhotosDb = ({ makeDb }) => {
  /**
   * Find all postPhotos
   * @param {postIds}
   * @returns {photos, photosCount}
   */
  const findPhotos = async ({ postIds }) => {
    if (!Array.isArray(postIds) || !postIds.length) {
      return { photos: [], photosCount: 0 }
    }
    const db = await makeDb()
    const [results, { rowCount }] = await db.query(
      `SELECT 
        src,
        post_id as "postId",
        thumbnail as "thumbnail"
      FROM
        post_photos
      WHERE 
        post_id in (:postIds)
      `, {
        replacements: {
          postIds
        }
      }
    )
    return { photos: results, photosCount: rowCount }
  }

  /**
   * Add post photos
   * @param {photos}
   * @returns {modifiedCount}
   */
  const addPostPhotos = async ({ photos }, transaction) => {
    if (!Array.isArray(photos) || !photos.length) {
      return { modifiedCount: 0 }
    }
    const db = await makeDb()
    const [, modifiedCount] = await db.query(
      `
      INSERT INTO post_photos(
        id,
        src,
        upload_time,
        post_id
      ) VALUES ${photos.map(a => '(?)').join(',')}
      ;
      `, {
        replacements: photos,
        transaction
      }
    )
    return { modifiedCount }
  }

  /**
   * Remove photos of a post
   * @param {postId}
   * @returns {modifiedCount}
   */
  const removePostPhotos = async ({ postId }, transaction) => {
    const db = await makeDb()
    const [, modifiedCount] = await db.query(
      `
      DELETE FROM
        post_photos
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
    findPhotos,
    addPostPhotos,
    removePostPhotos
  })
}

export default makePostPhotosDb
