import type { Product } from '../../../domain/product/entity/product.entity.ts'
import type { ProductGateway } from '../../../domain/product/gateway/product.gateway.ts'
import type { UseCase } from '../../use-case.ts'

export type ListProductInputDTO = void

export type ListProductOutputDTO = {
  products: {
    id: string
    name: string
    price: number
    quantity: number
  }[]
}

export class ListProductUseCase
  implements UseCase<ListProductInputDTO, ListProductOutputDTO>
{
  private constructor(private readonly productGateway: ProductGateway) {}

  public static create(productGateway: ProductGateway) {
    return new ListProductUseCase(productGateway)
  }

  public async execute(): Promise<ListProductOutputDTO> {
    const aProducts = await this.productGateway.list()

    const output = this.presentOutput(aProducts)

    return output
  }

  private presentOutput(products: Product[]): ListProductOutputDTO {
    return {
      products: products.map((product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
        }
      }),
    }
  }
}
