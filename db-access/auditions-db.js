import dotenv from 'dotenv'
dotenv.config()

const DEFAULT_AFTER = process.env.DEFAULT_AFTER
const DEFAULT_LIMIT = process.env.DEFAULT_LIMIT

/**
 * 'auditions' table handler
 * @param {makeDb}
 */
const makeAuditionsDb = ({ makeDb }) => {
  const generateWhereClause = (col, val, sign) => {
    return ` and ${col} ${sign} ${val}`
  }

  /**
   * Get auditions
   * @param {userId, after, limit, category, languages, city, gender, ageLower, ageUpper}
   * @returns { auditions, auditionsCount }
   */
  const getAuditions = async ({ userId, after = DEFAULT_AFTER, limit = DEFAULT_LIMIT, categoryId, languages, city, gender, ageLower, ageUpper }, transaction) => {
    const db = await makeDb()
    let whereClause = ''
    if (categoryId) {
      whereClause += generateWhereClause('aud.category_id', categoryId, '=')
    }
    if (languages) {
      whereClause += generateWhereClause('aud.languages', `(${languages.split(',').map(lang => `'${lang}'`).reduce((accumulator, current) => `${accumulator}, ${current}`)})`, 'in')
    }
    if (city) {
      whereClause += generateWhereClause('aud.city', `'${city}'`, '=')
    }
    if (gender) {
      whereClause += generateWhereClause('aud.gender', `'${gender}'`, '=')
    }
    if (ageLower) {
      whereClause += generateWhereClause('aud.age_lower', ageLower, '>=')
    }
    if (ageUpper) {
      whereClause += generateWhereClause('aud.age_upper', ageUpper, '<=')
    }
    const [results, { rowCount }] = await db.query(
      `
      SELECT 
        aud.title, 
        aud.city, 
        aud.description, 
        aud.salary, 
        aud.created_time as "createdTime",
        aud.updated_time as "updatedTime",
        aud.expiration_time as "expirationTime",
        concat(aud.age_lower, '-', aud.age_upper) as "ageGroup",
        aud.languages,
        aud.gender,
        false as "isApplied"
      FROM
        auditions aud
      LEFT JOIN
        applicants ap
      ON
        aud.id = ap.audition_id
      WHERE 
        aud.id > :after
        ${whereClause}
      LIMIT
        :limit  
        `, {
        replacements: {
          userId,
          after,
          limit
        },
        transaction
      }
    )
    return { auditions: results, auditionsCount: rowCount }
  }

  /**
   * Create a new audition
   * @param { id, title, description, createdTime, updatedTime, expirationTime, city, ageLower, ageUpper, salary, gender, languages, bannerUrl }
   * @returns { modifiedCount }
   */
  const addAudition = async ({
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
  }, transaction) => {
    const db = await makeDb()
    const [, modifiedCount] = await db.query(`
      INSERT INTO auditions(
        id,
        title,
        description,
        created_time,
        updated_time,
        expiration_time,
        city,
        age_lower,
        age_upper,
        salary,
        gender,
        banner_url
      ) VALUES (
        :id,
        :title,
        :description,
        :createdTime,
        :updatedTime,
        :expirationTime,
        :city,
        :ageLower,
        :ageUpper,
        :salary,
        :gender,
        :bannerUrl
      )
    `, {
      replacements: {
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
        bannerUrl
      },
      transaction
    })
    return { modifiedCount }
  }

  /**
   * Get recent auditions
   * @param {after, limit}
   * @returns {auditions, auditionsCount, since}
   */
  const getRecentAuditions = async ({ userId, after = DEFAULT_AFTER, limit = DEFAULT_LIMIT }, transaction) => {
    const db = await makeDb()
    const [results, { rowCount }] = await db.query(
    `SELECT 
      aud.title, 
      aud.city, 
      aud.description, 
      aud.salary, 
      aud.created_time as "createdTime",
      aud.updated_time as "updatedTime",
      aud.expiration_time as "expirationTime",
      concat(aud.age_lower, '-', aud.age_upper) as "ageGroup",
      aud.languages,
      aud.gender,
    CASE 
      WHEN ap.applicant_id = :userId
        THEN true
      ELSE false
    END
      as "isApplied"
    FROM
      auditions aud
    LEFT JOIN
      applicants ap
    ON
      aud.id = ap.audition_id  
    WHERE
      aud.id > :after
    ORDER BY
      created_time DESC
    LIMIT :limit
    `, {
      replacements: {
        userId,
        after,
        limit
      },
      transaction
    }
    )
    // 'id' of the last record will be used for 'after' value
    const since = results[rowCount - 1] ? results[rowCount - 1].id : after
    return { auditions: results, auditionsCount: rowCount, since }
  }

  /**
   * Get auditions posted by user
   * @param {userId, after, limit}
   * @returns {auditions, auditionsCount, since}
   */
  const getPostedAuditions = async ({ userId, after = DEFAULT_AFTER, limit = DEFAULT_LIMIT }, transaction) => {
    if (!userId) {
      return { auditions: [], auditionsCount: 0 }
    }
    const db = await makeDb()
    const [results, { rowCount }] = await db.query(
    `SELECT 
      aud.title, 
      aud.city, 
      aud.description, 
      aud.salary, 
      aud.created_time as "createdTime",
      aud.updated_time as "updatedTime",
      aud.expiration_time as "expirationTime",
      concat(aud.age_lower, '-', aud.age_upper) as "ageGroup",
      aud.languages,
      aud.gender
    FROM
      auditions aud
    WHERE
      aud.creator_id = :userId and aud.id > :after
    ORDER BY
      created_time DESC
    LIMIT :limit
    `, {
      replacements: {
        userId,
        after,
        limit
      },
      transaction
    }
    )

    // 'id' of the last record will be used for 'after' value
    const since = results[rowCount - 1] ? results[rowCount - 1].id : after
    return { auditions: results, auditionsCount: rowCount, since }
  }

  /**
   * Get auditions applied by user
   * @param {userId, after, limit}
   * @returns {auditions, auditionsCount, since}
   */
  const getAppliedAuditions = async ({ userId, after = DEFAULT_AFTER, limit = DEFAULT_LIMIT }, transaction) => {
    if (!userId) {
      return { auditions: [], auditionsCount: 0 }
    }
    const db = await makeDb()
    const [results, { rowCount }] = await db.query(
    `SELECT 
      aud.title, 
      aud.city, 
      aud.description, 
      aud.salary, 
      aud.created_time as "createdTime",
      aud.updated_time as "updatedTime",
      aud.expiration_time as "expirationTime",
      concat(aud.age_lower, '-', aud.age_upper) as "ageGroup",
      aud.languages,
      aud.gender
    FROM
      auditions aud
    INNER JOIN
      applicants
    ON
      applicants.audition_id = aud.id
    WHERE
      applicants.applicant_id = :userId and aud.id > :after
    ORDER BY
      created_time DESC
    LIMIT :limit
    `, {
      replacements: {
        userId,
        after,
        limit
      },
      transaction
    }
    )

    // 'id' of the last record will be used for 'after' value
    const since = results[rowCount - 1] ? results[rowCount - 1].id : after
    return { auditions: results, auditionsCount: rowCount, since }
  }

  return Object.freeze({
    getAuditions,
    addAudition,
    getRecentAuditions,
    getAppliedAuditions,
    getPostedAuditions
  })
}

export default makeAuditionsDb
