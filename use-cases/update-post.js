import { makePost, makePostPhoto } from '../entity/index.js'

/**
 * Edit post
 * @param {usersDb, postPhotosDb}
 */
const makeUpdatePost = ({ postsDb, postPhotosDb, makeTransaction }) => {
  return async ({ post }) => {
    const result = await makeTransaction(async transaction => {
      // Add post
      const newPost = makePost({ ...post })
      const { modifiedCount } = await postsDb.updatePost({ ...newPost }, transaction)

      // Add post photos
      const { photos } = post
      const newPhotos = photos.map(photo => Object.values(makePostPhoto({ ...photo, postId: newPost.id })))
      await postPhotosDb.removePostPhotos({ postId: newPost.id }, transaction)
      await postPhotosDb.addPostPhotos({ photos: newPhotos }, transaction)

      return { modifiedCount }
    })
    return result
  }
}

export default makeUpdatePost
