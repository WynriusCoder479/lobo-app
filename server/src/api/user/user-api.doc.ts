import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { GetUserSchema, UserSchema } from '@/api/user/user.model'
import { createApiResponse } from '@/api-docs/open-api-response-builders'

export const userRegistry = new OpenAPIRegistry()

userRegistry.register('User', UserSchema)

userRegistry.registerPath({
	method: 'get',
	path: '/users',
	tags: ['User'],
	responses: createApiResponse(z.array(UserSchema), 'Success')
})

userRegistry.registerPath({
	method: 'get',
	path: '/users/{id}',
	tags: ['User'],
	request: { params: GetUserSchema.shape.params },
	responses: createApiResponse(UserSchema, 'Success')
})
