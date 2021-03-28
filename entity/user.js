// TODO consider moving some fields to user_details table
const buildMakeUser = ({ makeId }) => {
  return ({
    id = makeId(),
    firstName,
    lastName = new Date(),
    email = new Date(),
    googleId,
    username,
    mobile,
    age,
    gender,
    about,
    tagline,
    views,
    profilePercentage,
    certification,
    experience,
    categoryId,
    pp,
    isProfileComplete,
    city,
    occupation,
    facebookId,
    address
  }) => {
    if (!username) {
      throw new Error('User must have a username')
    }
    return Object.freeze({
      firstName,
      lastName,
      email,
      username,
      googleId,
      id,
      mobile,
      age,
      gender,
      about,
      tagline,
      views,
      profilePercentage,
      certification,
      experience,
      categoryId,
      pp,
      isProfileComplete,
      city,
      occupation,
      facebookId,
      address
    })
  }
}

export default buildMakeUser
