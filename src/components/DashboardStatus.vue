<script setup>
defineProps({
    data: {
        type: [Object, Array],
        default: null,
    },
    title: {
        type: String,
        default: "Stats Title"
    },
    titleClass: {
        type: String,
        default: 'text-primary-content'
    },
    valueClass: {
        type: String,
        default: 'text-primary-content'
    },
})
</script>

<template>
    <div class="stats shadow">
        <div class="stat">
            <div class="stat-title" :class="titleClass">{{ title }}</div>
            <div class="stat-value font-medium text-2xl" :class="valueClass">{{ data }}</div>
        </div>
    </div>
</template>
