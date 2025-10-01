import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/events',
            name: 'events',
            component: () => import('../views/EventsView.vue') // 稍后创建
        },
        {
            path: '/event/:id',
            name: 'event-detail',
            component: () => import('../views/EventDetailView.vue') // 稍后创建
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue') // 稍后创建
        }
    ]
})

export default router