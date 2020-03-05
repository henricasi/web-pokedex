<template>
  <router-link :to="{ name: 'PokemonDetails', params: { name: singlePokemon.name }}" class="pokemon-card d-flex justify-content-center align-items-center" v-bind:style="{ borderColor: this.getBorder}">
    <div class="card-content d-flex justify-content-center align-items-center">
      <img :src="displayImage" :alt="`${singlePokemon.displayName} Sprite`" class="pokemon-image">
      <p><span class="pokemon-number">{{singlePokemon.number}}.</span> <span class="pokemon-name">{{singlePokemon.displayName}}</span></p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "PokemonCard",
  props: {
    singlePokemon: Object
  },
  computed: {
    displayImage() {
      return this.singlePokemon.imagePath;
    },
    getBorder() {
      let rules = {
        I: "#64D363",
        II: "#D6D6D6",
        III: "#5959C1",
        IV: "#FBC8C8",
        V: "#EBEBEB",
        VI: "#F16A81",
        VII: "#90BDDC",
      }
      return rules[this.singlePokemon.generation];
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: black;
  }

  p {
    margin: 0 0.5em;
  }

  .pokemon-card {
    margin: 0.8rem 1.5rem;
    height: 5rem;
    border: 2px solid;
    border-radius: 7px;
    background-color: white;
    width: 90%;
  }

  .card-content {
    flex-direction: row;
  }

  .pokemon-image {
    height: 96px;
  }

  .pokemon-number {
    font-size: 0.7em;
  }

  .pokemon-name {
    font-size: 0.9em;
  }

  @media (min-width: 576px) {
    .pokemon-card {
      margin: 1.5rem;
      height: 5rem;
      width: 80%;
      margin: 0.5em;
      padding: 0.5rem 1rem;
    }
    
    .pokemon-number {
      font-size: 0.8em;
    }

    .pokemon-name {
      font-size: 1em;
    }
  }

  @media (min-width: 768px) {
    .pokemon-card {
      margin: 0.8rem;
      height: 12rem;
      width: 14rem;
      padding: 0.5rem 2rem;
    }

    .pokemon-name {
      font-size: 1.2em;
    }

    .card-content {
      flex-direction: column;
    }
  }

  @media (min-width: 992px) {
    .pokemon-card {
      margin: 1.5rem;
    }
  }

</style>