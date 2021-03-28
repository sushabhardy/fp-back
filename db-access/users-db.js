import dotenv from 'dotenv'
dotenv.config()

const DEFAULT_AFTER = process.env.DEFAULT_AFTER
const DEFAULT_LIMIT = process.env.DEFAULT_LIMIT

/**
 * 'users' table Handler
 * @param {makeDb} makeDb
 */
const makeUsersDb = ({ makeDb }) => {
  /**
   * Complete user profile
   * @param {id, username, firstName, lastName, age, gender, isProfileComplete, about, pp, city}
   * @returns {rowCount}
   */
  const updateProfile = async ({
    id,
    username,
    firstName,
    lastName,
    age,
    gender,
    isProfileComplete,
    about,
    pp,
    city
  }) => {
    const db = await makeDb()
    const [, { rowCount }] = await db.query(
      `UPDATE 
        users 
      SET 
        username = :username, 
        first_name = :firstName, 
        last_name = :lastName,
        age = :age,
        gender = :gender,
        is_profile_complete = true,
        about = :about,
        pp = :pp,
        city = :city
      WHERE 
       id = :id`, {
        replacements: {
          id,
          username,
          firstName,
          lastName,
          age,
          gender,
          isProfileComplete,
          about,
          pp,
          city
        }
      })
    return rowCount
  }

  /**
   * Complete user profile
   * @param {id, username, firstName, lastName, age, gender, isProfileComplete, about, pp, city}
   * @returns {rowCount}
   */
  const completeProfile = async ({
    id,
    username,
    firstName,
    lastName,
    age,
    gender,
    isProfileComplete,
    about,
    mobile,
    pp,
    city
  }) => {
    const db = await makeDb()
    const [, { rowCount }] = await db.query(
      `UPDATE 
        users 
      SET 
        username = :username, 
        first_name = :firstName, 
        last_name = :lastName,
        age = :age,
        gender = :gender,
        is_profile_complete = true,
        about = :about,
        pp = :pp,
        city = :city,
        mobile = :mobile
      WHERE 
       id = :id`, {
        replacements: {
          id,
          username,
          firstName,
          lastName,
          age,
          gender,
          isProfileComplete,
          about,
          pp,
          city,
          mobile
        }
      })
    return rowCount
  }

  const generateWhereClause = (col, val, sign) => {
    return ` and ${col} ${sign} ${val}`
  }

  /**
   * Retrieve user by mobile
   * @param { mobile } mobile
   * @returns { userId }
   */
  const findByMobile = async ({ mobile }, transaction) => {
    const db = await makeDb()
    const [[{ userId } = {}]] = await db.query(
      `SELECT 
        id AS "userId" 
      FROM 
        users 
      WHERE 
        mobile = :mobile LIMIT 1`, {
        replacements: {
          mobile
        },
        transaction
      })
    return { userId }
  }

  /**
   * Retrieve user by mobile
   * @param { mobile, userId }
   * @returns { existingUser }
   */
  const findByIdAndMobile = async ({ userId, mobile }) => {
    const db = await makeDb()
    const [[{ ...existingUser }]] = await db.query(
      `SELECT 
        id as "userId", 
        mobile, first_name as "firstName", 
        last_name as "lastName" 
      FROM 
        users 
      WHERE id = :userId AND mobile = :mobile`, {
        replacements: {
          userId,
          mobile
        }
      }
    )
    return { existingUser }
  }

  /**
   * Retrieve users
   * @param { after, limit, category, languages, city, gender, ageLower, ageUpper }
   * @returns { users, usersCount, since }
   */
  const findUsers = async ({ after = DEFAULT_AFTER, limit = DEFAULT_LIMIT, categoryId, languages, city, gender, ageLower, ageUpper, uid }, transaction) => {
    const db = await makeDb()
    let whereClause = ''
    if (categoryId) {
      whereClause += generateWhereClause('users.category_id', categoryId, '=')
    }
    if (languages) {
      whereClause += generateWhereClause('languages.language', `(${languages.split(',').map(lang => `'${lang}'`).reduce((accumulator, current) => `${accumulator}, ${current}`)})`, 'in')
    }
    if (city) {
      whereClause += generateWhereClause('users.city', `'${city}'`, '=')
    }
    if (gender) {
      whereClause += generateWhereClause('users.gender', `'${gender}'`, '=')
    }
    if (ageLower) {
      whereClause += generateWhereClause('users.age', ageLower, '>=')
    }
    if (ageUpper) {
      whereClause += generateWhereClause('users.age', ageUpper, '<=')
    }
    const [results, { rowCount }] = await db.query(
      `SELECT 
        users.id,
        users.first_name as "firstName", 
        users.last_name as "lastName",
        CASE WHEN users.id in (select followee_id from followers where follower_id = :uid) THEN true ELSE false END as "isFollowing"
      FROM 
        users
      INNER JOIN user_languages as languages ON
        users.id = languages.user_id
      WHERE 
        users.id > :after
      ${whereClause}
      LIMIT
        :limit  
      `, {
        replacements: {
          uid,
          after,
          limit
        },
        transaction
      }
    )
    const since = results[rowCount - 1] ? results[rowCount - 1].id : after
    return { users: results, usersCount: rowCount, since }
  }

  /**
   * Add user
   * @param { firstName, lastName, email, googleId, username }
   * @returns { modifiedCount }
   */
  const addUser = async ({ id, firstName, lastName, email, googleId, username }) => {
    if (!username) {
      return { modifiedCount: 0 }
    }
    const db = await makeDb()
    const [, modifiedCount] = await db.query(
      `INSERT INTO users(
        id,
        first_name,
        last_name,
        google_id,
        email,
        username
      ) VALUES (
        :id,
        :firstName,
        :lastName,
        :googleId,
        :email,
        :username
      )
      `, {
        replacements: {
          id,
          firstName,
          lastName,
          googleId,
          username,
          email
        }
      }
    )
    return { modifiedCount }
  }

  /**
   * Retrieve user by username
   * @param { username }
   * @returns { existingUser }
   */
  const findUser = async ({ username }) => {
    if (!username) {
      return { existingUser: null }
    }
    const db = await makeDb()
    const [[{ ...existingUser }]] = await db.query(
      `SELECT 
        id as "id", 
        first_name as "firstName", 
        last_name as "lastName",
        concat(first_name, ' ', last_name) as "name"
      FROM 
        users 
      WHERE username = :username`, {
        replacements: {
          username
        }
      }
    )
    return { existingUser }
  }

  /**
   * Retrieve Profile information by uid
   * @param { uid }
   * @returns { profile }
   */
  const fetchProfile = async ({ uid }, transaction) => {
    if (!uid) {
      return { profile: null }
    }
    const db = await makeDb()
    const [[{ ...userDetails } = {}]] = await db.query(
      `
      SELECT
        u.id,
        u.first_name as "firstName",
        u.last_name as "lastName",
        u.about,
        u.tagline,
        u.views,
        u.username,
        u.pp,
        u.profile_percentage as "profilePercentage",
        u.category_id as "categoryId",
        u.age,
        u.gender,
        u.city,
        u.occupation,
        u.certification,
        u.experience,
        count(case when followers.follower_id = :uid then 1 else null end) as "followeesCount",
        count(case when followers.followee_id = :uid then 1 else null end) as "followersCount"
      FROM
        users as u
      FULL OUTER JOIN followers as followers ON
        followers.follower_id = u.id or followers.followee_id = u.id
      WHERE 
        u.id = :uid
      GROUP BY
        u.id,
        u.first_name,
        u.last_name,
        u.about,
        u.tagline,
        u.views,
        u.username,
        u.pp,
        u.profile_percentage, 
        u.category_id, 
        u.age, 
        u.gender, 
        u.city,
        u.occupation, 
        u.certification,
        u.experience;
      `, {
        replacements: {
          uid
        },
        transaction
      }
    )
    const profile = { ...userDetails }
    return { profile }
  }

  /**
   * Retrieve fields required to calculate profile percentage by userid
   * @param { uid }
   * @returns { userInfo }
   */
  const fetchProfilePercentage = async ({ uid }) => {
    const db = await makeDb()
    const [[{ ...userInfo }]] = await db.query(
      `SELECT 
        users.username, 
        users.tagline, 
        users.about, 
        users.age, 
        users.pp, 
        users.certification, 
        users.experience, 
        count(distinct user_videos.id) as userVideosCount, 
        count(distinct user_photos.id) as userPhotosCount, 
        count(distinct posts.id) as userPostsCount,
        CASE WHEN social.user_id = :uid THEN 'true' else 'false' END as socialLinksCount
      FROM
        users 
      FULL OUTER JOIN user_videos ON
        users.id = user_videos.user_id
      FULL OUTER JOIN user_photos ON
        users.id = user_photos.user_id
      FULL OUTER JOIN posts ON
        posts.creator_id = users.id
      FULL OUTER JOIN social ON
        social.user_id = users.id
      WHERE
        users.id = :uid
      GROUP BY
        users.username, 
        users.tagline,
        users.about, 
        users.age, 
        users.pp, 
        users.certification,
        users.experience, 
        social.user_id`, {
        replacements: {
          uid
        }
      }
    )
    return { userInfo }
  }

  /**
   * Check if user exists
   * @param {id}
   * @returns {user}
   */
  const userExists = async ({ id }) => {
    const db = await makeDb()
    const [[{ ...user } = {}]] = await db.query(
      `SELECT 
        id
      FROM 
        users 
      WHERE id = :id`, {
        replacements: {
          id
        }
      }
    )
    return { user: Object.keys(user).length ? user : null }
  }

  /**
   * Check if user exists
   * @param {id}
   * @returns {user}
   */
  const userExistsByGoogleId = async ({ id }) => {
    const db = await makeDb()
    const [[{ ...existingUser } = {}]] = await db.query(
      `SELECT 
        id,
        is_profile_complete as "profileComplete"
      FROM 
        users
      WHERE google_id = :id`, {
        replacements: {
          id
        }
      }
    )
    return { existingUser: Object.keys(existingUser).length ? existingUser : null }
  }

  /**
   * Retrieve users with substring username
   * @param { after, limit, username }
   * @returns { users, usersCount, since }
   */
  const findUsersBySubstring = async ({ after = DEFAULT_AFTER, limit = DEFAULT_LIMIT, username }) => {
    const db = await makeDb()
    username = username.replace(/['"]+/g, '')
    const [results, { rowCount }] = await db.query(
      `SELECT 
        users.id,
        users.first_name as "firstName", 
        users.last_name as "lastName" 
      FROM 
        users
      WHERE 
        users.id > :after
      AND
        username like '%${username}%'
      LIMIT
        :limit  
      `, {
        replacements: {
          after,
          limit
        }
      }
    )
    const since = results[rowCount - 1] ? results[rowCount - 1].id : after
    return { users: results, usersCount: rowCount, since }
  }

  /**
   * Retrieve users with firstName
   * @param { after, limit, firstName }
   * @returns { users, usersCount, since }
   */
  const findUsersByFirstNameOrLastName = async ({ after = DEFAULT_AFTER, limit = DEFAULT_LIMIT, queryString }, transaction) => {
    const db = await makeDb()
    queryString = queryString.replace(/['"]+/g, '')
    const [results, { rowCount }] = await db.query(
      `SELECT 
        users.id,
        users.first_name as "firstName", 
        users.last_name as "lastName" 
      FROM 
        users
      WHERE 
        users.id > :after
      AND
        CONCAT(users.first_name, users.last_name) like '%${queryString}%'
      LIMIT
        :limit  
      `, {
        replacements: {
          after,
          limit
        },
        transaction
      }
    )
    const since = results[rowCount - 1] ? results[rowCount - 1].id : after
    return { users: results, usersCount: rowCount, since }
  }

  /**
   * Check if username exists already
   * @param { username }
   * @returns { exists }
   */
  const checkUsernameExists = async ({ username }, transaction) => {
    const db = await makeDb()
    const [[{ count = '0' }]] = await db.query(
      `SELECT 
        count(id)
      FROM 
        users 
      WHERE username = :username`, {
        replacements: {
          username
        },
        transaction
      }
    )
    return { exists: parseInt(count) > 0 }
  }

  const increaseProfileViews = async ({ userId }, transaction) => {
    const db = await makeDb()
    const [, { rowCount }] = await db.query(
      `UPDATE 
        users 
      SET 
        views = views + 1 
      WHERE 
        id = :userId`, {
        replacements: {
          userId
        },
        transaction
      })
    return { rowCount }
  }

  return Object.freeze({
    findByIdAndMobile,
    findByMobile,
    findUsers,
    addUser,
    findUser,
    fetchProfile,
    fetchProfilePercentage,
    userExists,
    findUsersBySubstring,
    findUsersByFirstNameOrLastName,
    updateProfile,
    completeProfile,
    checkUsernameExists,
    increaseProfileViews,
    userExistsByGoogleId
  })
}

export default makeUsersDb
