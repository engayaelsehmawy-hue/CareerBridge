<template>
    <div>
        <section class="page-header">
            <div class="container">
                <span class="section-label">Your list</span>
                <h1>Saved Jobs</h1>
            </div>
        </section>

        <div class="container py-5">

            <div v-if="savedJobs.length === 0" class="empty-state">
                <h4>You have not saved any jobs yet</h4>
                <router-link to="/jobs" class="btn btn-primary mt-2">Browse jobs</router-link>
            </div>

            <div v-else class="row row-cols-1 row-cols-md-3 g-4">
                <div class="col" v-for="job in savedJobs" :key="job.slug">
                    <JobCard :job="job" />
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import JobCard from "../components/JobCard.vue";

export default {
    name: "SavedJobs",

    components: {
        JobCard
    },

    computed: {
        savedJobs() {
            return this.$store.getters.savedJobs;
        }
    }
};
</script>
