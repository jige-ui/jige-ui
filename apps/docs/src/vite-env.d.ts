/// <reference types="vite/client" />



declare module 'virtual:route-info' {
  const routeInfo: {
    path:string
    info: {
    [key: string]: any
    title: string
    updated: Date
    date: Date
  }}[]
  export default routeInfo
}

declare module 'virtual:pages' {
  import { RouteDefinition } from "@solidjs/router"
  const routes: RouteDefinition[]
  export default routes
}