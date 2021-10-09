<template>
	<view class="van-picker custom-class">
		<view v-if="showToolbar" :class="{ 'van-picker__fix': toolbarPosition === 'bottom' }" class="van-picker__toolbar toolbar-class">
			<view class="van-picker__cancel" hover-class="van-picker__cancel--hover" hover-stay-time="70" data-type="cancel" @click="emit">{{ cancelButtonText }}</view>
			<view v-if="title" class="van-picker__title van-ellipsis">{{ title }}</view>
			<view class="van-picker__confirm" hover-class="van-picker__confirm--hover" hover-stay-time="70" data-type="confirm" @click="emit">{{ confirmButtonText }}</view>
		</view>
		<view v-if="loading" class="van-picker__loading"><van-loading color="#1989fa" /></view>
		<view class="van-picker__columns" :class="{ 'van-picker__margin': toolbarPosition === 'bottom' }" :style="[columnsStyle()]" @touchmove="noop">
			<van-picker-column
				class="van-picker__column"
				v-for="(item, index) in formatColumns(columns)"
				:key="index"
				:ref="`pickerColumn${index}`"
				custom-class="column-class"
				:value-key="valueKey"
				:initial-options="item.values"
				:default-index="item.defaultIndex || defaultIndex"
				:item-height="itemHeight"
				:visible-item-count="visibleItemCount"
				active-class="active-class"
				@change="onChange"
			/>
			<view class="van-picker__mask" :style="[maskStyle()]" />
			<view class="van-picker__frame van-hairline--top-bottom" :style="[frameStyle()]" />
		</view>
	</view>
</template>

<script>
/**
 * @property {Array} columns 对象数组，配置每一列显示的数据
 * @property {Boolean} show-toolbar 是否显示顶部栏
 * @property {String} toolbar-position 顶部栏位置，可选值为top | bottom
 * @property {String} title 顶部栏标题
 * @property {Boolean} loading 是否显示加载状态
 * @property {String} value-key 选项对象中，文字对应的 key
 * @property {Number} item-height 选项高度
 * @property {String} confirm-button-text 确认按钮文字
 * @property {String} cancel-button-text 取消按钮文字
 * @property {Number} visible-item-count 可见选项个数
 * @property {Number} default-index 单列选择器的默认选中项索引
 * @event {Function} confirm 点击完成按钮时触发
 * @event {Function} cancel 点击取消按钮时触发
 * @event {Function} change 选项改变时触发
 */
