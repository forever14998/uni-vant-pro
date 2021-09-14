<template>
	<view class="content">
		<view class="condition-div">
			<view class="condition-title">状态</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': selectState === item.type }" v-for="(item, index) in stateType" :key="index" @click="chooseState(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>

		<view class="condition-div">
			<view class="condition-title">动画时长</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectDuration === item.type }"
					v-for="(item, index) in durationType"
					:key="index"
					@click="chooseDuration(item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">自定义样式</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': item.state }" v-for="(item, index) in styleType" :key="index" @click="chooseStyle(item)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">z-index 层级</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': selectIndex === item.type }" v-for="(item, index) in indexType" :key="index" @click="chooseIndex(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<van-overlay v-model="selectState" :duration="selectDuration" :z-index="selectIndex" :custom-style="selectStyle" @click="overlayClick">
			<view class="overlay-content"></view>
		</van-overlay>
	</view>
</template>

<script>
export default {
	data() {
		return {
			stateType: [{ type: false, mode: '隐藏' }, { type: true, mode: '显示' }],
			selectState: false,
			indexType: [{ type: 1, mode: '默认' }, { type: 100, mode: '100' }],
			selectIndex: 1,
			durationType: [{ type: 300, mode: '默认' }, { type: 1000, mode: '1000' }],
			selectDuration: 300,
			styleType: [
				{ type: {}, state: true, mode: '默认' },
				{ type: { display: 'flex', 'justify-content': 'center', 'align-items': 'center', 'padding-top': '400rpx' }, state: false, mode: '自定义样式' }
			],
			selectStyle: {}
		};
	},
	onLoad() {},
	methods: {
		/**
		 * @param {Object} type
		 * 是否显示组件
		 */
		chooseState(type) {
			this.selectState = type;
		},
		/**
		 * 选择动画类型
		 */
		chooseIndex(type) {
			this.selectIndex = type;
		},
		/**
		 * @param {Object} type
		 * 选择动画时长
		 */
		chooseDuration(type) {
			this.selectDuration = type;
		},
		/**
		 * @param {Object} type
		 * 自定义样式
		 */
		chooseStyle(item) {
			this.$set(this.styleType.filter(el => el.state)[0], 'state', false);
			this.$set(item, 'state', true);
			this.selectStyle = item.type;
		},
		/**
		 * 遮挡点击事件
		 */
		overlayClick() {
			this.selectState = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	padding: 32rpx;
	.overlay-content {
		height: 200rpx;
		width: 200rpx;
		background-color: $white;
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
