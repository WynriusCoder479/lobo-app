import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ZodError, ZodSchema } from 'zod'

import { ServiceResponse } from '@/common/models/service-response'

export const handleServiceResponse = (
	serviceResponse: ServiceResponse<any>,
	response: Response
) => {
	return response.status(serviceResponse.statusCode).send(serviceResponse)
}

export const validateRequest =
	(schema: ZodSchema) =>
	(req: Request, res: Response<ServiceResponse>, next: NextFunction) => {
		try {
			schema.parse({ body: req.body, query: req.query, params: req.params })
			next()
		} catch (err) {
			const errorMessage = `Invalid input: ${(err as ZodError).errors.map(e => e.message).join(', ')}`

			res.status(StatusCodes.BAD_REQUEST).send({
				success: false,
				status: 'Failed',
				statusCode: StatusCodes.BAD_REQUEST,
				message: errorMessage
			})
		}
	}
