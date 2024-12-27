/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as AppImport } from './routes/_app'
import { Route as IndexImport } from './routes/index'
import { Route as AppSettingsImport } from './routes/_app/settings'
import { Route as AppHomeImport } from './routes/_app/home'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AppRoute = AppImport.update({
  id: '/_app',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AppSettingsRoute = AppSettingsImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => AppRoute,
} as any)

const AppHomeRoute = AppHomeImport.update({
  id: '/home',
  path: '/home',
  getParentRoute: () => AppRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_app': {
      id: '/_app'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AppImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_app/home': {
      id: '/_app/home'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof AppHomeImport
      parentRoute: typeof AppImport
    }
    '/_app/settings': {
      id: '/_app/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof AppSettingsImport
      parentRoute: typeof AppImport
    }
  }
}

// Create and export the route tree

interface AppRouteChildren {
  AppHomeRoute: typeof AppHomeRoute
  AppSettingsRoute: typeof AppSettingsRoute
}

const AppRouteChildren: AppRouteChildren = {
  AppHomeRoute: AppHomeRoute,
  AppSettingsRoute: AppSettingsRoute,
}

const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AppRouteWithChildren
  '/login': typeof LoginRoute
  '/home': typeof AppHomeRoute
  '/settings': typeof AppSettingsRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AppRouteWithChildren
  '/login': typeof LoginRoute
  '/home': typeof AppHomeRoute
  '/settings': typeof AppSettingsRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_app': typeof AppRouteWithChildren
  '/login': typeof LoginRoute
  '/_app/home': typeof AppHomeRoute
  '/_app/settings': typeof AppSettingsRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '' | '/login' | '/home' | '/settings'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '' | '/login' | '/home' | '/settings'
  id: '__root__' | '/' | '/_app' | '/login' | '/_app/home' | '/_app/settings'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AppRoute: typeof AppRouteWithChildren
  LoginRoute: typeof LoginRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AppRoute: AppRouteWithChildren,
  LoginRoute: LoginRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_app",
        "/login"
      ]
    },
    "/": {
      "filePath": "index.ts"
    },
    "/_app": {
      "filePath": "_app.tsx",
      "children": [
        "/_app/home",
        "/_app/settings"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_app/home": {
      "filePath": "_app/home.tsx",
      "parent": "/_app"
    },
    "/_app/settings": {
      "filePath": "_app/settings.tsx",
      "parent": "/_app"
    }
  }
}
ROUTE_MANIFEST_END */
