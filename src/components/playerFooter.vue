<template>
    <div class="footer">
      <div class="player-footer">
        <div class="play-content" @click="toDetail">
          <audio :src="audio.location" id="player" @timeupdate='updateTime' @canplay="canPlaySong" @error="loadError" @ended="next" />
          <div class="cover">
            <img :src="audio.cover">
          </div>
        </div>
        <div class="info" @click="toDetail">
          <div class="song-name">
            {{ audio.name | textOverflow }}
          </div>
          <div class="artist-name">
            {{ audio.artist }}
          </div>
        </div>

        <div class="control">
          <mu-icon-button class="mini-btn player-list" @click="showList" />
          <mu-icon-button class="mini-btn player" :class="{pause:playing}" @click="togglePlayingStatus" />
          <mu-icon-button class="mini-btn next" @click="next" />
        </div>

      </div>
        <BottomSheet ref="bottomSheet"></BottomSheet>
    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
  import { mapState, mapGetters, mapMutations} from 'vuex'
  import BottomSheet from './list'
    //import someComponent from './someComponent'
    export default {
        data(){
            return {
              songUrl:'https://m8.music.126.net/20170903113120/f0408f0bb2fb2c88972da51fa082191a/ymusic/11d1/b3d3/f995/2a728544f456b519a1c6c322d01d9e39.mp3'
            }
        },
        component: {
            BottomSheet
            //someComponent
        },
        methods: {
          ...mapState([
              'play',
              'pause',
              'play_next'
          ]),
          showList(){
              this.$refs.bottomSheet.openBottomSheet()
          },
          togglePlayingStatus(){
              if(this.playing){
                document.getElementById('player').pause()
                this.$store.commit('PAUSE')
              }else{
                  document.getElementById('player').play()
                  this.$store.commit('PLAY')
              }
          },
          toDetail(){
              this.$router.push({name:'playerDetail',params:{id:this.audio.id}})
              this.$store.commit('TOGGLE_DETAIL')
          },
          canPlaySong(){
              this.$store.commit('CLOSE_LOADING')
              this.$store.commit('PLAY')
          },
          updateTime(){
            let vm = this
            let player = document.getElementById('player')
            let time = parseInt(player.currentTime)
            player.onsuspend = function () {
              console.log('test')
              var buffered = player.buffered
              if(buffered.length > 0 && player.duration > 0){
                  vm.$store.commit('UPDATE_BUFFERED_TIME', parseInt(player.duration))
              }
            }
            vm.$store.commit('UPDATE_DURATION_TIME', parseInt(player.duration))
            if(this.change){
              player.currentTime = this.tmpCurrentTime
              vm.$store.commit('SET_CHANGE',false)
            }else{
              vm.$store.commit('UPDATE_CURRENT_TIME',time)
            }
          },
        }
    }
</script>

<style scoped>

</style>
