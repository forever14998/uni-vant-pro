<template>
	<van-picker
		ref="vanDatetimePicker"
		active-class="active-class"
		toolbar-class="toolbar-class"
		column-class="column-class"
		:title="title"
		:columns="columns"
		:loading="loading"
		:item-height="itemHeight"
		:show-toolbar="showToolbar"
		:visible-item-count="visibleItemCount"
		:confirm-button-text="confirmButtonText"
		:cancel-button-text="cancelButtonText"
		@change="onChange"
		@confirm="onConfirm"
		@cancel="onCancel"
	/>
</template>

<script>
/**
 * @property {String | Number} value 当前选中值
 * @property {Boolean} show-toolbar 是否显示顶部栏
 * @property {String} type 类型，可选值为 datetime | date | time | year-month不建议动态修改
 * @property {(type, values) => values} filter 选项过滤函数
 * @property {(type, value) => value} formatter 选项格式化函数
 * @property {Number} min-date 可选的最小时间，精确到分钟	
 * @property {Number} max-date 可选的最大时间，精确到分钟
 * @property {Number} min-hour 可选的最小小时，针对 time 类型
 * @property {Number} max-hour 可选的最大小时，针对 time 类型
 * @property {Number} min-minute 可选的最小分钟，针对 time 类型
 * @property {Number} max-minute 可选的最大分钟，针对 time 类型
 * @property {Number} item-height 选项高度
 * @property {Boolean} loading 是否显示加载状态
 * @property {String} confirm-button-text 确认按钮文字	
 * @property {String} cancel-button-text 取消按钮文字	
 * @property {Number} visible-item-count 可见选项个数	
 * @event {Function} confirm 点击完成按钮时触发
 * @event {Function} cancel 点击取消按钮时触发
 * @event {Function} change 选项改变时触发
 */
import { pickerProps } from '../../libs/js/van-picker/shared.js';
const __spreadArray =
	(this && this.__spreadArray) ||
	function(to, from) {
		for (let i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];
		return to;
	};
