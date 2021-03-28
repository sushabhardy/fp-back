import { makeUserPhoto } from '../entity/index.js'

/**
 * Update user photos
 * @param { userPhotosDb }
 */
const makeUpdatePhotos = ({ userPhotosDb, makeTransaction }) => {
  return async ({ userId, photos }) => {
    const result = await makeTransaction(async transaction => {
      const newPhotos = photos.map(photo => Object.values(makeUserPhoto({ ...photo, userId })))
      await userPhotosDb.removePhotos({ userId }, transaction)
      await userPhotosDb.addPhotos({ photos: newPhotos }, transaction)
    })
    return result
  }
}

export default makeUpdatePhotos
