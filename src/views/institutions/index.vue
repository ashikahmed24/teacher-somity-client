<script setup>
import BaseSelect from '@/components/BaseSelect.vue';
import Default from '@/layouts/Default.vue';
import { onMounted, reactive, ref } from 'vue';
import { useDivisionStore } from '@/stores/division';
import { useDistrictStore } from '@/stores/district';
import { useUpazilaStore } from '@/stores/upazila';
import BaseDialog from '@/components/BaseDialog.vue';
import BaseInput from '@/components/BaseInput.vue';
import { useInstitutionStore } from '@/stores/institution';
import { storeToRefs } from 'pinia';
import BaseButton from '@/components/BaseButton.vue';
import { useToastStore } from '@/stores/toast';

const toastStore = useToastStore();
const divisionStore = useDivisionStore();
const districtStore = useDistrictStore();
const upazilaStore = useUpazilaStore();
const institutionStore = useInstitutionStore();

const { errors } = storeToRefs(institutionStore);

const search = reactive({
    division_id: "",
    district_id: "",
    upazila_id: "",
});

const divisionOptions = ref([]);
const districtOptions = ref([]);
const upazilaOptions = ref([]);
const institutions = ref([]);

// Dialog visibility
const showAddDialog = ref(false);
const showViewDialog = ref(false);
const showEditDialog = ref(false);
const selectedInstitution = ref(null);

// Load Divisions
const loadDivisions = async () => {
    const { data } = await divisionStore.dropdown();
    divisionOptions.value = data.map(division => ({
        label: division.name,
        value: division.id,
    }));
};

// Load Districts (by division_id)
const loadDistricts = async () => {
    if (!search.division_id) {
        districtOptions.value = [];
        upazilaOptions.value = [];
        institutions.value = [];
        return;
    }
    const { data } = await divisionStore.districts(search.division_id);
    districtOptions.value = data.map(district => ({
        label: district.name,
        value: district.id,
    }));

    search.district_id = "";
    search.upazila_id = "";
    institutions.value = [];
    upazilaOptions.value = [];
};

// Load Upazilas (by district_id)
const loadUpazilas = async () => {
    if (!search.district_id) {
        upazilaOptions.value = [];
        institutions.value = [];
        return;
    }
    const { data } = await districtStore.upazilas(search.district_id);
    upazilaOptions.value = data.map(upazila => ({
        label: upazila.name,
        value: upazila.id,
    }));

    search.upazila_id = "";
    institutions.value = [];
};

// Load Institutions (by upazila_id)
const loadInstitutions = async () => {
    if (!search.upazila_id) {
        institutions.value = [];
        return;
    }
    const { data } = await upazilaStore.institutions(search.upazila_id);
    institutions.value = data;
};

// Dialog functions
const viewDialog = (institution) => {
    selectedInstitution.value = institution;
    showViewDialog.value = true;
}
const editDialog = (institution) => {
    selectedInstitution.value = institution;

    // update reactive object values
    update.name = institution.name || '';
    update.phone = institution.phone || '';
    update.established_year = institution.established_year || '';
    update.land_area = institution.land_area || '';
    update.eiin = institution.eiin || '';
    update.address = institution.address || '';

    showEditDialog.value = true;
}

const update = reactive({
    name: '',
    phone: '',
    established_year: '',
    land_area: '',
    eiin: '',
    address: '',
});

const onUpdate = async () => {
    const response = await institutionStore.update(selectedInstitution.value.id, update);
    console.log(response);
    if (response.status === 200) {
        showEditDialog.value = false;
        toastStore.success(response.data.message);
    }
}

const deleteInstitution = async (institution) => {
    if (confirm("Are you sure you want to delete this institution?")) {
        await institutionStore.delete(institution);
    }
    loadInstitutions();
}




// Initial Load
onMounted(() => {
    loadDivisions();
});
</script>

