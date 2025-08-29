<script setup>
    import useAuth from "@/composable/useAuth";
    import { reactive } from "vue";

    const form = reactive({
        email: "",
        password: "",
    });

    const { login: loginAction, errors } = useAuth();

    const login = async () => {
        loginAction(form);
    };
</script>

<template>
    <form @submit.prevent="login">
        <input type="text" name="email" id="email" placeholder="Email" v-model="form.email" />
        <p v-if="errors.email">{{ errors.email[0] }}</p>
        <input type="password" name="password" id="password" placeholder="password" v-model="form.password" />
        <p v-if="errors.password">{{ errors.password[0] }}</p>
        <button type="submit">Login</button>
    </form>
</template>
