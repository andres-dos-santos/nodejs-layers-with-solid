/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { type Express } from 'express'

import type { API } from '../../api'
import type { Route } from './route.ts'

export class APIExpress implements API {
  private app: Express

  private constructor(routes: Route[]) {
    this.app = express()

    this.app.use(express.json())

    this.addRoutes(routes)
  }

  public static create(routes: Route[]) {
    return new APIExpress(routes)
  }

  private addRoutes(routes: Route[]) {
    routes.forEach((route) => {
      const path = route.getPath()
      const method = route.getMethod()
      const handler = route.getHandler()

      this.app[method](path, handler)
    })
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server running on port`, port)

      this.listRoutes()
    })
  }

  private listRoutes() {
    const routes = this.app._router.stack
      .filter((route: any) => route.route)
      .map((route: any) => ({
        path: route.route.path,
        method: route.route.stack[0].method,
      }))

    console.log(routes)
  }
}
