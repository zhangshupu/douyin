import Vuex from 'vuex';
import Vue from 'vue';
import logger from 'vuex/dist/logger';
import index from './modules/index'

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    index
  },
  plugins: [
    logger()
  ]
})