import {createRouter, createWebHistory} from 'vue-router'

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
    },
    {
      name: 'requests',
      path: '/requests',
      component: () => import('@/pages/requests/RequestReceived.vue'),
    },
    {
      path: '/:notFound(.*)',
      component: () => import('@/pages/NotFound.vue'),
    }
  ],
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
