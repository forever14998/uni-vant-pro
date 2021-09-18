<template>
	<view class="content">
		<view class="result-div">
			<view class="headline">结果展示</view>
			<view class="result-content"><van-datetime-picker type="datetime" :value="currentDate" :min-date="minDate" :max-date="maxDate" @input="onInput" /></view>
		</view>
		<view class="condition-div">
			<view class="condition-title">列配置</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': item.type }" v-for="(item, index) in columnsInfo" :key="index" @click="selectColumns(item)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否显示顶部状态栏</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': showToolbar === item.type }"
					v-for="(item, index) in toolbarInfo"
					:key="index"
					@click="chooseType(item.type, 'showToolbar')"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">设置选中项索引（单列数据）</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': defaultIndex === item.type }"
					v-for="(item, index) in indexInfo"
					:key="index"
					@click="chooseType(item.type, 'defaultIndex')"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			minHour: 10,
			maxHour: 20,
			minDate: new Date().getTime(),
			maxDate: new Date(2019, 10, 1).getTime(),
			currentDate: new Date().getTime(),
			columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
			toolbarInfo: [{ type: false, mode: '默认' }, { type: true, mode: '是' }],
			showToolbar: false,
			indexInfo: [{ type: null, mode: '默认' }, { type: 2, mode: '2' }],
			defaultIndex: null,
			columnsInfo: [{ type: true, key: 1, mode: '单列数据' }, { type: false, key: 2, mode: '多列数据' }]
		};
	},
	onLoad() {},
	methods: {
		/**
		 * @param {Object} type
		 * 类型
		 */
		chooseType(type, name) {
			this[name] = type;
		},
		onInput(event) {
			console.log(event)
			this.currentDate = event.detail;
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	padding: 32rpx;
	.result-div {
		background-color: $gray-1;
		border: 1rpx dotted $gray-5;
		border-radius: 16rpx;
		padding: 32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		.headline {
			font-size: 32rpx;
			color: #333333;
			font-weight: bold;
			padding-bottom: 32rpx;
		}
		.result-content {
			// height: 200rpx;
			width: 100%;
		}
	}
	.condition-div {
		.condition-title {
			padding: 32rpx 24rpx;
			font-size: 32rpx;
			color: #333333;
			font-weight: bold;
		}
		.condition-content {
			background-color: $gray-1;
			border-radius: 8rpx;
			padding: 16rpx;
			margin: 24rpx;
			display: flex;
			justify-content: space-between;
			.condition-unit {
				width: 100%;
				padding: 0 32rpx;
				font-size: 28rpx;
				color: #333333;
				border-radius: 8rpx;
				text-align: center;
			}
			.select-unit {
				background-color: $white;
			}
		}
	}
}
</style>
