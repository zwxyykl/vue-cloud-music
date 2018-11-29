<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player v-show="songList.length > 0 && !showDetail"></player>
  </div>
</template>

<script>
  import Player from './components/playerFooter';
  import { mapState } from 'vuex'
  export default {
    name: 'app',
    components: { Player },
    data () {
        return{}
    },
    computed: {
      ...mapState([
        'songList',
        'showDetail'
      ])
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
