import {createRouter, createWebHistory} from 'vue-router'
import store from "@/store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/coaches',
    },
    {
      name: 'coaches',
      path: '/coaches',
      component: () => import('@/pages/coaches/CoachList.vue'),
    },
    {
      name: 'coach',
      path: '/coaches/:id',
      props: true,
      component: () => import('@/pages/coaches/CoachDetails.vue'),
      children: [
        {
          name: 'contact',
          path: 'contact',
          component: () => import('@/pages/requests/ContactCoach.vue'),
        }
      ]
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('@/pages/coaches/CoachRegistration.vue'),
      meta: {requiresAuth: true}
    },
    {
      name: 'requests',
      path: '/requests',
      component: () => import('@/pages/requests/RequestReceived.vue'),
      meta: {requiresAuth: true}
    },
    {
      name: 'auth',
      path: '/auth',
      component: () => import('@/pages/auth/UserAuth.vue'),
    },
    {
      path: '/:notFound(.*)',
      component: () => import('@/pages/NotFound.vue'),
    }
  ],
})

router.beforeEach((to, from, next) => {
  const requiredAuth = to.meta.requiresAuth;
  if (!requiredAuth) {
    next()
    return
  }
  const isAuthenticated = store.getters["auth/isAuthenticated"];
  isAuthenticated ? next() : next('/auth');
})

export default router
