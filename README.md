<center><img src="https://static-7896494f-63ee-4a91-a07c-1fcd1d73002f.bspapp.com/assets/logo.png"></img> </center>
<center><font face="黑体" size=8>vantPro</font></center>
<center><font  size=4>基于 vant 多端适配版本</font></center>

## 介绍 


uni-app 社区内，只有对 vant 单端兼容的版本，vantPro 由此而发布。为了更好的适配开发者的开发习惯，拥抱庞大的开发社区和生态。   
vantPro 多端适配版本发布，现支持 日期选择、弹出、动画组件。
​

##  文档


### [文档地址：http://vantpro.com](https://static-7896494f-63ee-4a91-a07c-1fcd1d73002f.bspapp.com/)


##  预览


<center>
<img src="https://static-7896494f-63ee-4a91-a07c-1fcd1d73002f.bspapp.com/assets/h5logo.png" width="300"></img> 
<span style="display: inline-block; width: 240px"></span>
<img src="https://static-7896494f-63ee-4a91-a07c-1fcd1d73002f.bspapp.com/assets/img/wx-logo.b60e91fb.jpg" width="300"></img> 
</center>


##  使用


> 在使用此组件前，假设您已经安装了 scss 依赖，hx 版本 版本为3.0以上，支持 easycom 规则 引入组件。

1. main.js 引入
```javascript
import vantPro from 'vant-pro' 
Vue.use(vantPro)
```

2. App.vue 引入 样式。
```css
<style>
	/*每个页面公共css */
	@import '@/vant-pro/index.css';
</style>
```

3. uni.scss引入全局scss文件
```css
@import '@/vant-pro/theme.scss';
```

4. pages.json 依据 easycom 规则 全局引入 组件
```javascript
	"easycom": {
		"autoscan": true,
		"custom": {
			"^van-(.*)": "@/vant-pro/components/van-$1/van-$1.vue"
		}
	}
```


##  示例



如不出意外的话，引入后您将直接在页面中 使用组件即可，例子如下：


```html
<template>
	<view>
		<button  @click="calendarShow = true" >选择日期区间</button>
		<van-calendar v-model="calendarShow" @confirm="onConfirm" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			calendarShow: false
		};
	},
	onLoad() {},
	methods: {
		/**
		 * 选择日期回调
		 * @param {Object} result
		 */
		onConfirm(result){
			// 解析结果
			console.log(result.map(el => this.$u.cUtil.dateFormate(el, 'yyyy-MM-dd')));
			// 关闭组件
			this.calendarShow = false;
		}
	}
};
</script>
......
```
##  联系我们
QQ: 1019011560、   2737469470   
mail: forever14998@gmail.com


##  鸣谢

[vant](https://github.com/youzan/vant)    官方提供的基础组件   
[uView](https://www.uviewui.com/) 多平台快速开发的UI框架

​


## 版权信息

遵循MIT开源协议，全面拥抱开源。


















