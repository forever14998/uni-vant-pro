<template>
	<view class="content">
		<view class="result-div">
			<view class="headline">结果展示</view>
			<view class="result-content">
				<van-datetime-picker
					v-if="selectType === 'datetime'"
					:show-toolbar="showToolbar"
					:value="currentDate"
					type="datetime"
					@input="onInput"
					@cancel="pickerCancel"
					@confirm="pickerConfirm"
				/>
				<van-datetime-picker
					v-if="selectType === 'date'"
					:show-toolbar="showToolbar"
					:value="currentDate"
					type="date"
					@input="onInput"
					@cancel="pickerCancel"
					@confirm="pickerConfirm"
				/>
				<van-datetime-picker
					v-if="selectType === 'time'"
					:show-toolbar="showToolbar"
					:value="currentTime"
					type="time"
					@input="onInput"
					@cancel="pickerCancel"
					@confirm="pickerConfirm"
				/>
				<van-datetime-picker
					v-if="selectType === 'year-month'"
					:show-toolbar="showToolbar"
					:value="currentDate"
					type="year-month"
					@input="onInput"
					@cancel="pickerCancel"
					@confirm="pickerConfirm"
				/>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">类型</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectType === item.type }"
					v-for="(item, index) in typeInfo"
					:key="index"
					@click="chooseType(item.type, 'selectType')"
				>
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
	</view>
</template>

<script>
export default {
	data() {
		return {
			currentTime: '12:00',
			currentDate: new Date(2021, 11, 2).getTime(),
			toolbarInfo: [{ type: true, mode: '默认' }, { type: false, mode: '否' }],
			showToolbar: true,
			typeInfo: [{ type: 'datetime', mode: '默认' }, { type: 'date', mode: 'date' }, { type: 'time', mode: 'time' }, { type: 'year-month', mode: 'yearMonth' }],
			selectType: 'datetime'
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
		/**
		 * @param {Object} event
		 * 确定事件
		 */
		pickerConfirm(event) {
			console.log(event);
		},
		/**
		 * 取消事件
		 */
		pickerCancel() {
			console.log('关闭组件');
		},
		/**
		 * @param {Object} event
		 * change回调
		 */
		onInput(event) {
			console.log(typeof event ? event : new Date(event));
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
