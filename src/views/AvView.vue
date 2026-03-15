<template>
  <div class="w-full h-full flex flex-col gap-4 py-4">
    <div class="flex justify-center">
      <base-button
        class="w-60 button-primary"
        label="OFF"
        aria-label="Accendi/spegni i dispositivi A/V"
        @click="openAvModal"
      />
    </div>
    <div class="flex-1 flex items-center justify-center">Contenuto</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BaseButton from "@/components/ui/BaseButton.vue";

export default Vue.extend({
  name: "AvView",
  components: {
    BaseButton,
  },
  methods: {
    openAvModal() {
      this.$root.$emit("toggle-modal", {
        modalId: "av-modal",
        component: null,
        props: {},
      });
    },
  },
});
</script>
