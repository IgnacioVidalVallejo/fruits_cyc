<template>

  <div id="app">

    <mini-fruit-component></mini-fruit-component>

    <fruit-description-component></fruit-description-component>
    
  </div>

</template>

<script>
import MiniFruitComponent from './MiniFruitComponent.vue'
import FruitDescriptionComponent from './FruitDescriptionComponent.vue'

import store from '../store/index.js'

export default {
  name: 'App',
  store,
  components: {
    MiniFruitComponent, FruitDescriptionComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