<template>
    <Default>
        <div class="card">
            <div class="card__header flex justify-between items-center">
                <h3 class="card__title">শিক্ষা প্রতিষ্ঠানের তথ্য</h3>
                <RouterLink :to="{ name: 'institutions.create' }" class="base__button">যোগ করি</RouterLink>
            </div>


            <div class="card__body">
                <form class="w-full mb-4">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <BaseSelect label="বিভাগ" :options="divisionOptions" v-model="search.division_id"
                            @change="loadDistricts" />
                        <BaseSelect label="জেলা" :options="districtOptions" v-model="search.district_id"
                            @change="loadUpazilas" />
                        <BaseSelect label="উপজেলা" :options="upazilaOptions" v-model="search.upazila_id" />
                    </div>
                    <button type="button" @click="loadInstitutions"
                        class="base__button cursor-pointer w-full mt-3">সাবমিট
                        করুন</button>
                </form>

                <div class="py-8">
                    <!-- Institutions Table -->
                    <template v-if="institutions.length > 0">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>বিদ্যালয়ের নাম</th>
                                    <th>মোবাইল</th>
                                    <th>প্রতিষ্ঠার সাল</th>
                                    <th>জমির পরিমান</th>
                                    <th>EIIN</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(institution, index) in institutions" :key="institution.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ institution.name }}</td>
                                    <td>{{ institution.phone || '-' }}</td>
                                    <td>{{ institution.established_year || '-' }}</td>
                                    <td>{{ institution.land_area || '-' }}</td>
                                    <td>{{ institution.eiin || '-' }}</td>
                                    <td>
                                        <div class="space-x-2">
                                            <button type="button" @click="viewDialog(institution)"
                                                class="badge badge__primary">View</button>
                                            <button type="button" @click="editDialog(institution)"
                                                class="badge badge__info">Edit</button>
                                            <button type="button" @click="deleteInstitution(institution.id)"
                                                class="badge badge__danger">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="flex items-center justify-center py-6">
                            <button type="button" class="base__button cursor-pointer gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
                                </svg>

                                Print
                            </button>
                        </div>
                    </template>

                    <!-- Empty State -->
                    <template v-else>
                        <div
                            class="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center space-y-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-16 h-16">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                            <span class="text-gray-500 text-center text-sm">একটি প্রতিষ্ঠান নির্বাচন করুন</span>
                        </div>
                    </template>
                </div>
            </div>
        </div>



        <!-- View Dialog -->
        <BaseDialog :show="showViewDialog" title="View Institution" @close="showViewDialog = false">
            <div class="p-4">
                <p><strong>Name:</strong> {{ selectedInstitution?.name }}</p>
                <p><strong>Phone:</strong> {{ selectedInstitution?.phone }}</p>
                <p><strong>Established Year:</strong> {{ selectedInstitution?.established_year }}</p>
                <p><strong>Land Area:</strong> {{ selectedInstitution?.land_area }}</p>
                <p><strong>EIIN:</strong> {{ selectedInstitution?.eiin }}</p>
                <p><strong>Address:</strong> {{ selectedInstitution?.address }}</p>
            </div>
        </BaseDialog>

        <!-- Edit Dialog -->
        <BaseDialog :show="showEditDialog" size="max-w-2xl" title="Edit Institution" @close="showEditDialog = false">
            <form @submit.prevent="onUpdate">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <BaseInput label="Name" v-model="update.name" :required="true" :error="errors.name" />
                    <BaseInput label="Phone" v-model="update.phone" :required="true" :error="errors.phone" />
                    <BaseInput label="Established Year" v-model="update.established_year" :required="true"
                        :error="errors.established_year" />
                    <BaseInput label="Land Area" type="number" v-model="update.land_area" :required="true"
                        :error="errors.land_area" />
                    <BaseInput label="EIIN" v-model="update.eiin" :required="true" :error="errors.eiin" />
                    <BaseInput label="Address" v-model="update.address" :required="true" :error="errors.address" />
                </div>

                <BaseButton :loading="institutionStore.loading" class="w-full">Submit</BaseButton>

            </form>
        </BaseDialog>

    </Default>
</template>
