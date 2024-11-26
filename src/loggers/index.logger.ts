import { createLogger, format, Logger, LoggerOptions, transports } from 'winston'
import { ElasticsearchTransport } from 'winston-elasticsearch'

require('dotenv').config()

console.log(process.env.ELASTICSEARCH_HOST)

const esTransportOpts = {
	level: 'info',
	clientOpts: {
		node: process.env.ELASTICSEARCH_HOST,
		auth: {
			username: process.env.ELASTICSEARCH_USERNAME,
			password: process.env.ELASTICSEARCH_PASSWORD
		}
	},
	indexPrefix: 'express-logs'
}

export const logger: Logger = createLogger({
	level: 'info',
	format: format.combine(format.timestamp(), format.json()),
	transports: [new transports.Console(), new ElasticsearchTransport(esTransportOpts)]
} as LoggerOptions)
