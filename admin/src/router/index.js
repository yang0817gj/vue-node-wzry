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
                name: 'category-create',
                component: () => import('../views/CategoriesEdit.vue'),
            },
            {
                path: '/categories/create/:id',
                name: 'category-create',
                component: () => import('../views/CategoriesEdit.vue'),
                props: true
            },
            {
                path: '/categories/list',
                name: 'category-list',
                component: () => import('../views/CategoriesList.vue'),
            },
            {
                path: '/items/create',
                name: 'item-create',
                component: () => import('../views/ItemsEdit.vue'),
            },
            {
                path: '/items/create/:id',
                name: 'item-create',
                component: () => import('../views/ItemsEdit.vue'),
                props: true
            },
            {
                path: '/items/list',
                name: 'item-list',
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
            }
        ]
    },
    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

const router = new VueRouter({
    routes
})

export default router
