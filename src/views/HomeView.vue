<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 导航栏 -->
    <HeaderView :show-search="true" @search="handleSearch" />

    <!-- 主要内容区 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Hero Banner -->
      <section class="bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl p-8 mb-12 text-white">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">洞悉事件脉络，把握时代脉搏</h1>
          <p class="text-xl mb-8 opacity-90">专业、客观、可视化的热点事件时间线平台，为您还原每一个重要时刻</p>
          <div class="flex flex-wrap gap-4">
            <button @click="$router.push('/events')"
              class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              探索所有事件
            </button>
            <button @click="$router.push('/about')"
              class="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              了解平台
            </button>
          </div>
        </div>
      </section>

      <!-- 推荐事件区域 -->
      <section class="mb-12">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">热点推荐</h2>
          <router-link to="/events" class="text-primary-500 hover:text-primary-600 font-medium flex items-center">
            查看全部
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </router-link>
        </div>

        <!-- 事件卡片网格 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="event in featuredEvents" :key="event.id"
            class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow timeline-item cursor-pointer"
            @click="viewEventDetail(event.id)">
            <div class="h-48 bg-gray-200 relative">
              <img :src="event.coverImage" :alt="event.title" class="w-full h-full object-cover">
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 rounded-full text-sm font-medium" :class="getCategoryClass(event.category)">
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
                  <svg class="w-5 h-5" :fill="event.isBookmarked ? 'currentColor' : 'none'" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z">
                    </path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 分类浏览 -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">分类浏览</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="category in categories" :key="category.id"
            class="bg-white p-6 rounded-xl border border-gray-200 text-center hover:shadow-md transition-shadow cursor-pointer"
            @click="filterByCategory(category.name)">
            <div class="w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center" :class="category.bgColor">
              <span class="text-2xl">{{ category.icon }}</span>
            </div>
            <h3 class="font-semibold text-gray-900 mb-1">{{ category.name }}</h3>
            <p class="text-sm text-gray-500">{{ category.count }} 个事件</p>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <FooterView />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HeaderView from '../components/HeaderView.vue'
import FooterView from '../components/FooterView.vue'

const router = useRouter()

// 响应式数据
const searchQuery = ref('')
const isMobileMenuOpen = ref(false)
const featuredEvents = ref([])
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
    isBookmarked: false
  },
  {
    id: 2,
    title: '全球气候变化谈判关键节点',
    description: '从京都议定书到巴黎协定，梳理全球气候治理的重要里程碑事件',
    category: '国际',
    coverImage: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400',
    timelineCount: 32,
    updatedAt: '2024-01-12',
    isBookmarked: true
  },
  {
    id: 3,
    title: '新冠疫情全球大流行时间线',
    description: '记录新冠疫情从发现到全球传播，再到疫苗接种的关键时间节点',
    category: '社会',
    coverImage: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400',
    timelineCount: 67,
    updatedAt: '2024-01-10',
    isBookmarked: false
  }
]

// 计算属性
const filteredEvents = computed(() => {
  if (!searchQuery.value) return featuredEvents.value
  return featuredEvents.value.filter(event =>
    event.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// 方法
const handleSearch = (query) => {
  router.push(`/events?search=${encodeURIComponent(query)}`)
}

const viewEventDetail = (eventId) => {
  router.push(`/event/${eventId}`)
}

const toggleBookmark = (eventId) => {
  const event = featuredEvents.value.find(e => e.id === eventId)
  if (event) {
    event.isBookmarked = !event.isBookmarked
    // 这里可以添加 API 调用保存收藏状态
  }
}

const filterByCategory = (categoryName) => {
  router.push(`/events?category=${encodeURIComponent(categoryName)}`)
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

// 生命周期
onMounted(() => {
  // 模拟数据加载
  featuredEvents.value = mockEvents
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
</style>