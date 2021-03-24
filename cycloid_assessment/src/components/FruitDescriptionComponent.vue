<template>

  <div class="m-4 p-6 pt-2 bg-white rounded-2xl text-center ">

    <!--info show box-->
    <div v-if="!c_addFruit" class="flex flex-col">

      <div v-if="c_fruit.name" class="flex mx-4 ml-1 justify-between">

        <img :src="c_fruit.image" class="w-8 h-8 rounded-full border-gray-200 border-2 border-solid m-2"/>

        <span class="h-8 mt-1 leading-10">{{ c_fruit.name.charAt(0).toUpperCase() + c_fruit.name.slice(1) }}</span>

        <span class="h-8 mt-1 leading-10">{{ c_fruit.taste }}</span>

        <span class="h-8 mt-1 leading-10">{{c_fruit.price }} €</span>

      </div>

      <span class="m-4">{{ c_fruit.description }}</span>

      <button @click.prevent="removeFruit(c_fruitId)" class="bg-gray-400 text-white rounded-full p-4 font-normal hover:font-black">Remove</button>

    </div>
    
    <!--add fruit info box-->
    <div v-show="c_addFruit" class="flex flex-col mt-4">

      <div class="flex flex-row justify-between">
      
        <!--div where to apply cloudinary widget-->
        <div id="filer"></div>
        
        <div id="file-upload" class="w-1/4 mr-6 cursor-pointer">

          <div class="mt-1 h-full mb-2">

            <div class="w-full h-52 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300
            border-dashed rounded-md">

              <div class="space-y-1 text-center flex flex-col justify-center">

                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none"
                viewBox="0 0 48 48" aria-hidden="true">

                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0
                  01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4
                  0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" />

                </svg>

                <div class="flex text-sm text-gray-600">

                  <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium
                  text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2
                  focus-within:ring-offset-2 focus-within:ring-indigo-500 m-auto">Click <br>to upload
                  </label>

                </div>

                <p class="text-xs text-gray-500">
                    JPG up to 10MB
                </p>

              </div>

            </div>

          </div>

        </div>

        <form class="mb-4 flex flex-row justify-between w-3/4">

          <div class="w-2/5 flex flex-col justify-between">

            <input v-model="c_fruitName" class="m-2 border border-gray-200 focus:ring-2 focus:ring-gray-300" type="text" name="name" placeholder="Name">

            <input v-model="c_fruitTaste" class="m-2 border border-gray-200 focus:ring-2 focus:ring-gray-300" type="text" name="taste" placeholder="Taste">

            <input v-model="c_fruitPrice" class="m-2 border border-gray-200 focus:ring-2 focus:ring-gray-300" type="text" name="price" placeholder="Price">

            <span class="flex flex-row justify-between m-2">

              <label class="text-gray-500" for="fruitColor">Color</label>
              <div class="wheel" id="colorWheel" name="fruitColor"></div>

            </span>

            <span class="flex flex-row flex-start">

              <input v-model="c_isFruit" class="m-2 border border-gray-200 focus:ring-2 focus:ring-gray-300" type="checkbox" name="isFruit">
              <label class="text-gray-500 mt-1" for="isFruit">is Fruit</label>

            </span>

            <p v-if="errors.length">

              <ul>

                  <li v-for="(error,index) in errors" :key="index">{{ error }}</li>

              </ul>

            </p>

          </div>

          <textarea v-model="c_fruitDescription" class="w-1/2 m-2 border border-gray-200 focus:ring-2 focus:ring-gray-300" name="description" rows="5" cols="30" 
          maxlength="150" placeholder="Description"></textarea>

        </form>

      </div>

      <button class="bg-gray-400 text-white rounded-full p-4 font-normal hover:font-black" @click.prevent="checkForm">Add fruit</button>

    </div>

  </div>

</template>

