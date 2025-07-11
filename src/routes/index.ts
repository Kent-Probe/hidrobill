import { createRouter, createWebHistory } from "vue-router";
import ClientsView from "../views/ClientsView.vue";
import GeneratorImgView from "../views/GeneratorImgView.vue";
import HousesView from "../views/HousesView.vue";
import LoginViews from "../views/LoginView.vue";
import MainLayoutView from "../views/MainLayoutView.vue";
import PaymentsView from "../views/PaymentsView.vue";
import RegisterView from "../views/RegisterView.vue";
import UserViews from "../views/UserView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Login",
      component: LoginViews,
      meta: {
        requiresAuth: false,
        name: "Inicio de Sesión",
      },
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterView,
      meta: {
        requiresAuth: false,
        name: "Registro de Usuario",
      },
    },
    {
      path: "/dashboard",
      name: "Home",
      component: MainLayoutView,
      meta: {
        requiresAuth: true,
        layout: true,
      },
      children: [
        {
          path: "generate-bill/:id",
          name: "generate-bill",
          component: GeneratorImgView,
          meta: {
            name: "Generar recibo",
          },
        },
        {
          path: "clients",
          name: "Clients",
          component: ClientsView,
          meta: {
            name: "Clientes",
          },
        },
        {
          path: "houses",
          name: "Houses",
          component: HousesView,
          meta: {
            name: "Casas",
          },
        },
        {
          path: "payments",
          name: "Payments",
          component: PaymentsView,
          meta: {
            name: "Pagos",
          },
        },
        {
          path: "usuarios",
          name: "Users",
          component: UserViews,
          meta: {
            name: "Usuarios del Sistema",
          },
        },
      ],
    },
  ],
});

export default router;
