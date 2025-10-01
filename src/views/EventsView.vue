<template>
    <div class="min-h-screen bg-gray-50">
        <!-- 导航栏 -->
        <HeaderView :showSearch="true" @search="handleSearch" />

        <!-- 主要内容区 -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- 页面标题和筛选 -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">所有事件</h1>
                <p class="text-gray-600">探索我们收录的所有热点事件及其时间线</p>
            </div>

            <!-- 筛选和排序栏 -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <!-- 分类筛选 -->
                    <div class="flex flex-wrap gap-2">
                        <button v-for="category in categories" :key="category.id"
                            @click="toggleCategoryFilter(category.name)"
                            class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors" :class="isCategoryActive(category.name)
                                ? getCategoryClass(category.name)
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'">
                            {{ category.name }}
                        </button>
                    </div>

                    <!-- 排序选项 -->
                    <div class="flex items-center space-x-4">
                        <span class="text-sm text-gray-600">排序:</span>
                        <select v-model="sortBy"
                            class="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                            <option value="updated">最新更新</option>
                            <option value="created">创建时间</option>
                            <option value="title">标题</option>
                            <option value="popular">最受欢迎</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- 事件列表 -->
            <div class="mb-8">
                <!-- 结果统计 -->
                <div class="flex justify-between items-center mb-4">
                    <p class="text-gray-600">
                        找到 <span class="font-semibold">{{ filteredEvents.length }}</span> 个事件
                        <span v-if="activeCategoryFilter" class="ml-2">
                            (筛选: <span class="font-semibold">{{ activeCategoryFilter }}</span>)
                        </span>
                    </p>

                    <!-- 视图切换 -->
                    <div class="flex items-center space-x-2">
                        <button @click="viewMode = 'grid'" class="p-2 rounded-lg transition-colors"
                            :class="viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-500 hover:bg-gray-100'">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
                                </path>
                            </svg>
                        </button>
                        <button @click="viewMode = 'list'" class="p-2 rounded-lg transition-colors"
                            :class="viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-500 hover:bg-gray-100'">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- 网格视图 -->
                <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="event in paginatedEvents" :key="event.id"
                        class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow timeline-item cursor-pointer"
                        @click="viewEventDetail(event.id)">
                        <div class="h-48 bg-gray-200 relative">
                            <img :src="event.coverImage" :alt="event.title" class="w-full h-full object-cover">
                            <div class="absolute top-4 left-4">
                                <span class="px-3 py-1 rounded-full text-sm font-medium"
                                    :class="getCategoryClass(event.category)">
                                    {{ event.category }}
                                </span>
                            </div>
                        </div>

                        <div class="p-6">
                            <h3 class="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{{ event.title }}</h3>
                            <p class="text-gray-600 mb-4 line-clamp-3">{{ event.description }}</p>

                            <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                                <span>{{ event.timelineCount }} 个时间节点</span>
                                <span>{{ formatDate(event.updatedAt) }}</span>
                            </div>

                            <div class="flex items-center justify-between">
                                <button @click="viewEventDetail(event.id)"
                                    class="bg-primary-500 text-gray-400 pe-4 py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium cursor-pointer">
                                    查看时间线
                                </button>
                                <button @click.stop="toggleBookmark(event.id)"
                                    class="p-2 text-gray-400 hover:text-yellow-500 transition-colors"
                                    :class="{ 'text-yellow-500': event.isBookmarked }">
                                    <svg class="w-5 h-5" :fill="event.isBookmarked ? 'currentColor' : 'none'"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 列表视图 -->
                <div v-else class="space-y-4">
                    <div v-for="event in paginatedEvents" :key="event.id"
                        class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        @click="viewEventDetail(event.id)">
                        <div class="flex flex-col md:flex-row">
                            <div class="md:w-48 h-48 md:h-auto bg-gray-200 relative flex-shrink-0">
                                <img :src="event.coverImage" :alt="event.title" class="w-full h-full object-cover">
                                <div class="absolute top-4 left-4">
                                    <span class="px-3 py-1 rounded-full text-sm font-medium"
                                        :class="getCategoryClass(event.category)">
                                        {{ event.category }}
                                    </span>
                                </div>
                            </div>

                            <div class="p-6 flex-1">
                                <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ event.title }}</h3>
                                <p class="text-gray-600 mb-4">{{ event.description }}</p>

                                <div class="flex flex-wrap items-center justify-between gap-4">
                                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                                        <span>{{ event.timelineCount }} 个时间节点</span>
                                        <span>•</span>
                                        <span>更新于 {{ formatDate(event.updatedAt) }}</span>
                                    </div>

                                    <div class="flex items-center space-x-2">
                                        <button @click="viewEventDetail(event.id)"
                                            class="bg-primary-500 text-gray-400 pe-4 py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium cursor-pointer">
                                            查看时间线
                                        </button>
                                        <button @click.stop="toggleBookmark(event.id)"
                                            class="p-2 text-gray-400 hover:text-yellow-500 transition-colors"
                                            :class="{ 'text-yellow-500': event.isBookmarked }">
                                            <svg class="w-5 h-5" :fill="event.isBookmarked ? 'currentColor' : 'none'"
                                                stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z">
                                                </path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 空状态 -->
                <div v-if="filteredEvents.length === 0" class="text-center py-12">
                    <div class="w-24 h-24 mx-auto mb-4 text-gray-300">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                            </path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">没有找到相关事件</h3>
                    <p class="text-gray-500 mb-6">尝试调整筛选条件或搜索关键词</p>
                    <button @click="clearFilters"
                        class="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium">
                        清除筛选条件
                    </button>
                </div>
            </div>

            <!-- 分页 -->
            <div v-if="filteredEvents.length > 0 && totalPages > 1"
                class="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-t border-gray-200">
                <div class="text-sm text-gray-600">
                    显示第 {{ (currentPage - 1) * pageSize + 1 }} - {{ Math.min(currentPage * pageSize,
                        filteredEvents.length) }} 条，共 {{ filteredEvents.length }} 条结果
                </div>

                <div class="flex items-center space-x-1">
                    <!-- 上一页 -->
                    <button @click="currentPage = Math.max(1, currentPage - 1)" :disabled="currentPage === 1"
                        class="p-2.5 rounded-lg transition-all duration-200 flex items-center space-x-1" :class="currentPage === 1
                            ? 'text-gray-400 cursor-not-allowed opacity-60'
                            : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600 hover:shadow-sm'">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7">
                            </path>
                        </svg>
                        <span class="text-sm font-medium hidden sm:inline">上一页</span>
                    </button>

                    <!-- 页码按钮 -->
                    <button v-for="page in visiblePages" :key="page" @click="page !== '...' && (currentPage = page)"
                        class="min-w-[40px] h-10 px-3 rounded-lg transition-all duration-200 font-medium text-sm flex items-center justify-center"
                        :class="page === currentPage
                            ? 'bg-primary-500 text-gray-400 shadow-sm'
                            : page === '...'
                                ? 'text-gray-500 cursor-default'
                                : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'">
                        {{ page }}
                    </button>

                    <!-- 下一页 -->
                    <button @click="currentPage = Math.min(totalPages, currentPage + 1)"
                        :disabled="currentPage === totalPages"
                        class="p-2.5 rounded-lg transition-all duration-200 flex items-center space-x-1" :class="currentPage === totalPages
                            ? 'text-gray-400 cursor-not-allowed opacity-60'
                            : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600 hover:shadow-sm'">
                        <span class="text-sm font-medium hidden sm:inline">下一页</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7">
                            </path>
                        </svg>
                    </button>
                </div>

                <!-- 快速跳转 -->
                <div class="flex items-center space-x-2 text-sm">
                    <span class="text-gray-600">跳至</span>
                    <input v-model.number="jumpPage" type="number" min="1" :max="totalPages"
                        class="w-16 px-2 py-1.5 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        @keyup.enter="jumpToPage">
                    <span class="text-gray-600">页</span>
                    <button @click="jumpToPage"
                        class="px-3 py-1.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium">
                        确定
                    </button>
                </div>
            </div>
        </main>

        <!-- 页脚 -->
        <FooterView />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import HeaderView from '../components/HeaderView.vue'
