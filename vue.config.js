const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('components', path.resolve(__dirname, './src/components'))
      .set('pages', path.resolve(__dirname, './src/pages'))
      .set('assets', path.resolve(__dirname, './src/assets'))
      .set('utils', path.resolve(__dirname, './src/utils'))
    },
  devServer:{
    proxy:{
      //首页列表数据
      '/ajax':{
        target:'https://m.dcdapp.com/motor/stream/api/news/feed/web/v47/?aid=1230&channel=m_web&device_platform=wap&category=motor_car&max_behot_time=0&min_behot_time=1573738442&web_id=6757876708164716035&impression_info=%7B%22page_id%22:%22page_category%22,%22sub_tab%22:%22motor_car%22,%22product_name%22:%22m_station%22,%22zt%22:%22default%22%7D&tt_from=pull',
        changeOrign:true
      },
         
      //详情页相关阅读数据  
      '/rel':{
        target:'https://m.toutiao.com',
        changeOrign:true
      },

      //详情页和车有圈数据
      '':{
        target:'https://m.dcdapp.com',
        changeOrign:true
      },
  },
  }
}