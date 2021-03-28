import { makeJudge } from '../entity/index.js'

/**
 * Add judge
 * @param {judgesDb}
 */
const makeAddJudge = ({ judgesDb, generateSecret, makeTransaction }) => {
  return async ({ judge }) => {
    const result = await makeTransaction(async transaction => {
      // Add judge
      const secret = generateSecret()
      const newJudge = makeJudge({ ...judge, secret })
      const { modifiedCount } = await judgesDb.addJudge({ ...newJudge }, transaction)
      return { modifiedCount }
    })
    return result
  }
}

export default makeAddJudge
