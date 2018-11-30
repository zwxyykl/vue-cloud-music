<template>
  <div class="fixed-bar">
    <mu-appbar>
      <div class="logo" slot = "left"></div>
      <div class="serch-bg">
        <span class="parent">
          <input class="search" placeholder="搜索音乐、台词、电台"/>
        </span>
      </div>
      <mu-icon value="airplay" :size="30" slot="right"/>
    </mu-appbar>
    <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
      <mu-tab value="rage" title="时下流行"/>
      <mu-tab value="songList" title="歌单"/>
      <mu-tab value="djRadio" title="主播电台"/>
      <mu-tab value="rank" title="排行榜"/>
    </mu-tabs>
  </div>
  <scroller :on-refresh="refresh" style="padding-top:4.2rem;" :refreshText="showhitokoto">
    <div class="view-container" :class="{view : songList.length > 0 }">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </scroller>
    <!--<someComponent></someComponent>-->
</template>

<script>
  import apis from '../apis/index'
    //import someComponent from './someComponent'
    export default {
        data(){
            return {
              activeTab:'rage',
              songList:[1,2,3],
              showhitokoto: "如果你执意追寻着我的幻影，总有一天会被真正的我打败。"
            }
        },
        watch: {
          '$route' (to ,from){
            const path = to.path
            var routerArr = path.split('/')
            if(routerArr[1] === 'index'){
                this.handleTabChange(routerArr[2])
            }
          }
        },
        methods: {
            handleTabChange(val){
               this.activeTab = val;
               this.$router.push({path:'/index/' + val});
            },
            refresh: function (done) {
              window.location.reload();
            },
          gethitokoto(){
            this.$http.get(api.getHitokodo()).then((res)=>{
                if(res.data.length > 20){
                    this.gethitokoto()
                }
                this.showhitokoto = res.data
            })
          }
        },
        created(){
          this.gethitokoto()
          var routerArr = this.$route.path.split('/');
          if(routerArr[1] === 'index') {
            this.handleTabChange(routerArr[2])
          }
        },
        component: {
            //someComponent
        }
    }
</script>

<style scoped>

</style>
