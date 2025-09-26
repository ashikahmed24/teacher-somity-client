<script setup>
import IconCustomers from '@/components/Icons/IconCustomers.vue';
import IconHome from '@/components/Icons/IconHome.vue';
import IconInvoices from '@/components/Icons/IconInvoices.vue';
import IconPayment from '@/components/Icons/IconPayment.vue';
import IconPower from '@/components/Icons/IconPower.vue';
import IconProfile from '@/components/Icons/IconProfile.vue';
import IconServer from '@/components/Icons/IconServer.vue';
import IconSettings from '@/components/Icons/IconSettings.vue';
import { ref, onMounted, reactive } from 'vue';

const loading = ref(true);

const form = reactive({
    year: "2025-26",
    exam: "১ম সাময়িক পরীক্ষা",
});

const openMenu = ref(null);
const toggleMenu = (menu) => {
    openMenu.value = openMenu.value === menu ? null : menu;
};

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 1000);
});
</script>


<template>
    <main class="h-screen">
        <div v-if="loading" class="bg-white h-dvh rounded-xl text-center py-10">
            <img src="/loader.gif" alt="Loading..." class="mx-auto w-48 h-48" />
        </div>
        <slot v-else />
    </main>
</template>