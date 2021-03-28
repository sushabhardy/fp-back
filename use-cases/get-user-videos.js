/**
 * Get all users videos from DB
 * @param {userVideosDb}
 */
const makeGetUserVideos = ({ userVideosDb, makeTransaction }) => {
  return async ({ uid, after, limit }) => {
    const result = await makeTransaction(async transaction => {
      const { videos, videosCount, since } = await userVideosDb.getUserVideos({ uid, after, limit }, transaction)
      return { videos, videosCount, since }
    })
    return result
  }
}

export default makeGetUserVideos
