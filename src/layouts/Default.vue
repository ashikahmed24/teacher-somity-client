<script setup>
import IconHome from "@/components/Icons/IconHome.vue";
import IconSettings from "@/components/Icons/IconSettings.vue";
import IconProfile from "@/components/Icons/IconProfile.vue";
import IconServer from "@/components/Icons/IconServer.vue";
import IconPower from "@/components/Icons/IconPower.vue";
import { onMounted, ref } from "vue";

const loading = ref(true);

onMounted(async () => {

    setTimeout(() => (loading.value = false), 1000);
});
</script>


<template>
    <div class="h-screen">
        <!-- Sidebar: Fixed -->
        <aside class="w-60 hidden md:flex flex-col fixed top-0 left-0 bottom-0 z-30 bg-white">

            <!-- Header Section -->
            <div class="bg-white flex items-center gap-2 px-2 py-3">
                <img src="/logo.png" class="h-10 w-auto" />
            </div>

            <!-- Scrollable Nav Section -->
            <nav class="bg-white flex-1 overflow-y-auto scrollbar px-2 py-4 space-y-2">
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

                <button type="button" @click="cacheClear()" class="nav__item w-full">
                    <IconServer class="size-5" />
                    <span class="ml-2">ক্যাশ মুছুন</span>
                </button>

                <button type="button" @click="logout" class="nav__item w-full">
                    <IconPower class="size-5" />
                    <span class="ml-2">লগআউট</span>
                </button>
            </nav>

        </aside>




        <!-- Main Content Wrapper -->
        <div class="flex-1 flex flex-col md:ml-60">

            <!-- Header: Sticky -->
            <header class="bg-white sticky top-0 z-30 px-4 py-3 flex items-center gap-6">

                <div class="flex-grow">
                    <div class="flex items-center justify-between">
                        <button type="button" class="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                            </svg>
                        </button>

                        <div class="flex-none">
                            <button type="button" class="flex items-center gap-2 cursor-pointer">
                                <img src="/profile.png" alt="Aslam" class="w-10 h-10 rounded-full" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Main -->
            <div class="space-y-4 m-4 rounded-xl flex-1">
                <div v-if="loading" class="bg-white h-dvh rounded-xl text-center py-10">
                    <img src="/loader.gif" alt="Loading..." class="mx-auto w-48 h-48" />
                </div>
                <slot v-else />
            </div>
        </div>
    </div>
</template>