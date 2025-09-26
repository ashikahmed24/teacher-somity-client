<script setup>
import Default from '@/layouts/Default.vue';
import { useDivisionStore } from '@/stores/division';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const divisionStore = useDivisionStore();
const { divisions } = storeToRefs(divisionStore);

const loadDivisions = async () => {
    divisionStore.all();
}


onMounted(() => {
    loadDivisions();
});
</script>

<template>
    <Default>
        <div class="card">
            <div class="card__header">
                <h3 class="card__title">বিভাগ</h3>
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
    </Default>
</template>

<style scoped></style>