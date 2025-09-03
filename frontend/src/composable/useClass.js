import axios from "axios";
import { ref } from "vue";

export default function useClass() {
    let classes = ref({});

    const fetchClasses = async () => {
        try {
            let response = await axios.get("/api/classes");
            classes.value = response.data;
        } catch (error) {
            console.log(error);
        }
    };

    return {
        classes,
        fetchClasses,
    };
}
