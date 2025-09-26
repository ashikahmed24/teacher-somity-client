import { defineStore } from "pinia";
import axiosInstance from "@/utils/axios.js";
import { useToastStore } from "@/stores/toast.js";

const toastStore = useToastStore();

export const useDistrictStore = defineStore("district", {
  state: () => ({
    loading: false,
    errors: {},
    districts: [],
  }),

  getters: {},

  actions: {
    async all(page) {
      try {
        const response = await axiosInstance.get("/api/districts", {
          params: {
            page: page,
          },
        });
        if (response.status === 200) {
          this.districts = response.data;
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.response) {
          return Promise.reject(error.response.data);
        }
      }
    },

    async store(formData) {
      this.loading = true;
      try {
        const response = await axiosInstance.post("/api/districts", formData);
        if (response.status === 201) {
          toastStore.success(response.data.message);
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.response) {
          this.errors = error.response.data.errors;
          return Promise.reject(error.response.data);
        }
      } finally {
        this.loading = false;
      }
    },

    async show(district) {
      this.loading = true;
      try {
        const response = await axiosInstance.get(`/api/districts/${district}`);
        if (response.status === 200) {
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.response) {
          this.errors = error.response.data.errors;
          return Promise.reject(error.response.data);
        }
      } finally {
        this.loading = false;
      }
    },

    async update(district, formData) {
      this.loading = true;
      try {
        const response = await axiosInstance.put(
          `/api/districts/${district}`,
          formData
        );
        if (response.status === 200) {
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.response) {
          this.errors = error.response.data.errors;
          return Promise.reject(error.response.data);
        }
      } finally {
        this.loading = false;
      }
    },

    async delete(district) {
      this.loading = true;
      try {
        const response = await axiosInstance.delete(
          `/api/districts/${district}`
        );
        if (response.status === 200) {
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.response) {
          this.errors = error.response.data.errors;
          return Promise.reject(error.response.data);
        }
      } finally {
        this.loading = false;
      }
    },

    async upazilas(district) {
      this.loading = true;
      try {
        const response = await axiosInstance.get(
          `/api/districts/${district}/upazilas`
        );
        if (response.status === 200) {
          return Promise.resolve(response.data);
        }
      } catch (error) {
        if (error.response) {
          this.errors = error.response.data.errors;
          return Promise.reject(error.response.data);
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
