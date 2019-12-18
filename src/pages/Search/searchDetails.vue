<template>
<div class="seadeatils-con">
      <header>
        <div class="nav-banner">
        <!-- <router-link to="/index/article" tag='a' class="nav-back"> -->
          <div @click="handleback()"  class="nav-back">
            <i class="yo-ico">&#xf07d;</i>
          </div>
          <!-- <i class="yo-ico">&#xf07d;</i> -->
        <!-- </router-link> -->
        <div class="logo-box">
          <div class="logo">
            <img src="~assets/image/logo.png" alt="">
          </div>
          <div class="act-details">
              搜索
            </div>
        </div>

       <div class="client">
          <div class="img-box">
            <img src="~assets/image/client.png" alt="">
          </div>
          <div class="text-box">
            打开<br/>客户端
          </div>
          <div class="more-box">
            <i class="yo-ico">&#xf07e;</i>
          </div>
        </div>        
      </div>
    </header>
    <div class="search-container">
        <div class="search-box" scoped>
            <div class="search">
                <i class="search-icon yo-ico">
                  &#xf067;
                </i>
                <input class="sear" type="text" @keydown.enter="handleSearch">
            </div>
            <span class="deal">取消</span>
        </div>
    </div>
<div class="wrap-con">
 <div class="list-con">
  <div 
  v-for="(item,index) in searchcon" 
  :key="item.id"
  :index="index"
  v-if="item.image_list.length===3"
  class="aladdin-article">
      <div class="title">
           {{item.title}}
      </div>
      <div class="img-box">
           <div 
           v-for="(img,index) in item.image_list"
           :key="index"
           class="image">
               <img :src="img.url" alt="">
           </div>
      </div>
      <div class="article-footer">
          {{item.media_name}}&nbsp;{{item.comment_count}}评论
      </div>
  </div>
 </div>
</div>
</div>

</template>

<script>
import {get} from 'utils/http'
import Bscroll from 'better-scroll'
export default {
   props:['keywords'],
   data(){
       return {
          searchcon:[],
       }
   },
   methods:{
       handleback(){
           console.log(0)
           this.$router.back()
       },
       handleSearch(){
        let keywords=document.querySelector('.sear').value
        this.$store.commit('sethistory',keywords)
        console.log(this.$store.state.historysearch)
        //如果搜索的内容没有改变，需要进行如下判断，否则出错

        if(keywords!==this.$route.params.keywords)
         this.$router.push({name:'searchDetails',params:{keywords}})
        }
   },
   async mounted(){
       let result = await get({
           url:'/motor/search/api/2/wap/search_content/?format=json&cur_tab=1&offset=0&count=10&motor_source=mweb&headless_mode=1',
           params:{
              keyword:this.keywords
           }
       })
       this.searchcon=result.data
       console.log(this.searchcon)
       let bscroll=new Bscroll('.wrap-con',{
           pullUpLoad:true,
           probType:2,
           click:true,
           mouseWheel:true
       })
    //                                                                                                                                                                           
   },
//   async beforeRouteUpdate (to, from, next) {
//       let { keywords } = to.params
//        console.log(keywords)
//            let result = await get({
//            url:'/motor/search/api/2/wap/search_content/?format=json&cur_tab=1&offset=0&count=10&motor_source=mweb&headless_mode=1',
//            params:{
//               keyword:this.keywords
//            }
//        })
//        this.searchcon=result.data
//        next()
    
//   },
//因为只改变了动态路由的params,所以不能切换，需要使用监听或者守卫
   watch:{
      async $route(){
           let result = await get({
           url:'/motor/search/api/2/wap/search_content/?format=json&cur_tab=1&offset=0&count=10&motor_source=mweb&headless_mode=1',
           params:{
              keyword:this.keywords
           }
       })
       this.searchcon=result.data
       }
   }
}
</script>

<style lang="stylus">
.seadeatils-con
    width 100%
    height 100%
    .search-container
                width 100%
                height 40px
                background #fff
                .search-box
                    width 100%
                    height 40px
                    padding-top 10px
                    display flex
                    align-items center
                    justify-content center
                    background #fff
                    .search
                        flex 1
                        border none
                        margin-left 12px
                        display flex
                        align-items center
                        justify-content center
                        background #f8f8f8;
                        input
                            flex 1
                            border none
                            height 30px
                            background #f8f8f8;
                        .search-icon 
                            width 30px
                            height 30px
                            font-size 18px
                            line-height 30px
                            text-align center
                            font-weight 600
                    .deal
                        width 56px
                        height 100%
                        padding 0 8px 0 16px
                        color #66a6ff
                        line-height 30px
                        font-size 16px
    .wrap-con
        flex 1
        width 100%
        overflow hidden
        .list-con
            width 100%
            .aladdin-article
                width 100%
                height 159px
                padding 13px 15px
                background #fff
                .title
                    width 100%
                    height 24px
                    font-size 18px
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                    color #333
                .img-box
                    width 100%
                    height 76px
                    margin-top 8px
                    display flex
                    align-items center
                    justify-content center
                    .image
                        flex 1
                        height 100%
                        margin-left 4px
                        img
                           width 100%
                           height 100%
                .article-footer
                    width 100%
                    height 16px
                    margin-top 8px
                    font-size 12px
                    color #999
                    line-height 16px


</style>