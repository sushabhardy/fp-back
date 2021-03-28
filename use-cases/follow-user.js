import { makeFollow } from '../entity/index.js'

/**
 * Follow user
 * @param {followDb}
 */
const makeFollowUser = ({ followersDb, makeTransaction }) => {
  return async ({ followerId, followeeId }) => {
    const result = await makeTransaction(async transaction => {
      const { id } = await followersDb.fetchByFollowerIdAndFolloweeId({ followerId, followeeId })

      /*
      * If already followed, do unfollow otherwise do follow
      */
      if (id) {
        await followersDb.deleteFollow({ id }, transaction)
        return { followed: false }
      } else {
        const newFollow = makeFollow({ followerId, followeeId })
        await followersDb.addFollow({ ...newFollow }, transaction)
        return { followed: true }
      }
    })
    return result
  }
}

export default makeFollowUser
