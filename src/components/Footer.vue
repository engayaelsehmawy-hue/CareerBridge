<template>
    <footer class="site-footer">
        <div class="container">

            <div class="row g-4">

                <div class="col-lg-4">
                    <router-link to="/" class="brand text-white">
                        <span class="brand-icon">✦</span> CareerNest
                    </router-link>
                    <p class="mt-3">
                        Helping students discover their next opportunity
                        with less searching and more confidence.
                    </p>
                </div>

                <div class="col-6 col-lg-2">
                    <h6>Explore</h6>
                    <ul class="list-unstyled">
                        <li><router-link to="/jobs">Opportunities</router-link></li>
                        <li><router-link to="/saved">Saved Jobs</router-link></li>
                        <li><router-link to="/reviews">Reviews</router-link></li>
                    </ul>
                </div>

                <div class="col-6 col-lg-2">
                    <h6>Company</h6>
                    <ul class="list-unstyled">
                        <li><router-link to="/about">About Us</router-link></li>
                        <li><router-link to="/auth">Get Started</router-link></li>
                    </ul>
                </div>

                <div class="col-lg-4">
                    <h6>Data Source</h6>
                    <p>Job listings are provided by <strong>Arbeitnow</strong>.</p>
                    <a href="https://www.arbeitnow.com/" target="_blank">Visit Arbeitnow ↗</a>
                </div>

            </div>

            <div class="footer-bottom">
                <span>© 2026 CareerNest</span>
                <span>Made with Vue.js</span>
            </div>

        </div>
    </footer>
</template>

<script>
export default {
    name: "Footer"
};
</script>
