<script setup>
import Default from '@/layouts/Default.vue';
import { useUpazilaStore } from '@/stores/upazila';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const upazilaStore = useUpazilaStore();
const { upazilas } = storeToRefs(upazilaStore);

const loadUpazilas = async (page = 1) => {
    upazilaStore.all(page);
}


onMounted(() => {
    loadUpazilas();
});
</script>

<template>
    <Default>
        <div class="card">
            <div class="card__header">
                <h3 class="card__title">উপজেলা</h3>
                <button class="base__button">যোগ করি</button>
            </div>

            <div class="card__body">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>name</th>
                            <th>Bn name</th>
                            <th>Website</th>
                            <th>District</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="upazila in upazilas.data" :key="upazila.id">
                            <td>{{ upazila.id }}</td>
                            <td>{{ upazila.name }}</td>
                            <td>{{ upazila.bn_name }}</td>
                            <td>{{ upazila.url }}</td>
                            <td>{{ upazila.district?.name }}</td>
                            <td>

                                <div class="space-x-2">
                                    <button type="button" class="badge badge__info">Edit</button>
                                    <button type="button" class="badge badge__danger">Delete</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="flex justify-end items-end py-2">
                    <Pagination :total-items="upazilas?.meta?.total" :current-page="upazilas?.meta?.current_page"
                        :items-per-page="upazilas?.meta?.per_page" :pages-to-show="1" @page-change="loadUpazilas"
                        visible-always />
                </div>
            </div>
        </div>
    </Default>
</template>

<style scoped></style>