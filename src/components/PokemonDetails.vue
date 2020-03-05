<template>
  <div class="details-container">
    <div v-if="loading" class="loader d-flex flex-column justify-content-center">
      <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
    </div>
    <div v-if="!loading" class="row details d-flex">
      <div class="col-lg-3">
        <div v-if="newData" class="details-sprites">
          <h2>Sprites</h2>
          <hr>
          <div class="sprites">
            <h3>Normal</h3>
            <div class="sprites-images">
              <img :src="newData.sprites.front_default" alt="Front">
              <img v-if="newData.sprites.back_default !== null" :src="newData.sprites.back_default" alt="Back">
            </div>  
          </div>
          <div class="sprites mt-3">
            <h3>Shiny</h3>
            <div class="sprites-images">
              <img :src="newData.sprites.front_shiny" alt="Front">
              <img v-if="newData.sprites.back_shiny !== null" :src="newData.sprites.back_shiny" alt="Back">
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-9">
        <div v-if="newData" class="details-text d-flex flex-column justify-content-between">
          <div>
            <h2>Info</h2>
            <hr>
          </div>
          <div class="row info-group">
            <div class="col-sm-4">
              <p class="detail-title">Name</p>  
            </div>
            <div class="col-sm-8">
              <h2>{{previousData.displayName}}</h2>
            </div>
          </div>
          <div class="row info-group">
            <div class="col-sm-4">
              <p class="detail-title">Generation</p>
            </div>
            <div class="col-sm-8">
              <p class="detail-content">{{previousData.generation}}</p>
            </div>
          </div>
          <div class="row info-group">
            <div class="col-sm-4">
              <p class="detail-title">Types</p>  
            </div>
            <div class="col-sm-8 d-flex justify-content-around">
              <p v-for="(type, idx) in sortTypes" :key="idx" class="pokemon-type detail-content" v-bind:style="{ backgroundColor: getTypeColor(type.type.name)}">{{normalizeName(type.type.name)}}</p>
            </div>
          </div>

          <div class="d-flex flex-column align-items-center mt-3">
            <h3 class="detail-title">Stats</h3>
            <div class="d-flex flex-column align-items-start table-responsive-md">
              <table class="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th v-for="(stat, idx) in reverseStats" :key="idx" scope="col">{{normalizeName(stat.stat.name)}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Base</th>
                    <td v-for="(stat, idx) in reverseStats" :key="idx" scope="col">{{stat.base_stat}}</td>
                  </tr>
                  <tr>
                    <th scope="row">EV</th>
                    <td v-for="(stat, idx) in reverseStats" :key="idx" scope="col">{{stat.effort}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="return-link mt-3">
      <router-link to="/">Go back</router-link>
    </div>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: "PokemonDetails",
  props: {
    pokeAPI: Function,
  },
  components: {
    PulseLoader
  },
  data() {
    return {
      previousData: {},
      newData: {},
      loading: true,
      color: '#cc181e',
      color1: '#5bc0de',
      size: '10px',
      margin: '2px',
      radius: '2px'
    }
  },
  computed: {
    sortTypes() {
      let typesArr = [...this.newData.types];
      return typesArr.sort((a, b) => a.slot - b.slot);
    },
    reverseStats() {
      let statsArr = [...this.newData.stats];
      return statsArr.reverse();
    }
  },
  methods: {
    getTypeColor(type) {
      let keys = {
        normal: '#A8A878',
        fire: '#F08030',
        fighting: '#C03028',
        water: '#6890F0',
        flying: '#A890F0',
        grass: '#78C850',
        poison: '#A040A0',
        electric: '#F8D030',
        ground: '#E0C068',
        psychic: '#F85888',
        rock: '#B8A038',
        ice: '#98D8D8',
        bug: '#A8B820',
        dragon: '#7038F8',
        ghost: '#705898',
        dark: '#705848',
        steel: '#B8B8D0',
        fairy: '#EE99AC'
      }
      return keys[type];
    },
    normalizeName(str) {
      if (str === 'hp') {
        return 'HP';
      }

      let normalizedStr = str;
      if (str.indexOf('-') !== -1 ) {
        let hyphenIndex = str.indexOf('-');
        normalizedStr = normalizedStr.slice(0, hyphenIndex) + ' ' + normalizedStr.charAt(hyphenIndex +1).toUpperCase() + normalizedStr.slice(hyphenIndex + 2, normalizedStr.length);
      }
      normalizedStr = normalizedStr.charAt(0).toUpperCase() + normalizedStr.slice(1);
      return normalizedStr;
    }
  },
  created() {
    const { listData, name }  = this.$attrs
    this.previousData = listData.find(pokemon => pokemon.name === name)

    this.pokeAPI.get(`pokemon/${name}`)
    .then(res => {
      this.newData = res.data;
      this.loading = false;
    })
    .catch(err => console.log(err));
  }
}
</script>

<style scoped>
  hr {
    margin: 0 0 0.5em 0;
  }

  a {
    font-size: 1.2em;
  }

  img {
    width: 66px;
  }

  .loader {
    height: 20em;
  }
  
  .details-container {
    border: 4px solid rgb(190, 190, 190);
    padding: 0.2em;
    background-color: #DEDEDE;
    width: 80%;
    margin: 0 auto;
  }

  .detail-title {
    padding: 0 2em;
    text-align: center;
    margin-bottom: 0;
  }

  .detail-content {
    margin-bottom: 0;
  }

  .details-sprites {
    background-color: rgb(214, 214, 214);
    margin: 0 0.5em;
  }

  .sprites {
    display: flex;
    flex-direction: column;
  }

  .info-group {
    margin-bottom: 0.5em;
  }

  .details-text {
    background-color: rgb(214, 214, 214);
    margin: 0 0.5em;
    height: 100%;
  }

  .pokemon-type {
    width: 5em;
    color: white;
  }

  .table {
    font-size: 0.7em;
  }

  @media (min-width: 576px) {
    img {
      width: 80px;
    }

    .info-group {
      margin-bottom: 0;
    }

    .sprites {
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
    }

    .detail-content {
      margin-bottom: 1rem;
    }
  }

  @media (min-width: 768px) {
    .details-container {
      padding: 1em;
    }

    .details-sprites {
      margin: 0 12px 0.5em 12px;
      padding-bottom: 0.5em;
    }

    .detail-title {
      text-align: start;
      margin-bottom: 1rem;
    }

    .pokemon-type {
      width: 4em;
    }

    .table {
      font-size: 0.7em;
    }
  }

  @media (min-width: 992px) {
    .details-sprites {
      margin: 0 0.5em;
      min-height: 20em;
    }

    img {
      width: 96px;
    }

    .sprites {
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
    }

    .pokemon-type {
      width: 5em;
    }

    .table {
      font-size: 1em;
    }
  }

</style>