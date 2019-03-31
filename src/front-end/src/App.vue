<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
/* eslint-disable */
import { routes } from './routes';

export default {
  name: "App",
  data(){
    return {
      routes
    }
  }
};
</script>

<style>
#app {
  background-color: whitesmoke;
}
</style>
