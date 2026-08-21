<template>
    <div>
        <section class="page-header">
            <div class="container">
                <span class="section-label">Your account</span>
                <h1>My Profile</h1>
            </div>
        </section>

        <div class="container py-5">

            <div v-if="!user" class="empty-state">
                <h4>Please login to see your profile</h4>
                <router-link to="/auth" class="btn btn-primary mt-2">Login / Register</router-link>
            </div>

            <div v-else class="row g-4">

                <div class="col-lg-4">
                    <div class="profile-card text-center">
                        <div class="avatar-circle d-flex align-items-center justify-content-center mx-auto mb-3 fs-4">
                            {{ initials }}
                        </div>
                        <h5 class="mb-0">{{ user.name }}</h5>
                        <p class="text-secondary">{{ user.email }}</p>
                    </div>
                </div>

                <div class="col-lg-8">

                    <div class="profile-card mb-4">
                        <h5 class="mb-3">About me</h5>

                        <form @submit.prevent="saveProfile">

                            <div class="mb-3">
                                <label class="form-label">Description</label>
                                <textarea class="form-control" rows="3" v-model="bio" placeholder="Write a short bio about yourself"></textarea>
                            </div>

                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label">CV</label>
                                    <input type="file" class="form-control" @change="onCvChange">
                                    <small class="text-secondary" v-if="cvName">Selected: {{ cvName }}</small>
                                </div>

                                <div class="col-md-6">
                                    <label class="form-label">Portfolio</label>
                                    <input type="file" class="form-control" @change="onPortfolioChange">
                                    <small class="text-secondary" v-if="portfolioName">Selected: {{ portfolioName }}</small>
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary mt-3">Save</button>

                        </form>
                    </div>

                    <div class="profile-card">
                        <h5 class="mb-3">My Projects</h5>

                        <form class="row g-2 mb-4" @submit.prevent="addProject">
                            <div class="col-md-4">
                                <input type="text" class="form-control" placeholder="Project title" v-model="newProject.title" required>
                            </div>
                            <div class="col-md-4">
                                <input type="text" class="form-control" placeholder="Link (optional)" v-model="newProject.link">
                            </div>
                            <div class="col-md-3">
                                <input type="text" class="form-control" placeholder="Short description" v-model="newProject.description" required>
                            </div>
                            <div class="col-md-1">
                                <button type="submit" class="btn btn-primary w-100">Add</button>
                            </div>
                        </form>

                        <p v-if="user.projects.length === 0" class="text-secondary">No projects added yet.</p>

                        <ul class="list-group" v-else>
                            <li
                                class="list-group-item d-flex justify-content-between align-items-start"
                                v-for="(project, index) in user.projects"
                                :key="index"
                            >
                                <div>
                                    <strong>{{ project.title }}</strong>
                                    <p class="mb-0 text-secondary">{{ project.description }}</p>
                                    <a v-if="project.link" :href="project.link" target="_blank">{{ project.link }}</a>
                                </div>
                                <button class="btn btn-outline-danger btn-sm" @click="removeProject(index)">Remove</button>
                            </li>
                        </ul>

                    </div>

                </div>

            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: "Profile",

    data() {
        return {
            bio: "",
            cvName: "",
            portfolioName: "",
            newProject: {
                title: "",
                description: "",
                link: ""
            }
        };
    },

    created() {
        if (this.user) {
            this.bio = this.user.bio;
            this.cvName = this.user.cvName;
            this.portfolioName = this.user.portfolioName;
        }
    },

    computed: {
        user() {
            return this.$store.getters.currentUser;
        },

        initials() {
            return this.$store.getters.userInitials;
        }
    },

    methods: {
        onCvChange(event) {
            const file = event.target.files[0];
            this.cvName = file ? file.name : "";
        },

        onPortfolioChange(event) {
            const file = event.target.files[0];
            this.portfolioName = file ? file.name : "";
        },

        saveProfile() {
            this.$store.commit("updateProfile", {
                bio: this.bio,
                cvName: this.cvName,
                portfolioName: this.portfolioName
            });
        },

        addProject() {
            this.$store.commit("addProject", { ...this.newProject });
            this.newProject = { title: "", description: "", link: "" };
        },

        removeProject(index) {
            this.$store.commit("removeProject", index);
        }
    }
};
</script>
