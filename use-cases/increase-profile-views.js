/**
 * Increase profile views
 * @param {usersDb}
 */
const makeIncreaseProfileViews = ({ usersDb, makeTransaction }) => {
  return async ({ userId }) => {
    await makeTransaction(async transaction => {
      await usersDb.increaseProfileViews({ userId }, transaction)
    })
  }
}

export default makeIncreaseProfileViews
