import { makeUserPhoto } from '../entity/index.js'

/**
 * Complete profile
 * TODO languages
 * @param {usersDb}
 */
const makeCompleteProfile = ({ usersDb, userPhotosDb, makeTransaction }) => {
  return async ({ profile }) => {
    const result = await makeTransaction(async transaction => {
      const { rowCount } = await usersDb.completeProfile({ ...profile }, transaction)
      const { photos = [], id } = profile
      const newPhotos = photos.map(photo => Object.values(makeUserPhoto({ ...photo, userId: id })))
      await userPhotosDb.addPhotos({ photos: newPhotos }, transaction)
      return { rowCount }
    })
    return result
  }
}

export default makeCompleteProfile
