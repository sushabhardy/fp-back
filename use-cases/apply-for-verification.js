import { makeVerificationApplication } from '../entity/index.js'

/**
 * Apply for verification
 * @param {verificationApplicationsDb}
 */
const makeApplyForVerification = ({ verificationApplicationsDb, makeTransaction }) => {
  return async ({ ...application }) => {
    const result = await makeTransaction(async transaction => {
      const newApplication = makeVerificationApplication({ ...application })
      const { modifiedCount } = await verificationApplicationsDb.addApplication({ ...newApplication }, transaction)
      return { modifiedCount }
    })
    return result
  }
}

export default makeApplyForVerification
