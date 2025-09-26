<script setup>
import BaseSelect from '@/components/BaseSelect.vue';
import Default from '@/layouts/Default.vue';
import { onMounted, reactive, ref } from 'vue';
import { useDivisionStore } from '@/stores/division';
import { useDistrictStore } from '@/stores/district';
import { useUpazilaStore } from '@/stores/upazila';
import { useInstitutionStore } from '@/stores/institution';

const divisionStore = useDivisionStore();
const districtStore = useDistrictStore();
const upazilaStore = useUpazilaStore();
const institutionStore = useInstitutionStore();

const search = reactive({
    division_id: "",
    district_id: "",
    upazila_id: "",
    institution_id: "",
});

const divisionOptions = ref([]);
const districtOptions = ref([]);
const upazilaOptions = ref([]);
const institutionOptions = ref([]);
const institutionInfo = ref(null);

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
        return;
    }

    const { data } = await divisionStore.districts(search.division_id);

    districtOptions.value = data.map(district => ({
        label: district.name,
        value: district.id,
    }));

    // reset child filters
    search.district_id = "";
    search.upazila_id = "";
    search.institution_id = "";
    upazilaOptions.value = [];
    institutionOptions.value = [];
};

// Load Upazilas (by district_id)
const loadUpazilas = async () => {
    if (!search.district_id) {
        upazilaOptions.value = [];
        return;
    }

    const { data } = await districtStore.upazilas(search.district_id);

    upazilaOptions.value = data.map(upazila => ({
        label: upazila.name,
        value: upazila.id,
    }));

    search.upazila_id = "";
    search.institution_id = "";
    institutionOptions.value = [];
};

const loadInstitutions = async () => {
    if (!search.upazila_id) {
        institutionOptions.value = [];
        return;
    }

    const { data } = await upazilaStore.institutions(search.upazila_id);

    institutionOptions.value = data.map(institution => ({
        label: institution.name,
        value: institution.id,
    }));

    search.institution_id = "";
};

const loadInstitutionDetails = async () => {
    if (!search.institution_id) {
        institutionInfo.value = [];
        return;
    }

    const response = await institutionStore.show(search.institution_id);
    institutionInfo.value = response.data;
}

// Initial Load
onMounted(() => {
    loadDivisions();
});


</script>

<template>
    <Default>
        <div class="card">
            <div class="card__header">
                <h3 class="card__title">শিক্ষা প্রতিষ্ঠানের তথ্য</h3>
                <RouterLink :to="{ name: 'institutions.create' }" class="base__button">যোগ করি</RouterLink>
            </div>

            <div class="card__body">
                <div class="flex items-start gap-8">
                    <form class="flex-grow">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <BaseSelect label="বিভাগ" :options="divisionOptions" v-model="search.division_id"
                                @change="loadDistricts" />

                            <BaseSelect label="জেলা" :options="districtOptions" v-model="search.district_id"
                                @change="loadUpazilas" />

                            <BaseSelect label="থানা / উপজেলা" :options="upazilaOptions" v-model="search.upazila_id"
                                @change="loadInstitutions" />

                            <BaseSelect label="শিক্ষা প্রতিষ্ঠান" :options="institutionOptions"
                                v-model="search.institution_id" @change="loadInstitutionDetails" />

                        </div>

                        <button class="base__button w-full">
                            সাবমিট করুন
                        </button>
                    </form>

                    <div class="w-72">
                        <template v-if="institutionInfo">
                            <div class="bg-white border border-border rounded-2xl overflow-hidden">
                                <!-- Header -->
                                <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-white">
                                    <h3 class="text-lg font-semibold truncate">{{ institutionInfo.bn_name }}</h3>
                                    <p class="text-sm opacity-80">{{ institutionInfo.name }}</p>
                                </div>

                                <!-- Body -->
                                <div class="p-4 space-y-2 text-sm text-gray-700">
                                    <p>
                                        <span class="font-medium text-gray-600">EIIN:</span>
                                        <span class="ml-2">{{ institutionInfo.eiin ?? 'N/A' }}</span>
                                    </p>
                                    <p>
                                        <span class="font-medium text-gray-600">ধরন:</span>
                                        <span class="ml-2">{{ institutionInfo.type?.name ?? 'N/A' }}</span>
                                    </p>
                                    <p class="line-clamp-2">
                                        <span class="font-medium text-gray-600">ঠিকানা:</span>
                                        <span class="ml-2">{{ institutionInfo.address ?? 'N/A' }}</span>
                                    </p>
                                    <p v-if="institutionInfo.established_year">
                                        <span class="font-medium text-gray-600">প্রতিষ্ঠিত:</span>
                                        <span class="ml-2">{{ institutionInfo.established_year }}</span>
                                    </p>
                                </div>

                                <!-- Footer -->
                                <div
                                    class="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
                                    <a v-if="institutionInfo.website" :href="institutionInfo.website" target="_blank"
                                        class="text-blue-600 text-sm font-medium hover:underline">
                                        Visit Website
                                    </a>
                                    <div class="text-xs text-gray-500">
                                        Lat: {{ institutionInfo.lat ?? '---' }}, Lon: {{ institutionInfo.lon ?? '---' }}
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template v-else>
                            <div
                                class="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center space-y-3">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-16">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                </svg>

                                <span class="text-gray-500 text-center text-sm">
                                    একটি প্রতিষ্ঠান নির্বাচন করুন
                                </span>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </Default>
</template>
