<template>
    <nav class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <div class="flex items-center">
                    <router-link to="/" class="flex items-center space-x-2">
                        <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                            <span class="text-white font-bold text-sm">TL</span>
                        </div>
                        <span class="text-xl font-bold text-gray-900">事件脉络</span>
                    </router-link>
                </div>

                <!-- 搜索框（可选，根据页面需要显示） -->
                <div v-if="showSearch" class="flex-1 max-w-lg mx-4">
                    <div class="relative">
                        <input v-model="searchQuery" type="text" placeholder="搜索热点事件..."
                            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            @keyup.enter="handleSearch">
                        <div class="absolute left-3 top-2.5 text-gray-400">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- 导航链接 -->
                <div class="hidden md:flex items-center space-x-8">
                    <router-link to="/" class="text-gray-700 hover:text-primary-500 font-medium"
                        :class="{ 'text-primary-500': $route.path === '/' }">
                        首页
                    </router-link>
                    <router-link to="/events" class="text-gray-700 hover:text-primary-500 font-medium"
                        :class="{ 'text-primary-500': $route.path === '/events' }">
                        所有事件
                    </router-link>
                    <router-link to="/about" class="text-gray-700 hover:text-primary-500 font-medium"
                        :class="{ 'text-primary-500': $route.path === '/about' }">
                        关于我们
                    </router-link>
                </div>

                <!-- 移动端菜单按钮 -->
                <div class="md:hidden">
                    <button @click="isMobileMenuOpen = !isMobileMenuOpen"
                        class="p-2 rounded-md text-gray-700 hover:bg-gray-100">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- 移动端菜单 -->
            <div v-if="isMobileMenuOpen" class="md:hidden py-4 border-t">
                <div class="flex flex-col space-y-4">
                    <router-link to="/" class="text-gray-700 hover:text-primary-500 font-medium">首页</router-link>
                    <router-link to="/events"
                        class="text-gray-700 hover:text-primary-500 font-medium">所有事件</router-link>
                    <router-link to="/about" class="text-gray-700 hover:text-primary-500 font-medium">关于我们</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Props
const props = defineProps({
    showSearch: {
        type: Boolean,
        default: false
    }
})

// Emits
const emit = defineEmits(['search'])

// 响应式数据
const isMobileMenuOpen = ref(false)
const searchQuery = ref('')

// 方法
const handleSearch = () => {
    if (searchQuery.value.trim()) {
        emit('search', searchQuery.value)
        // 或者直接跳转到搜索页面
        // router.push(`/events?search=${encodeURIComponent(searchQuery.value)}`)
    }
}
</script>