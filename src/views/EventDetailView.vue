<template>
    <div class="min-h-screen bg-gray-50">
        <!-- 导航栏 -->
        <HeaderView :show-search="false" />

        <!-- 主要内容区 -->
        <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- 加载状态 -->
            <div v-if="loading" class="text-center py-12">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                <p class="mt-4 text-gray-600">加载中...</p>
            </div>

            <!-- 事件详情 -->
            <div v-else-if="event" class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <!-- 封面图片 -->
                <!-- 封面图片部分修改为 -->
                <div class="h-64 md:h-80 bg-gray-200 relative">
                    <img :src="event.coverImage" :alt="event.title" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    <div class="absolute bottom-6 left-6 right-6 text-white">
                        <div class="flex items-center justify-between mb-4">
                            <!-- 分类标签 - 添加背景色提高可读性 -->
                            <span
                                class="px-3 py-1 rounded-full text-sm font-medium bg-black/60 backdrop-blur-sm border border-white/20">
                                {{ event.category }}
                            </span>

                            <!-- 操作按钮组 -->
                            <div class="flex items-center space-x-3">
                                <button @click="toggleBookmark"
                                    class="p-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 hover:bg-black/80 transition-colors"
                                    :class="{ 'text-yellow-400': event.isBookmarked, 'text-white': !event.isBookmarked }">
                                    <svg class="w-5 h-5" :fill="event.isBookmarked ? 'currentColor' : 'none'"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z">
                                        </path>
                                    </svg>
                                </button>
                                <button @click="shareEvent"
                                    class="p-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 hover:bg-black/80 transition-colors text-white">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- 标题和描述 -->
                        <h1 class="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">{{ event.title }}</h1>
                        <p class="text-lg opacity-90 drop-shadow-md">{{ event.description }}</p>
                    </div>
                </div>

                <!-- 事件信息 -->
                <div class="p-6 border-b border-gray-200">
                    <div class="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                        <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>更新于 {{ formatDate(event.updatedAt) }}</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2">
                                </path>
                            </svg>
                            <span>{{ event.timelineCount }} 个时间节点</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5">
                                </path>
                            </svg>
                            <span>{{ event.popularity }} 热度</span>
                        </div>
                    </div>
                </div>

                <!-- 时间线内容 -->
                <div class="p-6">
                    <h2 class="text-2xl font-bold text-gray-900 mb-6">时间线</h2>

                    <!-- 时间线视图切换 -->
                    <div class="flex items-center space-x-4 mb-6">
                        <button @click="timelineView = 'vertical'"
                            class="px-4 py-2 rounded-lg transition-colors font-medium border" :class="timelineView === 'vertical'
                                ? 'bg-primary-500 text-gray-700  border-primary-500'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'">
                            垂直视图
                        </button>
                        <button @click="timelineView = 'horizontal'"
                            class="px-4 py-2 rounded-lg transition-colors font-medium border" :class="timelineView === 'horizontal'
                                ? 'bg-primary-500 text-gray-700  border-primary-500'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'">
                            水平视图
                        </button>
                    </div>

                    <!-- 垂直时间线 -->
                    <div v-if="timelineView === 'vertical'" class="relative">
                        <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                        <div v-for="(item, index) in timelineItems" :key="item.id"
                            class="relative flex items-start mb-8 last:mb-0">
                            <!-- 时间节点 -->
                            <div
                                class="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 font-semibold z-10 text-sm border-2 border-white shadow-md">
                                {{ index + 1 }}
                            </div>

                            <!-- 内容卡片 -->
                            <div class="ml-6 flex-1 bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                                <div class="flex items-center justify-between mb-3">
                                    <h3 class="text-lg font-semibold text-gray-900">{{ item.title }}</h3>
                                    <span class="text-sm text-gray-500 bg-white px-2 py-1 rounded">{{
                                        formatTimelineDate(item.date) }}</span>
                                </div>
                                <p class="text-gray-600 mb-4">{{ item.description }}</p>

                                <!-- 相关图片 -->
                                <div v-if="item.images && item.images.length > 0"
                                    class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                                    <img v-for="(image, imgIndex) in item.images" :key="imgIndex" :src="image"
                                        :alt="item.title" class="w-full h-24 object-cover rounded-lg cursor-pointer"
                                        @click="openImageGallery(item.images, imgIndex)">
                                </div>

                                <!-- 相关链接 -->
                                <div v-if="item.links && item.links.length > 0" class="flex flex-wrap gap-2">
                                    <a v-for="link in item.links" :key="link.url" :href="link.url" target="_blank"
                                        class="inline-flex items-center px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14">
                                            </path>
                                        </svg>
                                        {{ link.title }}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 水平时间线 -->
                    <div v-else class="overflow-x-auto pb-6">
                        <div class="flex space-x-6 min-w-max">
                            <div v-for="(item, index) in timelineItems" :key="item.id"
                                class="w-80 flex-shrink-0 bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                                <div class="text-center mb-4">
                                    <div
                                        class="inline-flex w-10 h-10 bg-primary-500 rounded-full items-center justify-center text-gray-400 font-semibold text-sm border-2 border-white shadow-md">
                                        {{ index + 1 }}
                                    </div>
                                    <div class="mt-2 text-sm text-gray-500">{{ formatTimelineDate(item.date) }}</div>
                                </div>

                                <h3 class="text-lg font-semibold text-gray-900 mb-3 text-center">{{ item.title }}</h3>
                                <p class="text-gray-600 mb-4 text-sm">{{ item.description }}</p>

                                <!-- 相关图片 -->
                                <div v-if="item.images && item.images.length > 0" class="mb-4">
                                    <img :src="item.images[0]" :alt="item.title"
                                        class="w-full h-32 object-cover rounded-lg cursor-pointer"
                                        @click="openImageGallery(item.images, 0)">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 空状态 -->
                    <div v-if="timelineItems.length === 0" class="text-center py-12">
                        <div class="w-24 h-24 mx-auto mb-4 text-gray-300">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">暂无时间线数据</h3>
                        <p class="text-gray-500">该事件的时间线正在整理中...</p>
                    </div>
                </div>
            </div>

            <!-- 错误状态 -->
            <div v-else class="text-center py-12">
                <div class="w-24 h-24 mx-auto mb-4 text-gray-300">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z">
                        </path>
                    </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">事件未找到</h3>
                <p class="text-gray-500 mb-6">您查找的事件不存在或已被删除</p>
                <router-link to="/events"
                    class="bg-primary-500 text-gray-400 px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors font-medium">
                    返回所有事件
                </router-link>
            </div>

            <!-- 相关事件推荐 -->
            <div v-if="event && relatedEvents.length > 0" class="mt-12">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">相关事件</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="relatedEvent in relatedEvents" :key="relatedEvent.id"
                        class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div class="h-40 bg-gray-200 relative">
                            <img :src="relatedEvent.coverImage" :alt="relatedEvent.title"
                                class="w-full h-full object-cover">
                            <div class="absolute top-3 left-3">
                                <span class="px-2 py-1 rounded-full text-xs font-medium bg-white bg-opacity-90">
                                    {{ relatedEvent.category }}
                                </span>
                            </div>
                        </div>
                        <div class="p-4">
                            <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">{{ relatedEvent.title }}</h3>
                            <div class="flex items-center justify-between text-sm text-gray-500">
                                <span>{{ relatedEvent.timelineCount }} 个节点</span>
                                <span>{{ formatDate(relatedEvent.updatedAt) }}</span>
                            </div>
                            <button @click="viewEventDetail(relatedEvent.id)"
                                class="w-full mt-3 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm">
                                查看详情
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- 图片画廊模态框 -->
        <div v-if="showImageGallery" class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
            <div class="relative max-w-4xl max-h-full">
                <button @click="closeImageGallery"
                    class="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>

                <img :src="currentGalleryImage" class="max-w-full max-h-full object-contain">

                <div
                    class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 text-white">
                    <button @click="prevImage"
                        class="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7">
                            </path>
                        </svg>
                    </button>
                    <span class="text-sm">{{ currentImageIndex + 1 }} / {{ galleryImages.length }}</span>
                    <button @click="nextImage"
                        class="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- 页脚 -->
        <FooterView />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import HeaderView from '../components/HeaderView.vue'
