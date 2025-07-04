import axios from '@/lib/axios'

const csrf = async () => {
    await axios.get('/sanctum/csrf-cookie')
}

const getBills = async () => {
    await csrf();
    return await axios.get('/api/bills');
}

const addBill = async (bill) => {
    await csrf();
    return await axios.post('/api/bills', bill);
}

const markBillAsPaid = async (billId) => {
    await csrf();
    return await axios.post(`/api/bills/${billId}/pay`);
}

const deleteBill = async (billId) => {
    await csrf();
    return await axios.delete(`/api/bills/${billId}`);
}

export default {
    getBills,
    addBill,
    markBillAsPaid,
    deleteBill,
}
