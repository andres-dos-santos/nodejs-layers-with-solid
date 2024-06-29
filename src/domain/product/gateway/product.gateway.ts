import type { Product } from '../entity/product.entity.ts'

export interface ProductGateway {
  save(product: Product): Promise<void>

  list(): Promise<Product[]>
}
