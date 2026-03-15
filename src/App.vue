<template>
  <div id="app" class="app-container bg-background text-text">
    <div class="content-wrapper">
      <app-header class="content-header" />

      <main class="content-view">
        <router-view />

        <portal-target name="main-modal-target" multiple />
      </main>
    </div>

    <nav-bar class="app-nav-bar" />

    <base-modal v-if="showModal" :title="modalTitle" @close="showModal = false">
      <component :is="modalComponent" v-bind="modalProps" />
    </base-modal>
  </div>
</template>

<script lang="ts">
import Vue, { Component } from "vue";
import AppHeader from "@/components/layouts/AppHeader.vue";
import NavBar from "@/components/layouts/NavBar.vue";
import BaseModal from "@/components/ui/BaseModal.vue";

export default Vue.extend({
  name: "App",
  components: {
    AppHeader,
    NavBar,
    BaseModal,
  },
  data() {
    return {
      showModal: false,
      modalTitle: "Titolo",
      modalComponent: null as Component | null,
      modalProps: {},
    };
  },
  watch: {
    $route() {
      this.showModal = false;
    },
  },
  mounted() {
    this.$root.$on(
      "open-modal",
      ({
        title,
        component,
        props,
      }: {
        title: string;
        component: Component;
        props: object;
      }) => {
        this.showModal = true;
        this.modalTitle = title;
        this.modalComponent = component;
        this.modalProps = props;
      }
    );
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
    @apply flex flex-col flex-1;

    .content-header {
      height: $bar-height;
    }

    .content-view {
      @apply relative flex-1;
    }
  }

  .app-nav-bar {
    height: $bar-height;

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
