<script setup>
import Default from "@/layouts/Default.vue";
import { onMounted } from "vue";
import { useDivisionStore } from "@/stores/division";
import { storeToRefs } from "pinia";

const divisionStore = useDivisionStore();
const { divisions } = storeToRefs(divisionStore);

const loadDivisions = async () => {
  await divisionStore.all();
};

onMounted(() => {
  loadDivisions();
});
</script>

<template>
  <Default>
    <section class="">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- বিভাগ -->
        <div
          class="bg-white rounded-xl p-5 transition flex items-center gap-4 cursor-pointer"
        >
          <div class="bg-white rounded-full">
            <img
              src="/icons/draft.png"
              alt="draft icon"
              class="h-16 w-16 object-contain"
            />
          </div>
          <div>
            <h6 class="text-gray-700 text-sm font-medium">মোট বিভাগ</h6>
            <p class="text-3xl font-semibold text-gray-900 mt-1">৮</p>
          </div>
        </div>

        <!-- জেলা -->
        <div
          class="bg-white rounded-xl p-5 transition flex items-center gap-4 cursor-pointer"
        >
          <div class="bg-white rounded-full">
            <img
              src="/icons/pending.png"
              alt="pending"
              class="h-16 w-16 object-contain"
            />
          </div>
          <div>
            <h6 class="text-gray-600 text-sm font-medium">মোট জেলা</h6>
            <p class="text-3xl font-semibold text-gray-900 mt-1">৬৪</p>
          </div>
        </div>

        <!-- উপজেলা -->
        <div
          class="bg-white rounded-xl p-5 transition flex items-center gap-4 cursor-pointer"
        >
          <div class="bg-white rounded-full">
            <img
              src="/icons/published.png"
              alt="published"
              class="h-16 w-16 object-contain"
            />
          </div>
          <div>
            <h6 class="text-gray-600 text-sm font-medium">মোট উপজেলা</h6>
            <p class="text-3xl font-semibold text-gray-900 mt-1">৪৯৮</p>
          </div>
        </div>

        <!-- শিক্ষা প্রতিষ্ঠান -->
        <div
          class="bg-white rounded-xl p-5 transition flex items-center gap-4 cursor-pointer"
        >
          <div class="bg-white rounded-full">
            <img
              src="/icons/archived.png"
              alt="archived"
              class="h-16 w-16 object-contain"
            />
          </div>
          <div>
            <h6 class="text-gray-600 text-sm font-medium">
              মোট শিক্ষা প্রতিষ্ঠান
            </h6>
            <p class="text-3xl font-semibold text-gray-900 mt-1">৪৯৯০</p>
          </div>
        </div>
      </div>
    </section>

    <section class="w-full">
      <div class="card">
        <div class="card__header">
          <h3 class="card__title">মোট বিভাগ</h3>
        </div>

        <div class="card__body">
          <div class="flex flex-wrap items-start gap-4">
            <div class="flex-none w-60 h-auto">
              <div class="block">
                <img src="/bodrul.jpg" alt="bodrul" />
                <h4 class="font-semibold py-2">মো বদরুল আমিন সরকার</h4>
              </div>
            </div>
            <div class="grow">
              <table>
                <thead>
                  <tr>
                    <th>বিভাগ</th>
                    <th>সংখ্যা</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="division in divisions.data" :key="division.id">
                    <td>{{ division.bn_name }}</td>
                    <td>{{ division.institutions_count }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="flex-none w-60 h-auto">
              <div class="block">
                <img src="/kamal.png" alt="bodrul" />
                <h4 class="font-semibold py-2">মোঃ কামাল হোসেন</h4>
              </div>
            </div>
          </div>

          <div class="w-full my-8">
            <!-- Card -->
            <div class="bg-white shadow-lg rounded-2xl overflow-hidden">
              <!-- Header -->
              <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                <div class="flex items-center justify-between">
                  <div>
                    <h1 class="text-white text-2xl font-semibold">
                      বাংলাদেশ বেসরকারী শিক্ষক সমিতি
                    </h1>
                    <p class="text-blue-100 mt-1 text-sm">
                      অফিস আদেশ / সাধারণ নোটিশ
                    </p>
                  </div>
                  <div class="text-right text-blue-100 text-sm">
                    <div id="noticeDate">তারিখ: ১৫ অক্টোবর, ২০২৫</div>
                    <div class="mt-1">নোটিশ নং: BPTS/2025/108</div>
                  </div>
                </div>
              </div>

              <!-- Body -->
              <div class="p-6">
                <!-- Notice display -->
                <div class="mb-4">
                  <label class="block text-slate-600 font-medium mb-2"
                    >নোটিশ (দেখুন / সম্পাদনা করুন)</label
                  >
                  <textarea
                    class="w-full rounded-xl border border-slate-200 p-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    rows="12"
                  >
                                        সম্মানিত সকল সদস্যদের অবগতির জন্য জানানো যাচ্ছে যে, আগামী ২০ অক্টোবর ২০২৫ খ্রি. তারিখে সকাল ১০টা থেকে সমিতির বার্ষিক সাধারণ সভা(AGM) সমিতি মিলনকক্ষে অনুষ্ঠিত হবে। সকল সদস্যগণ নির্দিষ্ট সময়ে উপস্থিত থাকার জন্য বিনীত প্রার্থনা করা হল। সভায় উপস্থিতি নিশ্চিত করার জন্য অনুগ্রহ করে ১৮ অক্টোবর ২০২৫-এর মধ্যে অফিসে একটি ইমেইল/মেসেজ পাঠিয়ে জানাবেন। 

বিষয়: বার্ষিক সাধারণ সভা
স্থান: সমিতি মিলনকক্ষ
তারিখ ও সময়: ২০ অক্টোবর ২০২৫, সকাল ১০টা
যোগাযোগ: অফিস (০১২৩৪৫৬৭৮৯)

ধন্যবাদান্তে,
সভাপতি
বাংলাদেশ বেসরকারী শিক্ষক সমিতি</textarea
                  >
                </div>

                <!-- Controls -->
                <div
                  class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                >
                  <div class="text-sm text-slate-500">
                    <span class="font-medium">প্রস্তুত:</span> নোটিশ কপি/প্রিন্ট
                    বা ইমেইলে পাঠানোর জন্য ব্যবহার করুন
                  </div>

                  <div class="flex gap-2">
                    <button class="base__outline" type="button">Preview</button>

                    <button class="base__button" type="button">Send</button>
                  </div>
                </div>

                <!-- small status area -->
                <div id="status" class="mt-4 text-sm text-slate-600"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Default>
</template>
