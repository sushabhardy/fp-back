/**
 * Get all posts liked by user from DB
 * @param {postsDb, postPhotosDb}
 */
const makeGetPostsLikedByUser = ({ postsDb, postPhotosDb, makeTransaction }) => {
  return async ({ userId, after, limit }) => {
    const result = await makeTransaction(async transaction => {
      const { posts, postsCount, since } = await postsDb.findPostsLikedByUser({ userId, after, limit }, transaction)

      const postIds = posts.map(({ id }) => id)
      const { photos } = await postPhotosDb.findPhotos({ postIds })

      // TODO: refactor
      const res = new Map()
      posts.forEach(post => {
        res[post.id] = post
      })

      const res2 = new Map()
      photos.forEach(photo => {
        res2[photo.postId] = []
      })
      photos.forEach(photo => {
        res2[photo.postId] = [...res2[photo.postId], { ...photo }]
      })

      const final = new Map()
      Object.keys(res).forEach(postId => {
        final[postId] = { ...res[postId], photos: res2[postId] }
      })

      return { posts: Object.values(final), postsCount, since }
    })
    return result
  }
}

export default makeGetPostsLikedByUser