import FooterView from '../components/FooterView.vue'

const router = useRouter()
const route = useRoute()

// 响应式数据
const loading = ref(true)
const event = ref(null)
const timelineItems = ref([])
const relatedEvents = ref([])
const timelineView = ref('vertical')
const isMobileMenuOpen = ref(false)

// 图片画廊相关
const showImageGallery = ref(false)
const galleryImages = ref([])
const currentImageIndex = ref(0)

// 计算属性
const currentGalleryImage = computed(() => {
    return galleryImages.value[currentImageIndex.value] || ''
})

// 模拟数据
const mockEvents = {
    1: {
        id: 1,
        title: '人工智能技术发展历程与重大突破',
        description: '从图灵测试到ChatGPT，回顾人工智能领域的关键技术突破和发展历程',
        category: '科技',
        coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        timelineCount: 45,
        updatedAt: '2024-01-15',
        createdAt: '2023-12-01',
        isBookmarked: false,
        popularity: 95
    }
}

const mockTimelineItems = {
    1: [
        {
            id: 1,
            title: '图灵测试提出',
            description: '艾伦·图灵发表论文《计算机器与智能》，提出著名的"图灵测试"，为人工智能研究奠定理论基础',
            date: '1950-10-01',
            images: [
                'https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?w=400',
                'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400'
            ],
            links: [
                { title: '维基百科', url: 'https://zh.wikipedia.org/wiki/图灵测试' }
            ]
        },
        {
            id: 2,
            title: '达特茅斯会议',
            description: '约翰·麦卡锡等科学家在达特茅斯学院召开会议，首次提出"人工智能"这一术语，标志着AI领域的正式诞生',
            date: '1956-08-01',
            images: [
                'https://images.unsplash.com/photo-1692404254850-3ae521eed623?w=400'
            ],
            links: [
                { title: '会议详情', url: 'https://example.com' }
            ]
        },
        {
            id: 3,
            title: '深蓝战胜卡斯帕罗夫',
            description: 'IBM的深蓝计算机在国际象棋比赛中击败世界冠军加里·卡斯帕罗夫，展示了计算机在复杂决策任务中的能力',
            date: '1997-05-11',
            images: [
                'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400'
            ],
            links: [
                { title: '比赛回顾', url: 'https://example.com' }
            ]
        },
        {
            id: 4,
            title: 'AlphaGo击败李世石',
            description: 'DeepMind的AlphaGo程序在围棋比赛中以4:1战胜世界冠军李世石，标志着AI在复杂游戏领域的重大突破',
            date: '2016-03-15',
            images: [
                'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400'
            ],
            links: [
                { title: '比赛分析', url: 'https://example.com' }
            ]
        },
        {
            id: 5,
            title: 'ChatGPT发布',
            description: 'OpenAI发布ChatGPT，引发全球对生成式AI的关注，展示了大型语言模型在自然语言处理方面的强大能力',
            date: '2022-11-30',
            images: [
                'https://images.unsplash.com/photo-1675557009483-e6cf3867976b?w=400'
            ],
            links: [
                { title: '官方发布', url: 'https://openai.com/blog/chatgpt' }
            ]
        }
    ]
}

