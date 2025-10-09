<script setup>
import IconHome from "@/components/Icons/IconHome.vue";
import IconSettings from "@/components/Icons/IconSettings.vue";
import IconServer from "@/components/Icons/IconServer.vue";
import IconPower from "@/components/Icons/IconPower.vue";
import { onMounted, ref } from "vue";

const loading = ref(true);
const sidebarOpen = ref(false);

onMounted(() => {
    setTimeout(() => (loading.value = false), 1000);
});

const cacheClear = () => {
    console.log("Cache cleared!");
};

const logout = () => {
    console.log("Logged out!");
};
</script>

<template>
    <div class="h-screen flex">
        <!-- Sidebar -->
        <aside :class="[
            'w-60 flex flex-col fixed top-0 bottom-0 z-40 bg-white transition-transform duration-300',
            sidebarOpen ? 'translate-x-0' : '-translate-x-60 md:translate-x-0'
        ]">
            <!-- Header Section -->
            <div class="flex items-center gap-2 px-2 py-3">
                <img src="/logo.png" class="h-10 w-auto" />
                <span class="font-bold text-sm">বাংলাদেশ বেসরকারী <br /> শিক্ষক সমিতি</span>
            </div>

            <!-- Scrollable Nav -->
            <nav class="flex-1 overflow-y-auto px-2 py-4 space-y-2">
                <RouterLink :to="{ name: 'home' }" active-class="active" class="nav__item">
                    <IconHome class="size-5" />
                    <span class="ml-3">প্রচ্ছদ</span>
                </RouterLink>

                <RouterLink :to="{ name: 'divisions' }" active-class="active" class="nav__item">
                    <IconSettings class="size-5" />
                    <span class="ml-2">বিভাগ</span>
                </RouterLink>

                <RouterLink :to="{ name: 'districts' }" active-class="active" class="nav__item">
                    <IconSettings class="size-5" />
                    <span class="ml-2">জেলা</span>
                </RouterLink>

                <RouterLink :to="{ name: 'upazilas' }" active-class="active" class="nav__item">
                    <IconSettings class="size-5" />
                    <span class="ml-2">উপজেলা</span>
                </RouterLink>

                <RouterLink :to="{ name: 'institutions' }" active-class="active" class="nav__item">
                    <IconHome class="size-5" />
                    <span class="ml-3">শিক্ষা প্রতিষ্ঠান</span>
                </RouterLink>

                <button type="button" @click="cacheClear" class="nav__item w-full">
                    <IconServer class="size-5" />
                    <span class="ml-2">ক্যাশ মুছুন</span>
                </button>

                <button type="button" @click="logout" class="nav__item w-full">
                    <IconPower class="size-5" />
                    <span class="ml-2">লগআউট</span>
                </button>
            </nav>
        </aside>

        <!-- Overlay (mobile only) -->
        <div v-if="sidebarOpen" class="fixed inset-0 bg-black/20 z-30 md:hidden" @click="sidebarOpen = false"></div>

        <!-- Main Content -->
        <div class="flex-1 flex flex-col md:ml-60">
            <!-- Header -->
            <header class="bg-white sticky top-0 z-30 px-4 py-3 flex items-center justify-between">
                <!-- Hamburger Menu -->
                <button type="button" class="cursor-pointer" @click="sidebarOpen = !sidebarOpen">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                    </svg>
                </button>

                <!-- Profile -->
                <div class="flex items-center gap-3">
                    <img src="/profile.png" alt="Profile" class="w-10 h-10 rounded-full" />
                    <span class="hidden md:inline font-medium">Aslam</span>
                </div>
            </header>

            <!-- Page Content -->
            <main class="space-y-4 m-4 rounded-xl flex-1">
                <div v-if="loading" class="bg-white h-dvh rounded-xl flex items-center justify-center">
                    <img src="/loader.gif" alt="Loading..." class="w-32 h-32" />
                </div>
                <slot v-else />
            </main>
        </div>
    </div>
</template>

<style scoped></style>
