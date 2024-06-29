import type { Request, Response } from 'express'

import { HttpMethod, type Route } from './route'

import type {
  ListProductOutputDTO,
  ListProductUseCase,
} from '../../../../use-case/product/list/list-product.use-case'

export type ListProductResponseDTO = {
  products: {
    id: string
    name: string
    price: number
  }[]
}

export class ListProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listProductService: ListProductUseCase,
  ) {}

  public static create(listProductService: ListProductUseCase) {
    return new ListProductRoute('/products', HttpMethod.GET, listProductService)
  }

  public getPath(): string {
    return this.path
  }

  public getMethod(): HttpMethod {
    return this.method
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const output = await this.listProductService.execute()

      const responseJSON = this.present(output)

      response.status(200).json(responseJSON).send()
    }
  }

  private present(input: ListProductOutputDTO): ListProductResponseDTO {
    const response: ListProductResponseDTO = {
      products: input.products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    }

    return response
  }
}
