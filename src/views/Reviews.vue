<template>
    <div>
        <section class="page-header">
            <div class="container">
                <span class="section-label">Student voices</span>
                <h1>Tell us what you think.</h1>
                <p>Your experience helps us make CareerNest better for every student.</p>
            </div>
        </section>

        <div class="container py-5">

            <div class="row justify-content-center mb-5">
                <div class="col-lg-7">
                    <div class="auth-card">

                        <h2 class="text-center mb-4">How useful was CareerNest?</h2>

                        <form @submit.prevent="addReview">

                            <div class="mb-3">
                                <label class="form-label">Your name</label>
                                <input type="text" class="form-control" v-model="newReview.name" required>
                            </div>

                            <div class="mb-3">
                                <label class="form-label d-block">Your rating</label>
                                <div class="stars-select">
                                    <button
                                        type="button"
                                        v-for="star in 5"
                                        :key="star"
                                        @click="newReview.rating = star"
                                    >
                                        {{ star <= newReview.rating ? "★" : "☆" }}
                                    </button>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Your feedback</label>
                                <textarea class="form-control" rows="4" v-model="newReview.comment" required></textarea>
                            </div>

                            <button type="submit" class="btn btn-primary w-100">Submit Feedback →</button>

                        </form>

                    </div>
                </div>
            </div>

            <div v-if="reviews.length > 0" class="text-center mb-4">
                <strong class="fs-2">{{ averageRating }}</strong>
                <p class="text-secondary mb-0">
                    Average rating from {{ reviews.length }} student{{ reviews.length === 1 ? "" : "s" }}.
                </p>
            </div>

            <div class="row justify-content-center">
                <div class="col-lg-7">
                    <p v-if="reviews.length === 0" class="text-secondary text-center">
                        No reviews yet. Be the first to write one!
                    </p>

                    <ReviewCard v-for="(review, index) in reviews" :key="index" :review="review" />
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import ReviewCard from "../components/ReviewCard.vue";

export default {
    name: "Reviews",

    components: {
        ReviewCard
    },

    data() {
        return {
            reviews: [],
            newReview: {
                name: "",
                rating: 5,
                comment: ""
            }
        };
    },

    created() {
        const stored = localStorage.getItem("reviews");
        this.reviews = stored ? JSON.parse(stored) : [];
    },

    computed: {
        averageRating() {
            const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
            return (total / this.reviews.length).toFixed(1);
        }
    },

    methods: {
        addReview() {
            this.reviews.unshift({ ...this.newReview });
            localStorage.setItem("reviews", JSON.stringify(this.reviews));
            this.newReview = { name: "", rating: 5, comment: "" };
        }
    }
};
</script>
