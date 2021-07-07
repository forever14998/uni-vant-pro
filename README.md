# 快速上手
## 前言
[vant ](https://github.com/youzan/vant)  是**有赞前端团队**开源的移动端组件库，vant 拥有的用户体量是非常庞大的，但没有多端适配版本。 

​

uni-app 社区内，只有对 vant 单端兼容的版本，UniVantPro 由此而发布。为了更好的适配开发者的开发习惯，拥抱庞大的开发社区和生态，现将 vant 优化 并逐步迁移至 uni-app 内，实现多端适配。

## 介绍
通过本章节你可以了解到 VantPro 的安装方法和基本使用姿势。

​

## 插件
通过 插件市场 安装
uni-app 插件市场 搜索 vantPro 。右上角 使用Hx 导入插件 或者 下载插件ZIP。
请将插件包放置在项目定义的组件文件夹。

​

下载地址：  
[https://ext.dcloud.net.cn/plugin?id=1593](https://ext.dcloud.net.cn/plugin?id=1593)

​

## 示例
我们提供了丰富的示例工程，通过示例工程你可以了解如下内容：

- 框架如何使用
- 配置自定义主题色
- 各组件的使用示例

下载地址：  
[https://ext.dcloud.net.cn/plugin?id=1593](https://ext.dcloud.net.cn/plugin?id=1593)  
[https://github.com/forever14998/uni-vant-pro](https://github.com/forever14998/uni-vant-pro)

​

## 组件引入
### 全局引入（[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)）


自 uniapp 3.1.1 后 新增 easycom 方式 引入 组件，使用方式：page.json 中编写如下代码：
```javascript
	"easycom": {
    "autoscan": true,
        "custom": {
        "^van-(.*)": "@/uniVantPro/components/van-$1/van-$1.vue"
    }
}
```
如不出意外的话，引入后您将直接在页面中 使用组件即可，例子如下：


```vue
<template>
	<van-popup>
			<view class="overlay-content"></view>
	</van-popup>
</template>

<style lang="scss" scoped>
  .overlay-content {
		height: 200rpx;
		width: 200rpx;
		background-color: #3f8cf4;
	}
</style>
```


### 单组件引入
与 vue 引入的方法无异，示例如下：
```vue
<template>
  <van-popup>
    <view class="overlay-content"></view>
  </van-popup>
</template>

<script>
import vanPopup from "@/uniVantPro/components/van-popup/van-popup.vue";
export default {
  components: {
    vanPopup
  },
  data() {
  }
}
</script>

<style lang="scss" scoped>
.overlay-content {
  height: 200rpx;
  width: 200rpx;
  background-color: #3f8cf4;
}
</style>
```
### ​
