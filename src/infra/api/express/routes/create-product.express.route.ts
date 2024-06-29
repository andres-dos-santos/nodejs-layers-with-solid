import type { Request, Response } from 'express'

import { HttpMethod, type Route } from './route'

import type {
  CreateProductInputDTO,
  CreateProductUseCase,
} from '../../../../use-case/product/create/create-product.use-case'

export type CreateProductResponseDTO = {
  id: string
}

export class CreateProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createProductService: CreateProductUseCase,
  ) {}

  public static create(createProductService: CreateProductUseCase) {
    return new CreateProductRoute(
      '/products',
      HttpMethod.POST,
      createProductService,
    )
  }

  public getPath(): string {
    return this.path
  }

  public getMethod(): HttpMethod {
    return this.method
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const { name, price } = request.body

      const input: CreateProductInputDTO = {
        name,
        price,
      }

      const output: CreateProductResponseDTO =
        await this.createProductService.execute(input)

      const responseJSON = this.present(output)

      response.status(201).json(responseJSON).send()
    }
  }

  private present(input: CreateProductResponseDTO): CreateProductResponseDTO {
    const response = {
      id: input.id,
    }

    return response
  }
}
