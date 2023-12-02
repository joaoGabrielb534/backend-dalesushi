import { Request, Response } from 'express'
import { z } from 'zod'
import AuthService from '../services/AuthService'

class AuthController {
  async authEmployee(req: Request, res: Response) {
    const AuthSchema = z.object({
      email: z.string().email().nonempty(),
      password: z.string().nonempty(),
    })

    const data = AuthSchema.parse(req.body)

    const authToken = await AuthService.loginEmployee(data)

    return res.status(200).json(authToken)
  }

  async authClient(req: Request, res: Response) {
    const AuthSchema = z.object({
      email: z.string().email().nonempty(),
      password: z.string().nonempty(),
    })

    const data = AuthSchema.parse(req.body)

    const response = await AuthService.loginClient(data)

    return res.status(200).json(response)
  }
}

export default new AuthController()
