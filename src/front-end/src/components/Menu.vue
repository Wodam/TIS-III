
<template>
  <v-app id="inspire">
    <v-toolbar
      color="blue-grey"
      dark
      fixed
      app
      clipped-left
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>IsCool</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      app
    >
      <v-list dense>
        <v-list-tile 
            v-for="(item, index) in items"
            :key="index"
            @click="handleItemClick(item)"    
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.label }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
        <slot name="content"/>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      items: [
          { icon: 'mdi-seat', label: 'Questões', url: '/questoes' }
      ]
    }),
    props: {
    },
    methods: {
        handleItemClick(item, a) {
            this.$router.push(item.url)
        }
    }
  }
</script>