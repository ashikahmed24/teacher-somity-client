import { defineStore } from "pinia";
import axiosInstance from "@/utils/axios.js";
import { useToastStore } from "@/stores/toast.js";

const toastStore = useToastStore();

export const useInstitutionTypeStore = defineStore("institutionType", {
  state: () => ({
    loading: false,
    errors: {},
  }),

  getters: {},

  actions: {
    async all() {
      try {
        const response = await axiosInstance.get("/api/v1/institution-types");
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
          "/api/v1/institution-types",
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

    async show(type) {
      this.loading = true;
      try {
        const response = await axiosInstance.get(
          `/api/institution-types/${type}`
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

    async update(type, formData) {
      this.loading = true;
      try {
        const response = await axiosInstance.put(
          `/api/institution-types/${type}`,
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

    async delete(type) {
      this.loading = true;
      try {
        const response = await axiosInstance.delete(
          `/api/institution-types/${type}`
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
        const response = await axiosInstance.get(
          `/api/institution-types/dropdown`
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
