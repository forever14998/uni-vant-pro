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
				<view class="condition-unit" :class="{ 'select-unit': selectRound === item.type }" v-for="(item, index) in roundType" :key="index" @click="chooseRound(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">起始日期是否可相同</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': selectSame === item.type }" v-for="(item, index) in sameType" :key="index" @click="chooseSame(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">可选日期最大跨度</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': selectRange === item.type }" v-for="(item, index) in rangeType" :key="index" @click="chooseRange(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">超过可选范围是否提示</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectPrompt === item.type }"
					v-for="(item, index) in promptType"
					:key="index"
					@click="choosePrompt(item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">默认日期</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': item.state }" v-for="(item, index) in defaultType" :key="index" @click="chooseDefault(item)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">最小可选日期</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': item.state }" v-for="(item, index) in minDateType" :key="index" @click="chooseMinDate(item)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">最大可选日期</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': item.state }" v-for="(item, index) in maxDateType" :key="index" @click="chooseMaxDate(item)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否展示确认按钮</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectConfirm === item.type }"
					v-for="(item, index) in confirmType"
					:key="index"
					@click="chooseConfirm(item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">第一列显示周几</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': selectWeek === item.type }" v-for="(item, index) in weekType" :key="index" @click="chooseWeek(item.type)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否适配ios底部安全区域</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectSafeArea === item.type }"
					v-for="(item, index) in safeAreaType"
					:key="index"
					@click="chooseSafeArea(item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">按钮文案</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': selectBtnText === item }" v-for="(item, index) in btnTextType" :key="index" @click="chooseBtnText(item)">
					{{ item }}
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
		<!-- formatter -->
		<!-- :position="selectPostion" -->
		<van-calendar
			type="single"
			ref="singleCalender"
			:minDate="minDate"
			:maxDate="maxDate"
			:headerTitle="selectHeadline"
			:color="selectColor"
			:defaultDate="selectDefault"
			:round="selectRound"
			:safeAreaInsetbottom="selectSafeArea"
			:buttonText="selectBtnText"
			:buttonAllStyle="selectBtnStyle"
			:firstDayOfWeek="selectWeek"
			@confirm="calendarChange"
		></van-calendar>
		<van-calendar
			type="multiple"
			ref="multipleCalender"
			:minDate="minDate"
			:maxDate="maxDate"
			:headerTitle="selectHeadline"
			:color="selectColor"
			:defaultDate="selectDefault"
			:round="selectRound"
			:safeAreaInsetbottom="selectSafeArea"
			:buttonText="selectBtnText"
			:buttonAllStyle="selectBtnStyle"
			:firstDayOfWeek="selectWeek"
			@confirm="calendarChange"
		></van-calendar>
		<van-calendar
			type="range"
			ref="rangeCalender"
			:minDate="minDate"
			:maxDate="maxDate"
			:headerTitle="selectHeadline"
			:color="selectColor"
			:defaultDate="selectDefault"
			:showConfirm="selectConfirm"
			:round="selectRound"
			:safeAreaInsetbottom="selectSafeArea"
			:buttonText="selectBtnText"
			:buttonAllStyle="selectBtnStyle"
			:firstDayOfWeek="selectWeek"
			:allowSameDay="selectSame"
			:maxRange="selectRange"
			:showRangePrompt="selectPrompt"
			@confirm="calendarChange"
		></van-calendar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			stateType: [{ type: 'hidden', mode: '隐藏' }, { type: 'show', mode: '显示' }],
			selectState: 'hidden',
			calendarType: [{ type: 'single', mode: '单个日期' }, { type: 'multiple', mode: '多个日期' }, { type: 'range', mode: '日期范围' }],
			selectCalendare: 'single',
			postionType: [{ type: 'left', mode: '左' }, { type: 'right', mode: '右' }, { type: 'top', mode: '上' }, { type: 'bottom', mode: '下' }, { type: 'center', mode: '中' }],
			selectPostion: 'bottom',
			headlineType: ['选择日期', '选择时间'],
			selectHeadline: '选择日期',
			colorType: [{ type: '', mode: '默认' }, { type: '#FF6027', mode: '红色' }],
			selectColor: '',
			sameType: [{ type: false, mode: '否' }, { type: true, mode: '是' }],
			selectSame: false,
			rangeType: [{ type: null, mode: '无' }, { type: 10, mode: '10' }, { type: 20, mode: '20' }],
			selectRange: null,
			defaultType: [
				{ type: null, state: true, mode: '默认' },
				{ type: [new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3)], state: false, mode: '单个时间' },
				{
					type: [
						new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1),
						new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 4)
					],
					state: false,
					mode: '多个时间'
				}
			],
			selectDefault: null,
			minDateType: [
				{ type: new Date(), state: true, mode: '默认' },
				{ type: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1), state: true, mode: '昨天' }
			],
			selectMinDate: new Date(),
			maxDateType: [
				{ type: new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate()), state: true, mode: '默认' },
				{ type: new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()), state: true, mode: '明年此时' }
			],
			selectMaxDate: new Date(),
			promptType: [{ type: false, mode: '否' }, { type: true, mode: '是' }],
			selectPrompt: false,
			confirmType: [{ type: true, mode: '是' }, { type: false, mode: '否' }],
			selectConfirm: true,
			weekType: [
				{ type: 0, mode: '日' },
				{ type: 1, mode: '一' },
				{ type: 2, mode: '二' },
				{ type: 3, mode: '三' },
				{ type: 4, mode: '四' },
				{ type: 5, mode: '五' },
				{ type: 6, mode: '六' }
			],
			selectWeek: 0,
			safeAreaType: [{ type: true, mode: '是' }, { type: false, mode: '否' }],
			selectSafeArea: true,
			btnTextType: ['确定', '选择'],
			selectBtnText: '确定',
			btnStyleType: [
				{ type: {}, state: true, mode: '无' },
				{ type: { color: 'white', height: '80rpx', background: '#FF6027', borderRadius: '8rpx', fontSize: '28rpx' }, state: false, mode: '自定义按钮样式' }
			],
			selectBtnStyle: {},
			roundType: [{ type: 18, mode: '默认' }, { type: 0, mode: '无圆角' }],
			selectRound: 18,
			minDate: new Date(),
			maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate()),
			chooseDate: '',
			maxRange: '',
			allowSameDay: true
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
				this.$refs[this.selectCalendare + 'Calender'].close();
			} else {
				this.$refs[this.selectCalendare + 'Calender'].open();
			}
		},
		calendarChange(e) {
			this.chooseDate = e.map(el => this.$u.cUtil.dateFormate(el, 'yyyy-MM-dd'));
			this.$refs[this.selectCalendare + 'Calender'].close();
		},
		/**
		 * 选择日历类型
		 */
		chooseCalendar(type) {
			this.selectCalendare = type;
		},
		/**
		 * @param {Object} type
		 * 选择弹出方向
		 */
		choosePostion(type) {
			this.selectPostion = type;
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
		 * 开始日期和结束日期是否可以使同一天
		 */
		chooseSame(type) {
			this.selectSame = type;
		},
		/**
		 * @param {Object} type
		 * 日期范围的最大跨度
		 */
		chooseRange(type) {
			this.selectRange = type;
		},
		/**
		 * @param {Object} type
		 * 超过所选日期范围是否会提示
		 */
		choosePrompt(type) {
			this.selectPrompt = type;
		},
		/**
		 * @param {Object} type
		 * 默认选中日期
		 */
		chooseDefault(item) {
			let info = this.defaultType.filter(el => el.state);
			this.$set(info[0], 'state', false);
			this.$set(item, 'state', true);
			this.selectDefault = item.type;
		},
		/**
		 * @param {Object} type
		 * 最小日期
		 */
		chooseMinDate(item) {
			let info = this.minDateType.filter(el => el.state);
			this.$set(info[0], 'state', false);
			this.$set(item, 'state', true);
			this.selectMinDate = item.type;
		},
		/**
		 * @param {Object} type
		 * 最大日起日期
		 */
		chooseMaxDate(item) {
			let info = this.maxDateType.filter(el => el.state);
			this.$set(info[0], 'state', false);
			this.$set(item, 'state', true);
			this.selectMaxDate = item.type;
		},
		/**
		 * @param {Object} type
		 * 是否展示确认按钮
		 */
		chooseConfirm(type) {
			this.selectConfirm = type;
		},
		/**
		 * @param {Object} type
		 * 第一列显示周几
		 */
		chooseWeek(type) {
			this.selectWeek = type;
		},
		/**
		 * @param {Object} type
		 * 是否适配ios底部安全区域
		 */
		chooseSafeArea(type) {
			this.selectSafeArea = type;
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
	padding: 30rpx;
	.result-div {
		background-color: #f7f9fb;
		border: 1rpx dotted #eeeeee;
		border-radius: 16rpx;
		padding: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		.headline {
			font-size: 30rpx;
			color: #333333;
			font-weight: bold;
		}
		.result-content {
			font-size: 28rpx;
			color: #333333;
		}
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
