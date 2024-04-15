import { z } from 'zod'

const statusEnum = z.enum(['Success', 'Failed', 'Email-Sent'])
type StatusEnumType = z.infer<typeof statusEnum>

const authTokenSchema = z.object({
	accessToken: z.string(),
	refreshToken: z.string()
})
type AuthTokenSchema = z.infer<typeof authTokenSchema>

export type ServiceResponse<T = null> = {
	success: boolean
	status: StatusEnumType
	statusCode: number
	message?: string
	data?: T
	auth?: AuthTokenSchema
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
	z.object({
		success: z.boolean(),
		status: statusEnum.default('Success'),
		statusCode: z.number(),
		message: z.string().optional(),
		data: dataSchema.optional(),
		auth: authTokenSchema.optional()
	})
