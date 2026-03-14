<template>
  <div id="app" class="app-container bg-background text-text">
    <div class="content-wrapper">
      <header class="content-header glass">Header</header>

      <main class="content-view">
        <router-view />
      </main>
    </div>

    <nav class="app-nav-bar glass">Nav</nav>

    <portal-target name="modal-destination" multiple />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;

  @screen tablet {
    flex-direction: row-reverse;
  }

  .content-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;

    .content-header {
      height: $bar-height;
    }

    .content-view {
      flex: 1;
    }
  }

  .app-nav-bar {
    height: $bar-height;

    @screen tablet {
      width: $tablet-nav-bar-width;
      height: 100%;
    }

    @screen laptop {
      width: $laptop-nav-bar-width;
    }
  }
}
</style>
