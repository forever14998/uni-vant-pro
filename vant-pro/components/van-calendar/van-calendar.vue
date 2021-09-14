<template>
	<view>
		<van-popup v-model="value" :position="position" :closeable="true" :round="round" :close-on-click-overlay="closeOnClick" :safe-area-inset-bottom="safeAreaInsetBottom" @close="close()">
			<view class="van-calendar">
				<view class="van-calendar__header__border">
					<view class="van-calendar_top_headline" :style="[headerStyle]">
						<view class="van-calendar_top_title">{{ headerTitle }}</view>
						<!-- <view class="iconfont icon-fork van-calendar_top_close" @click="close()"></view> -->
					</view>

					<view class="van-calendar__weekdays">
						<view v-for="(weekdaysItem, weekdaysIndex) in weekdays" :key="weekdaysIndex" class="van-calendar__weekday">{{ weekdaysItem }}</view>
					</view>
				</view>

				<scroll-view scroll-y="true" :scroll-into-view="scrollIntoView">
					<view :id="`month${allDayIndex}`" v-for="(allDayItem, allDayIndex) in allDayList" :key="allDayIndex">
						<view class="van-calendar__month">
							<view class="van-calendar__month-title">{{ formatMonthTitle(allDayItem) }}</view>

							<view class="van-calendar__days">
								<view class="van-calendar__month-mark">{{ getMark(allDayItem) }}</view>

								<view
									:style="[getDayStyle(daysItem.type, daysIndex, allDayItem)]"
									v-for="(daysItem, daysIndex) in getDays(allDayItem)"
									:key="daysIndex"
									@click="[onClickDay(daysItem)]"
									class="van-calendar__day"
									:class="'van-calendar__day--' + daysItem.type"
								>
									<view v-if="daysItem.type === 'selected'" class="van-calendar__selected-day" :style="{ 'background-color': color }">
										<view v-if="daysItem.topInfo" class="van-calendar__top-info">{{ daysItem.topInfo }}</view>
										{{ daysItem.text }}
										<view v-if="daysItem.bottomInfo" class="van-calendar__bottom-info">{{ daysItem.bottomInfo }}</view>
									</view>

									<view v-else>
										<view v-if="daysItem.topInfo" class="van-calendar__top-info">{{ daysItem.topInfo }}</view>
										{{ daysItem.text }}
										<view v-if="daysItem.bottomInfo" class="van-calendar__bottom-info">{{ daysItem.bottomInfo }}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				
				<view class="van-calendar__footer " :class="safeAreaInsetBottom ? 'safe-area-inset-bottom' : ''" @click="onConfirm()" v-if="type === 'multiple' || showConfirm">
					<van-button
						round
						block
						size="large"
						type="primary"
						:style="[buttonStyle]"
						:disabled="getButtonDisabled(type, currentDate)"
						nativeType="text"
						@click="onConfirm"
					>
						{{ buttonText }}
					</van-button>
				</view>
			</view>
		</van-popup>
	</view>
</template>

<script>
/**
 * @property {String} type 选择类型 single|multiple|range
 * @property {String} header-title 组件标题
 * @property {String} color 选中日期以及组件按钮颜色
 * @property {Boolean} close-on-click 是否允许点击遮罩层关闭
 * @property {Date} min-date 可选择的最小日期，默认是当前日期
 * @property {Date} max-date 可选择的最大日期，默认是距离今天6个月后的日期
 * @property {Date | Date[] | null} default-date 默认选中的日期
 * @property {(day: Day) => Day} formatter 日期格式化函数
 * @property {Boolean} allow-same-day 是否允许开始日期和结束日期是同一天（只在type是range时有效）
 * @property {Number| String} max-range 可选日期的最大跨度（只在type是range时有效）
 * @property {Boolean} show-range-prompt 当选择范围超过跨度时是否弹出提示(只在type是range时有效)
 * @property {Boolean} show-onfirm 是否展示确认按钮（只在type是range|single时有效）
 * @property {Boolean} round 圆角
 * @property {Boolean} safe-area-inset-bottom 是否需要适配ios底部安全区域
 * @property {String} button-text 按钮文案
 * @property {Object} button-all-style 自定义按钮样式
 * @property {Number} first-day-of-week 设置周起始日
 * @event {Function} open 弹出层打开
 * @event {Function} close 弹出层收起
 */
