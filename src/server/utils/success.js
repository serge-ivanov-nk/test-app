'use strict';
import { RESPONSE } from './constant';

const { STATUS, RESULT, SUCCESS } = RESPONSE;

const Success = (res, result) => res.status(200).json(result);

export { Success };
