import { Request, Response } from 'express'

import { userService } from '@/api/user/user.service'
import { handleServiceResponse } from '@/common/utils/http-handlers'

export const userController = {
	findAllUser: async (_req: Request, res: Response) => {
		const serviceResponse = await userService.findAll()
		handleServiceResponse(serviceResponse, res)
	},
	findUserById: async (req: Request, res: Response) => {
		const id = parseInt(req.params.id as string, 10)
		const serviceResponse = await userService.findById(id)
		handleServiceResponse(serviceResponse, res)
	}
}