import Vue from 'vue';
export default {
	props: {
		// 是否显示组件
		value: {
			type: Boolean,
			default: false
		},
		/**
		 * single表示选择单个日期，
		 * multiple表示选择多个日期，
		 * range表示选择日期区间
		 */
		type: {
			type: String,
			default: 'single'
		},
		// 组件标题
		headerTitle: {
			type: String,
			default: '选择日期'
		},
		// 选中日期以及组件按钮颜色
		color: {
			type: String,
			default: ''
		},
		// 是否允许点击遮罩层关闭
		closeOnClick: {
			type: Boolean,
			default: true
		},
		// 可选择的最小日期，默认是当前日期
		minDate: {
			type: null,
			default: () => new Date().getTime()
		},
		// 可选择的最大日期，默认是距离今天6个月后的日期
		maxDate: {
			type: null,
			default: () => new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate()).getTime()
		},
		// 默认选中日期
		defaultDate: {
			type: null
		},
		// 日期格式化函数
		formatter: {
			observer: 'setDays'
		},
		//  是否允许开始日期和结束日期是同一天（只在type是range时有效）
		allowSameDay: {
			type: Boolean,
			default: false
		},
		// 可选日期的最大跨度（只在type是range时有效）
		maxRange: {
			type: [Number, String],
			default: null
		},
		// 当选择范围超过跨度时是否弹出提示(只在type是range时有效)
		showRangePrompt: {
			type: Boolean,
			default: true
		},
		// 是否展示确认按钮。（只在type是range|single时有效）
		showConfirm: {
			type: Boolean,
			default: true
		},
		// 圆角，组件圆角
		round: {
			type: Boolean,
			default: false
		},
		// 是否需要适配ios底部安全区域
		safeAreaInsetBottom: {
			type: Boolean,
			default: true
		},
		// 按钮文案
		buttonText: {
			type: String,
			default: '确定'
		},
		// 自定义按钮样式
		buttonAllStyle: {
			type: Object,
			default: () => ({})
		},
		// 设置周起始日
		firstDayOfWeek: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			currentDate: null,
			allDayList: [],
			subtitle: '',
			weekdays: [],
			defaultButtonStyle: {
				height: '70rpx',
				borderRadius: '40rpx'
			},
			position: 'bottom',
			scrollIntoView: ''
		};
	},
	watch: {
		value: function(val) {
			if (val) {
				this.scrollToView();
			}
		},
		defaultDate: function(val) {
			this.scrollToView();
			this.currentDate = val;
		}
	},
	mounted() {
		this.open();
		this.defaultDate && this.scrollToView();
	},
	computed: {
		getDaysByComputed(item) {
			return this.getDays(item);
		},
		// 日期标题
		headerStyle() {
			let headerStyle = {};
			headerStyle = {
				'line-height': '120rpx'
			};
			return headerStyle;
		},
		// 按钮自定义class
		buttonStyle() {
			return { ...this.defaultButtonStyle, backgroundColor: this.color, ...this.buttonAllStyle };
		}
	},
	methods: {
		scrollToView() {
			setTimeout(() => {
				const targetDate = this.type === 'single' ? this.currentDate : this.currentDate[0];
				const displayed = this.value;
				if (!targetDate || !this.value) {
					return;
				}
				const months = this.$u.cUtil.getMonths(this.minDate, this.maxDate);
				months.some((month, index) => {
					if (this.$u.cUtil.compareMonth(month, targetDate) === 0) {
						this.scrollIntoView = `month${index}`;
						return true;
					}
					return false;
				});
			}, 200);
		},
		open() {
			this.initCalender();
		},
		close() {
			this.$emit('close');
		},
		initCalender() {
			this.initWeekDay();
			this.currentDate = this.getInitialDate();
			this.allDayList = this.$u.cUtil.getMonths(this.minDate, this.maxDate);
		},
		formatMonthTitle(date) {
			if (!(date instanceof Date)) {
				date = new Date(date);
			}
			return `${date.getFullYear()}年${date.getMonth() + 1}月`;
		},
		getDayStyle(type, index, date) {
			var style = {};
			var current = new Date(date).getDay() || 7;
			var offset = current < this.firstDayOfWeek ? 7 - this.firstDayOfWeek + current : current === 7 && this.firstDayOfWeek === 0 ? 0 : current - this.firstDayOfWeek;

			if (index === 0) {
				style.marginLeft = (100 * offset) / 7 + '%';
			}
			if (this.color) {
				if (type === 'start' || type === 'end' || type === 'start-end' || type === 'multiple-selected' || type === 'multiple-middle') {
					style.background = this.color;
				} else if (type === 'middle') {
					style.color = this.color;
				}
			}
			return style;
		},
		getDays(date) {
			const days = [];
			const startDate = new Date(date);
			const year = startDate.getFullYear();
			const month = startDate.getMonth();
			const totalDay = this.$u.cUtil.getMonthEndDay(startDate.getFullYear(), startDate.getMonth() + 1);
			for (let day = 1; day <= totalDay; day++) {
				const date = new Date(year, month, day);
				const type = this.getDayType(date);
				let config = {
					date,
					type,
					text: day,
					bottomInfo: this.getBottomInfo(type)
				};
				if (this.formatter) {
					config = this.formatter(config);
				}
				days.push(config);
			}
			return days;
		},
		getBottomInfo(type) {
			if (this.type === 'range') {
				if (type === 'start') {
					return '开始';
				}
				if (type === 'end') {
					return '结束';
				}
				if (type === 'start-end') {
					return '开始/结束';
				}
			}
		},

		getMultipleDayType(day) {
			if (!Array.isArray(this.currentDate)) {
				return '';
			}

			const isSelected = date => this.currentDate.some(item => this.$u.cUtil.compareDay(item, date) === 0);
			if (isSelected(day)) {
				const prevDay = this.$u.cUtil.getPrevDay(day);
				const nextDay = this.$u.cUtil.getNextDay(day);
				const prevSelected = isSelected(prevDay);
				const nextSelected = isSelected(nextDay);
				if (prevSelected && nextSelected) {
					return 'multiple-middle';
				}
				if (prevSelected) {
					return 'end';
				}
				return nextSelected ? 'start' : 'multiple-selected';
			}

			return '';
		},
		getDayType(day) {
			if (this.$u.cUtil.compareDay(day, this.minDate) < 0 || this.$u.cUtil.compareDay(day, this.maxDate) > 0) {
				return 'disabled';
			}
			if (this.type === 'single' && this.currentDate) {
				return this.$u.cUtil.compareDay(day, this.currentDate) === 0 ? 'selected' : '';
			}
			if (this.type === 'multiple') {
				return this.getMultipleDayType(day);
			}
			if (this.type === 'range') {
				return this.getRangeDayType(day);
			}
			return '';
		},
		getRangeDayType(day) {
			if (!Array.isArray(this.currentDate)) {
				return '';
			}
			const [startDay, endDay] = this.currentDate;
			if (!startDay) {
				return '';
			}
			const compareToStart = this.$u.cUtil.compareDay(day, startDay);
			if (!endDay) {
				return compareToStart === 0 ? 'start' : '';
			}
			const compareToEnd = this.$u.cUtil.compareDay(day, endDay);
			if (compareToStart === 0 && compareToEnd === 0 && this.allowSameDay) {
				return 'start-end';
			}
			if (compareToStart === 0) {
				return 'start';
			}
			if (compareToEnd === 0) {
				return 'end';
			}
			if (compareToStart > 0 && compareToEnd < 0) {
				return 'middle';
			}
			return '';
		},

		getMark(date) {
			return new Date(date).getMonth() + 1;
		},
		/**
		 * 初始化天数
		 */
		initWeekDay() {
			const defaultWeeks = ['日', '一', '二', '三', '四', '五', '六'];
			const firstDayOfWeek = this.firstDayOfWeek || 0;

			this.weekdays = [...defaultWeeks.slice(firstDayOfWeek, 7), ...defaultWeeks.slice(0, firstDayOfWeek)];
		},
		unselect(dateArray) {
			const date = dateArray[0];
			if (date) {
				this.$emit('unselect', this.$u.cUtil.copyDates(date));
			}
		},
		checkRange(date) {
			if (this.maxRange && this.$u.cUtil.calcDateNum(date) > this.maxRange) {
				if (this.showRangePrompt) {
					let that = this;
					uni.showToast({
						title: `选择天数不能超过 ${that.maxRange} 天`,
						icon: 'none'
					});
					return false;
				}
				this.$emit('over-range');
				return false;
			}
			return true;
		},
		emit(date) {
			const getTime = date => (date instanceof Date ? new Date(date) : date);
			this.currentDate = Array.isArray(date) ? date.map(getTime) : getTime(date);
			this.$emit('select', this.$u.cUtil.copyDates(date));
		},
		select(date, complete) {
			if (complete && this.type === 'range') {
				const valid = this.checkRange(date);
				if (!valid) {
					if (this.showConfirm) {
						this.emit([date[0], this.$u.cUtil.getDayByOffset(date[0], this.maxRange - 1)]);
					} else {
						this.emit(date);
					}
					return;
				}
			}
			this.emit(date);
			if (complete && !this.showConfirm) {
				this.onConfirm();
			}
		},
		onConfirm() {
			if (this.type === 'range') {
				let rangeDateList = this.currentDate.filter(el => !this.$u.utils.isEmpty(el));
				if (this.$u.utils.isEmpty(this.currentDate[0])) {
					uni.showToast({
						title: `请选择开始日期`,
						icon: 'none'
					});
					return;
				} else if (this.$u.utils.isEmpty(this.currentDate[1])) {
					uni.showToast({
						title: `请选择结束日期`,
						icon: 'none'
					});
					return;
				} else if (!this.checkRange(this.currentDate)) {
					return;
				}
			}
			this.$emit('confirm', this.getSelectDateResult());
		},
		getSelectDateResult() {
			if (this.type === 'single') {
				let result = [];
				result.push(this.$u.cUtil.getPrevDay(this.$u.cUtil.copyDates(this.currentDate)));
				return result;
			}
			return this.$u.cUtil.copyDates(this.currentDate);
		},
		onClickDay(item) {
			// #ifdef MP-WEIXIN
			// item = item.$orig;
			// #endif

			if (item.type === 'disabled') return;

			if (this.type === 'range') {
				const [startDay, endDay] = this.currentDate;
				if (startDay && !endDay) {
					const compareToStart = this.$u.cUtil.compareDay(item.date, startDay);
					if (compareToStart === 1) {
						this.select([startDay, item.date], true);
					} else if (compareToStart === -1) {
						this.select([item.date, null]);
					} else if (this.allowSameDay) {
						this.select([item.date, item.date]);
					}
				} else {
					this.select([item.date, null]);
				}
			} else if (this.type === 'multiple') {
				let selectedIndex;
				const selected = this.currentDate.some((dateItem, index) => {
					const equal = this.$u.cUtil.compareDay(dateItem, item.date) === 0;
					if (equal) {
						selectedIndex = index;
					}
					return equal;
				});

				if (selected) {
					const cancelDate = this.currentDate.splice(selectedIndex, 1);
					this.unselect(cancelDate);
				} else {
					this.select([...this.currentDate, item.date]);
				}
			} else {
				this.select(item.date, true);
			}
		},
		getInitialDate() {
			if (this.type === 'range') {
				const [startDay, endDay] = this.defaultDate || [];
				return [startDay || this.minDate, endDay || this.$u.cUtil.getNextDay(new Date(this.minDate)).getTime()];
			}
			if (this.type === 'multiple') {
				return this.defaultDate || [this.minDate];
			}

			return this.defaultDate || this.minDate;
		},
		getButtonDisabled(type, currentDate) {
		  if (this.currentDate == null) {
		    return true;
		  }
		
		  if (this.type === 'range') {
		    return !currentDate[0] || !currentDate[1];
		  }
		
		  if (this.type === 'multiple') {
		    return !currentDate.length;
		  }
		
		  return !this.currentDate;
		}
	}
	// created() {
	// 	this.initCalender();
	// }
};
</script>

