<template>

  <div class="w-full bg-gray-100 h-screen pt-16 mx-auto">

    <header class="fixed top-0 w-full text-center text-2xl bg-gray-100">

      <h1 class="w-1/4 h-16 p-0 bg-white rounded-2xl mx-auto text-4xl">Fruit List</h1>

    </header>

    <div class="w-2/3 m-auto flex flex-col lg:flex-row justify-between bg-gray-200 rounded-2xl">

      <div class="w-1/4 h-20 mt-4 flex flex-col">

        <div class="w-4 flex justify-between p-auto m-auto"><span class="w-4 border border-white transform -rotate-12"></span><span class="w-4 border border-white transform rotate-12"></span></div>

        <ul class="h-12 text-left list-none font-sans text-lg overflow-y-scroll overscroll-contain bg-gray-100 rounded-2xl mx-auto">

          <li v-for="(fruit,index) in fruits" :key="index" @click.prevent="activefruit = index; addFruit = false" :class="[ activefruit === index ? 'active' : '' ]">

            <mini-fruit-component :fruit="fruit"></mini-fruit-component>

          </li>

          <li class="text-center">

            <button class="w-full rounded-full h-12 text-center bg-black text-white" @click="enableAddFruit">Add fruit</button>
            
          </li>
    
        </ul>

        <div class="w-4 flex justify-between p-auto m-auto"><span class="w-4 border border-white transform rotate-12"></span><span class="w-4 border border-white transform -rotate-12"></span></div>

      </div>
      

      <div class="w-3/5 mx-auto text-lg">

        <fruit-description-component v-if="fruits[activefruit]" :fruit="fruits[activefruit]" :addFruit="addFruit"></fruit-description-component>

      </div>

    </div>
    
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
  },

  data(){
    return{

      receivedFruits: [],
      fruits:[],
      activefruit: null,
      addFruit: false

    }
  },

  methods:{

    enableAddFruit(){

      if(this.addFruit == false)
        this.addFruit = true;

    },

    fetchFruits(){

      this.$store.dispatch('fetchFruits');

    }, 

    fruitize(){

      for(var i in this.receivedFruits){

        if(i === 'isFruit'){
          this.fruits.push(this.receivedFruits);
        }
        
        for(var j in this.receivedFruits[i]){

          if(j === 'isFruit'){
            this.fruits.push(this.receivedFruits[i]);
          }
          
          for(var k in this.receivedFruits[i][j]){

            if(k === 'isFruit'){
              this.fruits.push(this.receivedFruits[i][j]);
            }
            
            for(var l in this.receivedFruits[i][j][k]){

              if(l === 'isFruit'){
                this.fruits.push(this.receivedFruits[i][j][k]);
              }
              
              for(var m in this.receivedFruits[i][j][k][l]){

                if(m === 'isFruit'){
                  this.fruits.push(this.receivedFruits[i][j][k][l]);
                }
                
                for(var n in this.receivedFruits[i][j][k][l][m]){

                  if(n === 'isFruit'){
                    this.fruits.push(this.receivedFruits[i][j][k][l][m]);
                  }

                  for(var o in this.receivedFruits[i][j][k][l][m][n]){

                    if(o === 'isFruit'){
                      this.fruits.push(this.receivedFruits[i][j][k][l][m][n]);
                    }
                    
                  }
                  
                }
                
              }
              
            }
            
          }

        }
      }

    }

  },

  beforeCreate(){

    
  },

  created(){

    this.activefruit = 0;
    
    this.fetchFruits();

    var vm = this;

    setTimeout(
      function(){
        vm.receivedFruits = vm.$store.getters.getFruits;
        vm.fruitize();
      },500);

  },

  mounted(){

    

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
ul{
  scroll-snap-type: y mandatory;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none; 
}
.ul::-webkit-scrollbar {
  display: none;
}
li{
  cursor: pointer;
  scroll-snap-align: center;
  scroll-snap-stop: always;
}
.active{
  background: white;
  border-radius: 40px;
}
</style>
