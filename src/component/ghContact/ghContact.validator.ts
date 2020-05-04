import { body } from 'express-validator';

export const addValidator = [
  body('username').isString().notEmpty(),
];

export const deleteValidator = [
  body('id').isString().notEmpty()
];

export const editValidator = [
  body('id').isString().notEmpty(),
  body('name').if(body('name').exists()).isString().notEmpty(),
  body('avatarUrl').if(body('avatarUrl').exists()).isString().notEmpty(),
  body('bio').if(body('bio').exists()).isString().notEmpty(),
  body('email').if(body('email').exists()).notEmpty(),
  body('location').if(body('location').exists()).isString().notEmpty(),
];