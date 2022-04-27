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
        name: "Dashboard",
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
      requiresAuth: true,
      title: "View"
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
      requiresAuth: true,
      title: "Settings"
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
    ],
    meta: {
      title: "Documentation"
    }
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
    ],
    meta: {
      title: "Pricing"
    }
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
      requiresGuest: true,
      title: "Login"
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
      requiresGuest: true,
      title: "Register"
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
  // Begin loading
  try {
    Vue.prototype.$beginLoading()
  } catch (e) {}

  // Check if user is logged in
  const loggedIn = store.state.isLoggedIn

  // If user is logged in redirect to dashboard
  if (to.matched.some((record) => record.meta.requiresGuest) && loggedIn) {
    next("/dashboard")
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  // Check if user is logged in
  const loggedIn = store.state.isLoggedIn

  // If user is not logged in redirect to home
  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next("/")
  } else {
    next()
  }
})

const defaultDocumentTitle = "YT Spammer Purge"

router.afterEach((to) => {
  try {
    Vue.prototype.$endLoading()
  } catch (e) {}

  document.title = `${to.name ? to.name + " - " : ""}${defaultDocumentTitle}`
})

export default router
