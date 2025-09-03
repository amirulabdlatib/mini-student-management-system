<script setup>
    import Spinner from "@/components/Spinner.vue";
    import useClass from "@/composable/useClass";
    import useSection from "@/composable/useSection";
    import useStudent from "@/composable/useStudent";
    import router from "@/router";
    import { onMounted, reactive, watch, ref } from "vue";

    const { fetchClasses, classes } = useClass();
    const { fetchSections, sections } = useSection();
    const { updateStudent, errors } = useStudent();
    const isUpdating = ref(false);

    const form = reactive({
        name: "",
        email: "",
        class_id: "",
        section_id: "",
    });

    const submit = async (form) => {
        isUpdating.value = true;
        await updateStudent(form)
            .then(() => {
                router.push({ name: "students.index" });
            })
            .finally(() => {
                isUpdating.value = false;
            });
    };

    watch(
        () => form.class_id,
        async (newValue) => {
            if (newValue) {
                await fetchSections(newValue);
            }
        }
    );

    onMounted(async () => {
        await fetchClasses();
    });
</script>

<template>
    <div class="mx-auto py-6 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <div class="space-y-6 sm:px-6 lg:px-0 lg:col-span-12">
                <form @submit.prevent="submit(form)">
                    <div class="shadow sm:rounded-md sm:overflow-hidden">
                        <div class="bg-white py-6 px-4 space-y-6 sm:p-6">
                            <div>
                                <h3 class="text-lg leading-6 font-medium text-gray-900">Student Information</h3>
                                <p class="mt-1 text-sm text-gray-500">Use this form to update an existing student.</p>
                            </div>

                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        v-model="form.name"
                                        type="text"
                                        id="name"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    <p class="text-red-500 text-sm" v-if="errors.name">{{ errors.name[0] }}</p>
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input
                                        v-model="form.email"
                                        type="email"
                                        id="email"
                                        autocomplete="email"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    <p class="text-red-500 text-sm" v-if="errors.email">{{ errors.email[0] }}</p>
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label for="class_id" class="block text-sm font-medium text-gray-700">Class</label>
                                    <select
                                        v-model="form.class_id"
                                        id="class_id"
                                        class="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <option value="">Select a Class</option>
                                        <option v-for="item in classes" :key="item.id" :value="item.id">{{ item.name }}</option>
                                    </select>
                                    <p class="text-red-500 text-sm" v-if="errors.class_id">{{ errors.class_id[0] }}</p>
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label for="section_id" class="block text-sm font-medium text-gray-700">Section</label>
                                    <select
                                        v-model="form.section_id"
                                        id="section_id"
                                        class="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <option value="">Select a Section</option>
                                        <option v-for="section in sections" :key="section.id" :value="section.id">{{ section.name }}</option>
                                    </select>
                                    <p class="text-red-500 text-sm" v-if="errors.section_id">{{ errors.section_id[0] }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <RouterLink
                                :to="{ name: 'students.index' }"
                                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4">
                                Cancel
                            </RouterLink>
                            <button
                                :disabled="isUpdating"
                                type="submit"
                                class="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600">
                                <span v-if="!isUpdating">Update</span>
                                <span v-else class="flex gap-2">
                                    <p>Updating...</p>
                                    <Spinner />
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
