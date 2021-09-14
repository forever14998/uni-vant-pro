<template>
	<view class="content">
		<view class="result-div">
			<view class="headline">结果展示</view>
			<view class="result-content">
				<van-button
					:type="typeState"
					:size="selectSize"
					:color="selectColor"
					:icon="selectIcon"
					:loading="iconLoading"
					:plain="selectPlain"
					:disabled="selectDisabled"
					loading-text="加载中..."
				>
					确认
				</van-button>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">按钮类型</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': typeState === item.type }" v-for="(item, index) in typeInfo" :key="index" @click="chooseType(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">按钮尺寸</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': selectSize === item.type }" v-for="(item, index) in sizeType" :key="index" @click="chooseSize(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">自定义颜色</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': selectColor === item.type }" v-for="(item, index) in colorInfo" :key="index" @click="chooseColor(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">左侧图标</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': selectIcon === item.type }" v-for="(item, index) in iconType" :key="index" @click="chooseIcon(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否为加载中</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': iconLoading === item.type }"
					v-for="(item, index) in loadingInfo"
					:key="index"
					@click="chooseLoading(item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否为朴素按钮</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': selectPlain === item.type }" v-for="(item, index) in plainInfo" :key="index" @click="choosePlain(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否禁用按钮</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectDisabled === item.type }"
					v-for="(item, index) in disabledInfo"
					:key="index"
					@click="chooseDisabled(item.type)"
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
			typeInfo: [{ type: 'default', mode: '默认' }, { type: 'primary', mode: '主要' }, { type: 'warning', mode: '警告' }],
			typeState: 'default',
			sizeType: [{ type: 'normal', mode: '默认' }, { type: 'large', mode: 'large' }, { type: 'small', mode: 'small' }],
			selectSize: 'normal',
			colorInfo: [{ type: '', mode: '默认' }, { type: '#3f8cf4', mode: '单色' }, { type: 'linear-gradient(to right, #0080FF, #3f8cf4)', mode: '渐变' }],
			selectColor: '',
			iconType: [{ type: '', mode: '默认' }, { type: 'http://doc.vantpro.com/assets/logo.png', mode: '图片' }],
			selectIcon: '',
			loadingInfo: [{ type: false, mode: '默认' }, { type: true, mode: '是' }],
			iconLoading: false,
			plainInfo: [{ type: false, mode: '默认' }, { type: true, mode: '是' }],
			selectPlain: false,
			disabledInfo: [{ type: false, mode: '默认' }, { type: true, mode: '是' }],
			selectDisabled: false
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
		 * 选择尺寸
		 */
		chooseSize(type) {
			this.selectSize = type;
		},
		/**
		 * @param {Object} type
		 * 选择颜色
		 */
		chooseColor(type) {
			this.selectColor = type;
		},
		/**
		 * 是否展示图标
		 */
		chooseIcon(type) {
			this.selectIcon = type;
		},
		/**
		 * @param {Object} type
		 * 是否为加载状态
		 */
		chooseLoading(type) {
			this.iconLoading = type;
		},
		/**
		 * @param {Object} type
		 * 朴素按钮
		 */
		choosePlain(type) {
			this.selectPlain = type;
		},
		/**
		 * @param {Object} type
		 * 是否禁用
		 */
		chooseDisabled(type) {
			this.selectDisabled = type;
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
