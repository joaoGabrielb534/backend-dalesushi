import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors/AppError'

export function verifyEmployee(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const role = req.role

  if (role === 'EMPLOYEE') {
    return next()
  }

  throw new AppError('Private page for employees', 401)
}
