<script setup>
import { ref } from 'vue';

const emit = defineEmits(['close', 'bill-added']);
const name = ref('');
const amount = ref('');
const due_day = ref('');

const handleSubmit = () => {
    emit('bill-added', {
        name: name.value,
        amount: parseFloat(amount.value),
        due_day: parseInt(due_day.value),
    });
    emit('close');
};
</script>

<template>
    <div class="fixed inset-0 bg-neutral/90 flex items-center justify-center z-50" @click.self="$emit('close')">
        <div class="bg-base-300 card shadow-xl w-full max-w-md">
            <div class="card-body">
                <h3 class="text-2xl font-bold mb-6 text-base-content">Add a New Bill</h3>
                <form @submit.prevent="handleSubmit">
                    <div class="space-y-4">
                        <div>
                            <label for="name" class="floating-label">
                                <span>Bill Name</span>
                                <input id="name" v-model="name" type="text" class="mt-1 block w-full input input-lg"
                                    placeholder="Rent, Netflix, Spotify, etc." required />
                            </label>
                        </div>
                        <div>
                            <label for="amount" class="floating-label">
                                <span>Amount ($)</span>
                                <input id="amount" v-model="amount" type="number" step="0.01"
                                    class="mt-1 block w-full input input-lg" placeholder="Amount ($)" required />
                            </label>
                        </div>
                        <div>
                            <label for="due_day" class="floating-label">
                                <span>Day of Month Due (1-31)</span>
                                <input id="due_day" v-model="due_day" type="number" min="1" max="31"
                                    class="mt-1 block w-full input input-lg" placeholder="1-31" required />
                            </label>
                        </div>
                    </div>
                    <div class="mt-8 flex flex-col justify-end gap-2">
                        <button type="submit" class="btn btn-accent">
                            <span>Add Bill</span>
                        </button>
                        <button class="btn btn-base-200 text-base-content" type="button" @click="$emit('close')">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
