<template>
	<view class="content">
		<view class="result-div">
			<view class="headline">结果展示</view>
			<view class="result-content">
				<van-field label="文本" :value="text" placeholder="显示清空" :clearable="clearable" :disabled="disabled" @change="change"></van-field>
				<van-field label="文本" v-model="value" placeholder="请输入文本" :left-icon="leftIcon" :right-icon="rightIcon" :readonly="readonly"></van-field>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否禁用</view>
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
			<view class="condition-title">是否只读</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': readonly === item.type }"
					v-for="(item, index) in readonlyInfo"
					:key="index"
					@click="chooseType(item.type, 'readonly')"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否显示清空</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': clearable === item.type }"
					v-for="(item, index) in clearableInfo"
					:key="index"
					@click="chooseType(item.type, 'clearable')"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否显示左侧图标</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': leftIcon === item.type }"
					v-for="(item, index) in leftIconInfo"
					:key="index"
					@click="chooseType(item.type, 'leftIcon')"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否显示右侧图标</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': rightIcon === item.type }"
					v-for="(item, index) in rightIconInfo"
					:key="index"
					@click="chooseType(item.type, 'rightIcon')"
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
			text: '',
			value: '',
			disabledInfo: [{ type: false, mode: '默认' }, { type: true, mode: '是' }],
			disabled: false,
			readonlyInfo: [{ type: false, mode: '默认' }, { type: true, mode: '是' }],
			readonly: false,
			leftIconInfo: [{ type: '', mode: '默认' }, { type: 'smile-o', mode: '显示' }],
			leftIcon: '',
			rightIconInfo: [{ type: '', mode: '默认' }, { type: 'smile-o', mode: '显示' }],
			rightIcon: '',
			clearableInfo: [{ type: false, mode: '默认' }, { type: true, mode: '是' }],
			clearable: false
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
		input(event) {
			console.log('input',event)
		},
		change(event) {
			console.log('change',event)
		},
		clickIcon(event) {
			console.log('clickIcon',event)
		},
		focus(event) {
			console.log('focus',event)
		},
		blur(event) {
			console.log('blur',event)
		},
		clickInput(event) {
			console.log('clickInput',event)
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