<style lang="scss">
scroll-view {
	height: 900rpx;
}
.van-calendar__header__border {
	box-shadow: $calendar-header-box-shadow;
}
.van-calendar_top_headline {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
}

.van-calendar__footer {
  flex-shrink: 0;
  padding: $padding-md
}


.van-calendar__weekdays {
	display: flex;
}

.van-calendar__weekday {
	flex: 1;
	text-align: center;
	font-size: $calendar-weekdays-font-size;
	line-height: $calendar-weekdays-height;
}

.van-calendar__header-title {
	text-align: center;
	height: $calendar-header-title-height;
	font-weight: $font-weight-bold;
	line-height: $calendar-header-title-height;
}

.van-calendar {
	display: -webkit-flex;
	display: flex;
	-webkit-flex-direction: column;
	flex-direction: column;
	height: 100%;
	background-color: $calendar-background-color;
}

.van-calendar__month-title {
	text-align: center;
	height: $calendar-header-title-height;
	font-weight: $font-weight-bold;
	font-size: $calendar-month-title-font-size;
	line-height: $calendar-header-title-height;
}

.van-calendar__days {
	position: relative;
	display: -webkit-flex;
	display: flex;
	-webkit-flex-wrap: wrap;
	flex-wrap: wrap;
	-webkit-user-select: none;
	user-select: none;
}

