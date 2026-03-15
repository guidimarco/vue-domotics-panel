<template>
  <div class="h-full flex items-center justify-center">
    <h1 class="text-4xl font-medium">{{ brand }}</h1>
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
