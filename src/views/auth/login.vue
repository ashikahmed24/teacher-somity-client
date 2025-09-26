<script setup>
import Auth from '@/layouts/Auth.vue';
import { useAuthStore } from '@/stores/auth';
import { reactive } from 'vue';

const authStore = useAuthStore();

const form = reactive({
    email: 'info@ashikahmed.net',
    password: 'password',
});


const submit = () => {
    authStore.login(form);
}

</script>

<template>
    <Auth>
        <div class="bg-white">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                        alt="logo">
                    Flowbite
                </a>
                <div
                    class="w-full bg-gray-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign in to your account
                        </h1>
                        <form @submit.prevent="submit" class="space-y-4 md:space-y-6">
                            <div class="form__group">
                                <label for="email" class="form__label">Email</label>
                                <input type="email" v-model="form.email" id="email" class="form__control"
                                    placeholder="name@company.com" required="">
                            </div>
                            <div class="form__group">
                                <label for="password" class="form__label">Password</label>
                                <input type="password" v-model="form.password" id="password" placeholder="xxxxxxxx"
                                    class="form__control" required="">
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox"
                                            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800">
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label for="remember" class="text-gray-500 dark:text-gray-300">Remember
                                            me</label>
                                    </div>
                                </div>
                                <a href="#"
                                    class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot
                                    password?</a>
                            </div>
                            <button type="submit" class="base__button w-full">Sign
                                in</button>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="#"
                                    class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign
                                    up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Auth>
</template>