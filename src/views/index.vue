<script setup>
import Default from '@/layouts/Default.vue';
import { reactive } from 'vue';

const orders = reactive([
    {
        id: 1,
        user: {
            name: "Ashik Ahmed",
            phone: "01712345678",
            avatar_url: "https://i.pravatar.cc/100?img=1",
        },
        invoice_id: "INV-1001",
        subtotal_formatted: "৳ 4,500",
        discount_formatted: "৳ 500",
        total_formatted: "৳ 4,000",
        status: "Paid",
    },
    {
        id: 2,
        user: {
            name: "Nusrat Jahan",
            phone: "01898765432",
            avatar_url: "https://i.pravatar.cc/100?img=2",
        },
        invoice_id: "INV-1002",
        subtotal_formatted: "৳ 3,200",
        discount_formatted: "৳ 200",
        total_formatted: "৳ 3,000",
        status: "Pending",
    },
    {
        id: 3,
        user: {
            name: "Rakib Hasan",
            phone: "01611223344",
            avatar_url: "https://i.pravatar.cc/100?img=3",
        },
        invoice_id: "INV-1003",
        subtotal_formatted: "৳ 2,000",
        discount_formatted: "৳ 0",
        total_formatted: "৳ 2,000",
        status: "Cancelled",
    },
]);
</script>

<template>
    <Default>
        <section class="">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <!-- Draft -->
                <div class="bg-white rounded-xl p-5 transition flex items-center gap-4 cursor-pointer">
                    <div class="bg-white rounded-full">
                        <img src="/icons/draft.png" alt="draft icon" class="h-16 w-16 object-contain" />
                    </div>
                    <div>
                        <h6 class="text-gray-700 text-sm font-medium">Total Draft</h6>
                        <p class="text-3xl font-semibold text-gray-900 mt-1">555</p>
                    </div>
                </div>

                <!-- Pending -->
                <div class="bg-white rounded-xl p-5 transition flex items-center gap-4 cursor-pointer">
                    <div class="bg-white rounded-full">
                        <img src="/icons/pending.png" alt="pending" class="h-16 w-16 object-contain" />
                    </div>
                    <div>
                        <h6 class="text-gray-600 text-sm font-medium">Total Pending</h6>
                        <p class="text-3xl font-semibold text-gray-900 mt-1">55</p>
                    </div>
                </div>

                <!-- Published -->
                <div class="bg-white rounded-xl p-5 transition flex items-center gap-4 cursor-pointer">
                    <div class="bg-white rounded-full">
                        <img src="/icons/published.png" alt="published" class="h-16 w-16 object-contain" />
                    </div>
                    <div>
                        <h6 class="text-gray-600 text-sm font-medium">Total Published</h6>
                        <p class="text-3xl font-semibold text-gray-900 mt-1">15</p>
                    </div>
                </div>

                <!-- Archived -->
                <div class="bg-white rounded-xl p-5 transition flex items-center gap-4 cursor-pointer">
                    <div class="bg-white rounded-full">
                        <img src="/icons/archived.png" alt="archived" class="h-16 w-16 object-contain" />
                    </div>
                    <div>
                        <h6 class="text-gray-600 text-sm font-medium">Total Archived</h6>
                        <p class="text-3xl font-semibold text-gray-900 mt-1">12</p>
                    </div>
                </div>
            </div>
        </section>


        <section class="">
            <div class="card">
                <div class="card__header">
                    <h3 class="card__title">Transtions</h3>
                </div>

                <div class="card__body">
                    <div class="relative overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Invoice ID</th>
                                    <th>subtotal</th>
                                    <th>discount</th>
                                    <th>total</th>
                                    <th>status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="order in orders" :key="order.id">
                                    <td>
                                        <div class="flex items-center">
                                            <img :src="order.user.avatar_url" :alt="order.user.name"
                                                class="w-12 h-12 rounded-full border object-cover" />
                                            <div class="ml-4">
                                                <div class="font-medium text-gray-800">{{ order.user.name }}</div>
                                                <div class="text-xs text-gray-500">{{ order.user.phone }}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>#{{ order.invoice_id }}</td>
                                    <td>{{ order.subtotal_formatted }}</td>
                                    <td>{{ order.discount_formatted }}</td>
                                    <td>{{ order.total_formatted }}</td>
                                    <td>{{ order.status }}</td>
                                    <td>
                                        <RouterLink to="/" class="badge badge__info">View
                                        </RouterLink>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>

    </Default>

</template>