<template>
	<view class="content">
		<view class="result-div">
			<view class="headline">结果展示</view>
			<view class="result-content">
				<view class="result-unit" v-for="(item, index) in chooseDate" :key="index">{{ item }}</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">状态</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': selectState === item.type }" v-for="(item, index) in stateType" :key="index" @click="chooseState(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">类型</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectCalendare === item.type }"
					v-for="(item, index) in calendarType"
					:key="index"
					@click="chooseCalendar(item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">组件标题</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': selectHeadline === item }" v-for="(item, index) in headlineType" :key="index" @click="headlinePostion(item)">
					{{ item }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">选中日期颜色</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': selectColor === item.type }" v-for="(item, index) in colorType" :key="index" @click="chooseColor(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">圆角</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': selectRound === item.type }" v-for="(item, index) in 
				roundType" :key="index" @click="chooseRound(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">自定义按钮样式</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': item.state }" v-for="(item, index) in btnStyleType" :key="index" @click="chooseBtnStyle(item)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<van-calendar
			type="single"
			v-model="singleCalender"
			:minDate="minDate"
			:defaultDate="defaultDate"
			:header-title="selectHeadline"
			:color="selectColor"
			:round="selectRound"
			:button-text="selectBtnText"
			:button-all-style="selectBtnStyle"
			@confirm="calendarChange"
			@close="closeCalendar"
		></van-calendar>
		<van-calendar
			type="multiple"
			v-model="multipleCalender"
			:header-title="selectHeadline"
			:color="selectColor"
			:round="selectRound"
			:button-text="selectBtnText"
			:button-all-style="selectBtnStyle"
			@confirm="calendarChange"
			@close="closeCalendar"
		></van-calendar>
		<van-calendar
			type="range"
			v-model="rangeCalender"
			:header-title="selectHeadline"
			:color="selectColor"
			:round="selectRound"
			:button-text="selectBtnText"
			:button-all-style="selectBtnStyle"
			@confirm="calendarChange"
			@close="closeCalendar"
		></van-calendar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			singleCalender: false,
			multipleCalender: false,
			rangeCalender: false,
			stateType: [{ type: 'hidden', mode: '隐藏' }, { type: 'show', mode: '显示' }],
			selectState: 'hidden',
			calendarType: [{ type: 'single', mode: '单个日期' }, { type: 'multiple', mode: '多个日期' }, { type: 'range', mode: '日期范围' }],
			selectCalendare: 'single',
			headlineType: ['选择日期', '选择时间'],
			selectHeadline: '选择日期',
			colorType: [{ type: '', mode: '默认' }, { type: '#20BF98', mode: '绿色' }],
			selectColor: '',
			btnTextType: ['确定', '选择'],
			selectBtnText: '确定',
			btnStyleType: [
				{ type: {}, state: true, mode: '无' },
				{ type: { color: 'white', height: '80rpx', background: '#20BF98', borderRadius: '8rpx', fontSize: '28rpx' }, state: false, mode: '自定义按钮样式' }
			],
			selectBtnStyle: {},
			roundType: [{ type: false, mode: '默认' }, { type: true, mode: '圆角' }],
			selectRound: false,
			chooseDate: '',
			minDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-30).getTime(),
			defaultDate: new Date(new Date().getFullYear(), new Date().getMonth()+4, new Date().getDate()).getTime()
		};
	},
	onLoad() {},
	methods: {
		/**
		 * @param {Object} type
		 * 是否显示组件
		 */
		chooseState(type) {
			if (type === 'hidden') {
				this[this.selectCalendare + 'Calender'] = false;
			} else {
				this[this.selectCalendare + 'Calender'] = true;
			}
		},
		/**
		 * 关闭组件
		 */
		closeCalendar() {
			this[this.selectCalendare + 'Calender'] = false;
		},
		/**
		 * @param {Object} e
		 * 选择时间
		 */
		calendarChange(e) {
			this.chooseDate = e.map(el => this.$u.cUtil.dateFormate(el, 'yyyy-MM-dd'));
			this[this.selectCalendare + 'Calender'] = false;
		},
		/**
		 * 选择日历类型
		 */
		chooseCalendar(type) {
			this.selectCalendare = type;
		},
		/**
		 * @param {Object} item
		 * 切换组件标题
		 */
		headlinePostion(item) {
			this.selectHeadline = item;
		},
		/**
		 * @param {Object} type
		 * 切换选中颜色
		 */
		chooseColor(type) {
			this.selectColor = type;
		},
		/**
		 * @param {Object} type
		 * 圆角切换
		 */
		chooseRound(type) {
			this.selectRound = type;
		},
		/**
		 * @param {Object} type
		 * 切换按钮文案
		 */
		chooseBtnText(item) {
			this.selectBtnText = item;
		},
		/**
		 * @param {Object} type
		 * 切换按钮文案
		 */
		chooseBtnStyle(item) {
			let info = this.btnStyleType.filter(el => el.state);
			this.$set(info[0], 'state', false);
			this.$set(item, 'state', true);
			this.selectBtnStyle = item.type;
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
		padding: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		.headline {
			font-size: 32rpx;
			color: #333333;
			font-weight: bold;
		}
		.result-content {
			font-size: 28rpx;
			color: #333333;
			.result-unit {
				padding: 24rpx;
			}
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
