<template>
  <div id="app" class="app-container bg-background text-text">
    <main class="content-wrapper">
      <router-view />
    </main>

    <nav-bar class="app-nav-bar" />

    <base-modal v-if="showModal" @close="closeModal">
      <component :is="modalData.component" v-bind="modalData.props" />
    </base-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import AppHeader from "@/components/layouts/AppHeader.vue";
import NavBar from "@/components/layouts/NavBar.vue";
import BaseModal from "@/components/ui/BaseModal.vue";
import { ModalData } from "@/store/store.types";
// Modali
import ZoneMenu from "@/components/menus/ZoneMenu.vue";
import AvMenu from "@/components/menus/AvMenu.vue";

export default Vue.extend({
  name: "App",
  components: {
    AppHeader,
    NavBar,
    BaseModal,
    ZoneMenu,
    AvMenu,
  },
  computed: {
    ...mapGetters("modalStore", ["showModal", "modalData"]),
  },
  watch: {
    $route() {
      this.closeModal();
    },
  },
  methods: {
    ...mapActions("modalStore", ["closeModal", "toggleModal"]),
  },
  mounted() {
    this.$root.$on("toggle-modal", (modalData: ModalData) => {
      this.toggleModal(modalData);
    });
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.app-container {
  @apply flex flex-col h-screen;

  @screen landscape {
    @apply flex-row-reverse;
  }

  .content-wrapper {
    @apply relative flex flex-col flex-1;
  }

  .app-nav-bar {
    @screen landscape {
      @apply h-full;
      width: $landscape-sidebar-width;
    }

    @screen tablet {
      width: $tablet-sidebar-width;
    }

    @screen desktop {
      width: $laptop-sidebar-width;
    }
  }
}
</style>
