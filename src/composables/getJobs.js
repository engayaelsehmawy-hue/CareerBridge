import { ref } from "vue";

const getJobs = () => {
    const jobs = ref([]);
    const loading = ref(false);
    const error = ref("");

    const loadJobs = async () => {
        loading.value = true;
        error.value = "";

        try {
            const response = await fetch(
                "https://www.arbeitnow.com/api/job-board-api"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch jobs");
            }

            const data = await response.json();
            jobs.value = data.data;
        } catch (err) {
            error.value = "Unable to load jobs right now. Please try again.";
            console.log(err);
        } finally {
            loading.value = false;
        }
    };

    return {
        jobs,
        loading,
        error,
        loadJobs
    };
};

export default getJobs;
