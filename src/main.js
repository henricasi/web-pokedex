import Vue from 'vue';
import router from './router/index';

import App from './App';
// import PokemonList from './components/PokemonList'
// import PokemonDetails from './components/PokemonDetails';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
