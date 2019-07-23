<template>
  <div class="recommend">
    <!-- 绑定在recommend-content上  记得包一个div   :data="getDiscList"为了监听data的变化-->
    <scroll :data="getDiscList" class="recommend-content" ref="scroll">  
      <div>
        <div v-if="recommend.length" class="slider-wrapper">
          <div class="slider-content">
            <slider>
              <div v-for="(item,index) in recommend" :key="index">
                <a :href="item.linkUrl">
                  <img @load="loadImage" :src="item.picUrl">
                </a>
              </div>
            </slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in getDiscList" class="item" :key="item.id">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <div class="loading-container">
        <loading v-if="!getDiscList.length"></loading>
    </div>
  </div>
</template>
<script>
import { getRecommend, getDiscList } from "../../api/recommend.js";
import { ERR_OK } from "../../api/config";
import slider from "../../base/slider";
// import DiscList from "../../mock/getDiscList.json"; //导入json取名不能一样
import scroll from "base/scroll";
import loading from "base/loading";
export default {
  data() {
    return {
      recommend: [],
      getDiscList: []
      // discList: []
    };
  },
  created() {
    this._getRecommend();
   setTimeout(()=>{
      this._getDiscList();
   },500)
    // this.discList = DiscList.data.list
    // console.log('discList-data:',this.discList)
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommend = res.data.slider;
          // console.log("轮播图数据:", this.recommend);
        }
      });
    },
    _getDiscList() {
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          this.getDiscList = res.data.list;
          // console.log("热门歌单数据:", this.getDiscList);
        }
      });
    },
    loadImage() {
      // better-scroll 好像把这个问题解决了 
      if(!this.checkLoaded) { //标志位 使它只执行一遍
        this.$refs.scroll.refresh() // 调用组件方法
        this.checkLoaded = true
      }    
    }
  },
  components: {
    slider,
    scroll,
    loading
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;

      .slider-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }
  }
}
.loading-container {   //样式层级
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
</style>