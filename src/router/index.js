import Vue from 'vue';
import VueRouter from 'vue-router';
import PokemonList from '../components/PokemonList';
import PokemonDetails from '../components/PokemonDetails';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'PokemonList',
      component: PokemonList,
      props: true
    },
    {
      path: '/poke/:name',
      name: 'PokemonDetails',
      component: PokemonDetails,
      props: true
    }
  ]
})