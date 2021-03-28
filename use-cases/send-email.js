/**
 * Send email
 */
const makeSendEmail = ({ sgMail }) => {
  return async ({ toEmail, subject, content, fromEmail, replyTo }) => {
    try {
      await sgMail.send({
        to: toEmail,
        from: fromEmail,
        subject: subject,
        text: content,
        replyTo: replyTo
      })
    } catch (e) {
      console.log(e)
      throw new Error('Unable to send email')
    }
  }
}

export default makeSendEmail
