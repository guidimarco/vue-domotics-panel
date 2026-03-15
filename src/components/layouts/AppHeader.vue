<template>
  <header class="glass flex items-center justify-between">
    <base-button icon="menu" aria-label="Apri il menu" />

    <div>
      <h2>Titolo</h2>
    </div>

    <base-button
      icon="power_settings_new"
      aria-label="Gestisci i dispositivi A/V"
    />
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import BaseButton from "@/components/ui/BaseButton.vue";

export default Vue.extend({
  name: "AppHeader",
  components: {
    BaseButton,
  },
});
</script>
