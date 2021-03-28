import { makeAudition } from '../entity/index.js'

/**
 * Create audition
 * @param {auditionsDb}
 */
const makeCreateAudition = ({ auditionsDb, makeTransaction }) => {
  return async ({ audition }) => {
    const result = await makeTransaction(async transaction => {
      // Add audition
      const newAudition = makeAudition({ ...audition })
      const { modifiedCount } = await auditionsDb.addAudition({ ...newAudition }, transaction)
      return { modifiedCount }
    })
    return result
  }
}

export default makeCreateAudition
