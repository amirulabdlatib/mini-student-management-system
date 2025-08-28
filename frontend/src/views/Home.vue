<script setup>
    import axios from "axios";
    import { reactive } from "vue";

    const form = reactive({
        email: "",
        password: "",
    });

    const login = async () => {
        const response = axios.post("http://127.0.0.1:8000/login");

        console.log(response);
    };
</script>

<template>
    <form @submit.prevent="login">
        <input type="text" name="email" id="email" placeholder="Email" v-model="form.email" />
        <input type="password" name="password" id="password" placeholder="password" v-model="form.password" />
        <button type="submit">Login</button>
    </form>
</template>
