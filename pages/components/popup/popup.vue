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
			<view class="condition-title">z-index 层级</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': selectIndex === item.type }" v-for="(item, index) in indexType" :key="index" @click="chooseIndex(item.type)">
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
			<view class="condition-title">是否显示遮罩层</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': item.type === selectOverlay }"
					v-for="(item, index) in overlayType"
					:key="index"
					@click="chooseOverlay(item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">弹出位置</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': item.type === selectPosition }"
					v-for="(item, index) in positionType"
					:key="index"
					@click="choosePosition(item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否显示圆角</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': item.type === selectRound }" v-for="(item, index) in roundType" :key="index" @click="chooseRound(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">弹出层自定义样式</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': item.state }" v-for="(item, index) in styleType" :key="index" @click="chooseStyle(item)">
					{{ item.mode }}
				</view>
			</view>
		</view>

		<view class="condition-div">
			<view class="condition-title">遮罩层自定义样式</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': item.state }" v-for="(item, index) in overlayStyleType" :key="index" @click="chooseOverlayStyle(item)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否在点击遮罩层后关闭</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': item.type === selectClose }" v-for="(item, index) in closeType" :key="index" @click="chooseClose(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否显示关闭图标</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': item.type === selectCloseable }"
					v-for="(item, index) in closeableType"
					:key="index"
					@click="chooseCloseable(item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否适配iphone底部安全区域</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': item.type === selectBottomSafe }"
					v-for="(item, index) in bottomSafeType"
					:key="index"
					@click="chooseBottomSafe(item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否留出顶部安全区域</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': item.type === selectTopSafe }" v-for="(item, index) in topSafeType" :key="index" @click="chooseTopSafe(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<van-popup
			v-model="selectState"
			:duration="selectDuration"
			:z-index="selectIndex"
			:custom-style="selectStyle"
			:overlay-style="selectOverlayStyle"
			:overlay="selectOverlay"
			:position="selectPosition"
			:round="selectRound"
			:close-on-click-overlay="selectClose"
			:closeable="selectCloseable"
			:safe-area-inset-bottom="selectBottomSafe"
			:safe-area-inset-top="selectTopSafe"
			@close="closePopup"
		>
			<view class="overlay-content"></view>
		</van-popup>
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
			overlayType: [{ type: true, mode: '是' }, { type: false, mode: '否' }],
			selectOverlay: true,
			positionType: [
				{ type: 'center', mode: '中' },
				{ type: 'top', mode: '上' },
				{ type: 'bottom', mode: '下' },
				{ type: 'left', mode: '左' },
				{ type: 'right', mode: '右' }
			],
			selectPosition: 'center',
			roundType: [{ type: true, mode: '是' }, { type: false, mode: '否' }],
			selectRound: false,
			styleType: [
				{ type: {}, state: true, mode: '默认' },
				{ type: { 'background-color': '#3f8cf4',  padding: '20rpx' }, state: false, mode: '自定义样式' }
			],
			selectStyle: {},
			overlayStyleType: [
				{ type: {}, state: true, mode: '默认' },
				{ type: { 'background-color': 'rgba(255, 255,255, 0.7)',
				'background-color': 'var(--overlay-background-color, rgba(255, 255,255, 0.7))', }, state: false, mode: '自定义样式' }
			],
			selectOverlayStyle: {},
			closeType: [{ type: true, mode: '是' }, { type: false, mode: '否' }],
			selectClose: true,
			closeableType: [{ type: true, mode: '是' }, { type: false, mode: '否' }],
			selectCloseable: false,
			bottomSafeType: [{ type: true, mode: '是' }, { type: false, mode: '否' }],
			selectBottomSafe: true,
			topSafeType: [{ type: true, mode: '是' }, { type: false, mode: '否' }],
			selectTopSafe: false
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
		 * 是否显示遮罩层
		 */
		chooseOverlay(type) {
			this.selectOverlay = type;
		},
		/**
		 * @param {Object} type
		 * 选择弹出位置
		 */
		choosePosition(type) {
			this.selectPosition = type;
		},
		/**
		 * @param {Object} type
		 * 是否显示圆角
		 */
		chooseRound(type) {
			this.selectRound = type;
		},
		/**
		 * @param {Object} type
		 * 是否在弹出遮罩层后关闭
		 */
		chooseClose(type) {
			this.selectClose = type;
		},
		/**
		 * @param {Object} type
		 * 是否显示关闭图标
		 */
		chooseCloseable(type) {
			this.selectCloseable = type;
		},
		/**
		 * @param {Object} type
		 * 是否适配iphone底部安全区域
		 */
		chooseBottomSafe(type) {
			this.selectBottomSafe = type;
		},
		/**
		 * @param {Object} type
		 * 是否适顶部安全区域
		 */
		chooseTopSafe(type) {
			this.selectTopSafe = type;
		},
		/**
		 * @param {Object} type
		 * 弹出层自定义样式
		 */
		chooseStyle(item) {
			this.$set(this.styleType.filter(el => el.state)[0], 'state', false);
			this.$set(item, 'state', true);
			this.selectStyle = item.type;
		},
		/**
		 * @param {Object} type
		 * 遮罩层自定义样式
		 */
		chooseOverlayStyle(item) {
			this.$set(this.overlayStyleType.filter(el => el.state)[0], 'state', false);
			this.$set(item, 'state', true);
			this.selectOverlayStyle = item.type;
		},
		/**
		 * 关闭弹出层
		 */
		closePopup() {
			this.selectState = false;
		},
	}
};
</script>

<style lang="scss" scoped>
.content {
	padding: 30rpx;
	.overlay-content {
		height: 200rpx;
		width: 200rpx;
		background-color: #ffffff;
	}
	.condition-div {
		.condition-title {
			padding: 30rpx 0;
			font-size: 30rpx;
			color: #333333;
			font-weight: bold;
		}
		.condition-content {
			background-color: #f7f8fa;
			border-radius: 8rpx;
			padding: 10rpx;
			display: flex;
			justify-content: space-between;
			.condition-unit {
				width: 100%;
				padding: 0 30rpx;
				font-size: 28rpx;
				color: #333333;
				border-radius: 8rpx;
				text-align: center;
			}
			.select-unit {
				background-color: #ffffff;
			}
		}
	}
}
</style>
