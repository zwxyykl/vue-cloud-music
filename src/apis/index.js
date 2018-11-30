const base_url1 = 'http://musicapi.duapp.com/api.php'

const base_url2 = 'https://api.imjad.cn/cloudmusic/';

const base_url3 = 'https://api.imjad.cn/hitokoto/?encode=';
export default {
    getHitokodo(){
        return base_url3 
    },
    getPlayListByCondition(cat, order, offset, total, limit) {
        /*请求参数：
            limit:每次请求的数量
            offset:用于分页
          主要作用：
            为获取首页的推荐歌单
        */
        return base_url1 + '?type=topPlayList&cat=' + cat + '&offset=' + offset + '&limit=' + limit
    },
    getLrc(id) {
        /*请求参数：
            id：与对应歌曲id一致
         主要作用：
            获取正在播放的音乐的台词
        */
        return base_url2+'?type=lyric&id='+id;
    },
    getSong(id){
         /*请求参数：
             id：歌曲id
           主要作用：
            获取歌曲
        */
        return base_url2+'?type=song&id='+id;
    },
    getPlayListDetail(id){
        /*请求参数：
             id：歌单id
           主要作用：
            获取歌单的详情在歌单界面映射
        */
        return base_url2+'?type=playlist&id='+id;
    },
    searchDjRadio(keyword){
        return base_url2+'?type=search&search_type=1009&s='+keyword
    },
    getDjRadio(id){
        /*请求参数：
             id：电台节目id
           主要作用：
            获取电台节目
        */
        return base_url2+'?type=djradio&id='+id;
    },
    getDj(id){
        /*请求参数：
             id：电台节目单曲id
           主要作用：
            获取电台节目单曲
        */        
        return base_url2+'?tyoe=dj&id='+id;
    },
    getMv(id){
        /*请求参数：
             id：mv的id
           主要作用：
            获取mv
        */
        return base_url2+'?type=mv&id='+id;
    },
    search(keyword){
        /*请求参数：
             keyword:搜索的关键字
           主要作用：
             获取与关键字相关联的歌曲信息
        */        
        return base_url2+'?type=search&s=keyword';  
    }
    
}
