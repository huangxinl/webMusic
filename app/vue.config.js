const path = require('path')
const axios = require('axios')
const bodyParser = require('body-parser')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,

  devServer: {
    before(app) {
      app.get('/api/getDiscList', function (req, res) { //定义一个路由 /api/getDiscList
        var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg' //真实地址通过axios发送 http请求
        axios.get(url, {
          headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })
    //   app.post('/api/getPurlUrl', bodyParser.json(), function (req, res) {
    //     const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
    //     axios.post(url, req.body, {
    //       headers: {
    //         referer: 'https://y.qq.com/',
    //         origin: 'https://y.qq.com',
    //         'Content-type': 'application/x-www-form-urlencoded'
    //       }
    //     }).then((response) => {
    //       res.json(response.data)
    //     }).catch((e) => {
    //       console.log(e)
    //     })
    //   })
        app.get('/api/search', function (req, res) {
          const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
          axios.get(url, {
            headers: {
              referer: 'https://c.y.qq.com/',
              host: 'c.y.qq.com'
            },
            params: req.query
          }).then((response) => {
            res.json(response.data)
          }).catch((e) => {
            console.log(e)
          })
        })

    }
  },
  chainWebpack(config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
      .set('base', resolve('src/base'))
      .set('data', resolve('src/data'))
  },
}
