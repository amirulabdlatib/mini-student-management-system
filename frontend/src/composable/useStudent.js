import axios from "axios";

export default function useStudent() {
    const fetchStudents = async () => {
        try {
            let response = await axios("/api/students");

            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return {
        fetchStudents,
    };
}
