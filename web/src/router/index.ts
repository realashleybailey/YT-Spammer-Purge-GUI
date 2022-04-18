import Vue from "vue"
import VueRouter, { Route, RouteConfig } from "vue-router"

import HomeView from "../views/HomeView.vue"
import DashboardView from "../views/Dashboard/DashboardView.vue"
import ViewView from "../views/View/ViewView.vue"
import SettingsView from "../views/Settings/SettingsView.vue"
import DocView from "../views/Doc/DocView.vue"
import PricingView from "../views/Pricing/PricingView.vue"
import AuthView from "../views/Auth/AuthView.vue"
import store from "@/store"
import { Position, PositionResult } from "vue-router/types/router"

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
    name: "Home",
    component: HomeView,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
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
    path: "/test",
    name: "Test",
    component: () => import("../views/TestView.vue")
  },
  {
    path: "/view",
    name: "view",
    component: ViewView,
    children: [
      {
        path: "comments",
        name: "Comments",
        component: () => import("../views/View/ViewCommentsView.vue")
      },
      {
        path: "spam",
        name: "Spam",
        component: () => import("../views/View/ViewSpamView.vue")
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
    children: [
      {
        path: "",
        name: "Settings",
        component: () => import("../views/Settings/SettingsHomeView.vue")
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/documentation",
    name: "Documentation",
    component: DocView,
    children: [
      {
        path: "",
        name: "Documentation",
        component: () => import("../views/Doc/DocHomeView.vue")
      },
      {
        path: "stack",
        name: "Stack",
        component: () => import("../views/Doc/DocStackView.vue")
      },
      {
        path: "stack/:id",
        name: "Stack Details",
        component: () => import("../views/Doc/DocStackDetailView.vue")
      }
    ]
  },
  {
    path: "/pricing",
    name: "Pricing",
    component: PricingView,
    children: [
      {
        path: "",
        name: "Pricing",
        component: () => import("../views/Pricing/PricingHomeView.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: AuthView,
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("../views/Auth/LoginView.vue")
      }
    ],
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: AuthView,
    children: [
      {
        path: "register",
        name: "Register",
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
  routes,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  scrollBehavior(to: Route, from: Route, savedPosition: void | Position): Promise<PositionResult> {
    return new Promise((resolve) => {
      if (savedPosition) {
        resolve(savedPosition)
      } else {
        resolve({ x: 0, y: 0 })
      }
    })
  }
})

router.beforeEach((to, from, next) => {
  try {
    Vue.prototype.$beginLoading()
    next()
  } catch (e) {
    next()
  }
})

router.afterEach(() => {
  try {
    Vue.prototype.$endLoading()
  } catch (e) {}
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
