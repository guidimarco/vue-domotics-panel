<template>
  <div class="view-wrapper center-content">
    <h1 class="main-title">{{ brand }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "HomeView",
  computed: {
    ...mapGetters("appState", ["brand"]),
  },
});
</script>
