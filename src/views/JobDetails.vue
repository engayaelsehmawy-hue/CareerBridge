<template>
    <div class="container py-5">

        <div v-if="loading" class="loading-box">
            <div class="spinner-border text-primary"></div>
            <p>Loading opportunity details...</p>
        </div>

        <div v-else-if="!job" class="empty-state">
            <h4>Opportunity not found</h4>
            <p>This opportunity may no longer be available.</p>
            <router-link to="/jobs" class="btn btn-primary">Back to Opportunities</router-link>
        </div>

        <div v-else>
            <router-link to="/jobs" class="details-btn d-inline-block mb-3">← Back to opportunities</router-link>

            <div class="row g-4">

                <!-- Main -->
                <div class="col-lg-8">
                    <article class="details-card">

                        <div class="company-avatar">{{ companyInitial }}</div>

                        <span class="section-label mt-3">Opportunity</span>
                        <h1>{{ job.title }}</h1>
                        <h5 class="text-secondary" style="color: var(--terracotta) !important">{{ job.company_name }}</h5>

                        <div class="info-pills">
                            <span class="pill">📍 {{ job.location || "Not specified" }}</span>
                            <span class="pill" v-for="type in job.job_types || []" :key="type">💼 {{ type }}</span>
                            <span class="pill" v-if="isRemote">💻 Remote</span>
                        </div>

                        <hr>

                        <h3>About the opportunity</h3>
                        <div class="job-description" v-html="descriptionHtml"></div>

                        <div class="mt-4" v-if="job.tags && job.tags.length">
                            <h3>Skills & tags</h3>
                            <div class="info-pills">
                                <span class="pill" v-for="tag in job.tags" :key="tag">{{ tag }}</span>
                            </div>
                        </div>

                    </article>
                </div>

                <!-- Side -->
                <div class="col-lg-4">
                    <aside class="side-card">
                        <h4>Opportunity details</h4>

                        <div class="detail-item">
                            <small>Company</small>
                            <strong>{{ job.company_name }}</strong>
                        </div>

                        <div class="detail-item">
                            <small>Location</small>
                            <strong>{{ job.location || "Not specified" }}</strong>
                        </div>

                        <div class="detail-item">
                            <small>Type</small>
                            <strong>{{ job.job_types && job.job_types.length ? job.job_types.join(", ") : "Not specified" }}</strong>
                        </div>

                        <div class="detail-item">
                            <small>Work mode</small>
                            <strong>{{ isRemote ? "Remote" : "On-site / Not specified" }}</strong>
                        </div>

                        <button class="save-detail-btn" :class="{ saved: isSaved }" @click="toggleSave">
                            {{ isSaved ? "★ Saved" : "☆ Save Opportunity" }}
                        </button>

                        <a v-if="job.url" :href="job.url" target="_blank" rel="noopener noreferrer" class="apply-btn">
                            Apply Now ↗
                        </a>
                    </aside>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import getJobs from "../composables/getJobs";

export default {
    name: "JobDetails",

    setup() {
        const { jobs, loading, loadJobs } = getJobs();
        loadJobs();
        return { jobs, loading };
    },

    computed: {
        job() {
            return this.jobs.find(job => job.slug === this.$route.params.slug);
        },

        isSaved() {
            if (!this.job) return false;
            return this.$store.getters.savedJobs.some(savedJob => savedJob.slug === this.job.slug);
        },

        isRemote() {
            if (!this.job) return false;
            return JSON.stringify(this.job).toLowerCase().includes("remote");
        },

        companyInitial() {
            const name = this.job ? this.job.company_name : "C";
            return (name || "C").charAt(0).toUpperCase();
        },

        descriptionHtml() {
            const description = this.job ? this.job.description : "";
            if (!description) return "";

            // Some descriptions come from the API HTML-escaped
            // (e.g. "&lt;p&gt;" instead of "<p>"). In that case decode
            // them once, otherwise the tags show up as plain text.
            if (description.includes("&lt;") || description.includes("&amp;lt;")) {
                return this.decodeHtmlEntities(description);
            }

            return description;
        }
    },

    methods: {
        decodeHtmlEntities(html) {
            const textarea = document.createElement("textarea");
            textarea.innerHTML = html;
            return textarea.value;
        },

        toggleSave() {
            if (!this.job) return;

            if (this.isSaved) {
                this.$store.commit("removeJob", this.job.slug);
            } else {
                this.$store.commit("saveJob", this.job);
            }
        }
    }
};
</script>
