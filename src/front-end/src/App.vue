<template>
  <div id="app" class="">
    <router-view></router-view>
  </div>
</template>

<script>
import { routes } from './routes';
import Menu from './components/Menu.vue';

export default {
  name: "App",
  components: { Menu },
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
