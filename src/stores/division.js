import { defineStore } from "pinia";
import axiosInstance from "@/utils/axios.js";
import { useToastStore } from "@/stores/toast.js";

const toastStore = useToastStore();

export const useDivisionStore = defineStore("division", {
  state: () => ({
    loading: false,
    errors: {},
    divisions: [],
  }),

  getters: {},

  actions: {
    async all(page) {
      try {
        const response = await axiosInstance.get("/api/divisions", {
          params: {
            page: page,
          },
        });
        if (response.status === 200) {
          this.divisions = response.data;
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
        const response = await axiosInstance.post("/api/divisions", formData);
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

    async show(division) {
      this.loading = true;
      try {
        const response = await axiosInstance.get(`/api/divisions/${division}`);
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

    async update(division, formData) {
      this.loading = true;
      try {
        const response = await axiosInstance.put(
          `/api/divisions/${division}`,
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

    async delete(division) {
      this.loading = true;
      try {
        const response = await axiosInstance.delete(
          `/api/divisions/${division}`
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
        const response = await axiosInstance.get(`/api/divisions/dropdown`);
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

    async districts(district) {
      this.loading = true;
      try {
        const response = await axiosInstance.get(
          `/api/divisions/${district}/districts`
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
