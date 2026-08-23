<template>
    <nav class="main-navbar">
        <div class="container">
            <div class="navbar-inner">

                <router-link to="/" class="brand" @click="closeMenu">
                    <span class="brand-icon">✦</span>
                    <span class="brand-text">Career<span>Bridge</span></span>
                </router-link>

                <button class="custom-toggler" @click="menuOpen = !menuOpen">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div class="navigation" :class="{ 'navigation-open': menuOpen }">
                    <ul class="nav-list">

                        <li>
                            <router-link to="/" class="nav-link" @click="closeMenu">Home</router-link>
                        </li>
                        <li>
                            <router-link to="/jobs" class="nav-link" @click="closeMenu">Opportunities</router-link>
                        </li>
                        <li>
                            <router-link to="/saved" class="nav-link" @click="closeMenu">
                                Saved ({{ savedJobsCount }})
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/reviews" class="nav-link" @click="closeMenu">Reviews</router-link>
                        </li>
                        <li>
                            <router-link to="/about" class="nav-link" @click="closeMenu">About</router-link>
                        </li>

                        <li v-if="!isLoggedIn">
                            <router-link to="/auth" class="nav-cta" @click="closeMenu">
                                Get Started →
                            </router-link>
                        </li>

                        <li v-else class="d-flex align-items-center gap-2">
                            <router-link
                                to="/profile"
                                class="avatar-circle d-flex align-items-center justify-content-center text-decoration-none"
                                @click="closeMenu"
                            >
                                {{ userInitials }}
                            </router-link>

                            <button class="nav-cta border-0" @click="logout">
                                Logout
                            </button>
                        </li>

                    </ul>
                </div>

            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Navbar",

    data() {
        return {
            menuOpen: false
        };
    },

    computed: {
        savedJobsCount() {
            return this.$store.getters.savedJobsCount;
        },

        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        },

        userInitials() {
            return this.$store.getters.userInitials;
        }
    },

    methods: {
        closeMenu() {
            this.menuOpen = false;
        },

        logout() {
            this.$store.commit("logout");
            this.closeMenu();
            this.$router.push("/");
        }
    }
};
</script>
