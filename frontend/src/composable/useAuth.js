import axios from "axios";
import { computed, reactive, ref } from "vue";

const state = reactive({
    authenticated: false,
    user: {},
});

export default function useAuth() {
    const errors = ref({});

    const authenticated = computed(() => state.authenticated);

    const user = computed(() => state.user);

    const setAuthenticated = (authenticated) => (state.authenticated = authenticated);

    const setUser = (user) => {
        state.user = user;
    };

    const attempt = async () => {
        try {
            const response = await axios.get("/api/user");

            setAuthenticated(true);
            console.log(response);
            setUser(response.data);

            return response;
        } catch (error) {
            setAuthenticated(false);
            setUser({});
            console.log(error);
        }
    };

    const login = async (form) => {
        await axios.get("/sanctum/csrf-cookie");

        try {
            await axios.post("/login", form);
            return attempt();
        } catch (error) {
            console.log(error);
            if (error.response.status == 422) {
                errors.value = error.response.data.errors;
                // console.log(errors.value.email[0]);

                return Promise.reject(null);
            }
        }
    };

    return {
        authenticated,
        user,
        login,
        attempt,
        errors,
    };
}
