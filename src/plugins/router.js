import Vue from "vue";
import VueRouter from "vue-router";
/*ここから新規追加*/
import Signup from "../components/Signup.vue";
import Signin from "../components/Signin.vue";
import Signout from "../components/Signout.vue";
import Chat from "../components/Chat.vue";
/*ここまで*/
import firebase from '../plugins/firebase';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Signin
  },
  /*ここから新規追加*/
  {
    path: "/signup",
    name: "signup",
    component: Signup
  },
  {
    path: "/signin",
    name: "signin",
    component: Signin
  },
  {
    path: "/signout",
    name: "signout",
    component: Signout
  },
  {
    path: "/chat",
    name: "chat",
    component: Chat,
    meta: { requiresAuth: true }
  }
  /*ここまで*/
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(recode => recode.meta.requiresAuth);
  if (requiresAuth && !(await firebase.getCurrentUser())) {
    next({ path: "/signin", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;