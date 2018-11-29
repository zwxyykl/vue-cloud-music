import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios'
import api from '../apis'
import * as types from './mutations_type.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    audio:{
      id:0,
      name:'名称',
      artist:'演唱者',
      cover:'/static/placeholder_disk_play_program.png',
      location:'',
      album:''
    },
    lyric:'',
    currentIndex:0,
    playing:false,
    loading:false,
    showDetail:false,
    songList:[],
    currentTime:0,
    tmpCurrentTime:0,
    durationTime:0,
    bufferedTime:0,
    change:false
  },
  getters:{
    currentTimePer:state=>isNaN(state.currentTime/state.durationTime*100) ? 0 : state.currentTime/state.durationTime*100,
    bufferedTimePer:state=>isNaN(state.bufferedTime/state.durationTime*100) ? 0 : state.bufferedTime/state.durationTime*100
  },
  mutations: {
    [types.PLAY](state){
      state.playing = true
    },
    [types.PAUSE](state){
      state.playing = false
    },
    [types.TOGGLE_DETAIL](state){
      state.showDetail = !state.showDetail
    },
    [types.SET_AUDIO](state){
      state.audio = state.songList[state.currentIndex-1]
    },
    [types.SET_AUDIO_INDEX](state, index){
      state.audio = state.songList[index]
      state.currentIndex = index +1
    },
    [types.REMOVE_AUDIO](state, index){
      state.songList.splice(index, 1)
      if(index === state.songList.length){
        index--
      }
      state.currentIndex = index + 1
      if(state.songList.length === 0){
        state.audio = {
          id: 0,
          name: '歌曲名称',
          artist: '演唱者',
          cover: '/static/player-bar.png',
          location: '',
          album: ''
        }
        state.playing = false
      }
    },
    [types.SET_CHANGE](state, flag){
      state.change = flag
    },
    [types.SET_LOCATION](state, location){
      state.audio.location = location
    },
    [types.UPDATE_CURRENT_TIME](state, time){
      state.currentTime = time
    },
    [types.UPDATE_DURATION_TIME](state, time){
      state.durationTime = time
    },
    [types.UPDATE_BUFFERED_TIME](state, time){
      state.bufferedTime = time
    },
    [types.CHANGE_TIME](state,time){
      state.tmpCurrentTime = time
    },
    [types.OPEN_LOADING](state){
      state.loading = true
    },
    [types.CLOSE_LOADING](state){
      state.loading = false
    },
    [types.RESET_AUDIO](state){
      state.currentTime = 0
    },
    [types.PLAY_NEXT](state){
      state.currentIndex ++
      if(state.currentIndex > state.songList.length){
        state.currentIndex = 1
      }
      state.audio = state.songList[state.currentIndex-1]
    },
    [types.PLAY_PREV](state){
      state.currentIndex--
      if(state.currentIndex < 1){
        state.currentIndex = state.songList.length
      }
      state.audio = state.songList[state.currentIndex-1]
    },
    [types.ADD_TO_LIST](state, songs){
      var items = Array.prototype.concat.call(songs)
      items.forEach(item => {
        var flag = false
        state.songList.forEach(function (ele, index) {
          if(ele.id === item.id){
            flag = true
            state.currentIndex = index + 1
          }
        })
        if(!flag){
          state.songList.push(item)
          state.currentIndex = state.songList.length
        }
      })
    }
  },
  actions: {
    getSong({commit, state}, id){
      let CancelToken = Axios.CancelToken
      let source = CancelToken.source()
      if(state.loading && state.songList.length > 0){
        source.cancel()
      }
      commit(types.OPEN_LOADING)
      Axios.get(api.getSong(id)).then(res=>{
        let url = res.data.data[0].url
        commit(types.SET_AUDIO)
        commit(types.SET_LOCATION,url)
      }).catch((err)=>{
        console.error(err)
        window.alert("获取歌曲失败")
      })
    }
  }
})

export default store
