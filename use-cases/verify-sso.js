import { makeUser } from '../entity/index.js'

/**
 * Verifying SSO
 * @param { usersDb, generateSpToken, generateUsername }
 */
const makeVerifySSO = ({ usersDb, generateSpToken, generateUsername }) => {
  return async ({ idpToken, displayName, email, googleId }) => {
    const firstName = displayName.split(' ')[0]
    const lastName = displayName.split(' ')[1]
    const username = generateUsername({ firstName })
    const name = `${firstName} ${lastName}`
    const user = makeUser({ firstName, lastName, username, googleId, email })

    // TODO
    const { existingUser } = await usersDb.userExistsByGoogleId({ id: googleId })
    const spToken = generateSpToken({ userId: user.id })

    if (existingUser) {
      return {
        userId: existingUser.id,
        firstName: firstName,
        lastName: lastName,
        name: name,
        spToken: spToken,
        profileComplete: existingUser.profileComplete
      }
    }

    await usersDb.addUser({ ...user })
    return {
      userId: user.id,
      firstName: firstName,
      lastName: lastName,
      name: name,
      spToken: spToken,
      profileComplete: false
    }
  }
}
export default makeVerifySSO
