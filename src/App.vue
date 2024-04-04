<template>
  <div id="app">
    <header>
    <h1>Habit Tracker</h1>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/add-habit">Add Habit</router-link>
      </nav>
    </header>

    <main>
      <router-view></router-view>
    </main>

    <footer>
      <p>Habit Tracker program</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 50vh;
}

header, footer {
  padding: 1rem;
  text-align: center;
}

main {
  flex: 1;
  padding: 1rem;
}

nav a {
  margin: 0 0.5rem;
}
</style>
