<template>
	<van-picker
		ref="vanDatetimePicker"
		active-class="active-class"
		toolbar-class="toolbar-class"
		column-class="column-class"
		:title="title"
		:columns="columns"
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
import { pickerProps } from '../../libs/js/van-picker/shared.js';
var __assign =
	(this && this.__assign) ||
	function() {
		__assign =
			Object.assign ||
			function(t) {
				for (var s, i = 1, n = arguments.length; i < n; i++) {
					s = arguments[i];
					for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
				}
				return t;
			};
		return __assign.apply(this, arguments);
	};
var __spreadArray =
	(this && this.__spreadArray) ||
	function(to, from) {
		for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];
		return to;
	};
Object.defineProperty(exports, '__esModule', { value: true });
var currentYear = new Date().getFullYear();
function range(num, min, max) {
	return Math.min(Math.max(num, min), max);
}
function padZero(val) {
	return ('00' + val).slice(-2);
}
function times(n, iteratee) {
	var index = -1;
	var result = Array(n < 0 ? 0 : n);
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
var defaultFormatter = function(type, value) {
	return value;
};
export default {
	classes: ['active-class', 'toolbar-class', 'column-class'],
	props: __assign(__assign({}, pickerProps), {
		value: {
			type: null
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
			default: new Date(currentYear + 10, 11, 31).getTime()
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
			innerValue: Date.now(),
			columns: []
		};
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
		updateValue: function() {
			var _this = this;
			var val = this.correctValue(this.value);
			var isEqual = val === this.innerValue;
			this.updateColumnValue(val).then(function() {
				if (!isEqual) {
					_this.$emit('input', val);
				}
			});
		},
		getPicker: function() {
			if (this.picker == null) {
				console.log(this.$refs.vanDatetimePicker)
				this.picker = this.selectComponent('.van-datetime-picker') || {};
				var picker_1 = this.picker;
				var setColumnValues_1 = picker_1.setColumnValues;
				picker_1.setColumnValues = function() {
					var args = [];
					for (var _i = 0; _i < arguments.length; _i++) {
						args[_i] = arguments[_i];
					}
					return setColumnValues_1.apply(picker_1, __spreadArray(__spreadArray([], args), [false]));
				};
			}
			return this.picker;
		},
		updateColumns: function() {
			var _a = this.formatter,
				formatter = _a === void 0 ? defaultFormatter : _a;
			var results = this.getOriginColumns().map(function(column) {
				return {
					values: column.values.map(function(value) {
						return formatter(column.type, value);
					})
				};
			});
			return this.columns = results;
		},
		getOriginColumns: function() {
			var filter = this.filter;
			var results = this.getRanges().map(function(_a) {
				var type = _a.type,
					range = _a.range;
				var values = times(range[1] - range[0] + 1, function(index) {
					var value = range[0] + index;
					return type === 'year' ? '' + value : padZero(value);
				});
				if (filter) {
					values = filter(type, values);
				}
				return { type: type, values: values };
			});
			return results;
		},
		getRanges: function() {
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
			var _a = this.getBoundary('max', this.innerValue),
				maxYear = _a.maxYear,
				maxDate = _a.maxDate,
				maxMonth = _a.maxMonth,
				maxHour = _a.maxHour,
				maxMinute = _a.maxMinute;
			var _b = this.getBoundary('min', this.innerValue),
				minYear = _b.minYear,
				minDate = _b.minDate,
				minMonth = _b.minMonth,
				minHour = _b.minHour,
				minMinute = _b.minMinute;
			var result = [
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
		correctValue: function(value) {
			// validate value
			var isDateType = this.type !== 'time';
			if (isDateType && !this.isValidDate(value)) {
				value = this.minDate;
			} else if (!isDateType && !value) {
				var minHour = this.minHour;
				value = padZero(minHour) + ':00';
			}
			// time type
			if (!isDateType) {
				var _a = value.split(':'),
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
		getBoundary: function(type, innerValue) {
			var _a;
			var value = new Date(innerValue);
			var boundary = new Date(this[type + 'Date']);
			var year = boundary.getFullYear();
			var month = 1;
			var date = 1;
			var hour = 0;
			var minute = 0;
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
		onCancel: function() {
			this.$emit('cancel');
		},
		onConfirm: function() {
			this.$emit('confirm', this.innerValue);
		},
		onChange: function() {
			var _this = this;
			var value;
			var picker = this.getPicker();
			var originColumns = this.getOriginColumns();
			if (this.type === 'time') {
				var indexes = picker.getIndexes();
				value = +originColumns[0].values[indexes[0]] + ':' + +originColumns[1].values[indexes[1]];
			} else {
				var indexes = picker.getIndexes();
				var values = indexes.map(function(value, index) {
					return originColumns[index].values[value];
				});
				var year = getTrueValue(values[0]);
				var month = getTrueValue(values[1]);
				var maxDate = getMonthEndDay(year, month);
				var date = getTrueValue(values[2]);
				if (this.type === 'year-month') {
					date = 1;
				}
				date = date > maxDate ? maxDate : date;
				var hour = 0;
				var minute = 0;
				if (this.type === 'datetime') {
					hour = getTrueValue(values[3]);
					minute = getTrueValue(values[4]);
				}
				value = new Date(year, month - 1, date, hour, minute);
			}
			value = this.correctValue(value);
			this.updateColumnValue(value).then(function() {
				_this.$emit('input', value);
				_this.$emit('change', picker);
			});
		},
		updateColumnValue(value) {
			var _this = this;
			var values = [];
			var type = this.type;
			var formatter = this.formatter || defaultFormatter;
			var picker = this.getPicker();
			if (type === 'time') {
				var pair = value.split(':');
				values = [formatter('hour', pair[0]), formatter('minute', pair[1])];
			} else {
				var date = new Date(value);
				values = [formatter('year', '' + date.getFullYear()), formatter('month', padZero(date.getMonth() + 1))];
				if (type === 'date') {
					values.push(formatter('day', padZero(date.getDate())));
				}
				if (type === 'datetime') {
					values.push(formatter('day', padZero(date.getDate())), formatter('hour', padZero(date.getHours())), formatter('minute', padZero(date.getMinutes())));
				}
			}
			this.innerValue = value;
			this.updateColumns();
			picker && picker.setValues&& picker.setValues(values)
		}
	},
	mounted: function() {
		var _this = this;
		var innerValue = this.correctValue(this.value);
		this.updateColumnValue(innerValue);
		_this.$emit('input', innerValue);
	}
};
</script>

<style></style>
