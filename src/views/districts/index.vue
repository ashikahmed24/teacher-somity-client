<script setup>
import Default from '@/layouts/Default.vue';

import { useDistrictStore } from '@/stores/district';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const districtStore = useDistrictStore();
const { districts } = storeToRefs(districtStore);

const loadDistricts = async (page = 1) => {
    districtStore.all(page);
}


onMounted(() => {
    loadDistricts();
});
</script>

<template>
    <Default>
        <div class="card">
            <div class="card__header">
                <h3 class="card__title">জেলা</h3>
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
                            <th>Division</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="district in districts.data" :key="district.id">
                            <td>{{ district.id }}</td>
                            <td>{{ district.name }}</td>
                            <td>{{ district.bn_name }}</td>
                            <td>{{ district.url }}</td>
                            <td>{{ district.division.name }}</td>
                            <td>

                                <div class="space-x-2">
                                    <button type="button" class="badge badge__info">Edit</button>
                                    <button type="button" class="badge badge__danger">Delete</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="px-4 py-2">
                    <Pagination :total-items="districts?.meta?.total" :current-page="districts?.meta?.current_page"
                        :items-per-page="districts?.meta?.per_page" :pages-to-show="1" @page-change="loadDistricts"
                        visible-always />
                </div>
            </div>
        </div>
    </Default>
</template>

<style scoped></style>