<script setup>
    import Navigation from "@/components/Navigation.vue";
    import useAuth from "@/composable/useAuth";
    import axios from "axios";
    import { reactive } from "vue";

    const form = reactive({
        email: "",
        password: "",
    });

    const { login: loginAction } = useAuth();

    const login = async () => {
        loginAction(form);
    };
</script>

<template>
    <Navigation />
    <form @submit.prevent="login">
        <input type="text" name="email" id="email" placeholder="Email" v-model="form.email" />
        <input type="password" name="password" id="password" placeholder="password" v-model="form.password" />
        <button type="submit">Login</button>
    </form>
</template>
