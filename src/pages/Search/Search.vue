<template>
  <div class="search-con">
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
    <main class="main-con">
        <div class="wgt-search-history">
           <div class="search-history-title">
               搜索历史
           </div>
           <div 
           v-for="(item,index) in hisdata" 
           :key="index"
           class="history-item">
                <div class="history-icon yo-ico">&#xf04b;</div>
                <div class="history-text">
                    {{item}}
                </div>
           </div>
        </div>
    <router-view>

    </router-view>
    </main>
  </div>
</template>

<script>
export default {
     created(){
           this.hisdata= this.$store.state.historysearch
        },
    methods:{
        handleback(){
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
    }
}
</script>

<style lang="stylus">
@import "~assets/stylus/border.styl"
body 
    background #fff 
    .search-con
    position relative
        display flex
        height 100%
        align-items center
        justify-content center
        flex-direction column
        header 
            width 100% 
            height 48px
        .main-con 
            width 100%
            flex 1
            overflow hidden
            .wgt-search-history
                width 100%
                padding 0 14px
                .search-history-title
                    height 42px
                    padding 20px 0 8px 0
                    font-size 14px
                    color #999 
                    $border(0 0 1px 0,#999,solid)
                .history-item
                    width 100%
                    height 46px
                    font-size 14px
                    color #333
                    $border(0 0 1px 0,#999,solid) 
                    display flex 
                    align-items center
                    justify-content center   
                    .history-icon
                        width 20px
                        height 20px
                        color:#999
                        margin-left 5px
                    .history-text
                        flex 1
                        height 46px
                        line-height 46px
                        margin-left 10px
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
        
</style>