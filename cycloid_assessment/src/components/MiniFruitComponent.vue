<template>

  <div v-if="c_fruit.name" class="flex mx-4 ml-1">

    <img :src="c_fruit.image" class="w-8 h-8 rounded-full border-gray-200 border-2 border-solid m-2"/>

    <span class="h-8 mt-1 leading-10">{{ c_fruit.name.charAt(0).toUpperCase() + c_fruit.name.slice(1) }}</span>

  </div>

</template>

<script>
import store from '../store/index.js'

export default {
  name: 'mini-fruit-component',
  store,
  components: {},
  props:{
    fruit: {type : Object , required: true}
  },
  data(){
    return{
      c_fruit: null
    }
  },
  methods:{
    
  },

  created(){
    this.c_fruit = this.fruit;
  },
  mounted(){

  }
}
</script>

<style>

</style>