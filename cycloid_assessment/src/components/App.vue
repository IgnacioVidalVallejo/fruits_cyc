<template>

  <div class="w-full bg-gray-100 h-screen pt-16 mx-auto">

    <header class="fixed top-4 h-14 w-full text-center text-2xl leading-loose bg-gray-100">

      <h1 class="w-1/4 p-0 bg-white rounded-2xl mx-auto">Fruit List</h1>

    </header>

    <div class="w-2/3 m-auto flex justify-between">

      <ul class="w-1/4 h-16 mt-2 p-2 text-left list-none font-sans text-xs overflow-y-scroll overscroll-contain bg-gray-100 rounded-2xl mx-auto">

        <li v-for="(fruit,index) in fruits" :key="index" @click.prevent="activefruit = index" :class="[ activefruit === index ? 'active' : '' ]">

          <mini-fruit-component :fruit="fruit"></mini-fruit-component>

        </li>
  
      </ul>

      <div class="w-3/5 mx-auto text-xs">

        <fruit-description-component v-if="fruits[activefruit]" :fruit="fruits[activefruit]"></fruit-description-component>

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
      activefruit: null

    }
  },

  methods:{

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
        console.log('receivedFruits '+JSON.stringify(vm.receivedFruits));
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
  scroll-snap-type: y proximity;
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
