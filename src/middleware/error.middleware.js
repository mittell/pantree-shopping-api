const { Error } = require('mongoose');
const { MongoError } = require('mongodb');
const {
	BadRequestError,
	InternalServerError,
	UnauthenticatedError,
	UnauthorizedError,
	ValidationError,
	MappingError,
	NotFoundError,
} = require('../helpers/errors');

async function handleInvalidUrl(req, res) {
	res.status(404).json({
		status: 404,
		message: 'Invalid route.',
		...(req.method ? { request: req.method } : {}),
		...(req.path ? { path: req.path } : {}),
	});
}

async function handleErrors(error, _req, res, _next) {
	if (
		error instanceof UnauthorizedError ||
		error instanceof UnauthenticatedError ||
		error instanceof BadRequestError ||
		error instanceof MappingError
	) {
		res.status(error.status).json({
			status: error.status,
			name: error.name,
			...(error.message ? { message: error.message } : {}),
		});
	} else if (error instanceof InternalServerError) {
		res.status(error.status).json({
			status: error.status,
			name: error.name,
			...(error.message ? { message: error.message } : {}),
		});
	} else if (error instanceof ValidationError) {
		res.status(error.status).json({
			status: error.status,
			name: error.name,
			...(error.message ? { message: error.message } : {}),
			...(error.errors.length ? { details: error.errors } : {}),
		});
	} else if (error instanceof Error.ValidationError) {
		res.status(406).json({
			status: 406,
			name: error.name,
			...(error.message
				? { message: Object.values(error.errors).map((e) => e.message) }
				: {}),
		});
	} else if (error instanceof MongoError) {
		res.status(500).json({
			status: 500,
			name: error.name,
			...(error.message ? { message: error.message } : {}),
		});
	} else if (error instanceof SyntaxError) {
		res.status(406).json({
			status: 406,
			name: error.name,
			...(error.message ? { message: 'Invalid JSON content' } : {}),
		});
	} else if (error instanceof TypeError) {
		res.status(500).json({
			status: 500,
			name: error.name,
			...(error.message ? { message: 'Unexpected Data Type' } : {}),
		});
	} else if (error instanceof NotFoundError) {
		res.status(404).json({
			status: 404,
			name: error.name,
			message: 'Not Found',
		});
	} else {
		res.status(error.status || 500).json({
			status: error.status || 500,
			name: error.name,
			message: 'Unhandled internal server error',
		});
	}
}

module.exports = { handleInvalidUrl, handleErrors };
