import dotenv from 'dotenv'
dotenv.config()

/**
 * 'verification_applications' table handler
 * @param {makeDb}
 */
const makeVerificationApplicationsDb = ({ makeDb }) => {
  /**
   * Add verification application
   * @param {score, applicantId, judgeId, auditionId}
   * @returns {modifiedCount}
   */
  const addApplication = async ({
    aadhaarFrontSrc,
    aadhaarBackSrc,
    panFrontSrc,
    panBackSrc,
    dlFrontSrc,
    dlBackSrc,
    artistAssociationCardSrc,
    applicantId,
    applyTime
  }, transaction) => {
    const db = await makeDb()
    if (!applicantId) {
      return { modifiedCount: 0 }
    }
    const [, modifiedCount] = await db.query(
      `INSERT INTO verification_applications(
        applicant_id, 
        aadhaar_front_src, 
        aadhaar_back_src,
        pan_front_src,
        pan_back_src,
        dl_front_src,
        dl_back_src,
        artist_association_card_src,
        apply_time
      ) VALUES (
        :applicantId, 
        :aadhaarFrontSrc, 
        :aadhaarBackSrc
        :panFrontSrc,
        :panBackSrc,
        :dlFrontSrc,
        :dlBackSrc,
        :artistAssociationCardSrc,
        :applyTime
      )`, {
        replacements: {
          applicantId,
          aadhaarFrontSrc,
          aadhaarBackSrc,
          dlFrontSrc,
          dlBackSrc,
          panFrontSrc,
          panBackSrc,
          artistAssociationCardSrc,
          applyTime
        },
        transaction
      }
    )
    return { modifiedCount }
  }

  return Object.freeze({
    addApplication
  })
}

export default makeVerificationApplicationsDb
