<template>

  <div class="m-4 p-8 bg-white rounded-2xl text-center">

    <span class="m-4">{{ c_fruit.description }}</span>

  </div>

</template>

<script>

export default {
  name: 'fruit-description-component',
  components: {
    
  },
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
  watch:{
    fruit: function(value){

      this.c_fruit = value;

    }
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