<script>
import axios from 'axios';

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
      c_fruitId: null,
      c_addFruit: false,
      c_fruitName: null,
      c_isFruit: null,
      c_fruitTaste: null,
      c_fruitPrice: null,
      c_fruitColor: null,
      c_fruitDescription: null,
      cloudinary: null,
      colorWheel: null,
      c_photoUrl: null,
      c_lastFruitId: null,
      errors: []
      
    }
  },
  methods:{

    checkName: function(){

        if (this.c_fruitName){

            if(this.c_fruitName.length > 48){

                this.erros.push('The name is too long.');

                return false;

            }else{

                var regexpName = /[a-zA-Z]/;

                if(!regexpName.test(this.c_fruitName)){

                    this.errors.push('The name must be formed by letters.');

                    return false;

                }else{

                    return true;

                }
            }

        }else{

            this.errors.push('The name is required.');

            return false;

        }

    },

    checkTaste: function(){

        if (this.c_fruitTaste){

            if(this.c_fruitTaste.length > 48){

                this.erros.push('The taste is too long.');

                return false;

            }else{

                var regexpName = /[a-zA-Z]/;

                if(!regexpName.test(this.c_fruitTaste)){

                    this.errors.push('The taste must be formed by letters.');

                    return false;

                }else{

                    return true;

                }
            }

        }else{

            this.errors.push('Taste is required.');

            return false;

        }

    },

    checkPrice: function(){

        if (this.c_fruitPrice){

            if(this.c_fruitPrice.length > 48){

                this.erros.push('The price is too long.');

                return false;

            }else{

                var regexpName = /[\d]/;

                if(!regexpName.test(this.c_fruitPrice)){

                    this.errors.push('The price must be formed by numbers, 2 decimals max.');

                    return false;

                }else{

                    return true;

                }
            }

        }else{

            this.errors.push('The price is required.');

            return false;

        }

    },

    checkDescription: function(){

        if (this.c_fruitDescription){

            if(this.c_fruitDescription.length > 150){

                this.erros.push('The description is too long.');

                return false;

            }else{

              return true;

            }

        }else{

            this.errors.push('The description is required.');

            return false;

        }

    },


    checkForm: function (e) {

        this.errors = [];

        if(this.checkName() && this.checkTaste() && this.checkPrice() && this.checkDescription()){

            this.sendFruit();

        }

    },

    //function for the cloudinary upload widget (as popup window)
    cloudinaryUploadWidget: function(){

      var vm = this;

      var myWidget = cloudinary.applyUploadWidget(document.getElementById('filer'),
        {
          //CLOUDINARY WIDGET UPLOAD API CONFIG
          cloudName: 'ddcnjjimx',
          uploadPreset: 'wleo4imq',
          multiple: false ,
          sources: ['local', 'camera', 'instagram'],
          maxImageFileSize: 10000000,
          minImageWidth: 100,
          minImageHeight: 100,
          showPoweredBy: false,
          filedName: 'file-upload',
          clientAllowedFormats: "jpeg",
          showUploadMoreButton: true,
          showSkipCropButton: true,
          thumbnailTransformation: [{ width: 150, height: 150, crop: 'limit' }]


        },
        (error, result) => {
        if (!error && result && result.event === "success") {

          vm.c_photoUrl = result.info.secure_url;

          document.getElementById('file-upload').style.display="none";

              console.log('Done uploading..');
        }

        if(result.event === "close"){

          console.log('closed');

        }

      });

      //popup opener
      myWidget.open();

    },

    sendFruit: function(){
      
      var vm = this;

      var date = new Date();

      var fruitExpiration = date.setMonth(date.getMonth()+1);

      alert(fruitExpiration);

      return axios
      .post('http://localhost:3000/fruit',
        {
          "isFruit": vm.c_isFruit,
          "name": vm.c_fruitName,
          "image": vm.c_photoUrl,
          "price": vm.c_fruitPrice,
          "color": vm.c_fruitColor,
          "description": vm.c_fruitDescription,
          "taste": vm.c_fruitTaste
          
        })
      .then(function(response){

        vm.$emit('fruit-change');

        console.log('responsethis'+JSON.stringify(response));

      })
      .catch(function(error) {

        vm.$emit('fruit-change');

        console.log("charge ERROR: " + JSON.stringify(error));

      });
    },
    
    removeFruit: function(id){

      var vm = this;

      return axios

      .delete('http://localhost:3000/fruit/'+vm.c_fruitId)
      .then(function(response){

        vm.$emit('fruit-change');

        console.log('responsethis'+JSON.stringify(response));

      })
      .catch(function(error) {

        vm.$emit('fruit-change');

        console.log("charge ERROR: " + JSON.stringify(error));

      });

    }, 
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
    this.c_photoUrl = "https://res.cloudinary.com/demo/image/upload/d_avatar.png/non_existing_id.png";

  },

  updated(){

    this.c_fruitId = this.c_fruit.id;

  },
  mounted(){

    var vm = this;
    
    //add listener for launching cloudinary image chooser window
    document.getElementById("file-upload").addEventListener("click", function(){
        vm.cloudinaryUploadWidget();
    }, false);

    //color slider
    vm.colorWheel = iro.ColorPicker("#colorWheel", {

      layout:[
        {
          component: iro.ui.Slider,

          options: {

            sliderType: 'hue' 
            
          }
        }
      ],

      width: 100

    });

    vm.c_fruitColor = vm.colorWheel.color.hexString;

    document.getElementById("colorWheel").addEventListener("click", function(){
      
      vm.c_fruitColor = vm.colorWheel.color.hexString;

    });

    this.c_fruitId = this.c_fruit.id;

  }
}
</script>

<style>

.cloudinary-button{
    display: none;
}
.cloudinary-thumbnails{
    margin-top: 45px;
    margin-left: 25px;

}
</style>