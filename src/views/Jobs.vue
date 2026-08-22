<template>
    <div>

        <section class="page-header">
            <div class="container">
                <span class="section-label">Explore</span>
                <h1>Find your next opportunity.</h1>
                <p>Search through jobs, internships and remote opportunities that could be right for you.</p>
            </div>
        </section>

        <div class="container py-5">

            <div class="filter-card">

                <div class="filter-title">
                    <div>
                        <h5 class="mb-0">Find what fits you</h5>
                        <p class="text-secondary mb-0 small">Search and refine the opportunities below.</p>
                    </div>
                    <button class="clear-btn" @click="clearFilters">Clear filters</button>
                </div>

                <div class="row g-3">

                    <div class="col-12 col-lg-4">
                        <label class="form-label">Search</label>
                        <input type="text" class="form-control" placeholder="Job title or company..." v-model="search">
                    </div>

                    <div class="col-6 col-lg-2">
                        <label class="form-label">Location</label>
                        <select class="form-select" v-model="selectedLocation">
                            <option value="">All</option>
                            <option v-for="location in locations" :key="location" :value="location">{{ location }}</option>
                        </select>
                    </div>

                    <div class="col-6 col-lg-2">
                        <label class="form-label">Type</label>
                        <select class="form-select" v-model="selectedType">
                            <option value="">All</option>
                            <option v-for="type in jobTypes" :key="type" :value="type">{{ type }}</option>
                        </select>
                    </div>

                    <div class="col-6 col-lg-2">
                        <label class="form-label">Category</label>
                        <select class="form-select" v-model="selectedCategory">
                            <option value="">All</option>
                            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
                        </select>
                    </div>

                    <div class="col-6 col-lg-2">
                        <label class="form-label">Work mode</label>
                        <select class="form-select" v-model="selectedRemote">
                            <option value="">All</option>
                            <option value="remote">Remote</option>
                            <option value="onsite">On-site</option>
                        </select>
                    </div>

                </div>
            </div>

            <div class="results-header">
                <div>
                    <span class="section-label">Opportunities</span>
                    <h3 class="mb-0">Available roles</h3>
                </div>
                <span class="results-count">{{ filteredJobs.length }} found</span>
            </div>

            <div v-if="loading" class="loading-box">
                <div class="spinner-border text-primary"></div>
                <p>Finding opportunities...</p>
            </div>

            <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

            <div v-else-if="filteredJobs.length > 0" class="row g-4">
                <div class="col-md-6 col-lg-4" v-for="job in filteredJobs" :key="job.slug">
                    <JobCard :job="job" />
                </div>
            </div>

            <div v-else class="empty-state">
                <h4>No opportunities found</h4>
                <p>Try changing your search or filters.</p>
                <button class="btn btn-primary" @click="clearFilters">Clear Filters</button>
            </div>

        </div>

    </div>
</template>

<script>
import JobCard from "../components/JobCard.vue";
import getJobs from "../composables/getJobs";

export default {
    name: "Jobs",

    components: {
        JobCard
    },

    setup() {
        const { jobs, loading, error, loadJobs } = getJobs();
        loadJobs();
        return { jobs, loading, error };
    },

    data() {
        return {
            search: "",
            selectedLocation: "",
            selectedType: "",
            selectedCategory: "",
            selectedRemote: ""
        };
    },

    computed: {
        locations() {
            const list = this.jobs.map(job => job.location).filter(Boolean);
            return [...new Set(list)];
        },

        jobTypes() {
            const list = this.jobs.map(job => job.job_types).filter(Boolean).flat();
            return [...new Set(list)];
        },

        categories() {
            const list = this.jobs.map(job => job.tags).filter(Boolean).flat();
            return [...new Set(list)];
        },

        filteredJobs() {
            const searchText = this.search.toLowerCase().trim();

            return this.jobs.filter(job => {
                const title = (job.title || "").toLowerCase();
                const company = (job.company_name || "").toLowerCase();
                const matchesSearch = title.includes(searchText) || company.includes(searchText);

                const location = (job.location || "").toLowerCase();
                const matchesLocation = this.selectedLocation === "" ||
                    location === this.selectedLocation.toLowerCase();

                const types = job.job_types || [];
                const matchesType = this.selectedType === "" || types.includes(this.selectedType);

                const tags = job.tags || [];
                const matchesCategory = this.selectedCategory === "" || tags.includes(this.selectedCategory);

                const isRemote = JSON.stringify(job).toLowerCase().includes("remote");
                const matchesRemote = this.selectedRemote === "" ||
                    (this.selectedRemote === "remote" && isRemote) ||
                    (this.selectedRemote === "onsite" && !isRemote);

                return matchesSearch && matchesLocation && matchesType && matchesCategory && matchesRemote;
            });
        }
    },

    methods: {
        clearFilters() {
            this.search = "";
            this.selectedLocation = "";
            this.selectedType = "";
            this.selectedCategory = "";
            this.selectedRemote = "";
        }
    }
};
</script>