// 后台路径
let baseUrl = ''

// 后台路径 getter/setter
let setBase = url => (baseUrl = url)
let getBase = () => baseUrl

export default {
    setBase,
    getBase
}
