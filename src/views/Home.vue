<template>
    <div>

        <!-- Hero -->
        <section class="hero-section">
            <div class="container">
                <div class="row align-items-center g-5">

                    <div class="col-lg-7">
                        <span class="section-label">Your next chapter starts here</span>
                        <h1>Find an opportunity <em>worth chasing.</em></h1>
                        <p class="text-secondary fs-5">
                            Discover jobs, internships and remote opportunities
                            from different companies — all in one calm, simple place.
                        </p>

                        <router-link to="/jobs" class="btn btn-primary btn-lg mt-3">
                            Explore Opportunities →
                        </router-link>
                    </div>

                    <div class="col-lg-5">
                        <div class="hero-visual-box">
                            <div class="circle">✦</div>
                            <p class="mb-1">Your career journey</p>
                            <h3 class="text-white">starts here.</h3>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- Why Us -->
        <section class="container py-5">

            <div class="section-heading text-center">
                <span class="section-label">Why CareerNest</span>
                <h2>Less searching. More discovering.</h2>
            </div>

            <div class="row g-4">
                <div class="col-md-4">
                    <div class="feature-card">
                        <div class="feature-icon">⌕</div>
                        <h4>Search</h4>
                        <p class="text-secondary">Find opportunities using keywords that match your interests.</p>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="feature-card featured">
                        <div class="feature-icon">◇</div>
                        <h4>Filter</h4>
                        <p class="text-secondary">Narrow down opportunities by location, category and type.</p>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="feature-card">
                        <div class="feature-icon">♡</div>
                        <h4>Save</h4>
                        <p class="text-secondary">Keep interesting opportunities close and come back anytime.</p>
                    </div>
                </div>
            </div>

        </section>

        <!-- Latest Jobs -->
        <section class="py-5" style="background: var(--beige)">
            <div class="container">

                <div class="results-header">
                    <div>
                        <span class="section-label">Fresh opportunities</span>
                        <h2>Latest opportunities</h2>
                    </div>
                    <router-link to="/jobs" class="details-btn">View all →</router-link>
                </div>

                <div v-if="loading" class="loading-box">
                    <div class="spinner-border text-primary"></div>
                    <p>Finding opportunities for you...</p>
                </div>

                <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

                <div v-else class="row g-4">
                    <div class="col-md-6 col-lg-4" v-for="job in latestJobs" :key="job.slug">
                        <JobCard :job="job" />
                    </div>
                </div>

            </div>
        </section>

        <!-- CTA -->
        <section class="container py-5">
            <div class="hero-visual-box d-flex flex-wrap justify-content-between align-items-center gap-3 text-start">
                <div>
                    <span class="section-label">Ready?</span>
                    <h2 class="text-white mb-0">Your next opportunity could be one click away.</h2>
                </div>
                <router-link to="/jobs" class="btn btn-light">Start Exploring →</router-link>
            </div>
        </section>

    </div>
</template>

<script>
import JobCard from "../components/JobCard.vue";
import getJobs from "../composables/getJobs";

export default {
    name: "Home",

    components: {
        JobCard
    },

    setup() {
        const { jobs, loading, error, loadJobs } = getJobs();
        loadJobs();
        return { jobs, loading, error };
    },

    computed: {
        latestJobs() {
            return this.jobs.slice(0, 6);
        }
    }
};
</script>
