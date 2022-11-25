const { HttpStatusCodes } = require('../constants/httpStatusCodes');

class ConfigurationError extends Error {
	constructor(message) {
		super();
		Object.setPrototypeOf(this, ConfigurationError.prototype);

		this.status = HttpStatusCodes.InternalServerError;
		this.name = this.constructor.name;
		this.message = message ? message : '';
	}
}

class UnauthorizedError extends Error {
	constructor(message) {
		super();
		Object.setPrototypeOf(this, UnauthorizedError.prototype);

		this.status = HttpStatusCodes.Forbidden;
		this.name = this.constructor.name;
		this.message = message ? message : '';
	}
}

class UnauthenticatedError extends Error {
	constructor(message) {
		super();
		Object.setPrototypeOf(this, UnauthenticatedError.prototype);

		this.status = HttpStatusCodes.Unauthorized;
		this.name = this.constructor.name;
		this.message = message ? message : '';
	}
}

class InternalServerError extends Error {
	constructor(message, error) {
		super();
		Object.setPrototypeOf(this, InternalServerError.prototype);

		this.status = HttpStatusCodes.InternalServerError;
		this.name = this.constructor.name;
		this.message = message ? message : '';
		this.error = error;
	}
}

class BadRequestError extends Error {
	constructor(message) {
		super();
		Object.setPrototypeOf(this, BadRequestError.prototype);

		this.status = HttpStatusCodes.BadRequest;
		this.name = this.constructor.name;
		this.message = message ? message : '';
	}
}

class ValidationError extends Error {
	constructor(message, error) {
		super();
		Object.setPrototypeOf(this, ValidationError.prototype);

		this.status = HttpStatusCodes.UnprocessableEntity;
		this.name = this.constructor.name;
		this.message = message ? message : '';
		this.errors = error && Array.isArray(error) ? error.map((d) => d) : [];
	}
}

class NotFoundError extends Error {
	constructor(message) {
		super();
		Object.setPrototypeOf(this, NotFoundError.prototype);

		this.status = HttpStatusCodes.NotFound;
		this.name = this.constructor.name;
		this.message = message ? message : '';
	}
}

class MappingError extends Error {
	constructor(message) {
		super();
		Object.setPrototypeOf(this, MappingError.prototype);

		this.status = HttpStatusCodes.InternalServerError;
		this.name = this.constructor.name;
		this.message = message ? message : '';
	}
}

module.exports = {
	ConfigurationError,
	UnauthorizedError,
	UnauthenticatedError,
	InternalServerError,
	BadRequestError,
	ValidationError,
	NotFoundError,
	MappingError,
};
