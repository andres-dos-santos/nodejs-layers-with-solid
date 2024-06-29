import { APIExpress } from './infra/api/express/routes/api.express.ts'
import { CreateProductRoute } from './infra/api/express/routes/product/create-product.express.route.ts'
import { ListProductRoute } from './infra/api/express/routes/product/list-product.express.route.ts'
import { ProductRepositoryPrisma } from './infra/repositories/product/prisma/product.repository.ts'

import { prisma } from './package/prisma/prisma'

import { CreateProductUseCase } from './use-case/product/create/create-product.use-case.ts'
import { ListProductUseCase } from './use-case/product/list/list-product.use-case.ts'

function main() {
  const aRepository = ProductRepositoryPrisma.create(prisma)

  const createProductUseCase = CreateProductUseCase.create(aRepository)
  const listProductUseCase = ListProductUseCase.create(aRepository)

  const createRoute = CreateProductRoute.create(createProductUseCase)
  const listRoute = ListProductRoute.create(listProductUseCase)

  const port = 8000

  const api = APIExpress.create([createRoute, listRoute])

  api.start(port)
}

main()
