/**
 * Get all users links from DB
 * @param {userLinksDb}
 */
const makeGetUserLinks = ({ userLinksDb, makeTransaction }) => {
  return async ({ uid, after, limit }) => {
    const result = await makeTransaction(async transaction => {
      const { links, linksCount, since } = await userLinksDb.getUserLinks({ uid, after, limit }, transaction)
      return { links, linksCount, since }
    })
    return result
  }
}

export default makeGetUserLinks
