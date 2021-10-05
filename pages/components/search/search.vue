<template>
	<view class="content">
		<view class="result-div">
			<view class="headline">结果展示</view>
			<view class="result-content">
				<van-search :value="value" placeholder="请输入文案" label="搜索" :shape="shape" :show-action="showAction" :disabled="disabled" :maxlength="maxlength" :input-align="inputAlign"
				>
				</van-search>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">形状</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': shape === item.type }"
					v-for="(item, index) in shapeInfo"
					:key="index"
					@click="chooseType(item.type, 'shape')"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否显示右侧取消按钮</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': showAction === item.type }"
					v-for="(item, index) in actionInfo"
					:key="index"
					@click="chooseType(item.type, 'showAction')"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否禁用输入框</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': disabled === item.type }"
					v-for="(item, index) in disabledInfo"
					:key="index"
					@click="chooseType(item.type, 'disabled')"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">最大输入长度</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': maxlength === item.type }"
					v-for="(item, index) in maxlengthInfo"
					:key="index"
					@click="chooseType(item.type, 'maxlength')"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">输入框对齐方式</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': inputAlign === item.type }"
					v-for="(item, index) in alginInfo"
					:key="index"
					@click="chooseType(item.type, 'inputAlign')"
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
			value: '',
			shapeInfo: [{ type: 'square', mode: '默认' }, { type: 'round', mode: 'round' }],
			shape: 'square',
			actionInfo: [{ type: null, mode: '默认' }, { type: true, mode: '是' }],
			showAction: null,
			disabledInfo: [{ type: false, mode: '默认' }, { type: true, mode: '是' }],
			disabled: false,
			maxlengthInfo: [{type: -1, mode: '默认' }, { type: 5, mode: '5' }],
			maxlength: -1,
			alginInfo: [{ type: 'left', mode: '默认' }, { type: 'center', mode: 'center' }, { type: 'right', mode: 'right' }],
			inputAlign: 'left'
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
		onConfirm(event) {
			const { value, index } = event;
			console.log(`当前值：${value}, 当前索引：${index}`);
		},
		oncancel() {
			console.log('取消');
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
