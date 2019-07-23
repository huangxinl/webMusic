<template>
 <div  class="singer" ref="singer">
    <list-view :data="singer"></list-view>
 </div>
</template>

<script>
import { getSingerList } from 'api/singer'
import { ERR_OK } from "api/config";
import Singer from 'common/js/singer'
import ListView from 'base/listview'
const HOTName = '热门'
const HOT_SINGER_LEN = 10
export default{
    data() {
      return {
        singer: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      _getSingerList() {
        getSingerList(2).then(res => {
          if(res.code === ERR_OK) {
            // console.log( this._normalizeSinger(res.data.list))
            setTimeout(() => {
              this.singer = this._normalizeSinger(res.data.list)
            },500 )
          }
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {              //对象内部 用对象key ：value来写
            title: HOTName,
            items: []
          }
        }
        list.forEach((item,index) => {
            if( index < HOT_SINGER_LEN) {
              map.hot.items.push(new Singer({
                id:  item.Fsinger_mid,
                name: item.Fsinger_name
              }))
            }
            const key = item.Findex
            if(!map[key]) {
              map[key] = {
                title: key,
                items: []
              }
            }
            map[key].items.push(new Singer({
                id:  item.Fsinger_mid,
                name: item.Fsinger_name
              }))
        })
          // 为了得到有序列表 我们需要处理map
          let ret = []
          let hot = []
          for(let key in map) {
            let val = map[key]
            if(val.title.match(/[a-zA-Z]/)) {
              ret.push(val)
            } else if(val.title === HOTName) {
              hot.push(val)
            }
          }
          ret.sort((a,b)=> { return a.title.charCodeAt(0) - b.title.charCodeAt(0)})
          return hot.concat(ret)
      }
    },
    components: {
      ListView
    }
}
</script>

<style lang="stylus" scoped>
  .singer
    position fixed
    top 88px
    bottom 0
    width 100%
</style>