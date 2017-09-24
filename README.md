# 单页应用

## 原理

监听地址栏的'hashchange'事件， 当hash值变化时改变界面，这样改变地址栏不会触发页面的重载，但会记录到浏览器的history中去。

```javascript
window.addEventListener('hashchange', function(event) {
  // 支持event对象的oldURL/newURL属性，则利用之
  // 不支持上述属性则用location属性    
}
```

## 构造

前端利用Bootstrap来设置响应式页面，利用jQuery进行交互以及AJAX请求；后台利用Node.js构建服务器，响应前端请求。

目前完成了两个页面：

- 任务清单页

实现任务的添加与移除：

![add&remove](http://upload-images.jianshu.io/upload_images/3406088-745e67eb4ce3fcce.gif?imageMogr2/auto-orient/strip)

记录用户的输入任务列表，当用户输入重复任务时，给以提示：

![same](http://upload-images.jianshu.io/upload_images/3406088-cd94f05781cc1b48.gif?imageMogr2/auto-orient/strip)

- 省份简称查询页

在浏览器的输入框中输入省份（中文或全拼英语），利用jQuery进行AJAX请求，利用Node.js处理请求，在构造的服务器中的JSON文件中查询得到结果，并返回给浏览器显示出来。

监听输入框中的'input'事件，将先后两次的用户输入经去除所有空格处理后进行比较，当不一样时则进行AJAX请求，从而减少请求次数，得到结果后实时显示查询结果；

![search](http://upload-images.jianshu.io/upload_images/3406088-0e61267a3cb381f9.gif?imageMogr2/auto-orient/strip)

未采用'keyup'事件，因为该事件在输入法为中文状态，按回车键将拼音键入输入框时不会触发'keyup'事件，因此无法显示搜索结果，而利用'input'事件则可解决上述问题：

![input](http://upload-images.jianshu.io/upload_images/3406088-f36e583b906c321f.gif?imageMogr2/auto-orient/strip)

