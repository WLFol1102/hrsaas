// 自定义指令

export const imageerror = {
  // 指令对象
  insertrd(dom, options) {
    dom.error = function() {
      dom.src = options.value
    }
  }
}
