<template>
    <footer class="bg-white border-t mt-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="mb-4 md:mb-0">
                    <div class="flex items-center space-x-2">
                        <div class="w-6 h-6 bg-primary-500 rounded-lg"></div>
                        <span class="text-lg font-bold text-gray-900">事件脉络</span>
                    </div>
                    <p class="text-gray-600 mt-2">专业的热点事件时间线管理平台</p>
                </div>
                <div class="flex space-x-6">
                    <router-link to="/about" class="text-gray-600 hover:text-gray-900">关于我们</router-link>
                    <a href="#" class="text-gray-600 hover:text-gray-900">联系我们</a>
                    <a href="#" class="text-gray-600 hover:text-gray-900">隐私政策</a>
                    <a href="#" class="text-gray-600 hover:text-gray-900">使用条款</a>
                </div>
            </div>
            <div class="border-t mt-8 pt-8 text-center text-gray-500">
                <p>&copy; 2024 事件脉络. 保留所有权利.</p>
            </div>
        </div>
    </footer>
</template>

<script setup>
// 页脚组件通常不需要复杂的逻辑
</script>