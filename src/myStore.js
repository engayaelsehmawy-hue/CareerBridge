import { createStore } from "vuex";

const savedJobsFromStorage = localStorage.getItem("savedJobs");
const userFromStorage = localStorage.getItem("currentUser");

const store = createStore({
    state: {
        savedJobs: savedJobsFromStorage ? JSON.parse(savedJobsFromStorage) : [],
        user: userFromStorage ? JSON.parse(userFromStorage) : null
    },

    getters: {
        savedJobs(state) {
            return state.savedJobs;
        },

        savedJobsCount(state) {
            return state.savedJobs.length;
        },

        currentUser(state) {
            return state.user;
        },

        isLoggedIn(state) {
            return state.user !== null;
        },

        userInitials(state) {
            if (!state.user || !state.user.name) {
                return "";
            }

            return state.user.name.trim().substring(0, 2).toUpperCase();
        }
    },

    mutations: {
        saveJob(state, job) {
            const alreadySaved = state.savedJobs.some(
                savedJob => savedJob.slug === job.slug
            );

            if (alreadySaved) {
                return;
            }

            state.savedJobs.push(job);
            localStorage.setItem("savedJobs", JSON.stringify(state.savedJobs));
        },

        removeJob(state, jobSlug) {
            state.savedJobs = state.savedJobs.filter(
                job => job.slug !== jobSlug
            );

            localStorage.setItem("savedJobs", JSON.stringify(state.savedJobs));
        },

        login(state, userData) {
            state.user = {
                name: userData.name,
                email: userData.email,
                bio: "",
                cvName: "",
                portfolioName: "",
                projects: []
            };

            localStorage.setItem("currentUser", JSON.stringify(state.user));
        },

        logout(state) {
            state.user = null;
            localStorage.removeItem("currentUser");
        },

        updateProfile(state, profileData) {
            state.user.bio = profileData.bio;
            state.user.cvName = profileData.cvName;
            state.user.portfolioName = profileData.portfolioName;

            localStorage.setItem("currentUser", JSON.stringify(state.user));
        },

        addProject(state, project) {
            state.user.projects.push(project);
            localStorage.setItem("currentUser", JSON.stringify(state.user));
        },

        removeProject(state, projectIndex) {
            state.user.projects.splice(projectIndex, 1);
            localStorage.setItem("currentUser", JSON.stringify(state.user));
        }
    }
});

export default store;
