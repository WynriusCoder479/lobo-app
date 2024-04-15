import { StatusCodes } from 'http-status-codes'

import { User } from '@/api/user/user.model'
import { userRepository } from '@/api/user/user.repository'
import { ServiceResponse } from '@/common/models/service-response'
import { logger } from '@/server'

export const userService = {
	// Retrieves all users from the database
	findAll: async (): Promise<ServiceResponse<User[] | null>> => {
		try {
			const users = await userRepository.findAllAsync()
			if (!users)
				return {
					success: false,
					status: 'Failed',
					message: 'User not found',
					statusCode: StatusCodes.NOT_FOUND
				}

			return {
				success: true,
				status: 'Success',
				statusCode: StatusCodes.OK,
				message: 'Get users successfully',
				data: users
			}
		} catch (err) {
			logger.error(err)
			return {
				success: false,
				status: 'Failed',
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message: 'Internal server error'
			}
		}
	},

	// Retrieves a single user by their ID
	findById: async (id: number): Promise<ServiceResponse<User | null>> => {
		try {
			const user = await userRepository.findByIdAsync(id)
			if (!user)
				return {
					success: false,
					status: 'Failed',
					statusCode: StatusCodes.NOT_FOUND,
					message: 'User not found'
				}

			return {
				success: true,
				status: 'Failed',
				statusCode: StatusCodes.OK,
				message: 'Get user successfully',
				data: user
			}
		} catch (err) {
			logger.error(err)
			return {
				success: false,
				status: 'Failed',
				statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				message: 'Internal server error'
			}
		}
	}
}
