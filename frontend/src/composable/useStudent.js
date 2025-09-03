import axios from "axios";
import { ref } from "vue";

export default function useStudent() {
    let students = ref({});
    let errors = ref({});

    const fetchStudents = async () => {
        try {
            let response = await axios("/api/students");
            // console.log(response.data.data);
            students.value = response.data.data;
        } catch (error) {
            console.log(error);
        }
    };

    const createStudent = async (form) => {
        try {
            let response = await axios.post("/api/students", form);

            return response;
        } catch (error) {
            if (error.response.status == 422) {
                errors.value = error.response.data.errors;
            }

            return Promise.reject(null);
        }
    };

    const getStudent = async (id) => {
        try {
            let response = await axios.get("/api/students/" + id);

            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const updateStudent = async (id, form) => {
        try {
            let response = await axios.put("/api/students/" + id, form);

            return response;
        } catch (error) {
            if (error.response.status == 422) {
                errors.value = error.response.data.errors;
            }

            return Promise.reject(null);
        }
    };

    const deleteStudent = async (id) => {
        try {
            await axios.delete("api/students/" + id);
        } catch (error) {
            console.log(error);
            return Promise.reject(null);
        }
    };

    return {
        fetchStudents,
        createStudent,
        getStudent,
        updateStudent,
        deleteStudent,
        students,
        errors,
    };
}