import FooterView from '../components/FooterView.vue'

const router = useRouter()

// 响应式数据
const searchQuery = ref('')
const isMobileMenuOpen = ref(false)
const viewMode = ref('grid') // 'grid' 或 'list'
const sortBy = ref('updated')
const activeCategoryFilter = ref('')
const currentPage = ref(1)
const pageSize = 9
const jumpPage = ref(1)

// 事件数据
const allEvents = ref([])

// 分类数据
const categories = ref([
    { id: 1, name: '科技', icon: '💻', count: 23, bgColor: 'bg-blue-100' },
    { id: 2, name: '政治', icon: '🏛️', count: 15, bgColor: 'bg-red-100' },
    { id: 3, name: '经济', icon: '💹', count: 18, bgColor: 'bg-green-100' },
    { id: 4, name: '社会', icon: '👥', count: 32, bgColor: 'bg-yellow-100' },
    { id: 5, name: '娱乐', icon: '🎬', count: 27, bgColor: 'bg-purple-100' },
    { id: 6, name: '体育', icon: '⚽', count: 12, bgColor: 'bg-orange-100' },
    { id: 7, name: '国际', icon: '🌍', count: 21, bgColor: 'bg-indigo-100' },
    { id: 8, name: '其他', icon: '📰', count: 8, bgColor: 'bg-gray-100' }
])

