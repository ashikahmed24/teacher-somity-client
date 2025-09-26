import { defineStore } from "pinia";
import axiosInstance from "@/utils/axios.js";
import { useToastStore } from "@/stores/toast.js";

const toastStore = useToastStore();

export const useUpazilaStore = defineStore("upazila", {
  state: () => ({
    loading: false,
    errors: {},
    upazilas: {},
  }),

  getters: {},

  actions: {
    async all(page) {
      try {
        const response = await axiosInstance.get("/api/upazilas", {
          params: {
            page: page,
          },
        });
        if (response.status === 200) {
          this.upazilas = response.data;
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
        const response = await axiosInstance.post("/api/upazilas", formData);
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

    async show(upazila) {
      this.loading = true;
      try {
        const response = await axiosInstance.get(`/api/upazilas/${upazila}`);
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

    async update(upazila, formData) {
      this.loading = true;
      try {
        const response = await axiosInstance.put(
          `/api/upazilas/${upazila}`,
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

    async delete(upazila) {
      this.loading = true;
      try {
        const response = await axiosInstance.delete(`/api/upazilas/${upazila}`);
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

    async institutions(upazila) {
      this.loading = true;
      try {
        const response = await axiosInstance.get(
          `/api/upazilas/${upazila}/institutions`
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
