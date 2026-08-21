import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Jobs from "../views/Jobs.vue";
import JobDetails from "../views/JobDetails.vue";
import SavedJobs from "../views/SavedJobs.vue";
import About from "../views/About.vue";
import Reviews from "../views/Reviews.vue";
import Auth from "../views/Auth.vue";
import Profile from "../views/Profile.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/jobs", component: Jobs },
    { path: "/jobs/:slug", component: JobDetails },
    { path: "/saved", component: SavedJobs },
    { path: "/about", component: About },
    { path: "/reviews", component: Reviews },
    { path: "/auth", component: Auth },
    { path: "/profile", component: Profile }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
