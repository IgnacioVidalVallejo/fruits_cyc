<template>

  <div class="m-4 p-6 pt-2 bg-white rounded-2xl text-center ">

    <div v-if="!c_addFruit" class="flex flex-col">

      <div v-if="c_fruit.name" class="flex mx-4 ml-1 justify-between">

        <img :src="c_fruit.image" class="w-8 h-8 rounded-full border-gray-200 border-2 border-solid m-2"/>

        <span class="h-8 mt-1 leading-10">{{ c_fruit.name.charAt(0).toUpperCase() + c_fruit.name.slice(1) }}</span>

        <span class="h-8 mt-1 leading-10">{{ c_fruit.taste }}</span>

        <span class="h-8 mt-1 leading-10">{{c_fruit.price }} €</span>

      </div>

      <span class="m-4">{{ c_fruit.description }}</span>

      <button class="bg-black text-white rounded-full">Remove</button>

    </div>
    
    <div v-show="c_addFruit" class="flex flex-col">

      <div class="flex flex-row justify-between">

        <div id="file-upload" class="w-1/4 mr-6 mt-9 mb-4 cursor-pointer">

          <label for="photo" class="block text-sm font-medium text-gray-700">
          Photo
          </label>

          <div class="mt-1">

            <div class="w-full flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300
            border-dashed rounded-md">

              <div class="space-y-1 text-center">

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
                    JPG up to 100MB
                </p>

              </div>

            </div>

          </div>

        </div>

        <form class="mt-14 mb-4 flex flex-row justify-between w-3/4">

          <div class="w-2/5 flex flex-col justify-between">

            <input class="m-2 border border-gray-200" type="text" name="input" placeholder="Name">

            <input class="m-2 border border-gray-200" type="text" name="input" placeholder="Taste">

            <input class="m-2 border border-gray-200" type="text" name="input" placeholder="Price">

          </div>

          <textarea class="w-1/2 m-2 border border-gray-200" name="description" rows="5" cols="30" maxlength="150" placeholder="Description"></textarea>

        </form>

      </div>

      <button class="bg-black text-white rounded-full">Add</button>

    </div>

  </div>

</template>

<script>
// Import the Cloudinary class
import {Cloudinary} from '@cloudinary/base';

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
      c_addFruit: false,
      cloudinary: null
    }
  },
  methods:{

    //function for the cloudinary upload widget (as popup window)
            cloudinaryUploadWidget: function(){

                var vm = this;

                //var cloudinary = new Cloudinary();

                var myWidget = vm.cloudinary.applyUploadWidget(document.getElementById('file-upload'),
                    {
                        //CLOUDINARY WIDGET UPLOAD API CONFIG
                        cloudName: 'ddcnjjimx',
                        uploadPreset: 'wleo4imq',
                        multiple: false ,
                        sources: ['local', 'camera', 'instagram'],
                        maxImageFileSize: 100000000,
                        minImageWidth: 200,
                        minImageHeight: 200,
                        showPoweredBy: false,
                        filedName: 'file-upload',
                        clientAllowedFormats: "jpeg",
                        showUploadMoreButton: true,
                        thumbnailTransformation: [{ width: 500, height: 500, crop: 'limit' }]


                    },
                    (error, result) => {
                    if (!error && result && result.event === "success") {

                        vm.c_photoUrl = result.info.secure_url;

                            console.log('Done uploading..');
                        }

                    });

                    //popup opener
                    myWidget.open();

            },
    
    deleteFruit(id){

      this.$store.dispatch('deleteFruit',id);

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
    this.cloudinary = new Cloudinary();

  },
  mounted(){

    var vm = this;
    
    //add listener for launching cloudinary image chooser window
    document.getElementById("file-upload").addEventListener("click", function(){
        vm.cloudinaryUploadWidget();
    }, false);

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