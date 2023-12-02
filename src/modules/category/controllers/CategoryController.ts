import { Request, Response } from 'express'
import { z } from 'zod'
import CreateCategoryService from '../services/CreateCategoryService'
import GetCategoryService from '../services/GetCategoryService'
import UpdateCategoryService from '../services/UpdateCategoryService'
import DeleteCategoryService from '../services/DeleteCategoryService'
import ListCategoryService from '../services/ListCategoryService'

class CategoryController {
  async index(req: Request, res: Response) {
    const categories = await ListCategoryService.execute()
    return res.status(200).json(categories)
  }

  async create(req: Request, res: Response) {
    const CategorySchema = z.object({
      name: z.string().nonempty(),
    })

    const { name } = CategorySchema.parse(req.body)

    const category = await CreateCategoryService.execute({ name })

    return res.status(201).json(category)
  }

  async show(req: Request, res: Response) {
    const CategorySchema = z.object({
      id: z.string().cuid(),
    })

    const { id } = CategorySchema.parse(req.params)

    const category = await GetCategoryService.execute({ id })

    return res.status(200).json(category)
  }

  async update(req: Request, res: Response) {
    const FindSchema = z.object({
      id: z.string().cuid(),
    })

    const CategorySchema = z.object({
      name: z.string().optional(),
    })

    const { id } = FindSchema.parse(req.params)
    const { name } = CategorySchema.parse(req.body)

    const category = await UpdateCategoryService.execute({ id, name })

    return res.status(200).json(category)
  }

  async delete(req: Request, res: Response) {
    const FindSchema = z.object({
      id: z.string().cuid(),
    })

    const { id } = FindSchema.parse(req.params)

    const category = await DeleteCategoryService.execute({ id })

    return res.status(200).json(category)
  }
}

export default new CategoryController()
