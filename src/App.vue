<template>
  <div class="container-fluid p-0">
    <div class="pokedex container">
      <header>
        <img src="./assets/pokeball.png" alt="Pokéball" class="pokeball">
        <h1>Web PokéDex</h1>
      </header>
      <router-view v-bind:listData="fullList" v-bind:pokeAPI="pokeAPI"></router-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'App',
  methods: {
    normalizeName(name) {
      let normalizedName;
      const specialNames = {
        'mr-mime': 'Mr. Mime',
        'ho-oh': 'Ho-Oh',
        'mime-jr': 'Mime Jr.',
        'deoxys-normal': 'Deoxys',
        'porygon-z': 'Porygon-Z',
        'type-null': 'Type: Null',
        'jangmo-o': 'Jangmo-o',
        'hakamo-o': 'Hakamo-o',
        'kommo-o': 'Kommo-o',
        'tapu-koko': 'Tapu-koko',
        'tapu-lele': 'Tapu-lele',
        'tapu-bulu': 'Tapu-bulu',
        'tapu-fini': 'Tapu-fini',
      }
      // check to see if name falls under special cases
      if (Object.prototype.hasOwnProperty.call(specialNames, name)) {
        normalizedName = specialNames[name];
        return normalizedName;
      }
      //Capitalize first letter
      normalizedName = name.charAt(0).toUpperCase() + name.slice(1);
      //Turns hyphen into spaces, inserts parentheses
      if (name.indexOf('-') !== -1 ) {
        let hyphenIndex = name.indexOf('-');
        normalizedName = normalizedName.slice(0, hyphenIndex) + ' (' + normalizedName.charAt(hyphenIndex +1).toUpperCase() + normalizedName.slice(hyphenIndex + 2, normalizedName.length) + ')';
        
        if (normalizedName.indexOf('-') !== -1 ) {
          let hyphenIndex = normalizedName.indexOf('-');
          normalizedName = normalizedName.slice(0, hyphenIndex) + ' ' + normalizedName.charAt(hyphenIndex +1).toUpperCase() + normalizedName.slice(hyphenIndex + 2, normalizedName.length);
        }
      }
      return normalizedName;
    },
    getGeneration (num) {
      if (num <= 151) {
        return "I"
      } else if (num <= 251) {
        return "II"
      } else if (num <= 386) {
        return "III"
      } else if (num <= 493) {
        return "IV"
      } else if (num <= 649) {
        return "V"
      } else if (num <= 721) {
        return "VI"
      } else if (num <= 807) {
        return "VII"
      }
    }
  },
  data() {
    return {
      fullList: [],
      pokeAPI: {}
    }
  },
  created() {
    this.pokeAPI = axios.create({baseURL: 'http://pokeapi.co/api/v2/'});
    let self = this;
    this.pokeAPI.get('pokemon/?limit=807')
      .then(res => {
        let {results} = res.data;
        results.forEach((pokemon, idx) => {
          pokemon.displayName = self.normalizeName(pokemon.name);
          pokemon.number = idx + 1;
          pokemon.imagePath = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.number}.png`;
          pokemon.generation = self.getGeneration(pokemon.number);
          pokemon.id = uuidv4();
        })
      this.fullList = results;
      })
      .catch(err => console.log(err));
  }
}
</script>

//TODO definir font-family

<style>

  body {
    font-family: 'Pokemon Fire Red', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 24px;
    padding: 1em;
    background-color: rgb(250, 250, 250);
  }

  .pokeball {
    height: 3em;
  }

  h1 {
    color: #F4C908;
    font-size: 2em;
    margin-bottom: 0.5em;
    text-decoration: overline rgb(67, 101, 168);
  }

  .site-description {
    color: #F4C908;
    font-size: 1.2em;
  }

  .pokedex {
    padding: 1em 0.3em;
    margin-top: 0.5em;
    background-color: rgb(192, 45, 45);
    border-radius: 1em;
    padding-bottom: 2.5em;
  }

</style>
