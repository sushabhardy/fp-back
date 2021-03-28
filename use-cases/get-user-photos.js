/**
 * Get all users photos from DB
 * @param {userPhotosDb}
 */
const makeGetUserPhotos = ({ userPhotosDb, makeTransaction }) => {
  return async ({ uid, after, limit }) => {
    const result = await makeTransaction(async transaction => {
      const { photos, photosCount, since } = await userPhotosDb.getUserPhotos({ uid, after, limit }, transaction)
      return { photos, photosCount, since }
    })
    return result
  }
}

export default makeGetUserPhotos
