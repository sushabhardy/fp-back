import express from 'express'
import makeAuthRoutes from './auth.js'
import makeNewsfeedRoutes from './newsfeed.js'
import makeUsersRoutes from './users.js'
import makeAuditionsRoutes from './auditions.js'

let router = express.Router()

router = makeUsersRoutes({ router })
router = makeAuthRoutes({ router })
router = makeNewsfeedRoutes({ router })
router = makeAuditionsRoutes({ router })

export default router
