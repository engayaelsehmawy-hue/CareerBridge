<template>
  <div class="page">
    <div class="mb-4">
      <div class="eyebrow">Community insights</div>
      <h1 class="page-heading mt-2">Company Reviews</h1>
      <p class="text-muted small">Share your experience and help other job seekers make informed decisions.</p>
    </div>
    <section class="card mb-4">
      <h2 class="card-title mb-3">Write a Review</h2>
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Company</label>
          <select v-model="newReview.company" class="form-select">
            <option value="">Select a company</option>
            <option v-for="company in companies" :key="company" :value="company">{{ company }}</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label">Rating</label>
          <select v-model="newReview.rating" class="form-select">
            <option :value="5">5 - Excellent</option>
            <option :value="4">4 - Very good</option>
            <option :value="3">3 - Good</option>
            <option :value="2">2 - Fair</option>
            <option :value="1">1 - Poor</option>
          </select>
        </div>
        <div class="col-12">
          <label class="form-label">Your review</label>
          <textarea v-model="newReview.text" class="form-control" rows="4" placeholder="Write your experience with this company..."></textarea>
        </div>
        <div class="col-12">
          <button class="btn btn-primary" @click="addReview">Submit Review</button>
          <p v-if="error" class="text-danger small mt-2 mb-0">{{ error }}</p>
        </div>
      </div>
    </section>

    <div class="row g-3">
      <div v-for="review in reviews" :key="review.id" class="col-md-6">
        <ReviewCard :review="review" />
      </div>
    </div>
  </div>
</template> 

<script setup>
import { ref } from 'vue'
import ReviewCard from '../components/ReviewCard.vue'

const companies = ['Google', 'Microsoft', 'Amazon', 'Careem', 'Talabat', 'Booking.com']
const reviews = ref([
  { id: 1, name: 'Google · Dubai', rating: 5, text: 'Strong engineering culture and excellent learning opportunities.' },
  { id: 2, name: 'Careem · UAE', rating: 4, text: 'Fast-paced environment with strong ownership and collaboration.' },
  { id: 3, name: 'Booking.com · Amsterdam', rating: 5, text: 'Great international team and flexible work culture.' },
  { id: 4, name: 'Microsoft · Germany', rating: 4, text: 'Good benefits and strong focus on professional growth.' }
])

const newReview = ref({ company: '', rating: 5, text: '' })
const error = ref('')

const addReview = () => {
  if (!newReview.value.company || !newReview.value.text.trim()) {
    error.value = 'Please select a company and write your review.'
    return
  }

  reviews.value.unshift({
    id: Date.now(),
    name: newReview.value.company,
    rating: newReview.value.rating,
    text: newReview.value.text.trim()
  })

  newReview.value = { company: '', rating: 5, text: '' }
  error.value = ''
}
</script>