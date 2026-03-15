<template>
  <header class="bar-style flex items-center justify-between">
    <base-button icon="menu" aria-label="Apri il menu" @click="openMenu" />

    <div>
      <h2>{{ zoneName }}</h2>
    </div>

    <base-button
      icon="power_settings_new"
      aria-label="Gestisci i dispositivi A/V"
      @click="openAv"
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
  data() {
    return {
      zoneName: "Master Cabin",
    };
  },
  methods: {
    openMenu() {
      this.$root.$emit("open-modal", {
        title: "Menu",
        component: null,
        props: {},
      });
    },
    openAv() {
      this.$root.$emit("open-modal", {
        title: "A/V",
        component: null,
        props: {},
      });
    },
  },
});
</script>
