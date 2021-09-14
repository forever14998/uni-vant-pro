<template>
	<view class="content">
		<view class="result-div">
			<view class="headline">结果展示</view>
			<view class="result-content">
				<van-image src="https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF" :fit="typeState" width="160" height="200" :radius="selectRadius" :round="selectRound">
				</van-image>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">图片填充模式</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': typeState === item.type }" v-for="(item, index) in typeInfo" :key="index" @click="chooseType(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">图片圆角</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectRadius === item.type }"
					v-for="(item, index) in radiusType"
					:key="index"
					@click="chooseRadius(item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否显示为圆形</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': selectRound === item.type }" v-for="(item, index) in roundInfo" :key="index" @click="chooseRound(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否懒加载</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': selectLazy === item.type }" v-for="(item, index) in lazyType" :key="index" @click="chooseLazy(item.type)">
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
			typeInfo: [{ type: 'fill', mode: '默认' }, { type: 'contain', mode: 'contain' }, { type: 'cover', mode: 'cover' }],
			typeState: 'fill',
			radiusType: [{ type: null, mode: '默认' }, { type: '10', mode: '设置圆角' }],
			selectRadius: null,
			roundInfo: [{ type: false, mode: '默认' }, { type: true, mode: '是' }],
			selectRound: false,
			lazyType: [{ type: false, mode: '默认' }, { type: true, mode: '是' }],
			selectLazy: false
		};
	},
	onLoad() {},
	methods: {
		/**
		 * @param {Object} type
		 * 图片填充模式
		 */
		chooseType(type) {
			this.typeState = type;
		},
		
		/**
		 * @param {Object} type
		 * 是否显示圆角
		 */
		chooseRadius(type) {
			this.selectRadius = type;
		},
		/**
		 * @param {Object} type
		 * 是否显示为圆形
		 */
		chooseRound(type) {
			this.selectRound = type;
		},
		/**
		 * 是否懒加载
		 */
		chooseLazy(type) {
			this.selectLazy = type;
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
			height: 200rpx;
			width: 200rpx;
			overflow: hidden;
			display: flex;
			justify-content: center;
			align-items: center;
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
