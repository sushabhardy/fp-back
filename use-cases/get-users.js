/**
 * Get all users filtered from DB
 * @param {usersDb, CATEGORIES}
 */
const makeGetUsers = ({ usersDb, CATEGORIES, makeTransaction }) => {
  return async ({ after, limit, category, languages, city, gender, ageLower, ageUpper, uid }) => {
    const result = await makeTransaction(async transaction => {
      let categoryId
      if (category) {
        categoryId = CATEGORIES[category].id
      }
      const { users, usersCount, since } = await usersDb.findUsers({ after, limit, categoryId, languages, city, gender, ageLower, ageUpper, uid }, transaction)
      return { users, usersCount, since }
    })
    return result
  }
}

export default makeGetUsers
