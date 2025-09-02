<script setup>
    import Spinner from "@/components/Spinner.vue";
    import useAuth from "@/composable/useAuth";
    import axios from "axios";
    import { ref, reactive } from "vue";
    import { useRouter } from "vue-router";

    const router = useRouter();

    const form = reactive({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const { attempt } = useAuth();
    const errors = ref({});
    const isSubmitting = ref(false);

    const register = async () => {
        isSubmitting.value = true;
        await axios.get("/sanctum/csrf-cookie");

        await axios
            .post("/register", form)
            .then(() => {
                attempt().then(() => {
                    router.push({ name: "dashboard" });
                });
            })
            .catch((error) => {
                if (error.response.status == 422) {
                    errors.value = error.response.data.errors;
                }
            })
            .finally(() => {
                isSubmitting.value = false;
            });
    };
</script>

<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register your account</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="register">
                <div>
                    <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                    <div class="mt-2">
                        <input
                            v-model="form.name"
                            id="name"
                            name="name"
                            type="name"
                            class="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <p class="mt-2 text-sm text-red-600" v-if="errors.name">
                        {{ errors.name[0] }}
                    </p>
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input
                            v-model="form.email"
                            id="email"
                            name="email"
                            type="email"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <p class="mt-2 text-sm text-red-600" v-if="errors.email">
                        {{ errors.email[0] }}
                    </p>
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div class="mt-2">
                        <input
                            v-model="form.password"
                            id="password"
                            name="password"
                            type="password"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <p class="mt-2 text-sm text-red-600" v-if="errors.password">
                        {{ errors.password[0] }}
                    </p>
                </div>

                <div>
                    <label for="password_confirmation" class="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                    <div class="mt-2">
                        <input
                            v-model="form.password_confirmation"
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <p class="mt-2 text-sm text-red-600" v-if="errors.password_confirmation">
                        {{ errors.password_confirmation[0] }}
                    </p>
                </div>

                <div>
                    <button
                        :disabled="isSubmitting"
                        type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600">
                        <span v-if="!isSubmitting">Register</span>
                        <span v-else class="flex items-center gap-2">
                            Creating...
                            <Spinner />
                        </span>
                    </button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
                Have an account?
                <RouterLink :to="{ name: 'login' }" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</RouterLink>
            </p>
        </div>
    </div>
</template>
