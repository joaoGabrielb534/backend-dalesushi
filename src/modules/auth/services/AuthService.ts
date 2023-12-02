import { compareSync } from 'bcryptjs'
import prisma from '../../../config/Prisma'
import { AppError } from '../../../errors/AppError'
import { sign } from 'jsonwebtoken'

interface IRequest {
  email: string
  password: string
}

class AuthService {
  async loginEmployee({ email, password }: IRequest) {
    const employee = await prisma.employee.findUnique({
      where: {
        email,
      },
    })

    if (!employee) {
      throw new AppError('Client/Employee not found', 401)
    }

    const decryptedPassword = compareSync(password, employee?.password)

    if (!decryptedPassword) {
      throw new AppError('Client/Employee not found', 401)
    }

    const JWT_SECRET = process.env.JWT_SECRET as string

    const payload = {
      id: employee.id,
      role: employee.role,
    }

    const token = sign(payload, JWT_SECRET, {
      expiresIn: '1d',
      subject: employee.id,
    })

    return {
      token,
    }
  }

  async loginClient({ email, password }: IRequest) {
    const client = await prisma.client.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        avatar: true,
        cart: {
          select: {
            id: true,
            orders: {
              select: {
                id: true,
              },
              where: {
                finalized: false,
              },
            },
          },
        },
      },
    })

    if (!client) {
      throw new AppError('Client/Employee not found', 401)
    }

    const decryptedPassword = compareSync(password, client.password)

    if (!decryptedPassword) {
      throw new AppError('Client/Employee not found', 401)
    }

    const payload = {
      id: client.id,
    }

    const JWT_SECRET = process.env.JWT_SECRET as string

    const token = sign(payload, JWT_SECRET, {
      expiresIn: '7d',
      subject: client.id,
    })

    return {
      id: client.id,
      name: client.name,
      email: client.email,
      orderId: client.cart?.orders[0].id,
      cartId: client.cart?.id,
      avatar: client.avatar,
      token,
    }
  }
}

export default new AuthService()
