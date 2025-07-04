<script setup>
import { useUsers } from '../stores/user';

const store = useUsers()
const handleLogout = () => {
    store.logout();
};
</script>

<template>
    <header class="navbar bg-base-300">
        <div class="flex-1">
            <a class="btn btn-ghost text-xl">PucukBill</a>
        </div>
        <div class="flex gap-2">
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        />
                    </div>
                </div>
                <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                        <a class="justify-between">
                            Profile
                            <span class="badge">New</span>
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><button @click="handleLogout">Logout</button></li>
                </ul>
            </div>
        </div>
    </header>
</template>
