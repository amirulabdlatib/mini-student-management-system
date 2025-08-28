<script setup>
    import useAuth from "@/composable/useAuth";

    const { user, authenticated, logout } = useAuth();
</script>

<template>
    <div v-if="authenticated">
        {{ user.name }}
        <button @click="logout">Logout</button>
    </div>
</template>
