/**
 * Calculates Profile Percentage
 * @param {*} data
 */
const calculateProfilePercentage = ({
  username,
  tagline,
  about,
  age,
  pp,
  certification,
  experience,
  userPhotosCount,
  userVideosCount,
  socialLinksCount,
  userPostsCount
}) => {
  let completedElements = 0
  const totalElements = 6

  // check basic details
  if (username && tagline && about && age) {
    completedElements += 1
  }

  // check profile picture
  if (pp) {
    completedElements += 1
  }

  // check certification & experience
  if (certification && experience && experience.length) {
    completedElements += 1
  }

  // check photos & videos
  if ((userPhotosCount > 0) || (userVideosCount > 0)) {
    completedElements += 1
  }

  // check social links
  if (socialLinksCount === 'true') {
    completedElements += 1
  }

  // check posts count
  if (userPostsCount > 0) {
    completedElements += 1
  }

  return ((completedElements / totalElements) * 100).toFixed(0)
}

export default calculateProfilePercentage