import { pickerProps } from '../../libs/js/van-picker/shared.js';
export default {
	props: Object.assign(Object.assign({}, pickerProps), {
		valueKey: {
			type: String,
			default: 'text'
		},
		toolbarPosition: {
			type: String,
			default: 'top'
		},
		defaultIndex: {
			type: Number,
			default: 0
		},
		columns: {
			type: Array,
			default: []
		}
	}),
	data() {
		return {
			simple: false
		};
	},
	created() {
		this.simple = this.columns.length && !this.columns[0].values;
	},
	watch: {
		columns(columns = []) {
			this.simple = columns.length && !columns[0].values;
			if (Array.isArray(this.formatColumns(this.columns)) && this.formatColumns(this.columns).length) {
				this.setColumns().catch(() => {});
			}
		}
	},
	methods: {
		noop() {},
		setColumns() {
			const columns = this.simple ? [{ values: this.columns }] : this.columns;
			const stack = columns.map((column, index) => this.setColumnValues(index, column.values));
			return Promise.all(stack);
		},
		emit(event) {
			const { type } = event.currentTarget.dataset;
			if (this.simple) {
				this.$emit(type, {
					value: this.getColumnValue(0),
					index: this.getColumnIndex(0)
				});
			} else {
				this.$emit(type, {
					value: this.getValues(),
					index: this.getIndexes()
				});
			}
		},
		onChange(event) {
			if (this.simple) {
				this.$emit('change', {
					value: this.getColumnValue(0),
					index: this.getColumnIndex(0)
				});
			} else {
				this.$emit('change', {
					value: this.getValues(),
					index: event
				});
			}
		},
		// get column instance by index
		getColumn(index) {
			let children = this.$refs[`pickerColumn${index}`];
			return children && children[0];
		},
		// get column value by index
		getColumnValue(index) {
			const column = this.getColumn(index);
			return column && column.getValue();
		},
		// set column value by index
		setColumnValue(index, value) {
			const column = this.getColumn(index);
			if (column == null) {
				return Promise.reject(()=> console.error('setColumnValue: 对应列不存在'));
			}
			return column.setValue(value);
		},
		// get column option index by column index
		getColumnIndex(columnIndex) {
			return (this.getColumn(columnIndex) || {}).currentIndex;
		},
		// set column option index by column index
		setColumnIndex(columnIndex, optionIndex) {
			const column = this.getColumn(columnIndex);
			if (column == null) {
				return Promise.reject(new Error('setColumnIndex: 对应列不存在'));
			}
			return column.setIndex(optionIndex);
		},
		// get options of column by index
		getColumnValues(index) {
			return (this.$refs[`pickerColumn${index}`][0] || {}).options;
		},
		// set options of column by index
		setColumnValues(index, options, needReset = true) {
			const column = this.$refs[`pickerColumn${index}`] && this.$refs[`pickerColumn${index}`][0];
			if (column == null) {
				return Promise.reject(new Error('setColumnValues: 对应列不存在'));
			}
			const isSame = JSON.stringify(column.options) === JSON.stringify(options);
			if (isSame) {
				return Promise.resolve();
			}
			column.options = options
			if (needReset) {
				column.setIndex(0);
			}
			// return column.set({ options }).then(() => {
				
			// });
		},
		// get values of all columns
		getValues() {
			return this.formatColumns(this.columns).map((info, index) => {
				return this.$refs[`pickerColumn${index}`][0].getValue();
			});
		},
		// set values of all columns
		setValues(values) {
			const stack = values.map((value, index) => this.setColumnValue(index, value));
			return Promise.all(stack);
		},
		// get indexes of all columns
		getIndexes() {
			return this.formatColumns(this.columns).map((info, index) => {
				return this.$refs[`pickerColumn${index}`][0].currentIndex;
			});
		},
		// set indexes of all columns
		setIndexes(indexes) {
			const stack = indexes.map((optionIndex, columnIndex) => this.setColumnIndex(columnIndex, optionIndex));
			return Promise.all(stack);
		},
		columnsStyle() {
			return this.$u.style({
				height: this.$u.addUnit(this.itemHeight * this.visibleItemCount)
			});
		},
		maskStyle() {
			return this.$u.style({
				'background-size': '100% ' + this.$u.addUnit((this.itemHeight * (this.visibleItemCount - 1)) / 2)
			});
		},
		frameStyle() {
			return this.$u.style({
				height: this.$u.addUnit(this.itemHeight)
			});
		},

		formatColumns(columns) {
			if (!this.$u.validator.isArray(columns)) {
				return [];
			}
			if (columns.length && !columns[0].values) {
				return [{ values: columns }];
			}
			return columns;
		}
	}
};
</script>

<style lang="scss" scoped>
.van-picker {
	position: relative;
	overflow: hidden;
	-webkit-text-size-adjust: 100%;
	-webkit-user-select: none;
	user-select: none;
	background-color: $picker-background-color;
	position: relative;
}
.van-picker__columns {
	position: relative;
	display: flex;
}

.van-picker__column {
	flex: 1 1;
	width: 0;
}

.van-picker__loading {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 4;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: $picker-loading-mask-color;
}

.van-picker__mask {
	top: 0;
	left: 0;
	z-index: 2;
	width: 100%;
	height: 100%;
	background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4)), linear-gradient(0deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4));
	background-repeat: no-repeat;
	background-position: top, bottom;
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
}

.van-picker__frame,
.van-picker__mask {
	position: absolute;
	pointer-events: none;
}

.van-picker__frame {
	top: 50%;
	right: 16px;
	left: 16px;
	z-index: 1;
	transform: translateY(-50%);
}

.van-picker__toolbar {
	display: flex;
	justify-content: space-between;
	height: $picker-toolbar-height;
	line-height: $picker-toolbar-height;
}

.van-picker__cancel,
.van-picker__confirm {
	padding: $picker-action-padding;
	font-size: $picker-action-font-size;
}

.van-picker__cancel--hover,
.van-picker__confirm--hover {
	opacity: 0.7;
}

.van-picker__confirm {
	color: $picker-confirm-action-color;
}

.van-picker__cancel {
	color: $picker-cancel-action-color;
}

.van-picker__title {
	max-width: 50%;
	text-align: center;
	font-weight: $font-weight-bold;
	font-size: $picker-option-font-size;
}

.van-picker__margin {
	margin-bottom: $picker-toolbar-height;
}
.van-picker__fix {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
}
</style>