const mockRelatedEvents = [
    {
        id: 10,
        title: '互联网发展简史',
        description: '从ARPANET到5G时代，追溯互联网技术和应用的演进过程',
        category: '科技',
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
        timelineCount: 48,
        updatedAt: '2023-12-20'
    },
    {
        id: 8,
        title: '太空探索重大突破时间线',
        description: '从第一颗人造卫星到火星探测，记录人类太空探索的重要成就',
        category: '科技',
        coverImage: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400',
        timelineCount: 39,
        updatedAt: '2023-12-28'
    },
    {
        id: 4,
        title: '数字货币发展与监管历程',
        description: '从比特币诞生到全球各国对数字货币的监管政策演变',
        category: '经济',
        coverImage: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=400',
        timelineCount: 28,
        updatedAt: '2024-01-08'
    }
]

// 方法
const loadEventData = async (eventId) => {
    loading.value = true
    try {
        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 1000))

        event.value = mockEvents[eventId] || null
        timelineItems.value = mockTimelineItems[eventId] || []
        relatedEvents.value = mockRelatedEvents
    } catch (error) {
        console.error('加载事件数据失败:', error)
        event.value = null
    } finally {
        loading.value = false
    }
}

const toggleBookmark = () => {
    if (event.value) {
        event.value.isBookmarked = !event.value.isBookmarked
        // 这里可以添加 API 调用保存收藏状态
    }
}

const shareEvent = () => {
    if (navigator.share) {
        navigator.share({
            title: event.value.title,
            text: event.value.description,
            url: window.location.href
        })
    } else {
        // 降级处理：复制链接到剪贴板
        navigator.clipboard.writeText(window.location.href)
        alert('链接已复制到剪贴板')
    }
}

const viewEventDetail = (eventId) => {
    router.push(`/event/${eventId}`)
}

const openImageGallery = (images, startIndex = 0) => {
    galleryImages.value = images
    currentImageIndex.value = startIndex
    showImageGallery.value = true
}

const closeImageGallery = () => {
    showImageGallery.value = false
    galleryImages.value = []
    currentImageIndex.value = 0
}

const prevImage = () => {
    if (currentImageIndex.value > 0) {
        currentImageIndex.value--
    } else {
        currentImageIndex.value = galleryImages.value.length - 1
    }
}

const nextImage = () => {
    if (currentImageIndex.value < galleryImages.value.length - 1) {
        currentImageIndex.value++
    } else {
        currentImageIndex.value = 0
    }
}

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN')
}

const formatTimelineDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

// 监听路由参数变化
watch(() => route.params.id, (newId) => {
    if (newId) {
        loadEventData(parseInt(newId))
    }
})

// 生命周期
onMounted(() => {
    const eventId = parseInt(route.params.id)
    if (eventId) {
        loadEventData(eventId)
    }
})
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* 自定义滚动条 */
.overflow-x-auto::-webkit-scrollbar {
    height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}
</style>