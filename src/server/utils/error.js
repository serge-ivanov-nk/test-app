'use strict';
import { RESPONSE, ERRORS } from './constant';

const { STATUS, RESULT, ERROR } = RESPONSE;
const { NOT_FOUND, PAGE_NOT_FOUND, RESOURCE_NOT_FOUND, INTERNAL_ERROR } = ERRORS;

const Error   = (res, status, error) => res.status(status).json({
  [STATUS]: ERROR,
  [RESULT]: { error: error, code: status }
});

const NotFound = (res, message = NOT_FOUND) => Error(res, 404, message);
const PageNotFound = (res) => NotFound(res, PAGE_NOT_FOUND);
const ResourceNotFound = (res) => NotFound(res, RESOURCE_NOT_FOUND);
const InternalError = (res) => Error(res, 500, INTERNAL_ERROR);

export {
  Error,
  InternalError,
  NotFound,
  PageNotFound,
  ResourceNotFound
};
