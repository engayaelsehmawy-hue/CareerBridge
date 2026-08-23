```vue
<template>
  <article class="job-card">
    <div class="job-card-top">
      <div class="company-avatar">
        {{ companyInitial }}
      </div>

      <button
        class="save-btn"
        :class="{ saved: isSaved }"
        @click="toggleSave"
      >
        {{ isSaved ? "★" : "☆" }}
      </button>
    </div>

    <span class="section-label mt-3">Opportunity</span>

    <h5 class="job-title">
      {{ job.title }}
    </h5>

    <p class="company-name">
      {{ job.company_name || job.company || "Company" }}
    </p>

    <p class="job-info">
      📍 {{ job.location || "Location not specified" }}
    </p>

    <div
      class="job-tags"
      v-if="job.job_types && job.job_types.length"
    >
      <span
        v-for="type in job.job_types.slice(0, 2)"
        :key="type"
      >
        {{ type }}
      </span>
    </div>

    <div class="job-card-bottom">
      <router-link
        :to="'/jobs/' + job.slug"
        class="details-btn"
      >
        View Details →
      </router-link>

      <span
        v-if="isSaved"
        class="text-success small fw-bold"
      >
        Saved
      </span>
    </div>
  </article>
</template>

<script>
export default {
  name: "JobCard",

  props: {
    job: {
      type: Object,
      required: true
    }
  },

  computed: {
    isSaved() {
      return this.$store.getters.savedJobs.some(
        savedJob => savedJob.slug === this.job.slug
      );
    },

    companyInitial() {
      const name =
        this.job.company_name ||
        this.job.company ||
        "C";

      return name.charAt(0).toUpperCase();
    }
  },

  methods: {
    toggleSave() {
      if (this.isSaved) {
        this.$store.commit(
          "removeJob",
          this.job.slug
        );
      } else {
        this.$store.commit(
          "saveJob",
          this.job
        );
      }
    }
  }
};
</script>
```
