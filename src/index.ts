import express, { Application } from 'express'
import { catchAsError } from './middlewares/error-handler.middleware'
import { logger } from './loggers/index.logger'

async function bootstrap() {
	const app: Application = express()
	const PORT = 3000

	app.use(express.json())

	app.get('/', (req, res) => {
		res.send(`Testing ELK Stack!`)

		logger.info({ message: 'Handle GET /' })
	})

	app.use(catchAsError)

	app.listen(PORT, () => {
		console.log(`Server is running at http://localhost:${PORT}`)
	})
}

;(async () => {
	try {
		await bootstrap()
	} catch (e) {
		console.log(e.message)
	}
})()
