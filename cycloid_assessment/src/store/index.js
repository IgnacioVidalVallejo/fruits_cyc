import Vue from 'vue';
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        fruits: []
    },



    mutations: {

        ADD_FRUITS(state, fruits) {

            state.fruits = fruits;

        }

    },

    actions: {

        async fetchFruits(context) {

            var data =
                await axios.get('http://localhost:3000/fruit', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.data)
                .then(fruits => {
                    context.commit('ADD_FRUITS', fruits)
                });

            return data;
        }

    },

    getters: {

        getFruits: state => {
            return state.fruits;
        }

    }
})