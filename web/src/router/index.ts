import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"

import HomeView from "../views/HomeView.vue"
import DashboardView from "../views/Dashboard/DashboardView.vue"
import DocView from "../views/Doc/DocView.vue"
import AuthView from "../views/Auth/AuthView.vue"
import store from "@/store"

Vue.use(VueRouter)

declare module "vue-router" {
  interface RouteMeta {
    isAdmin?: boolean
    requiresAuth?: boolean
    requiresGuest?: boolean
  }
}

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    children: [
      {
        path: "",
        name: "dashboard-home",
        component: () => import("../views/Dashboard/DashboardHomeView.vue")
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/doc",
    name: "doc",
    component: DocView,
    children: [
      {
        path: "",
        name: "doc-index",
        component: () => import("../views/Doc/DocHomeView.vue")
      },
      {
        path: "stack",
        name: "doc-stack",
        component: () => import("../views/Doc/DocStackView.vue")
      },
      {
        path: "stack/:id",
        name: "doc-stack-detail",
        component: () => import("../views/Doc/DocStackDetailView.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "auth-login",
    component: AuthView,
    children: [
      {
        path: "",
        name: "auth-login",
        component: () => import("../views/Auth/LoginView.vue")
      }
    ],
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/register",
    name: "auth-register",
    component: AuthView,
    children: [
      {
        path: "register",
        name: "auth-register",
        component: () => import("../views/Auth/RegisterView.vue")
      }
    ],
    meta: {
      requiresGuest: true
    }
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresGuest) && store.state.user !== null) {
    next("/dashboard")
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth) && store.state.user === null) {
    next("/")
  } else {
    next()
  }
})

const defaultDocumentTitle = "YT Spammer Purge"

router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} — ${defaultDocumentTitle}`
  } else {
    document.title = defaultDocumentTitle
  }
})

export default router
