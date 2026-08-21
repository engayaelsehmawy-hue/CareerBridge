<template>
    <div class="container py-5">

        <div class="row align-items-center g-5">

            <div class="col-lg-6">
                <span class="section-label">CareerNest</span>
                <h1>Your next chapter starts with one step.</h1>
                <p class="text-secondary fs-5">
                    Create your account or sign in to keep exploring
                    opportunities made for ambitious students.
                </p>
            </div>

            <div class="col-lg-6">
                <div class="auth-card">

                    <div class="auth-tabs">
                        <button :class="{ active: !isRegister }" @click="isRegister = false">Login</button>
                        <button :class="{ active: isRegister }" @click="isRegister = true">Create Account</button>
                    </div>

                    <h2 class="mb-1">{{ isRegister ? "Create your account." : "Welcome back." }}</h2>
                    <p class="text-secondary mb-4">
                        {{ isRegister ? "Start discovering opportunities today." : "Sign in to continue your journey." }}
                    </p>

                    <form @submit.prevent="submitForm">

                        <div class="mb-3" v-if="isRegister">
                            <label class="form-label">Full name</label>
                            <input type="text" class="form-control" v-model="form.name" required>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control" v-model="form.email" required>
                        </div>

                        <div class="mb-4">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-control" v-model="form.password" required minlength="6">
                        </div>

                        <button type="submit" class="btn btn-primary w-100">
                            {{ isRegister ? "Create account →" : "Login →" }}
                        </button>

                    </form>

                </div>
            </div>

        </div>

    </div>
</template>

<script>
export default {
    name: "Auth",

    data() {
        return {
            isRegister: false,
            form: {
                name: "",
                email: "",
                password: ""
            }
        };
    },

    methods: {
        submitForm() {
            const name = this.isRegister ? this.form.name : this.form.email.split("@")[0];

            this.$store.commit("login", {
                name: name,
                email: this.form.email
            });

            this.$router.push("/profile");
        }
    }
};
</script>
