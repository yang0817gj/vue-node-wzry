import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'main',
        component: () => import('../views/Main.vue'),
        children: [
            {
                path: '/categories/create',
                component: () => import('../views/CategoriesEdit.vue'),
            },
            {
                path: '/categories/create/:id',
                component: () => import('../views/CategoriesEdit.vue'),
                props: true
            },
            {
                path: '/categories/list',
                component: () => import('../views/CategoriesList.vue'),
            },
            {
                path: '/items/create',
                component: () => import('../views/ItemsEdit.vue'),
            },
            {
                path: '/items/create/:id',
                component: () => import('../views/ItemsEdit.vue'),
                props: true
            },
            {
                path: '/items/list',
                component: () => import('../views/ItemsList.vue'),
            },
            {
                path: '/heroes/create',
                component: () => import('../views/HeroesEdit.vue'),
            },
            {
                path: '/heroes/create/:id',
                component: () => import('../views/HeroesEdit.vue'),
                props: true
            },
            {
                path: '/heroes/list',
                component: () => import('../views/HeroesList.vue'),
            },
            {
                path: '/articles/create',
                component: () => import('../views/ArticlesEdit.vue'),
            },
            {
                path: '/articles/create/:id',
                component: () => import('../views/ArticlesEdit.vue'),
                props: true
            },
            {
                path: '/articles/list',
                component: () => import('../views/ArticlesList.vue'),
            },
            {
                path: '/ads/create',
                component: () => import('../views/AdEdit.vue'),
            },
            {
                path: '/ads/create/:id',
                component: () => import('../views/AdEdit.vue'),
                props: true
            },
            {
                path: '/ads/list',
                component: () => import('../views/AdList.vue'),
            }
        ]
    },
]

const router = new VueRouter({
    routes
})

export default router
