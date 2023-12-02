import { Request, Response } from 'express'
import { z } from 'zod'
import CreateClientService from '../services/CreateClientService'
import UpdateClientService from '../services/UpdateClientService'
import DeleteClientService from '../services/DeleteClientService'
import ListClientService from '../services/ListClientService'
import GetClientService from '../services/GetClientService'
import { AppError } from '../../../errors/AppError'
import { getFileStream, uploadFile } from '../../../config/S3'
import SetAvatarClientService from '../services/SetAvatarClientService'

class ClientController {
  async index(req: Request, res: Response) {
    const clients = await ListClientService.execute()

    return res.status(200).json(clients)
  }

  async create(req: Request, res: Response) {
    const ClientSchema = z.object({
      name: z.string().nonempty(),
      birthday: z
        .string()
        .nonempty()
        .transform((element) => new Date(element)),
      cpf: z.string().nonempty(),
      email: z.string().email().nonempty(),
      password: z.string().nonempty(),
    })

    const data = ClientSchema.parse(req.body)

    const client = await CreateClientService.execute(data)

    return res.status(201).json(client)
  }

  async show(req: Request, res: Response) {
    const id = req.userId

    const client = await GetClientService.execute({ id })

    return res.status(200).json(client)
  }

  async update(req: Request, res: Response) {
    const FindSchema = z.object({
      id: z.string().cuid(),
    })

    const ClientSchema = z.object({
      name: z.string().optional(),
      cpf: z.string().optional(),
      birthday: z
        .string()
        .transform((element) => new Date(element))
        .optional(),
      email: z.string().optional(),
      password: z.string().optional(),
      oldPassword: z.string().optional(),
    })

    const { id } = FindSchema.parse(req.params)

    const { name, cpf, birthday, email, password, oldPassword } =
      ClientSchema.parse(req.body)

    const client = await UpdateClientService.execute({
      id,
      name,
      birthday,
      cpf,
      email,
      password,
      oldPassword,
    })

    return res.status(200).json(client)
  }

  async delete(req: Request, res: Response) {
    const FindSchema = z.object({
      id: z.string().cuid(),
    })

    const { id } = FindSchema.parse(req.params)

    const client = await DeleteClientService.execute({ id })

    return res.status(200).json(client)
  }

  async setAvatar(req: Request, res: Response) {
    const id = req.userId

    if (!req.file) {
      throw new AppError('Avatar is required', 422)
    }

    const avatar = req.file.filename

    const response = await uploadFile(req.file, avatar)

    const avatarUser = await SetAvatarClientService.execute({
      id,
      avatar: response.Key,
    })

    res.status(201).json(avatarUser.avatar)
  }

  async getAvatar(req: Request, res: Response) {
    const id = req.userId

    const response = await GetClientService.execute({ id })

    const avatar = getFileStream(response.avatar as string)

    return avatar.pipe(res)
  }
}

export default new ClientController()
