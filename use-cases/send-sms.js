/**
 * Send SMS via MSG91 API
 * @param {axios} axiosInstance
 */
const makeSendSMS = ({ axios }) => {
  return async ({ mobile, message }) => {
    try {
      const AUTH_KEY = process.env.MSG91_AUTH_KEY
      const msg = encodeURIComponent(message)
      const URL = `https://api.msg91.com/api/sendhttp.php?country=91&sender=FILMYP&route=4&mobiles=${mobile}&authkey=${AUTH_KEY}&message=${msg}`
      const { data } = await axios.get(URL)
      if (!data) throw new Error('Unable to send SMS')
    } catch (e) {
      console.log(e)
      throw new Error('Unable to send SMS')
    }
  }
}

export default makeSendSMS
