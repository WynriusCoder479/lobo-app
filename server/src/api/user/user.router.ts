import express, { Router } from 'express'

import { userController } from '@/api/user/user.controller'
import { GetUserSchema } from '@/api/user/user.model'
import { validateRequest } from '@/common/utils/http-handlers'

export const userRouter: Router = (() => {
	const router = express.Router()

	router.get('/', userController.findAllUser)

	router.get(
		'/:id',
		validateRequest(GetUserSchema),
		userController.findUserById
	)

	return router
})()
