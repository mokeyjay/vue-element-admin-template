const defaultOpt = {
  autoAlert: true, // 请求出错自动弹窗
  returnAll: false, // 请求成功返回所有数据而不只是result
}

export default ({
  get(url, data = {}, opt = {}){
    return new Promise((resolve, reject)=>{
      opt = Object.assign(defaultOpt, opt)

      // 拼接请求参数
      if(data.length){
        let query = []
        for (let i in data) {
          query.push(encodeURIComponent(i)+'='+encodeURIComponent(data[i]))
        }
        query = query.join('&')
        url += (url.indexOf('?') !== -1 ? '&' : '?') + query
      }

      Vue.prototype.$http.get(url)
        .then(data=>{
          data = data.data
          if(data.errCode == 0){
            resolve(opt.returnAll ? data : data.result)
          } else if(data.errCode == 10000){
            Vue.prototype.vm._router.push('/login')
          } else {
            if(opt.autoAlert === true){
              Vue.prototype.$alert(data.errMsg, '错误');
            }
          }
          reject(data)
        })
        .catch(err=>{
          Vue.prototype.$alert('请求接口出错，请稍后再试', '错误')
          reject(err)
        })
    })
  },

  post(url, data = {}, opt = {}){
    return new Promise((resolve, reject) => {
      opt = Object.assign(defaultOpt, opt)

      Vue.prototype.$http.post(url, data)
        .then(data=>{
          data = data.data
          if(data.errCode == 0){
            resolve(opt.returnAll ? data : data.result)
          } else if(data.errCode == 10000){
            Vue.prototype.vm._router.push('/login')
          } else {
            if(opt.autoAlert === true){
              Vue.prototype.$alert(data.errMsg, '错误');
            }
          }
          reject(data)
        })
        .catch(err=>{
          Vue.prototype.$alert('请求接口出错，请稍后再试', '错误')
          reject(err)
        })
    })
  }
})