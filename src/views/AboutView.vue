<template>
    <div class="min-h-screen bg-gray-50">
        <!-- 导航栏 -->
        <HeaderView :show-search="false" />

        <!-- 主要内容区 -->
        <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- 页面标题 -->
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold text-gray-900 mb-4">关于我们</h1>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                    事件脉络致力于提供专业、客观、可视化的热点事件时间线，帮助用户更好地理解事件发展脉络
                </p>
            </div>

            <!-- 平台介绍 -->
            <section class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-12">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">我们的使命</h2>
                        <p class="text-gray-600 mb-6 leading-relaxed">
                            在信息爆炸的时代，热点事件层出不穷，但往往缺乏系统性的梳理和呈现。事件脉络平台通过专业的时间线管理，
                            将复杂的事件发展过程以清晰、直观的方式展现给用户，帮助大家更好地理解事件的来龙去脉。
                        </p>
                        <p class="text-gray-600 mb-6 leading-relaxed">
                            我们相信，只有了解事件的完整脉络，才能做出更准确的判断和决策。无论是社会热点、科技发展还是国际大事，
                            我们都致力于提供最全面、最客观的时间线记录。
                        </p>
                        <div class="flex flex-wrap gap-4">
                            <div class="flex items-center space-x-2">
                                <div class="w-3 h-3 bg-primary-500 rounded-full"></div>
                                <span class="text-gray-700">专业团队维护</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <div class="w-3 h-3 bg-primary-500 rounded-full"></div>
                                <span class="text-gray-700">客观事实呈现</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <div class="w-3 h-3 bg-primary-500 rounded-full"></div>
                                <span class="text-gray-700">持续更新完善</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <div
                            class="w-full max-w-md h-64 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                            <div class="text-white text-center">
                                <div
                                    class="w-16 h-16 bg-gray-300 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <h3 class="text-xl font-semibold">时间线可视化</h3>
                                <p class="text-blue-100 mt-2">清晰呈现事件发展脉络</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 核心特色 -->
            <section class="mb-12">
                <h2 class="text-3xl font-bold text-gray-900 text-center mb-8">核心特色</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                                </path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-3">专业时间线</h3>
                        <p class="text-gray-600">
                            由专业团队精心梳理和制作的事件时间线，确保信息的准确性和完整性，帮助用户全面了解事件发展过程。
                        </p>
                    </div>

                    <div class="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-3">快速更新</h3>
                        <p class="text-gray-600">
                            紧跟时事热点，及时更新最新进展，确保用户能够获取最新、最全面的信息，不错过任何重要节点。
                        </p>
                    </div>

                    <div class="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122">
                                </path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-3">多维度呈现</h3>
                        <p class="text-gray-600">
                            提供垂直和水平两种时间线视图，支持图片、链接等多种媒体形式，让用户从多个角度理解事件。
                        </p>
                    </div>
                </div>
            </section>

            <!-- 团队介绍 -->
            <section class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-12">
                <h2 class="text-3xl font-bold text-gray-900 text-center mb-8">我们的团队</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="text-center">
                        <div class="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200" alt="张明"
                                class="w-full h-full rounded-full object-cover">
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-1">张明</h3>
                        <p class="text-gray-500 text-sm mb-2">产品负责人</p>
                        <p class="text-gray-600 text-sm">
                            负责平台整体规划和产品设计，拥有8年互联网产品经验。
                        </p>
                    </div>

                    <div class="text-center">
                        <div class="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200" alt="李华"
                                class="w-full h-full rounded-full object-cover">
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-1">李华</h3>
                        <p class="text-gray-500 text-sm mb-2">内容总监</p>
                        <p class="text-gray-600 text-sm">
                            资深媒体人，负责事件时间线的策划和内容质量控制。
                        </p>
                    </div>

                    <div class="text-center">
                        <div class="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" alt="王芳"
                                class="w-full h-full rounded-full object-cover">
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-1">王芳</h3>
                        <p class="text-gray-500 text-sm mb-2">技术主管</p>
                        <p class="text-gray-600 text-sm">
                            全栈工程师，负责平台技术架构和功能开发。
                        </p>
                    </div>

                    <div class="text-center">
                        <div class="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200" alt="赵强"
                                class="w-full h-full rounded-full object-cover">
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-1">赵强</h3>
                        <p class="text-gray-500 text-sm mb-2">数据分析师</p>
                        <p class="text-gray-600 text-sm">
                            负责事件数据的收集、整理和分析，确保信息准确性。
                        </p>
                    </div>
                </div>
            </section>

            <!-- 数据统计 -->
            <section class="mb-12">
                <h2 class="text-3xl font-bold text-gray-900 text-center mb-8">平台数据</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div class="bg-white rounded-xl p-6 text-center border border-gray-200">
                        <div class="text-3xl font-bold text-primary-500 mb-2">{{ stats.eventsCount.toLocaleString() }}+
                        </div>
                        <p class="text-gray-600">收录事件</p>
                    </div>
                    <div class="bg-white rounded-xl p-6 text-center border border-gray-200">
                        <div class="text-3xl font-bold text-primary-500 mb-2">{{ stats.timelineNodes.toLocaleString()
                        }}+</div>
                        <p class="text-gray-600">时间节点</p>
                    </div>
                    <div class="bg-white rounded-xl p-6 text-center border border-gray-200">
                        <div class="text-3xl font-bold text-primary-500 mb-2">{{ stats.activeUsers.toLocaleString() }}+
                        </div>
                        <p class="text-gray-600">月活跃用户</p>
                    </div>
                    <div class="bg-white rounded-xl p-6 text-center border border-gray-200">
                        <div class="text-3xl font-bold text-primary-500 mb-2">{{ stats.categoriesCount }}</div>
                        <p class="text-gray-600">事件分类</p>
                    </div>
                </div>
            </section>

            <!-- 联系我们 -->
            <section class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h2 class="text-3xl font-bold text-gray-900 mb-4">联系我们</h2>
                        <p class="text-gray-600 mb-6">
                            如果您有任何建议、合作意向或发现问题，欢迎通过以下方式与我们联系。我们重视每一位用户的反馈。
                        </p>
                        <div class="space-y-4">
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                        </path>
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">邮箱地址</p>
                                    <p class="text-gray-900">contact@shijianmailuo.com</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z">
                                        </path>
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">用户反馈</p>
                                    <p class="text-gray-900">feedback@shijianmailuo.com</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                                        </path>
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">商务合作</p>
                                    <p class="text-gray-900">business@shijianmailuo.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-4">关注我们</h3>
                        <p class="text-gray-600 mb-6">
                            关注我们的社交媒体账号，获取最新事件时间线更新和平台动态。
                        </p>
                        <div class="flex space-x-4">
                            <a href="#"
                                class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                            </a>
                            <a href="#"
                                class="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-white hover:bg-gray-900 transition-colors">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a href="#"
                                class="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <!-- 页脚 -->
        <FooterView />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeaderView from '../components/HeaderView.vue'
import FooterView from '../components/FooterView.vue'

// 响应式数据
const isMobileMenuOpen = ref(false)

// 平台统计数据
const stats = ref({
    eventsCount: 0,
    timelineNodes: 0,
    activeUsers: 0,
    categoriesCount: 8
})

// 模拟数据加载动画
onMounted(() => {
    // 模拟数据加载延迟
    setTimeout(() => {
        stats.value = {
            eventsCount: 285,
            timelineNodes: 4236,
            activeUsers: 12500,
            categoriesCount: 8
        }
    }, 500)
})
</script>

<style scoped>
/* 可以添加自定义样式 */
</style>