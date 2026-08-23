<template>
  <div class="card h-100 review-card">
    <div class="d-flex justify-content-between align-items-center">
      <strong>{{ review.name }}</strong>
      <span class="text-warning">{{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}</span>
    </div>
    <p class="text-muted small mt-3 mb-0">{{ review.text }}</p>
  </div>
</template>

<script setup>
defineProps({ review: { type: Object, required: true } })
</script>