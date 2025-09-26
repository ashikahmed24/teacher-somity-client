<script setup>
import BaseInput from '@/components/BaseInput.vue';
import Default from '@/layouts/Default.vue';
import { reactive, ref, onMounted } from 'vue';
import { useDivisionStore } from '@/stores/division';
import { useDistrictStore } from '@/stores/district';
import BaseSelect from '@/components/BaseSelect.vue';
import { useInstitutionTypeStore } from '@/stores/institutionType';
import BaseButton from '@/components/BaseButton.vue';
import { useInstitutionStore } from '@/stores/institution';
import { storeToRefs } from 'pinia';

const divisionStore = useDivisionStore();
const districtStore = useDistrictStore();
const institutionTypeStore = useInstitutionTypeStore();
const institutionStore = useInstitutionStore();

const { errors } = storeToRefs(institutionStore);

const search = reactive({
    division_id: "",
    district_id: "",
    upazila_id: "",
    institution_id: "",
});

const divisionOptions = ref([]);
const districtOptions = ref([]);
const upazilaOptions = ref([]);
const typesOptions = ref([]);


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
    upazilaOptions.value = [];
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
};

const loadTypes = async () => {
    const { data } = await institutionTypeStore.dropdown();

    typesOptions.value = data.map(type => ({
        label: type.name,
        value: type.id,
    }));
}

const form = reactive({
    upazila_id: '',
    institution_type_id: '',
    name: '',
    bn_name: '',
    eiin: '',
    address: '',
    lat: '',
    lon: '',
    established_year: '',
    website: '',
});

const submit = async () => {
    await institutionStore.store(form);
};

// Initial Load
onMounted(() => {
    loadDivisions();
    loadTypes();
});

</script>

<template>
    <Default>
        <div class="card">
            <!-- Header -->
            <div class="card__header">
                <h3 class="card__title">শিক্ষা প্রতিষ্ঠানের তথ্য</h3>
            </div>

            <div class="card__body">
                <form @submit.prevent="submit" class="max-w-3xl space-y-4">

                    <div class="grid grid-cols-2 gap-4">

                        <BaseSelect label="বিভাগ" :options="divisionOptions" v-model="search.division_id"
                            @change="loadDistricts" :error="errors.division_id" :required="true" />

                        <BaseSelect label="জেলা" :options="districtOptions" v-model="search.district_id"
                            @change="loadUpazilas" :error="errors.district_id" :required="true" />

                        <BaseSelect label="থানা / উপজেলা" :options="upazilaOptions" v-model="form.upazila_id"
                            :error="errors.upazila_id" :required="true" />

                        <!-- Institution Type Select -->
                        <BaseSelect label="প্রতিষ্ঠানের ধরন" v-model="form.institution_type_id" type="select"
                            :options="typesOptions" :error="errors.institution_type_id" :required="true" />

                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <BaseInput label="Name (EN)" v-model="form.name" :error="errors.name" :required="true" />
                        <BaseInput label="Name (BN)" v-model="form.bn_name" :error="errors.bn_name" :required="true" />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <BaseInput label="EIIN" v-model="form.eiin" :error="errors.eiin" />
                        <BaseInput label="Website" v-model="form.website" :error="errors.website" type="url" />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <BaseInput label="Address" v-model="form.address" :error="errors.address" />
                        <BaseInput label="Established Year" v-model="form.established_year"
                            :error="errors.established_year" type="number" />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <BaseInput label="Latitude" v-model="form.lat" :error="errors.lat" />
                        <BaseInput label="Longitude" v-model="form.lon" :error="errors.lon" />
                    </div>

                    <div class="mt-6">
                        <BaseButton class="w-full">Submit</BaseButton>
                    </div>
                </form>
            </div>
        </div>
    </Default>
</template>

<style scoped></style>
