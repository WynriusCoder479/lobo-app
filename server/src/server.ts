import cors from 'cors'
import express, { Express } from 'express'
import helmet from 'helmet'
import { pino } from 'pino'

import { userRouter } from '@/api/user/user.router'
import { openAPIRouter } from '@/api-docs/open-api-router'
import errorHandler from '@/common/middleware/error-handler.middleware'
import rateLimiter from '@/common/middleware/rate-limiter.middleware'
import requestLogger from '@/common/middleware/request-logger.middleware'
import { env } from '@/common/utils/env.config'

const logger = pino({ name: 'server start' })
const app: Express = express()

// Set the application to trust the reverse proxy
app.set('trust proxy', true)

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }))
app.use(helmet())
app.use(express.json())
app.use(rateLimiter)

// Request logging
app.use(requestLogger)

// Routes
app.use('/users', userRouter)

// Swagger UI
app.use(openAPIRouter)

// Error handlers
app.use(errorHandler())

export { app, logger }
