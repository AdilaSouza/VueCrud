import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    { path: '/graph/:id', name: 'Graph', component: () => import('../components/Grafico.vue'), props: true },
    {
        path: '/list',
        name: 'List',
        component: () => import('../components/List.vue'),
    },
    {
        path: '/',
        name: 'login',
        component: () => import('../components/Login.vue'),
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: () => import('../components/ForgotPassword.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
