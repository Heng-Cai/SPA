# 单页应用

## 技术栈

Node.js + jQuery + Bootstrap

## 原理

监听地址栏的`hashchange`事件， 当地址栏的hash值发生变化时切换界面，这样不会触发页面的重载，从而达到单页应用的切换效果。

```javascript
window.addEventListener('hashchange', function(event) {
  // 针对不同浏览器采用渐进增强原则
  // 浏览器event对象支持oldURL/newURL属性，则应用这些属性
  // 不支持上述属性则退而求其次，采用location属性    
}
```

## 构造

前端利用Bootstrap来构建响应式页面，利用jQuery进行页面交互、发送AJAX请求；后台利用Node.js构建服务器，响应前端请求。

目前完成了两个页面：

- 任务清单页

实现任务的添加与移除：

![add&remove](http://upload-images.jianshu.io/upload_images/3406088-745e67eb4ce3fcce.gif?imageMogr2/auto-orient/strip)

根据任务的添加移除情况实时记录用户的输入任务列表，当用户输入重复任务时，给以提示：

![same](http://upload-images.jianshu.io/upload_images/3406088-cd94f05781cc1b48.gif?imageMogr2/auto-orient/strip)

- 省份简称查询页

在输入框中输入省份（中文或全拼英文），利用jQuery进行AJAX请求，利用Node.js处理请求，根据输入内容查询服务器中的JSON文件，得到查询结果，并将结果返回给浏览器，再利用jQuery将结果显示给用户。

监听输入框中的`input`事件，比较用户前后两次的输入，当输入不一样时则进行AJAX请求，这样就可以有效减少请求次数盘；得到请求的响应结果后实时显示结果：

![search](http://upload-images.jianshu.io/upload_images/3406088-0e61267a3cb381f9.gif?imageMogr2/auto-orient/strip)

未采用`keyup`事件，因为该事件在输入法为中文状态，按回车键将拼音键入输入框时不会被触发，因此就无法进行下一步的AAJX请求了，而利用`input`事件则可解决上述问题：

![input](http://upload-images.jianshu.io/upload_images/3406088-f36e583b906c321f.gif?imageMogr2/auto-orient/strip)

