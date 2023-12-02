import { Request, Response } from 'express'
import { z } from 'zod'
import CreateEmployeeService from '../services/CreateEmployeeService'
import GetEmployeeService from '../services/GetEmployeeService'
import UpdateEmployeeService from '../services/UpdateEmployeeService'
import DeleteEmployeeService from '../services/DeleteEmployeeService'
import ListEmployeeService from '../services/ListEmployeeService'

class EmployeeController {
  async index(req: Request, res: Response) {
    const employees = await ListEmployeeService.execute()

    return res.status(200).json(employees)
  }

  async create(req: Request, res: Response) {
    const EmployeeSchema = z.object({
      name: z.string().nonempty(),
      birthday: z
        .string()
        .nonempty()
        .transform((element) => new Date(element)),
      cpf: z.string().nonempty(),
      email: z.string().email().nonempty(),
      password: z.string().nonempty(),
    })

    const data = EmployeeSchema.parse(req.body)

    const user = await CreateEmployeeService.execute(data)

    return res.status(201).json(user)
  }

  async show(req: Request, res: Response) {
    const id = req.userId

    const employee = await GetEmployeeService.execute({ id })

    return res.status(200).json(employee)
  }

  async update(req: Request, res: Response) {
    const EmployeeSchema = z.object({
      name: z.string().optional(),
      cpf: z.string().optional(),
      birthday: z
        .string()
        .transform((element) => new Date(element))
        .optional(),
      email: z.string().optional(),
      password: z.string().optional(),
    })

    const FindSchema = z.object({
      id: z.string().cuid(),
    })

    const { name, cpf, birthday, email, password } = EmployeeSchema.parse(
      req.body,
    )

    const { id } = FindSchema.parse(req.params)

    const employee = await UpdateEmployeeService.execute({
      id,
      name,
      birthday,
      cpf,
      email,
      password,
    })

    return res.status(200).json(employee)
  }

  async delete(req: Request, res: Response) {
    const EmployeeSchema = z.object({
      id: z.string().cuid().nonempty(),
    })

    const { id } = EmployeeSchema.parse(req.params)

    const employee = await DeleteEmployeeService.execute({ id })

    return res.status(200).json(employee)
  }
}

export default new EmployeeController()
