import dotenv from 'dotenv'
dotenv.config()

/**
 * 'otp' table Handler
 * @param {makeDb} makeDb
 */
const makeOtpDb = ({ makeDb }) => {
  /**
   * Log that OTP is sent
   * @param { id, mobile, expirationTime, isVerified, otp, sendTime, verifyTime }
   * @returns {modifiedCount}
   */
  const insertOtp = async ({ userId, id, mobile, expirationTime, isVerified, otp, sendTime, verifyTime }, transaction) => {
    if (!expirationTime || !otp || !sendTime || !mobile) {
      return { modifiedCount: 0 }
    }
    const db = await makeDb()
    const [, modifiedCount] = await db.query(
      `INSERT INTO otp(
        id,
        otp, 
        expiration_time, 
        send_time, 
        verify_time, 
        is_verified, 
        mobile,
        user_id
      ) VALUES (
          :id,
          :otp, 
          :expirationTime, 
          :sendTime, 
          :verifyTime, 
          :isVerified, 
          :mobile,
          :userId
      )`, {
        replacements: {
          id,
          expirationTime,
          isVerified,
          otp,
          sendTime,
          mobile,
          verifyTime,
          userId
        },
        transaction
      }
    )
    return { modifiedCount }
  }

  /**
   * Log that otp is verified
   * @param { mobile, otp, verifyTime }
   * @returns {rowCount}
   */
  const verifyOtp = async ({ mobile, otp, verifyTime }, transaction) => {
    if (!mobile || !otp || !verifyTime) {
      return { rowCount: 0 }
    }
    const db = await makeDb()
    const [, { rowCount }] = await db.query(
      `UPDATE 
        otp 
      SET 
        is_verified = true, 
        verify_time = :verifyTime, 
        expiration_time = null 
      WHERE 
        mobile = :mobile AND 
        otp = :otp AND 
        is_verified = false AND 
        expiration_time  > :verifyTime`, {
        replacements: {
          mobile,
          otp,
          verifyTime
        },
        transaction
      })
    return { rowCount }
  }

  return Object.freeze({
    insertOtp,
    verifyOtp
  })
}

export default makeOtpDb
