<template>
  <div class="details-container">
    <h1>{{this.previousData.displayName}}</h1>
  </div>
</template>

<script>


export default {
  name: "PokemonDetails",
  props: {
    pokeAPI: Function,
  },
  data() {
    return {
      previousData: {},
      newData: {}
    }
  },
  created() {
    const { listData, name }  = this.$attrs
    this.previousData = listData.find(pokemon => pokemon.name === name)

    this.pokeAPI.get(`pokemon/${name}`)
    .then(res => this.pokemonData = res.data)
    .catch(err => console.log(err));
  }
}
</script>

<style scoped>
  .details-container {
    border: 4px solid rgb(190, 190, 190);
    padding: 0.5em 0;
    background-color: #DEDEDE;
    width: 80%;
    margin: 0 auto;
  }
</style>