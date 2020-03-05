<template>
  <div class="list-container">
    <div class="input-group search-bar-container">
      <input type="text" class="form-control search-bar" v-model="searchStr" placeholder="Search for a Pokémon..." aria-label="Search for a Pokémon" aria-describedby="basic-addon2">
    </div>
    <!-- TODO add filters, sorting (abc, original) -->
    <div class="pokemon-list d-flex flex-row flex-wrap justify-content-center">

      <PokemonCard v-for="pokemon in searchPokemon" :key="pokemon.id" :singlePokemon="pokemon"/>
    </div>
  </div>
</template>

<script>
import PokemonCard from './PokemonCard';
import Fuse from 'fuse.js';

export default {
  name: "PokemonList",
  props: {
    listData: Array,
  },
  components: {
    PokemonCard
  },
  data() {
    return {
      searchStr: "",
    }
  },
  computed: {
    searchPokemon() {
      if (this.searchStr === "") {
        return this.listData;
      }

      let fuseConfig = {
        shouldSort: true,
        threshold: 0.35,
        location: 0,
        distance: 16,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          "name",
          "displayName"
        ]
      };  
      let fuse = new Fuse(this.listData, fuseConfig);
      return fuse.search(this.searchStr);
    }
  },
}
</script>

<style scoped>
  .list-container {
    border: 4px solid rgb(190, 190, 190);
    padding: 0.5em 0;
    background-color: #DEDEDE;
    width: 90%;
    margin: 0 auto;
  }

  .search-bar-container {
    margin: 0 auto;
    width: 86%;
  }

  .form-control:focus {
    border-color: rgb(67, 101, 168);
    box-shadow: 0 0 0 0.2rem rgba(67, 101, 168, 0.25)
  }

  .search-bar {
    height: 3rem;
    margin: 1.5rem 0 0.8rem 0;
    font-size: 1em;
  }
  
  @media (min-width: 576px) {
    .list-container {
      width: 80%;
    }
  }

  @media (min-width: 768px) {
    .list-container {
      width: 80%;
    }
  }
</style>