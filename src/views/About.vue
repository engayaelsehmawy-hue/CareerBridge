<template>
    <div>
        <section class="page-header">
            <div class="container">
                <span class="section-label">About CareerNest</span>
                <h1>Helping students move <em>forward.</em></h1>
                <p>
                    CareerNest brings jobs, internships and remote opportunities
                    together in one simple platform designed around the student experience.
                </p>
            </div>
        </section>

        <div class="container py-5">

            <div class="row align-items-center g-5">
                <div class="col-lg-6">
                    <span class="section-label">Our idea</span>
                    <h2>Opportunity should be easier to find.</h2>
                    <p class="text-secondary">
                        Students often search through many different websites
                        before finding something that feels relevant.
                    </p>
                    <p class="text-secondary">
                        CareerNest makes that process simpler by bringing
                        opportunities together in one place.
                    </p>
                </div>

                <div class="col-lg-6">
                    <div class="hero-visual-box">
                        <div class="circle">✦</div>
                        <h3 class="text-white">Built for the next generation.</h3>
                        <p class="mb-0">Explore · Discover · Grow</p>
                    </div>
                </div>
            </div>

            <div class="section-heading text-center mt-5">
                <span class="section-label">Behind the platform</span>
                <h2>Technologies we use</h2>
            </div>

            <div class="row g-4">
                <div class="col-6 col-lg-3" v-for="tech in technologies" :key="tech.name">
                    <div class="feature-card text-center">
                        <h4>{{ tech.name }}</h4>
                        <p class="text-secondary small mb-0">{{ tech.description }}</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: "About",

    data() {
        return {
            technologies: [
                { name: "Vue.js", description: "Powers the front-end and page navigation." },
                { name: "Bootstrap", description: "Provides the grid and UI components." },
                { name: "Vuex", description: "Manages saved jobs and the logged in user." },
                { name: "ECMAScript (ECMA)", description: "Provides modern JavaScript features and syntax." },
                { name: "Arbeitnow API", description: "Supplies the live job listings." }
            ]
        };
    }
};
</script>
