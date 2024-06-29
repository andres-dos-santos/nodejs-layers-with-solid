import type { PrismaClient } from '@prisma/client'

import { Product } from '../../../../domain/product/entity/product.entity.ts'
import type { ProductGateway } from '../../../../domain/product/gateway/product.gateway.ts'

export class ProductRepositoryPrisma implements ProductGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new ProductRepositoryPrisma(prismaClient)
  }

  public async save(product: Product): Promise<void> {
    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    }

    await this.prismaClient.product.create({
      data,
    })
  }

  public async list(): Promise<Product[]> {
    const products = await this.prismaClient.product.findMany()

    const productList = products.map((product) => {
      return Product.with({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      })
    })

    return productList
  }
}
