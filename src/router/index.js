import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "",
  linkExactActiveClass: "",
  routes: [
    {
      path: "/auth/login",
      name: "login",
      component: () => import("../views/auth/login.vue"),
    },

    {
      path: "/",
      name: "home",
      component: () => import("../views/index.vue"),
    },

    {
      path: "/divisions",
      name: "divisions",
      component: () => import("../views/divisions/index.vue"),
    },

    {
      path: "/districts",
      name: "districts",
      component: () => import("../views/districts/index.vue"),
    },

    {
      path: "/upazilas",
      name: "upazilas",
      component: () => import("../views/upazilas/index.vue"),
    },

    {
      path: "/institutions",
      name: "institutions",
      component: () => import("../views/institutions/index.vue"),
    },
    {
      path: "/institutions/create",
      name: "institutions.create",
      component: () => import("../views/institutions/create.vue"),
    },

    {
      path: "/institutions/:id/show",
      name: "institutions.show",
      component: () => import("../views/institutions/show.vue"),
    },
  ],
});

export default router;
