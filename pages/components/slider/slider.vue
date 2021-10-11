<template>
	<view class="content">
		<view class="result-div">
			<view class="headline">结果展示{{ value }}</view>
			<view class="result-content">
				<!-- <van-slider
					v-model="value"
					:max="50"
					:min="20"
					:bar-height="10"
					active-color="#07c160"
					inactive-color="#969799"
					:use-button-slot="true"
					:range="true"
					:disabled="true"
					:step="10"
					@change="onchange"
					@drag="ondrag"
					@drag-start="ondragStart"
					@drag-end="ondragEnd"
				>
					<view slot="left-button">123</view>
					<view slot="right-button">456</view>
					<view slot="button">789</view>
				</van-slider> -->
				<van-slider
					v-model="value"
					:max="selectRange[1]"
					:min="selectRange[0]"
					:bar-height="selectHeight"
					:range="selectMode"
					:disabled="disabled"
					@change="onchange"
					@drag="ondrag"
					@drag-start="ondragStart"
					@drag-end="ondragEnd"
				></van-slider>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">指定选择范围</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectRange === item.type }"
					v-for="(item, index) in rangeInfo"
					:key="index"
					@click="chooseType(item.type, 'selectRange')"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">进度条高度</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectHeight === item.type }"
					v-for="(item, index) in heightInfo"
					:key="index"
					@click="chooseType(item.type, 'selectHeight')"
				>
					{{ item.mode }}
				</view>
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
			<view class="condition-title">是否双滑块</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': selectMode === item.type }" v-for="(item, index) in modeInfo" :key="index" @click="chooseMode(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<van-toast id="van-toast"></van-toast>
	</view>
</template>

<script>
const defaultRange = [0, 100];
export default {
	data() {
		return {
			value: 50,
			rangeInfo: [{ type: defaultRange, mode: '默认' }, { type: [20, 70], mode: '指定范围' }],
			selectRange: defaultRange,
			heightInfo: [{ type: null, mode: '默认' }, { type: 2, mode: '2rpx' }],
			selectHeight: null,
			disabledInfo: [{ type: false, mode: '默认' }, { type: true, mode: '是' }],
			disabled: false,
			modeInfo: [{ type: null, mode: '默认' }, { type: true, mode: '是' }],
			selectMode: null
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
		chooseMode(val) {
			this.selectMode = val;
			if (val) {
				this.value = [40, 60];
			} else {
				this.value = 50;
			}
		},
		onchange(event) {
			this.Toast(`当前值${event}`);
			console.log(`onchange：${event}`);
		},
		ondrag(event) {
			console.log(`ondrag`, event);
		},
		ondragStart() {
			console.log(`ondragStart=====`);
		},
		ondragEnd() {
			console.log(`ondragEnd=====`);
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
