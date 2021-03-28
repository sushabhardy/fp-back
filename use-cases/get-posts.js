/**
 * Get all posts from DB
 * TODO: add recommendation algoritm
 * @param {postsDb, postPhotosDb}
 */
const makeGetPosts = ({ postsDb, postPhotosDb, postVideosDb, makeTransaction }) => {
  return async ({ userId, after, limit }) => {
    const result = await makeTransaction(async transaction => {
      const { posts, postsCount, since } = await postsDb.findPosts({ userId, after, limit }, transaction)

      const postIds = posts.map(({ id }) => id)
      const { photos } = await postPhotosDb.findPhotos({ postIds }, transaction)
      const { videos } = await postVideosDb.findVideos({ postIds }, transaction)

      // TODO: refactor
      const res = new Map()
      posts.forEach(post => {
        res[post.id] = post
      })

      // photos
      const res2 = new Map()
      posts.forEach(post => {
        res2[post.id] = []
      })
      photos.forEach(photo => {
        res2[photo.postId] = []
      })
      photos.forEach(photo => {
        res2[photo.postId] = [...res2[photo.postId], { ...photo, mediaType: 'img' }]
      })

      // videos
      const res3 = new Map()
      posts.forEach(post => {
        res3[post.id] = []
      })
      videos.forEach(video => {
        res3[video.postId] = []
      })
      videos.forEach(video => {
        res3[video.postId] = [...res3[video.postId], { ...video, mediaType: 'video' }]
      })

      // agg
      const final = new Map()
      Object.keys(res).forEach(postId => {
        final[postId] = { ...res[postId], media: [...res2[postId], ...res3[postId]] }
      })

      return { posts: Object.values(final), postsCount, since }
    })
    return result
  }
}

export default makeGetPosts
