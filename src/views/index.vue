<script setup>
import Default from '@/layouts/Default.vue';
import { onMounted } from 'vue';
import { useDivisionStore } from '@/stores/division';
import { storeToRefs } from 'pinia';

const divisionStore = useDivisionStore();
const { divisions } = storeToRefs(divisionStore);

const loadDivisions = async () => {
    await divisionStore.all();
}

onMounted(() => {
    loadDivisions();
});
</script>

<template>
    <Default>
        <section class="">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">

                <!-- বিভাগ -->
                <div class="bg-white rounded-xl p-5 transition flex items-center gap-4 cursor-pointer">
                    <div class="bg-white rounded-full">
                        <img src="/icons/draft.png" alt="draft icon" class="h-16 w-16 object-contain" />
                    </div>
                    <div>
                        <h6 class="text-gray-700 text-sm font-medium">মোট বিভাগ</h6>
                        <p class="text-3xl font-semibold text-gray-900 mt-1">৮</p>
                    </div>
                </div>

                <!-- জেলা -->
                <div class="bg-white rounded-xl p-5 transition flex items-center gap-4 cursor-pointer">
                    <div class="bg-white rounded-full">
                        <img src="/icons/pending.png" alt="pending" class="h-16 w-16 object-contain" />
                    </div>
                    <div>
                        <h6 class="text-gray-600 text-sm font-medium">মোট জেলা</h6>
                        <p class="text-3xl font-semibold text-gray-900 mt-1">৬৪</p>
                    </div>
                </div>

                <!-- উপজেলা -->
                <div class="bg-white rounded-xl p-5 transition flex items-center gap-4 cursor-pointer">
                    <div class="bg-white rounded-full">
                        <img src="/icons/published.png" alt="published" class="h-16 w-16 object-contain" />
                    </div>
                    <div>
                        <h6 class="text-gray-600 text-sm font-medium">মোট উপজেলা</h6>
                        <p class="text-3xl font-semibold text-gray-900 mt-1">৪৯৮</p>
                    </div>
                </div>

                <!-- শিক্ষা প্রতিষ্ঠান -->
                <div class="bg-white rounded-xl p-5 transition flex items-center gap-4 cursor-pointer">
                    <div class="bg-white rounded-full">
                        <img src="/icons/archived.png" alt="archived" class="h-16 w-16 object-contain" />
                    </div>
                    <div>
                        <h6 class="text-gray-600 text-sm font-medium">মোট শিক্ষা প্রতিষ্ঠান</h6>
                        <p class="text-3xl font-semibold text-gray-900 mt-1">৪৯৯০</p>
                    </div>
                </div>

            </div>
        </section>



        <section class="">
            <div class="card">
                <div class="card__header">
                    <h3 class="card__title">মোট বিভাগ</h3>
                </div>

                <div class="card__body">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>name</th>
                                <th>Bn name</th>
                                <th>Website</th>
                                <th>শিক্ষা প্রতিষ্ঠান</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="division in divisions.data" :key="division.id">
                                <td>{{ division.id }}</td>
                                <td>{{ division.name }}</td>
                                <td>{{ division.bn_name }}</td>
                                <td>{{ division.url }}</td>
                                <td>
                                    {{ division.total_institutions }}
                                </td>
                                <td>

                                    <div class="space-x-2">
                                        <button type="button" class="badge badge__info">Edit</button>
                                        <button type="button" class="badge badge__danger">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

    </Default>

</template>