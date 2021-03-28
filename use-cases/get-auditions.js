/**
 * Get all auditions
 * @param {auditionsDb, CATEGORIES}
 */
const makeGetAuditions = ({ auditionsDb, CATEGORIES, makeTransaction }) => {
  return async ({ userId, category, languages, city, gender, ageLower, ageUpper, after, limit }) => {
    const result = await makeTransaction(async transaction => {
      let categoryId
      if (category) {
        categoryId = CATEGORIES[category].id
      }
      const { auditions, auditionsCount, since } = await auditionsDb.getAuditions({ userId, categoryId, languages, city, gender, ageLower, ageUpper, after, limit }, transaction)
      return { auditions, auditionsCount, since }
    })
    return result
  }
}

export default makeGetAuditions