.van-calendar__month-mark {
	position: absolute;
	top: 50%;
	left: 50%;
	z-index: 0;
	transform: translate(-50%, -50%);
	pointer-events: none;
	color: $calendar-month-mark-color;
	font-size: $calendar-month-mark-font-size;
}

.van-calendar__day,
.van-calendar__selected-day {
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
}

.van-calendar__day {
	position: relative;
	width: 14.285%;
	height: $calendar-day-height;
	font-size: $calendar-day-font-size;
}

.van-calendar__day--end,
.van-calendar__day--multiple-middle,
.van-calendar__day--multiple-selected,
.van-calendar__day--start,
.van-calendar__day--start-end {
	color: $calendar-range-edge-color;
	background-color: $calendar-range-edge-background-color;
}

.van-calendar__day--start {
	border-radius: $border-radius-md 0 0 $border-radius-md;
}

.van-calendar__day--end {
	border-radius: 0 $border-radius-md $border-radius-md 0;
}

.van-calendar__day--multiple-selected,
.van-calendar__day--start-end {
	border-radius: $border-radius-md;
}

.van-calendar__day--middle {
	color: $calendar-range-middle-color;
}

.van-calendar__day--middle:after {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: currentColor;
	content: '';
	opacity: $calendar-range-middle-background-opacity;
}

.van-calendar__day--disabled {
	cursor: default;
	color: $calendar-day-disabled-color;
}

.van-calendar__bottom-info,
.van-calendar__top-info {
	position: absolute;
	right: 0;
	left: 0;
	font-size: $calendar-info-font-size;
	line-height: $calendar-info-line-height;
}

@media (max-width: 350px) {
	.van-calendar__bottom-info,
	.van-calendar__top-info {
		font-size: 18rpx;
	}
}

.van-calendar__top-info {
	top: 12rpx;
}

.van-calendar__bottom-info {
	bottom: 12rpx;
}

.van-calendar__selected-day {
	width: $calendar-selected-day-size;
	height: $calendar-selected-day-size;
	color: $calendar-selected-day-color;
	background-color: $calendar-selected-day-background-color;
	border-radius: $border-radius-md;
}
.d-flex {
	display: flex;
}
</style>
