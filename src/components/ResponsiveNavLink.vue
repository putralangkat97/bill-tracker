<script setup>
import { computed } from 'vue'
// import { Link } from '@inertiajs/inertia-vue3';

const props = defineProps(['active'])

const classes = computed(() =>
    props.active
        ? 'block pl-3 pr-4 py-2 border-l-4 border-indigo-400 text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-hidden focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out'
        : 'block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-hidden focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out',
)
</script>

<template>
    <a :class="classes">
        <slot />
    </a>
</template>
