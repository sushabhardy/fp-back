/**
 * Get Profile Percent of user from DB
 * @param {usersDb}
 */

const makeGetProfilePercentage = ({ usersDb, calculateProfilePercentage }) => { // To be removed -- just adding for validation of profile percentage
  return async ({ uid }) => {
    const { userInfo } = await usersDb.fetchProfilePercentage({ uid })
    const profilePercent = calculateProfilePercentage(userInfo)
    return { profilePercent: profilePercent }
  }
}

export default makeGetProfilePercentage
