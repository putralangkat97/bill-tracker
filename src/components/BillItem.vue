<script setup>
defineProps({
    bill: {
        type: Object,
        required: true,
    },
    isProcessing: {
        type: Boolean,
        default: false,
    }
});

defineEmits(['pay-bill', 'delete-bill']);

// Simple filter for adding 'st', 'nd', 'rd', 'th' to day numbers
const ordinal = (day) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = day % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
};
</script>

<template>
    <div
        class="card card-sm md:card-md bg-base-300 border border-secondary/10 shadow">
        <div class="card-body">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-2 md:gap-4">
                    <div class="bg-base-300 border-2 border-neutral/10 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">💰</div>
                    <div class="flex flex-col items-start">
                        <div class="font-bold text-base-content">{{ bill.name }}</div>
                        <div class="text-base-content/50">
                            {{
                                bill.is_paid_this_month
                                    ? 'Paid for this month'
                                    : `Due on the ${bill.due_day + ordinal(bill.due_day)}`
                            }}
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <div class="font-bold md:text-lg text-base-content mr-1 md:mr-3">${{ bill.amount.toFixed(2) }}</div>
                    <button class="btn btn-success btn-sm md:btn-md btn-circle text-xs" :disabled="isProcessing" @click="$emit('pay-bill', bill.id)">
                        <span v-if="isProcessing" class="loading loading-spinner"></span>
                        <span v-else>pay</span>
                    </button>
                    <button
                        type="button"
                        class="btn btn-circle btn-sm md:btn-md btn-error text-xs"
                        @click="$emit('delete-bill', bill.id)">
                        del
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
