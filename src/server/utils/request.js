'use strict';
import { Router } from 'express';
import { Error } from './error';
import { Success } from './success';

export const GET = "get";
export const POST = "post";
export const DELETE = "delete";

export function methods(...methods) {
  return (target, name, descriptor) => {
    descriptor.__methods = methods;
    return descriptor;
  };
}

export function route(...uri) {
  return (target, name, descriptor) => {
    if (!target.router) {
      target.router = new Router();
    }

    const { __methods = [GET] } = descriptor;
    const cb = descriptor.value;

    descriptor.value = () => {
      __methods.forEach(method => uri.forEach(uri => target.router[method](uri, (req, res) => {
        let params = method == POST ? req.body : req.params;
        let promise = cb(params);


        if (!promise || typeof promise.then !== 'function') {
          promise = Promise.resolve(promise);
        }

        promise.then(
          result => Success(res, result),
          error => Error(res, error.code, error.message)
        );
      })));

      return target.router;
    };

    return descriptor;
  };
}
