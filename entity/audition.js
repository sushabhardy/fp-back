const buildMakeAudition = ({ makeId }) => {
  return ({
    id = makeId(),
    title,
    description,
    createdTime = new Date(),
    updatedTime = new Date(),
    expirationTime = new Date((new Date()).getTime() + 4 * 60 * 1000),
    city,
    ageLower,
    ageUpper,
    salary,
    gender,
    languages,
    bannerUrl
  }) => {
    if (!title) {
      throw new Error('Audition must have a title')
    }
    if (!bannerUrl) {
      throw new Error('Audition must have a banner')
    }
    return Object.freeze({
      id,
      title,
      description,
      createdTime,
      updatedTime,
      expirationTime,
      city,
      ageLower,
      ageUpper,
      salary,
      gender,
      languages,
      bannerUrl
    })
  }
}

export default buildMakeAudition
