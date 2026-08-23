<template>
  <article class="card h-100">
    <div class="d-flex justify-content-between align-items-start">
      <div class="company-avatar">
  {{ job.company?.charAt(0)?.toUpperCase() || "C" }}
</div> 
      <button class="save-btn" @click="toggleSaved(job)">
        <i :class="isSaved(job.id) ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'"></i>
      </button>
    </div>
    <div class="mt-3">
      <h3 class="job-title mb-1">{{ job.title }}</h3>
      <div class="job-company">{{ job.company }}</div>
      <div class="job-meta mt-2"><i class="bi bi-geo-alt"></i> {{ job.location }}</div>
    </div>
    <div class="mt-3">
      <span class="pill">{{ job.type }}</span>
      <span v-if="job.remote" class="pill">Remote</span>
    </div>
    <div class="d-flex justify-content-between align-items-end mt-4">
      <div><small class="text-muted d-block">Match</small><strong class="match">{{ job.match }}%</strong></div>
      <RouterLink :to="`/jobs/${job.slug}`" class="btn btn-sm btn-primary px-3">View Job</RouterLink>
    </div>
  </article>
</template>
<script setup>
import { useStore } from "vuex";

defineProps({
  job: {
    type: Object,
    required: true
  }
});

const store = useStore();

const isSaved = (jobId) => {
  return store.getters.savedJobs.some(job => job.id === jobId);
};

const toggleSaved = (job) => {
  if (isSaved(job.id)) {
    store.commit("removeJob", job.slug);
  } else {
    store.commit("saveJob", job);
  }
};
</script>