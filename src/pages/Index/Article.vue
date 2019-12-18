<template>
  <div class="main-container">
    <articlelist></articlelist>
  </div>
</template>

<script>
import articlelist from 'components/articlelist/articleList'
export default {
   components:{
     articlelist
   }
}
</script>

<style lang='stylus' scoped>
//注意引入css前 的~
@import "~assets/stylus/border.styl"
.main-container
  height 100%
   
</style>