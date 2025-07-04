<template>
    <div class="add-bill-form">
        <h3>Add a New Bill</h3>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="name">Bill Name</label>
                <input id="name" v-model="name" type="text" placeholder="e.g., Netflix" required>
            </div>
            <div class="form-group">
                <label for="amount">Amount ($)</label>
                <input id="amount" v-model="amount" type="number" step="0.01" placeholder="15.99" required>
            </div>
            <div class="form-group">
                <label for="due_day">Day of Month Due</label>
                <input id="due_day" v-model="due_day" type="number" min="1" max="31" placeholder="28" required>
            </div>
            <button type="submit" class="btn-primary">Add Bill</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['bill-added']);

const name = ref('');
const amount = ref('');
const due_day = ref('');

const handleSubmit = () => {
    if (!name.value || !amount.value || !due_day.value) return;

    const newBill = {
        name: name.value,
        amount: parseFloat(amount.value),
        due_day: parseInt(due_day.value),
    };
    emit('bill-added', newBill);

    // Reset form
    name.value = '';
    amount.value = '';
    due_day.value = '';
};
</script>

<style scoped>
.add-bill-form {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 2rem;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.btn-primary {
    /* Style your button */
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-primary:hover {
    background-color: #0056b3;
}
</style>
