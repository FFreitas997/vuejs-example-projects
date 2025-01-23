import {createApp} from 'vue';

import App from './App.vue';
import {createRouter, createWebHistory} from "vue-router";
import TeamsList from "@/pages/TeamsList.vue";
import UsersList from "@/pages/UsersList.vue";
import TeamMembers from "@/components/teams/TeamMembers.vue";
import NotFound from "@/pages/NotFound.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {

            path: '/',
            redirect: '/teams'
        },
        {
            name: 'teams',
            path: '/teams',
            component: TeamsList,
            children: [
                {
                    name: 'team-members',
                    path: '/:teamId',
                    component: TeamMembers,
                    props: true
                }
            ]
        },
        {
            name: 'users',
            path: '/users',
            component: UsersList,
            beforeEnter: (to, from, next) => {
                console.log('users beforeEnter');
                console.log(to, from);
                next();
            }
        },
        {
            name: 'not-found',
            path: '/:notFound(.*)',
            component: NotFound
        }
    ],
    linkActiveClass: 'link-active',
    scrollBehavior(to, from, savedPosition){
        if(savedPosition){
            return savedPosition;
        }
        return {left: 0, top: 0};
    }
})

router.beforeEach(function(to, from, next){
    console.log('Global beforeEach');
    console.log(to, from);
    if (to.name === 'team-members') {
        next();
    } else {
        next({name: 'team-members', params: {teamId: 't2'}});
    }
})

router.afterEach(function(to, from){
    console.log('Global afterEach');
    console.log(to, from);
    // send analytics data
})

const app = createApp(App)

app
    .use(router)
    .mount('#app');
