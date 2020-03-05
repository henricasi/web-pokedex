<template>
  <div class="list-container">
    <div v-if="!loading" class="form-group search-bar-container">
      <input type="text" class="form-control search-bar" v-model="searchStr" placeholder="Search for a Pokémon..." aria-label="Search for a Pokémon" aria-describedby="basic-addon2">
      <div class="filters-container form-row">
        <div class="col d-flex align-items-center gen-filter-container">
          <label for="genFilter" class="mb-0 mr-4">GENERATION</label>
          <select v-model="selected" class="form-control gen-filter" id="genFilter">
            <option>All</option>
            <option>I</option>
            <option>II</option>
            <option>III</option>
            <option>IV</option>
            <option>V</option>
            <option>VI</option>
            <option>VII</option>
          </select>
        </div>
        <div class="col d-flex align-items-center order-container">  
          <label class="mb-0 mr-4">ORDER</label>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="number" id="number" value="number" v-model="picked">
            <label class="form-check-label mr-4" for="number">
              Number
            </label>
            <input class="form-check-input" type="radio" name="az" id="az" value="az" v-model="picked">
            <label class="form-check-label text-nowrap" for="az">
              A-Z
            </label>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loading" class="loader d-flex flex-column justify-content-center">
      <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
    </div>
    
    <div class="pokemon-list d-flex flex-row flex-wrap justify-content-center">
      <PokemonCard v-for="pokemon in searchPokemon()" :key="pokemon.id" :singlePokemon="pokemon"/>
    </div>
  </div>
</template>

<script>
import PokemonCard from './PokemonCard';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import Fuse from 'fuse.js';

export default {
  name: "PokemonList",
  props: {
    listData: Array,
  },
  components: {
    PokemonCard,
    PulseLoader
  },
  data() {
    return {
      searchStr: "",
      copiedList: [],
      selected: "All",
      picked: "number",
      loading: true,
      color: '#cc181e',
      color1: '#5bc0de',
      size: '10px',
      margin: '2px',
      radius: '2px'
    }
  },
  methods: {
    searchPokemon() {
      let sortedList = [...this.copiedList];
      
      if (this.picked === "az") {
        sortedList = sortedList.sort((a, b) => a.name.localeCompare(b.name))
      }

      if (this.selected !== "All") {
        sortedList = sortedList.filter(pokemon => pokemon.generation === this.selected);
      }

      if (this.searchStr !== "") {
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
        let fuse = new Fuse(sortedList, fuseConfig);
        return fuse.search(this.searchStr);
      }
      return sortedList;
    }
  },
  mounted() {
    if (this.listData.length !== 0) {
      this.loading = false;
      console.log('just fetched data');
    }

    if (this.copiedList.length === 0 && this.listData.length !== 0) {
      this.copiedList = [...this.listData];
      console.log('just copied');
    }
  }
}
</script>

<style scoped>
  .loader {
    height: 20em;
  }

  .list-container {
    border: 4px solid rgb(190, 190, 190);
    padding: 0.5em 0;
    background-color: #DEDEDE;
    width: 90%;
    min-height: 50vh;
    margin: 0 auto;
  }

  .search-bar-container {
    margin: 0 auto;
    width: 86%;
  }

  .filters-container {
    background-color: rgb(210,210,210);
    padding: 0;
    margin: 0.15em 0.08em;
  }

  .gen-filter-container {
    justify-content: space-between;
    padding: 0 0.5em;
    margin-bottom: 0;
  }

  .gen-filter {
    margin: 0.2em 0;
    width: 30%;
    height: 75% !important;
  }

  .order-container {
    justify-content: space-between;
    padding: 0 0.5em;
    margin-bottom: 0;
  }

  .form-control:focus {
    border-color: rgb(67, 101, 168);
    box-shadow: 0 0 0 0.2rem rgba(67, 101, 168, 0.25)
  }

  .search-bar {
    height: 3rem;
    margin: 1.5rem 0 0 0;
    font-size: 1em;
  }
  
  @media (min-width: 576px) {
    .list-container {
      width: 80%;
    }

    .gen-filter {
      margin: 0.2em 0;
      width: 30%;
      height: 75% !important;
    }
  }

  @media (min-width: 768px) {
    .list-container {
      width: 80%;
    }

    .filters-container {
      padding: 0 0.5em;
    }

    .gen-filter-container {
      justify-content: flex-start;
      padding: 0;
    }

    .order-container {
      justify-content: flex-end;
      padding: 0;
    }
  }
</style>