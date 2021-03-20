<template>

  <div class="m-4 p-8 bg-white rounded-2xl text-center ">

    <div v-if="!c_addFruit" class="flex flex-col">

      <span class="m-4">{{ c_fruit.description }}</span>

      <button class="bg-black text-white rounded-full">Remove</button>

    </div>
    
    <div v-if="c_addFruit" class="flex flex-col">

      <input type="text" placeholder="input"/>

      <input type="text" placeholder="input"/>

      <input type="text" placeholder="input"/>

      <input type="text" placeholder="input"/>

      <input type="text" placeholder="input"/>

      <button class="bg-black text-white rounded-full">Add</button>

    </div>

  </div>

</template>

<script>

export default {
  name: 'fruit-description-component',
  components: {
    
  },
  props:{
    fruit: {type : Object , required: true},
    addFruit: {type: Boolean, required: true}
  },
  data(){
    return{
      c_fruit: null,
      c_addFruit: false
    }
  },
  methods:{

  },
  watch:{
    fruit: function(value){

      this.c_fruit = value;

    },
    addFruit: function(value){

      this.c_addFruit = value;

    }
  },
  created(){

    this.c_fruit = this.fruit;
    this.c_addFruit = this.addFruit;

  },
  mounted(){

  }
}
</script>

<style>

</style>