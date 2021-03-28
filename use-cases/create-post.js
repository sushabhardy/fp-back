import { makePost, makePostPhoto } from '../entity/index.js'

/**
 * Create post
 * @param {usersDb, postPhotosDb}
 */
const makeCreatePost = ({ postsDb, postPhotosDb, makeTransaction }) => {
  return async ({ post }) => {
    const result = await makeTransaction(async transaction => {
      // Add post
      const newPost = makePost({ ...post })
      const { modifiedCount } = await postsDb.addPost({ ...newPost }, transaction)

      // Add postId to post photos
      const { photos } = post
      const newPhotos = photos.map(photo => Object.values(makePostPhoto({ ...photo, postId: newPost.id })))

      // Add post photos
      await postPhotosDb.addPostPhotos({ photos: newPhotos }, transaction)

      return { modifiedCount }
    })
    return result
  }
}

export default makeCreatePost
