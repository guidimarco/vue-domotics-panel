<template>
  <div id="app" class="app-container bg-background text-text">
    <div class="content-wrapper">
      <app-header class="content-header" />

      <main class="content-view">
        <router-view />
      </main>
    </div>

    <nav-bar class="app-nav-bar" />

    <portal-target name="modal-destination" multiple />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AppHeader from "@/components/layouts/AppHeader.vue";
import NavBar from "@/components/layouts/NavBar.vue";

export default Vue.extend({
  name: "App",
  components: {
    AppHeader,
    NavBar,
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
      flex: 1;
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