// 模拟数据
const mockEvents = [
    {
        id: 1,
        title: '人工智能技术发展历程与重大突破',
        description: '从图灵测试到ChatGPT，回顾人工智能领域的关键技术突破和发展历程',
        category: '科技',
        coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
        timelineCount: 45,
        updatedAt: '2024-01-15',
        createdAt: '2023-12-01',
        isBookmarked: false,
        popularity: 95
    },
    {
        id: 2,
        title: '全球气候变化谈判关键节点',
        description: '从京都议定书到巴黎协定，梳理全球气候治理的重要里程碑事件',
        category: '国际',
        coverImage: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400',
        timelineCount: 32,
        updatedAt: '2024-01-12',
        createdAt: '2023-11-20',
        isBookmarked: true,
        popularity: 87
    },
    {
        id: 3,
        title: '新冠疫情全球大流行时间线',
        description: '记录新冠疫情从发现到全球传播，再到疫苗接种的关键时间节点',
        category: '社会',
        coverImage: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400',
        timelineCount: 67,
        updatedAt: '2024-01-10',
        createdAt: '2023-10-15',
        isBookmarked: false,
        popularity: 92
    },
    {
        id: 4,
        title: '数字货币发展与监管历程',
        description: '从比特币诞生到全球各国对数字货币的监管政策演变',
        category: '经济',
        coverImage: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=400',
        timelineCount: 28,
        updatedAt: '2024-01-08',
        createdAt: '2023-11-05',
        isBookmarked: false,
        popularity: 78
    },
    {
        id: 5,
        title: '奥运会历史与重要时刻',
        description: '回顾现代奥运会从1896年至今的精彩瞬间和历史性时刻',
        category: '体育',
        coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
        timelineCount: 54,
        updatedAt: '2024-01-05',
        createdAt: '2023-09-30',
        isBookmarked: true,
        popularity: 85
    },
    {
        id: 6,
        title: '电影技术发展里程碑',
        description: '从无声电影到数字特效，探索电影制作技术的重大突破',
        category: '娱乐',
        coverImage: 'https://images.unsplash.com/photo-1695331453422-4388acbc0608?w=400',
        timelineCount: 36,
        updatedAt: '2024-01-03',
        createdAt: '2023-10-20',
        isBookmarked: false,
        popularity: 72
    },
    {
        id: 7,
        title: '美国大选历史关键节点',
        description: '梳理美国总统选举制度演变和历次重要选举的关键时刻',
        category: '政治',
        coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
        timelineCount: 41,
        updatedAt: '2024-01-01',
        createdAt: '2023-11-15',
        isBookmarked: false,
        popularity: 88
    },
    {
        id: 8,
        title: '太空探索重大突破时间线',
        description: '从第一颗人造卫星到火星探测，记录人类太空探索的重要成就',
        category: '科技',
        coverImage: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400',
        timelineCount: 39,
        updatedAt: '2023-12-28',
        createdAt: '2023-10-10',
        isBookmarked: true,
        popularity: 91
    },
    {
        id: 9,
        title: '全球贸易体系演变',
        description: '从GATT到WTO，分析全球多边贸易体系的发展历程',
        category: '经济',
        coverImage: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400',
        timelineCount: 31,
        updatedAt: '2023-12-25',
        createdAt: '2023-09-25',
        isBookmarked: false,
        popularity: 76
    },
    {
        id: 10,
        title: '互联网发展简史',
        description: '从ARPANET到5G时代，追溯互联网技术和应用的演进过程',
        category: '科技',
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
        timelineCount: 48,
        updatedAt: '2023-12-20',
        createdAt: '2023-08-15',
        isBookmarked: false,
        popularity: 94
    },
    {
        id: 11,
        title: '女性权利运动里程碑',
        description: '记录全球女性争取平等权利的重要历史时刻和成就',
        category: '社会',
        coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400',
        timelineCount: 29,
        updatedAt: '2023-12-18',
        createdAt: '2023-10-05',
        isBookmarked: true,
        popularity: 83
    },
    {
        id: 12,
        title: '世界杯足球赛历史',
        description: '回顾历届世界杯的精彩比赛、传奇球员和重要规则变化',
        category: '体育',
        coverImage: 'https://images.unsplash.com/photo-1572139332398-724fbaaa46a0?w=400',
        timelineCount: 23,
        updatedAt: '2023-12-15',
        createdAt: '2023-09-20',
        isBookmarked: false,
        popularity: 79
    }
]

