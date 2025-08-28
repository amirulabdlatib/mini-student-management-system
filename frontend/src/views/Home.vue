<script setup>
    import axios from "axios";
    import { reactive } from "vue";

    const form = reactive({
        email: "admin@example.com",
        password: "password",
    });

    const login = async () => {
        const response = await axios.post("/login", form);

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
