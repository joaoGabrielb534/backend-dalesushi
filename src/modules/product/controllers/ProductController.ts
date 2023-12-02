import { Request, Response } from 'express'
import { z } from 'zod'
import CreateProductService from '../services/CreateProductService'
import GetProductService from '../services/GetProductService'
import UpdateProductService from '../services/UpdateProductService'
import DeleteProductService from '../services/DeleteProductService'
import ListProductService from '../services/ListProductService'
import DiscountByCategoryService from '../services/DiscountByCategoryService'
import { AppError } from '../../../errors/AppError'

class ProductController {
  async index(req: Request, res: Response) {
    const products = await ListProductService.execute()
    return res.status(200).json(products)
  }

  async create(req: Request, res: Response) {
    const ProductSchema = z.object({
      name: z.string().nonempty(),
      description: z.string().nonempty(),
      price: z.string().transform((value) => Number(value)),
      categoryId: z.string().cuid(),
      barCode: z.string().nonempty(),
      amount: z.string().transform((value) => Number(value)),
      manufacturingDate: z
        .string()
        .nonempty()
        .transform((element) => new Date(element)),
      expirationDate: z
        .string()
        .nonempty()
        .transform((element) => new Date(element)),
    })

    if (!req.file) {
      throw new AppError('Image is required', 422)
    }

    const data = ProductSchema.parse(req.body)

    const { filename: imageUrl } = req.file

    const product = await CreateProductService.execute({
      imageUrl,
      ...data,
    })

    return res.status(201).json(product)
  }

  async show(req: Request, res: Response) {
    const FindSchema = z.object({
      id: z.string().cuid(),
    })

    const { id } = FindSchema.parse(req.params)

    const product = await GetProductService.execute({ id })

    return res.status(200).json(product)
  }

  async update(req: Request, res: Response) {
    const FindSchema = z.object({
      id: z.string().cuid(),
    })
    const ProductSchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      price: z.number().nonnegative().optional(),
      categoryId: z.string().cuid().optional(),
      barCode: z.string().optional(),
      manufacturingDate: z
        .string()
        .transform((element) => new Date(element))
        .optional(),
      expirationDate: z
        .string()
        .transform((element) => new Date(element))
        .optional(),
    })

    const { id } = FindSchema.parse(req.params)
    const data = ProductSchema.parse(req.body)

    const product = await UpdateProductService.execute({ id, ...data })

    return res.status(200).json(product)
  }

  async delete(req: Request, res: Response) {
    const FindSchema = z.object({
      id: z.string().cuid(),
    })

    const { id } = FindSchema.parse(req.params)

    const product = await DeleteProductService.execute({ id })

    return res.status(200).json(product)
  }

  async discount(req: Request, res: Response) {
    const DiscountSchema = z.object({
      percentage: z.number().nonnegative(),
    })

    const FindSchema = z.object({
      categoryId: z.string().cuid().nonempty(),
    })

    const { categoryId } = FindSchema.parse(req.params)

    const { percentage } = DiscountSchema.parse(req.body)

    const productsWithDiscount = await DiscountByCategoryService.execute({
      categoryId,
      percentage,
    })

    return res.status(200).json(productsWithDiscount)
  }
}

export default new ProductController()
