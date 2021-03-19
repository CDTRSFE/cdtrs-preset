## 功能说明
当鼠标滑过报纸指定区域时，高亮当前区域，且可以点击该区域进入详情

## 实现原理

报刊热点以前采用canvas结合map、area方式进行绘制，但在使用过程中出现了页面卡死的情况。最终决定采用**双层canvas**实现。顶层canvas用于接收鼠标移动、移出等事件；底层canvas用于鼠标滑过时高亮当前区域。

## 实现方式

* 处理点(coords)的信息
* 使用[tinycolor2](https://www.npmjs.com/package/tinycolor2)随机生成颜色并将其添加到每个item的color属性
```js
this.paperLayout.subItems.forEach((item, k) => {
    item.color = tinycolor('rgb(0,0,0)').darken(-2 * k - 2).toString();
    item.coords = this.dealCoords(item);
    this.dealCanvasPoint(this.topContext, item, item.color);
});
```
* 绘制顶层canvas,并将其填充为当前color属性的颜色且设置透明度为0
* 鼠标滑过事件(mousemove)使用canvas的[颜色选择器](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas)获取当前选中的颜色找到当前选中的item

```js
pickPointColor(event) {
    var x = event.layerX;
    var y = event.layerY;
    var pixel = document.getElementById('diagonal1').getContext('2d').getImageData(x, y, 1, 1);
    var data = pixel.data;
    const rgb = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
    return rgb;
}
```
```js
canvasMove(event) {
    this.leftPosi = event.pageX - 70;
    this.topPosi = event.pageY - 80;
    this.pointColor = this.pickPointColor(event);
}
```
**注**：之所以提出变量pointColor是因为鼠标的mousemove事件调用很频繁，但此时区域颜色pointColor可能并未发生变化，为了节省性能，最终单独定义变量pointColor。
```js
pointColor() {
    this.paperLayout.active = this.paperLayout.subItems.find(item => item.color === this.pointColor);
}
```
* 监听(watch)当前选中item，并绘制底层canvas且填充高亮颜色
* 当鼠标离开当前高亮区域时，需先清空底层canvas高亮颜色
```js
clearPoint(context) {
    if (!context) return;
    context.clearRect(0, 0, this.realWidth, this.realHeight);
}
```
* 当切换报纸版面时，需清空顶层canvas重新绘制
