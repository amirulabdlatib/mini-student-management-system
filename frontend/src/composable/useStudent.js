import axios from "axios";
import { ref } from "vue";

export default function useStudent() {
    let students = ref({});
    const fetchStudents = async () => {
        try {
            let response = await axios("/api/students");
            // console.log(response.data.data);
            students.value = response.data.data;
        } catch (error) {
            console.log(error);
        }
    };

    return {
        fetchStudents,
        students,
    };
}
