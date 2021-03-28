import { makeUser } from '../entity/index.js'

/**
 * Update profile
 * @param {usersDb}
 */
const makeUpdateProfile = ({ usersDb, makeTransaction }) => {
  return async ({ profile }) => {
    const result = await makeTransaction(async transaction => {
      // Update profile
      const { existingUser } = await usersDb.getProfile({ userId: profile.id }, transaction)
      const updatedUser = { ...existingUser, ...profile }
      const newUser = makeUser({ ...updatedUser })
      const { modifiedCount } = await usersDb.updateProfile({ newUser }, transaction)
      return { modifiedCount }
    })
    return result
  }
}

export default makeUpdateProfile
