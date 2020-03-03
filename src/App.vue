<template>
  <div class="container-fluid p-0">
    <Navbar/>
    <div class="container">
      <h1>Online PokéDex</h1>
      
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search for a Pokémon..." aria-label="Search for a Pokémon" aria-describedby="basic-addon2">
      </div>

      <ul>
        <li v-for="(pokemon, index) in fullList" :key="index">{{pokemon.name}}</li>
      </ul>

      <PokemonList />

    </div>

  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import PokemonList from './components/PokemonList.vue';
import axios from 'axios';

const pokeAPI = axios.create({baseURL: 'http://pokeapi.co/api/v2/'});

export default {
  name: 'App',
  components: {
    Navbar,
    PokemonList
  },
  methods: {

  },
  data() {
    return {
      fullList: [],
      filteredList: []
    }
  },
  created() {
    console.log('im in!');

    const specialNames = {
      'mr-mime': 'Mr. Mime',
      'ho-oh': 'Ho-Oh',
      'mime-jr': 'Mime Jr.',
      'porygon-z': 'Porygon-Z',
      'type-null': 'Type: Null',
      'jangmo-o': 'Jangmo-o',
      'hakamo-o': 'Hakamo-o',
      'kommo-o': 'Kommo-o',
      'tapu-koko': 'Tapu-koko',
      'tapu-lele': 'Tapu-lele',
      'tapu-bulu': 'Tapu-bulu',
      'tapu-fini': 'Tapu-fini',
      'kommo-o-totem': 'Kommo-o (Totem)'
    }

    const normalizeName = (name) => {
      let normalizedName;

      if (Object.prototype.hasOwnProperty.call(specialNames, name)) {
        normalizedName = specialNames[name];
        return normalizedName;
      }
      
      normalizedName = name.charAt(0).toUpperCase() + name.slice(1);
      
      if (name.indexOf('-') !== -1 ) {
        let hyphenIndex = name.indexOf('-');
        normalizedName = normalizedName.slice(0, hyphenIndex) + ' (' + normalizedName.charAt(hyphenIndex +1).toUpperCase() + normalizedName.slice(hyphenIndex + 2, normalizedName.length) + ')';
        
        if (normalizedName.indexOf('-') !== -1 ) {
          let hyphenIndex = normalizedName.indexOf('-');
          normalizedName = normalizedName.slice(0, hyphenIndex) + ' ' + normalizedName.charAt(hyphenIndex +1).toUpperCase() + normalizedName.slice(hyphenIndex + 2, normalizedName.length);
        }
      }
      return normalizedName;
    }

    pokeAPI.get('pokemon/?limit=964')
      .then(res => {
        let {results} = res.data;
        results.forEach(pokemon => pokemon.name = normalizeName(pokemon.name));
        this.fullList = results;
      })
      .catch(err => console.log(err));
  }
}
</script>

//TODO definir font-family

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
