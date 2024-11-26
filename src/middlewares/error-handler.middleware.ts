import { Response } from 'express'
import { ErrorCatch } from '../interfaces/error.interface'
import { error } from '../utils/response.uitl'

export const catchAsError = (err: ErrorCatch, _: Request, response: Response): void => {
	if (typeof err === 'string') {
		response.send(error(response, null, 400, err))
	} else {
		let message = 'unknown-error'

		if (err.status >= 400 && err.status <= 500) {
			message = 'client-error'
		} else {
			message = 'server-error'
		}

		response.status(err.status || 500)
		response.send(error(response, null, err.status, message))
	}
}
