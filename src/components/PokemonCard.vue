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

  .pokemon-card {
    padding: 0.5rem 2rem;
    margin: 1.5rem;
    border: 2px solid;
    border-radius: 7px;
    background-color: white;
  }

  .pokemon-image {
    height: 96px;
  }

  .pokemon-number {
    font-size: 0.8em;
  }

  .pokemon-name {
    font-size: 1.2em;
  }

  @media (min-width: 576px) {
    .card-content {
      flex-direction: row;
    }

    .pokemon-card {
      height: 7rem;
      width: 80%;
      margin: 0.5em;
    }

    p {
      margin: 0 0.5em;
    }
  }

  /* Medium devices (tablets, 768px and up) */
  @media (min-width: 768px) {
    .pokemon-card {
      margin: 0.8rem;
      height: 12rem;
      width: 14rem;
    }

    .card-content {
      flex-direction: column;
    }
  }

  /* Large devices (desktops, 992px and up) */
  @media (min-width: 992px) {
    .pokemon-card {
      margin: 1.5rem;
    }
  }

</style>