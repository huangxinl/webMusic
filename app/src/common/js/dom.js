export function addClass(el, className) {
    if(hasClass(el, className)) {
        return
    }
    let newClass = el.className.split(' ') // //split() 将原本的className字符串按空格分割成数组  el.className为空 console.log(el.className === '') true  => [""]
    newClass.push(className) // ["","slider-item"]
    el.className = newClass.join(' ')  // console.log(typeof el.className)
}

export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className) // dom上class类是否与传进来的className相同 true fasle
}