/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const PredictionsLazyImport = createFileRoute('/predictions')()
const LoginLazyImport = createFileRoute('/login')()
const FixturesLazyImport = createFileRoute('/fixtures')()
const DashboardLazyImport = createFileRoute('/dashboard')()
const IndexLazyImport = createFileRoute('/')()
const AdminIndexLazyImport = createFileRoute('/admin/')()
const AdminEntityIndexLazyImport = createFileRoute('/admin/$entity/')()

// Create/Update Routes

const PredictionsLazyRoute = PredictionsLazyImport.update({
  path: '/predictions',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/predictions.lazy').then((d) => d.Route))

const LoginLazyRoute = LoginLazyImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login.lazy').then((d) => d.Route))

const FixturesLazyRoute = FixturesLazyImport.update({
  path: '/fixtures',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/fixtures.lazy').then((d) => d.Route))

const DashboardLazyRoute = DashboardLazyImport.update({
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/dashboard.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const AdminIndexLazyRoute = AdminIndexLazyImport.update({
  path: '/admin/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/admin/index.lazy').then((d) => d.Route))

const AdminEntityIndexLazyRoute = AdminEntityIndexLazyImport.update({
  path: '/admin/$entity/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/admin/$entity/index.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      preLoaderRoute: typeof DashboardLazyImport
      parentRoute: typeof rootRoute
    }
    '/fixtures': {
      preLoaderRoute: typeof FixturesLazyImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/predictions': {
      preLoaderRoute: typeof PredictionsLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/': {
      preLoaderRoute: typeof AdminIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/$entity/': {
      preLoaderRoute: typeof AdminEntityIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  DashboardLazyRoute,
  FixturesLazyRoute,
  LoginLazyRoute,
  PredictionsLazyRoute,
  AdminIndexLazyRoute,
  AdminEntityIndexLazyRoute,
])

/* prettier-ignore-end */