// 计算属性
const filteredEvents = computed(() => {
    let events = [...allEvents.value]

    // 搜索过滤
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        events = events.filter(event =>
            event.title.toLowerCase().includes(query) ||
            event.description.toLowerCase().includes(query)
        )
    }

    // 分类过滤
    if (activeCategoryFilter.value) {
        events = events.filter(event => event.category === activeCategoryFilter.value)
    }

    // 排序
    switch (sortBy.value) {
        case 'updated':
            events.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            break
        case 'created':
            events.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            break
        case 'title':
            events.sort((a, b) => a.title.localeCompare(b.title))
            break
        case 'popular':
            events.sort((a, b) => b.popularity - a.popularity)
            break
    }

    return events
})

const paginatedEvents = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize
    return filteredEvents.value.slice(startIndex, startIndex + pageSize)
})

const totalPages = computed(() => {
    return Math.ceil(filteredEvents.value.length / pageSize)
})

const visiblePages = computed(() => {
    const pages = []
    const total = totalPages.value
    const current = currentPage.value

    if (total <= 7) {
        for (let i = 1; i <= total; i++) {
            pages.push(i)
        }
    } else {
        if (current <= 4) {
            for (let i = 1; i <= 5; i++) {
                pages.push(i)
            }
            pages.push('...')
            pages.push(total)
        } else if (current >= total - 3) {
            pages.push(1)
            pages.push('...')
            for (let i = total - 4; i <= total; i++) {
                pages.push(i)
            }
        } else {
            pages.push(1)
            pages.push('...')
            for (let i = current - 1; i <= current + 1; i++) {
                pages.push(i)
            }
            pages.push('...')
            pages.push(total)
        }
    }

    return pages
})

// 方法
const handleSearch = () => {
    // 搜索逻辑已在计算属性中处理
    currentPage.value = 1
}

const viewEventDetail = (eventId) => {
    router.push(`/event/${eventId}`)
}

const toggleBookmark = (eventId) => {
    const event = allEvents.value.find(e => e.id === eventId)
    if (event) {
        event.isBookmarked = !event.isBookmarked
        // 这里可以添加 API 调用保存收藏状态
    }
}

const toggleCategoryFilter = (categoryName) => {
    if (activeCategoryFilter.value === categoryName) {
        activeCategoryFilter.value = ''
    } else {
        activeCategoryFilter.value = categoryName
    }
    currentPage.value = 1
}

const isCategoryActive = (categoryName) => {
    return activeCategoryFilter.value === categoryName
}

const clearFilters = () => {
    activeCategoryFilter.value = ''
    searchQuery.value = ''
    currentPage.value = 1
}

const jumpToPage = () => {
    if (jumpPage.value >= 1 && jumpPage.value <= totalPages.value) {
        currentPage.value = jumpPage.value
    }
}

const getCategoryClass = (category) => {
    const classMap = {
        '科技': 'bg-blue-100 text-blue-800',
        '政治': 'bg-red-100 text-red-800',
        '经济': 'bg-green-100 text-green-800',
        '社会': 'bg-yellow-100 text-yellow-800',
        '娱乐': 'bg-purple-100 text-purple-800',
        '体育': 'bg-orange-100 text-orange-800',
        '国际': 'bg-indigo-100 text-indigo-800'
    }
    return classMap[category] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN')
}

// 监听路由参数变化
watch(() => router.currentRoute.value.query, (newQuery) => {
    if (newQuery.search) {
        searchQuery.value = newQuery.search
    }
    if (newQuery.category) {
        activeCategoryFilter.value = newQuery.category
    }
})

// 监听当前页码变化，更新跳转页码
watch(currentPage, (newPage) => {
    jumpPage.value = newPage
})

// 生命周期
onMounted(() => {
    // 模拟数据加载
    allEvents.value = mockEvents

    // 检查URL参数
    const query = router.currentRoute.value.query
    if (query.search) {
        searchQuery.value = query.search
    }
    if (query.category) {
        activeCategoryFilter.value = query.category
    }

    // 初始化跳转页码
    jumpPage.value = currentPage.value
})
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* 自定义输入框箭头样式 */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
}
</style>