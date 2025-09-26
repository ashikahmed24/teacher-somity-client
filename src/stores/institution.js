import { defineStore } from "pinia";
import axiosInstance from "@/utils/axios.js";
import { useToastStore } from "@/stores/toast.js";

const toastStore = useToastStore();

export const useInstitutionStore = defineStore("institution", {
  state: () => ({
    loading: false,
    errors: {},
  }),

  getters: {},

  actions: {
    async all(page) {
      try {
        const response = await axiosInstance.get("/api/institutions");
        if (response.status === 200) {
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
        const response = await axiosInstance.post(
          "/api/institutions",
          formData
        );
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

    async show(institution) {
      this.loading = true;
      try {
        const response = await axiosInstance.get(
          `/api/institutions/${institution}`
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

    async update(institution, formData) {
      this.loading = true;
      try {
        const response = await axiosInstance.put(
          `/api/institutions/${institution}`,
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

    async delete(institution) {
      this.loading = true;
      try {
        const response = await axiosInstance.delete(
          `/api/institutions/${institution}`
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

    async dropdown() {
      this.loading = true;
      try {
        const response = await axiosInstance.get(`/api/institutions/dropdown`);
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
