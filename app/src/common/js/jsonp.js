import originJsonp from 'jsonp'

export default function jsonp (url,data,opiton) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + parmas(data)
    return new Promise((resolve,reject) => {
        originJsonp(url,opiton,(err,data)=> {
            if(!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}

export function parmas(data) {
    let url = ''
    for(var k in data) {
        let value = data[k] !== undefined ? data[k] : ''
        url += '&' + k + '=' + encodeURIComponent(value)
    }
    
    return url ? url.substring(1) : ''
}