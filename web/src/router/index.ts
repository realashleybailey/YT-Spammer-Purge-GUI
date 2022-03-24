import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"

import HomeView from "../views/HomeView.vue"
import DocView from "../views/Doc/DocView.vue"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/doc",
    name: "doc",
    component: DocView,
    children: [
      {
        path: "",
        name: "doc-index",
        component: () => import("../views/Doc/IndexView.vue")
      },
      {
        path: "stack",
        name: "doc-stack",
        component: () => import("../views/Doc/StackView.vue")
      },
      {
        path: "stack/:id",
        name: "doc-stack-detail",
        component: () => import("../views/Doc/StackDetailView.vue")
      }
    ]
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
