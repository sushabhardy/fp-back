const buildMakeOtp = ({ makeId }) => {
  return ({
    id = makeId(),
    mobile,
    sendTime,
    expirationTime,
    updatedTime = new Date(),
    isVerified,
    otp,
    verifyTime,
    userId
  }) => {
    if (!mobile) {
      throw new Error('Otp must have a mobile')
    }
    return Object.freeze({
      id,
      mobile,
      updatedTime,
      expirationTime,
      isVerified,
      otp,
      sendTime,
      verifyTime,
      userId
    })
  }
}

export default buildMakeOtp
