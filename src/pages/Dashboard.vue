<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '../services/api'; // Assuming your api service is correctly set up
import BillItem from '../components/BillItem.vue';
import AddBillModal from '../components/AddBillModal.vue';
import { useUsers } from '../stores/user'; // Assuming this handles logout
import Navbar from '../components/Navbar.vue';
import DashboardStatus from '../components/DashboardStatus.vue';

// --- State Management ---
// State now directly mirrors the API response structure for clarity
const summary = ref({ total_due: 0, bills_left_count: 0, next_bill_due: null });
const unpaidBills = ref([]);
const paidBills = ref([]);

// UI State
const isLoading = ref(true);
const error = ref(null);
const processingBillId = ref(null);
const isAddModalOpen = ref(false);

const store = useUsers();

// --- Core Logic ---

// Central function to fetch all dashboard data and update the state
const fetchDashboardData = async () => {
    try {
        const response = await api.getBills();
        const data = response.data;

        summary.value = data.summary;
        unpaidBills.value = data.unpaid_bills;
        paidBills.value = data.paid_bills;
    } catch (err) {
        error.value = 'Failed to load dashboard data. Please try again later.';
        console.error(err);
    } finally {
        isLoading.value = false;
    }
};

// Fetch data when the component is first mounted
onMounted(fetchDashboardData);

// --- Action Handlers ---
// All actions now follow a simple pattern: perform API call, then refresh data.

const addBill = async (newBillData) => {
    try {
        await api.addBill(newBillData);
        await fetchDashboardData(); // Refresh the entire dashboard for consistency
    } catch (err) {
        alert('Error adding bill. Please check your input.');
        console.error(err);
    }
};

const markAsPaid = async (billId) => {
    processingBillId.value = billId;
    try {
        await api.markBillAsPaid(billId);
        await fetchDashboardData(); // Refresh to move the bill from unpaid to paid
    } catch (err) {
        alert('Error marking bill as paid.');
        console.error(err);
    } finally {
        processingBillId.value = null;
    }
};

const deleteBill = async (billId) => {
    if (!confirm('Are you sure you want to permanently delete this bill?')) return;
    try {
        await api.deleteBill(billId);
        await fetchDashboardData(); // Refresh to remove the bill from the UI
    } catch (err) {
        alert('Error deleting bill.');
        console.error(err);
    }
};

// --- Computed property for cleaner template display ---
const nextBillDueText = computed(() => {
    if (!summary.value.next_bill_due) {
        return 'Nothing';
    }
    const { name, due_in, is_overdue } = summary.value.next_bill_due;
    return `${name} (${is_overdue ? 'Overdue' : `in ${due_in}`})`;
});
</script>

<template>
    <div class="bg-base-100 text-base-content min-h-screen font-sans">
        <!-- Header -->
        <Navbar />

        <main class="p-4 md:p-8">
            <!-- Summary Cards: Bind directly to the summary object -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <DashboardStatus class="bg-primary" :title-class="'text-primary-content'"
                    :value-class="'text-primary-content'" :title="'Total Due This Month'"
                    :data="`$${summary.total_due.toFixed(2)}`" />
                <DashboardStatus class="bg-secondary" :title-class="'text-secondary-content'"
                    :value-class="'text-secondary-content'" :title="'Bills Left to Pay'"
                    :data="summary.bills_left_count" />
                <DashboardStatus class="bg-accent" :title-class="'text-accent-content'"
                    :value-class="'text-accent-content'" :title="'Next Bill Due'" :data="nextBillDueText" />
            </div>

            <div v-if="isLoading" class="text-center p-8">Loading...</div>
            <div v-if="error" class="text-center p-8 text-red-400">{{ error }}</div>

            <!-- Bill Lists: Check if there's any data at all to display -->
            <div v-if="!isLoading && (unpaidBills.length > 0 || paidBills.length > 0)">
                <!-- Unpaid Bills -->
                <div class="mb-12">
                    <h2 class="text-xl font-bold mb-4 text-base-content/80">Upcoming Bills</h2>
                    <div class="space-y-4">
                        <BillItem v-for="bill in unpaidBills" :key="bill.id" :bill="bill"
                            :is-processing="processingBillId === bill.id" @pay-bill="markAsPaid"
                            @delete-bill="deleteBill" />
                    </div>
                    <p v-if="unpaidBills.length === 0" class="text-center text-gray-500 py-8">All bills paid! 🎉</p>
                </div>

                <!-- Paid Bills -->
                <div class="mb-20">
                    <h2 class="text-xl font-bold mb-4 text-base-content/80">Recently Paid</h2>
                    <div class="space-y-4">
                        <BillItem v-for="bill in paidBills" :key="bill.id" :bill="bill" @delete-bill="deleteBill" />
                    </div>
                </div>
            </div>

            <!-- Empty State for new users -->
            <div v-if="!isLoading && unpaidBills.length === 0 && paidBills.length === 0"
                class="text-center text-gray-500 py-16">
                <p class="text-lg">You haven't added any bills yet.</p>
                <p>Click the '+' button to get started!</p>
            </div>

        </main>

        <!-- Floating Action Button remains the same -->
        <button
            class="fixed btn bottom-8 btn-circle right-8 btn-accent w-14 h-14 flex items-center justify-center shadow-lg border-4 border-neutral/20 text-3xl font-normal"
            @click="isAddModalOpen = true">
            +
        </button>

        <!-- Add Bill Modal remains the same -->
        <AddBillModal v-if="isAddModalOpen" @close="isAddModalOpen = false" @bill-added="addBill" />
    </div>
</template>
