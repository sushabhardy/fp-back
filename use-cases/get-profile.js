/**
 * Get Profile of user from DB
 * @param {usersDb, userLinksDb, userPhotosDb}
 */
const makeGetProfile = ({ usersDb, userLinksDb, userPhotosDb, makeTransaction }) => {
  return async ({ uid }) => {
    const result = await makeTransaction(async transaction => {
      const { profile } = await usersDb.fetchProfile({ uid }, transaction)
      const { links } = await userLinksDb.getUserLinks({ uid }, transaction)
      const { photos } = await userPhotosDb.getUserPhotos({ uid }, transaction)
      const completeProfile = { ...profile, links, photos }
      return { completeProfile }
    })
    return result
  }
}

export default makeGetProfile
