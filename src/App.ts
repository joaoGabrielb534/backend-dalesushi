import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import 'express-async-errors'

import { AppError } from './errors/AppError'
import { ZodError } from 'zod'
import ClientRouter from './routes/ClientRouter'
import CategoryRouter from './routes/CategoryRouter'
import ProductRouter from './routes/ProductRouter'
import EmployeeRouter from './routes/EmployeeRouter'
import AuthRouter from './routes/AuthRouter'
import path from 'path'
import OrderRouter from './routes/OrderRouter'
import OrderProductRouter from './routes/OrderProductRouter'
import FavoriteRouter from './routes/FavoriteRouter'
import MessageRouter from './routes/MessageRouter'
import { createServer } from 'http'
import { Server } from 'socket.io'
import prisma from './config/Prisma'

const app = express()
app.use(cors())
app.use(express.json())

const server = createServer(app)

const io = new Server(server, { cors: { origin: '*' } })

app.use(
  '/api/products',
  express.static(path.resolve(__dirname, '../uploads/images')),
)

app.use('/api', [
  EmployeeRouter.getRouter,
  ClientRouter.getRouter,
  CategoryRouter.getRouter,
  ProductRouter.getRouter,
  AuthRouter.getRouter,
  OrderRouter.getRouter,
  OrderProductRouter.getRouter,
  FavoriteRouter.getRouter,
  MessageRouter.getRouter,
])

app.use(errorHandling)

async function errorHandling(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    })
  }

  if (err instanceof ZodError) {
    return res.status(422).json({
      status: 'error',
      message: err.errors,
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
}

io.on('connection', (socket) => {
  socket.on('send_message', async ({ content, userId }) => {
    await prisma.message.create({
      data: {
        content,
        clientId: userId,
      },
    })
  })
})

const PORT = Number(process.env.PORT) || 3333

server.listen(PORT, () => {
  console.log('Server started!🚀')
})
