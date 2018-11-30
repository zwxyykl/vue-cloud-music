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

        <div class="progress">
          <div class="progress-load" :style="{'transform':'translateX(' + bufferedTimePer + '%)'}"></div>
          <div class="progress-play" :style="{'transform':'translateX(' + currentTimePer +'%)' }"></div>
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
          loadError(){
            let player = document.getElementById('player')
            if(player.currentSrc) {
                this.isloading= false
                this.$store.commit('CLOSE_LOADING')
            }else{
              console.log('==================')
              console.log('first load')
              console.log('==================')
            }
          },
          next(){
            this.togglePlayingStatus()
            this.$store.commit('PLAY_NEXT')
          }
        },
        computed: {
          ...mapState([
            'audio',
            'change',
            'playing',
            'loading',
            'currentTime',
            'durationTime',
            'tmpCurrentTime',
            'durationTime',
            'bufferedTime'
          ]),
          ...mapGetters([
              'currentTimePer',
              'bufferedTimePer'
          ])
        },
        filters: {
          textOverflow(value){
            var len = 0;
            for(var i = 0; i < value.length; i++){
              var a = value.charAt(i)
              if(a.match(/[^\x00-\xff]/ig) != null){
                  len += 2
              }else {
                  len += 1
              }
            }
            if(len > 12){
                return value.slice(0, 11) + '...';
            }
            return value;
          }
      }
    }
</script>

<style lang="less" scoped>
  @import "../assets/theme.less";
  .footer {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 998;
    border: 0px solid red;

    .player-footer {
      position: relative;
      width: 100%;
      height: 2.3rem;
      background: rgba(255,255,255,0.9);
      color: #333;
      border: 0px solid greenyellow;

      .cover {
        width: 2rem;
        height: 2rem;
        overflow: hidden;
        float: left;
        padding-left: 0.2rem;
        padding-top: 0.2rem;
        background: url('../../static/player-bar.png');
        background-size: cover;
        border: 0px solid blue;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        overflow: hidden;
        width: 7rem;
        float: left;
        position: relative;
        text-align: left;
        padding-top: 0.2rem;
        padding-left: 0.3rem;
        .song-name {
          font-size: 0.7rem;
          line-height: 1.0rem;
        }
        .artist-name {
          text-overflow: ellipsis;
          font-size: 0.55rem;
          color: #8a8a8a;
          white-space: nowrap;
        }
      }
      .control {
        position: relative;
        top: -6%;
        border: 0px solid red;
        height: 100%;
        float: right;
        .mini-btn {
          width: 2rem;
          height: 2rem;
        }
        .player-list {
          background: url("../../static/playbar_btn_playlist.png");
          background-size: cover!important;
        }
        .player {
          background: url("../../static/playbar_btn_play.png") no-repeat!important;
          background-size: cover!important;
        }
        .pause {
          background: url("../../static/playbar_btn_pause.png") no-repeat!important;
          background-size: cover!important;
        }
        .next {
          background: url("../../static/playbar_btn_next.png") no-repeat!important;
          background-size: cover!important;
        }
      }

      .progress {
        width: 100%;
        height: 0.1rem;
        position: absolute;
        left: 0;
        bottom: 0;
        background: rgba(255,255,255,0.5);
        .progress-load {
          position: absolute;
          left: -100%;
          width:100%;
          height:100%;
          background-color: rgba(220,217,217,0.4);
        }
        .progress-play {
          position: absolute;
          left:-100%;
          width:100%;
          height:100%;
          background-color: @primaryColor;
        }
      }
    }
  }
</style>
