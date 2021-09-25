<template>
	<view class="content">
		<view class="result-div">
			<view class="headline">结果展示</view>
			<view class="result-content">
				<van-radio-group :value="selectRadio" :disabled="selectDisabled" @change="change">
					<van-radio name="1" :use-icon-slot="selectIcon" :shape="selectShape" :checked-color="selectColor">
						单选1
						<van-icon name="thumb-circle-o" slot="icon" :color="selectRadio === '1' ? '#3f8cf4' : ''" v-if="selectIcon" />
					</van-radio>
					<van-radio name="2" :use-icon-slot="selectIcon" :shape="selectShape" :checked-color="selectColor">
						<van-icon name="thumb-circle-o" slot="icon" :color="selectRadio === '2' ? '#3f8cf4' : ''" v-if="selectIcon" />
						单选2
					</van-radio>
				</van-radio-group>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否禁用</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectDisabled === item.type }"
					v-for="(item, index) in disabledInfo"
					:key="index"
					@click="chooseType('selectDisabled', item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">自定义图标</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectIcon === item.type }"
					v-for="(item, index) in iconInfo"
					:key="index"
					@click="chooseType('selectIcon', item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">自定义形状</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectShape === item.type }"
					v-for="(item, index) in shapeInfo"
					:key="index"
					@click="chooseType('selectShape', item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">自定义颜色</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectColor === item.type }"
					v-for="(item, index) in colorInfo"
					:key="index"
					@click="chooseType('selectColor', item.type)"
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
			selectRadio: '1',
			disabledInfo: [{ type: null, mode: '默认' }, { type: true, mode: '是' }],
			selectDisabled: null,
			iconInfo: [{ type: null, mode: '默认' }, { type: true, mode: '是' }],
			selectIcon: null,
			shapeInfo: [{ type: 'round', mode: '默认' }, { type: 'square', mode: '方形' }],
			selectShape: 'round',
			colorInfo: [{ type: null, mode: '默认' }, { type: '#07c160', mode: '绿色' }],
			selectColor: null
		};
	},
	onLoad() {},
	methods: {
		/**
		 * @param {Object} type
		 * 属性设置
		 */
		chooseType(info, type) {
			this[info] = type;
		},
		change(event) {
			this.selectRadio = event;
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
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.condition-headline {
		margin: 50rpx 0 10rpx;
		// padding: 0 24rpx;
		font-size: 34rpx;
		color: #333333;
		font-weight: bold;
		position: relative;
	}
	// .condition-headline::after {
	// 	content: '';
	// 	position: absolute;
	// 	left: 0;
	// 	top: 0;
	// 	bottom: 0;
	// 	width: 10rpx;
	// 	background-color: $blue;
	// }
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