Object.defineProperty(exports, '__esModule', { value: true });
const currentYear = new Date().getFullYear();
function range(num, min, max) {
	return Math.min(Math.max(num, min), max);
}
function padZero(val) {
	return ('00' + val).slice(-2);
}
function times(n, iteratee) {
	let index = -1;
	let result = Array(n < 0 ? 0 : n);
	while (++index < n) {
		result[index] = iteratee(index);
	}
	return result;
}
function getTrueValue(formattedValue) {
	if (formattedValue === undefined) {
		formattedValue = '1';
	}
	while (isNaN(parseInt(formattedValue, 10))) {
		formattedValue = formattedValue.slice(1);
	}
	return parseInt(formattedValue, 10);
}
function getMonthEndDay(year, month) {
	return 32 - new Date(year, month - 1, 32).getDate();
}
const defaultFormatter = function(type, value) {
	return value;
};
export default {
	props: Object.assign(Object.assign({}, pickerProps), {
		value: {
			type: Number | String
		},
		filter: null,
		type: {
			type: String,
			default: 'datetime'
		},
		showToolbar: {
			type: Boolean,
			default: true
		},
		formatter: {
			type: null,
			default: defaultFormatter
		},
		minDate: {
			type: Number,
			default: new Date(currentYear - 10, 0, 1).getTime()
		},
		maxDate: {
			type: Number,
			default: new Date(currentYear + 10, 12, 31).getTime()
		},
		minHour: {
			type: Number,
			default: 0
		},
		maxHour: {
			type: Number,
			default: 23
		},
		minMinute: {
			type: Number,
			default: 0
		},
		maxMinute: {
			type: Number,
			default: 59
		}
	}),
	data() {
		return {
			innerValue: new Date().getTime(),
			columns: []
		};
	},
	computed: {
		effectValue() {
			if (this.value) {
				return this.value
			} else if (this.type === 'time') {
				let date = new Date()
				return date.getHours() + ':' + date.getMinutes()
			}
			return new Date().getTime();
		}
	},
	watch: {
		value() {
			this.updateValue();
		},
		type() {
			this.updateValue();
		},
		minDate() {
			this.updateValue();
		},
		maxDate() {
			this.updateValue();
		},
		minHour() {
			this.updateValue();
		},
		maxHour() {
			this.updateValue();
		},
		minMinute() {
			this.updateValue();
		},
		maxMinute() {
			this.updateValue();
		}
	},
	methods: {
		updateValue() {
			let val = this.correctValue(this.effectValue);
			let isEqual = val === this.innerValue;
			this.updateColumnValue(val).then(() => {
				if (!isEqual) {
					this.$emit('input', val);
				}
			});
		},
		getPicker() {
			if (this.picker == null) {
				this.picker = this.$refs.vanDatetimePicker || {};
				let picker_1 = this.picker;
				let setColumnValues_1 = picker_1.setColumnValues;
				picker_1.setColumnValues = function() {
					let args = [];
					for (let _i = 0; _i < arguments.length; _i++) {
						args[_i] = arguments[_i];
					}
					return setColumnValues_1.apply(picker_1, __spreadArray(__spreadArray([], args), [false]));
				};
			}
			return this.picker;
		},
		async updateColumns() {
			let _a = this.formatter;
			let formatter = _a ? _a : defaultFormatter;
			let results = this.getOriginColumns().map(function(column) {
				return {
					values: column.values.map(function(value) {
						return formatter(column.type, value);
					})
				};
			});
			return (this.columns = results);
		},
		getOriginColumns() {
			let filter = this.filter;
			let results = this.getRanges().map(function(_a) {
				let type = _a.type,
					range = _a.range;
				let values = times(range[1] - range[0] + 1, function(index) {
					let value = range[0] + index;
					return type === 'year' ? '' + value : padZero(value);
				});
				if (filter) {
					values = filter(type, values);
				}
				return { type: type, values: values };
			});
			return results;
		},
		getRanges() {
			if (this.type === 'time') {
				return [
					{
						type: 'hour',
						range: [this.minHour, this.maxHour]
					},
					{
						type: 'minute',
						range: [this.minMinute, this.maxMinute]
					}
				];
			}
			let _a = this.getBoundary('max', this.innerValue),
				maxYear = _a.maxYear,
				maxDate = _a.maxDate,
				maxMonth = _a.maxMonth,
				maxHour = _a.maxHour,
				maxMinute = _a.maxMinute;
			let _b = this.getBoundary('min', this.innerValue),
				minYear = _b.minYear,
				minDate = _b.minDate,
				minMonth = _b.minMonth,
				minHour = _b.minHour,
				minMinute = _b.minMinute;
			let result = [
				{
					type: 'year',
					range: [minYear, maxYear]
				},
				{
					type: 'month',
					range: [minMonth, maxMonth]
				},
				{
					type: 'day',
					range: [minDate, maxDate]
				},
				{
					type: 'hour',
					range: [minHour, maxHour]
				},
				{
					type: 'minute',
					range: [minMinute, maxMinute]
				}
			];
			if (this.type === 'date') result.splice(3, 2);
			if (this.type === 'year-month') result.splice(2, 3);
			return result;
		},
		isValidDate(date) {
			return this.$u.validator.isDef(date) && !isNaN(new Date(date).getTime());
		},
		correctValue(value) {
			// validate value
			let isDateType = this.type !== 'time';
			if (isDateType && !this.isValidDate(value)) {
				value = this.minDate;
			} else if (!isDateType && !value) {
				let minHour = this.minHour;
				value = padZero(minHour) + ':00';
			}
			// time type
			if (!isDateType) {
				let _a = value.split(':'),
					hour = _a[0],
					minute = _a[1];
				hour = padZero(range(hour, this.minHour, this.maxHour));
				minute = padZero(range(minute, this.minMinute, this.maxMinute));
				return hour + ':' + minute;
			}
			// date type
			value = Math.max(value, this.minDate);
			value = Math.min(value, this.maxDate);
			return value;
		},
		getBoundary(type, innerValue) {
			let _a;
			let value = new Date(innerValue);
			let boundary = new Date(this[type + 'Date']);
			let year = boundary.getFullYear();
			let month = 1;
			let date = 1;
			let hour = 0;
			let minute = 0;
			if (type === 'max') {
				month = 12;
				date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
				hour = 23;
				minute = 59;
			}
			if (value.getFullYear() === year) {
				month = boundary.getMonth() + 1;
				if (value.getMonth() + 1 === month) {
					date = boundary.getDate();
					if (value.getDate() === date) {
						hour = boundary.getHours();
						if (value.getHours() === hour) {
							minute = boundary.getMinutes();
						}
					}
				}
			}
			return (_a = {}), (_a[type + 'Year'] = year), (_a[type + 'Month'] = month), (_a[type + 'Date'] = date), (_a[type + 'Hour'] = hour), (_a[type + 'Minute'] = minute), _a;
		},
		onCancel() {
			this.$emit('cancel');
		},
		onConfirm() {
			this.$emit('confirm', this.innerValue);
		},
		onChange() {
			let value;
			let picker = this.getPicker();
			let originColumns = this.getOriginColumns();
			if (picker && picker.getIndexes) {
				if (this.type === 'time') {
					let indexes = picker.getIndexes();
					value = +originColumns[0].values[indexes[0]] + ':' + +originColumns[1].values[indexes[1]];
				} else {
					let indexes = picker.getIndexes();
					let values = indexes.map(function(value, index) {
						return originColumns[index].values[value];
					});
					let year = getTrueValue(values[0]);
					let month = getTrueValue(values[1]);
					let maxDate = getMonthEndDay(year, month);
					let date = getTrueValue(values[2]);
					if (this.type === 'year-month') {
						date = 1;
					}
					date = date > maxDate ? maxDate : date;
					let hour = 0;
					let minute = 0;
					if (this.type === 'datetime') {
						hour = getTrueValue(values[3]);
						minute = getTrueValue(values[4]);
					}
					value = new Date(year, month - 1, date, hour, minute);
				}
			}
			value = this.correctValue(value);
			this.updateColumnValue(value).then(() => {
				this.$emit('input', value);
				this.$emit('change', picker);
			});
		},
		async updateColumnValue(value) {
			let values = [];
			let type = this.type;
			let formatter = this.formatter || defaultFormatter;
			let picker = this.getPicker();
			if (type === 'time') {
				let pair = value.split(':');
				values = [formatter('hour', pair[0]), formatter('minute', pair[1])];
			} else {
				let date = new Date(value);
				values = [formatter('year', '' + date.getFullYear()), formatter('month', padZero(date.getMonth() + 1))];
				if (type === 'date') {
					values.push(formatter('day', padZero(date.getDate())));
				}
				if (type === 'datetime') {
					values.push(formatter('day', padZero(date.getDate())), formatter('hour', padZero(date.getHours())), formatter('minute', padZero(date.getMinutes())));
				}
			}
			this.innerValue = value;
			this.updateColumns().then(() => {
				picker.setValues(values);
			});
		}
	},
	mounted() {
		let innerValue = this.correctValue(this.effectValue);
		this.updateColumnValue(innerValue);
		this.$emit('input', innerValue);
	}
};
</script>

<style></style>
