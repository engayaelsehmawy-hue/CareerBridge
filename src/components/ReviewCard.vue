<template>
    <div class="review-card">
        <div class="d-flex justify-content-between">
            <strong>{{ review.name }}</strong>
            <span style="color: var(--gold)">{{ "★".repeat(review.rating) }}</span>
        </div>
        <p class="mb-0 text-secondary">{{ review.comment }}</p>
    </div>
</template>

<script>
export default {
    name: "ReviewCard",

    props: ["review"]
};
</script>
