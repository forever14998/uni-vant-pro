<template>
	<view class="custom-class" :class="$u.bem('slider', { disabled })" :style="[$u.style({ background: inactiveColor, height: $u.addUnit(barHeight) })]" @click="onClick">
		<view :class="$u.bem('slider__bar')" :style="[barStyle, $u.style({ backgroundColor: activeColor })]">
			<view
				v-if="range"
				:class="$u.bem('slider__button-wrapper-left')"
				:data-index="0"
				@touchstart="onTouchStart"
				@touchmove="onTouchMove"
				@touchend="onTouchEnd"
				@touchcancel="onTouchEnd"
			>
				<slot v-if="useButtonSlot" name="left-button" />
				<view v-else :class="$u.bem('slider__button')" />
			</view>
			<view
				v-if="range"
				:class="$u.bem('slider__button-wrapper-right')"
				:data-index="1"
				@touchstart="onTouchStart"
				@touchmove="onTouchMove"
				@touchend="onTouchEnd"
				@touchcancel="onTouchEnd"
			>
				<slot v-if="useButtonSlot" name="right-button" />
				<view v-else :class="$u.bem('slider__button')" />
			</view>

			<view v-if="!range" :class="$u.bem('slider__button-wrapper')" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
				<slot v-if="useButtonSlot" name="button" />
				<view v-else :class="$u.bem('slider__button')" />
			</view>
		</view>
	</view>
</template>

<script>
import { touch } from '../../libs/minixs/touch.js';
/**
 * @property {Number|Array} value 当前进度百分比，在双滑块模式下为数组格式
 * @property {Boolean} disabled 是否禁用滑块
 * @property {Number} max 最大值
 * @property {Number} min 最小值
 * @property {Number} step 步长
 * @property {String|Number} bar-height 进度条高度，默认单位为 rpx
 * @property {String} active-color 进度条激活态颜色
 * @property {String} inactive-color 进度条默认颜色
 * @property {Boolean} use-button-slot 是否使用按钮插槽
 * @property {Boolean} range 是否开启双滑块模式
 * @event {Function} change 进度值改变后触发 event: 当前进度
 * @event {Function} drag 拖动进度条时触发 event.value: 当前进度
 * @event {Function} drag-start 开始拖动时触发
 * @event {Function} drag-end 结束拖动时触发
 */
export default {
	mixins: [touch],
	props: {
		range: Boolean,
		disabled: Boolean,
		useButtonSlot: Boolean,
		activeColor: String,
		inactiveColor: String,
		max: {
			type: Number,
			default: 100
		},
		min: {
			type: Number,
			default: 0
		},
		step: {
			type: Number,
			default: 1
		},
		value: {
			type: Number | Array,
			default: 0
		},
		barHeight: {
			type: String | Number
		}
	},
	data() {
		return {
			innerValue: 0,
			newValue: 0,
			barStyle: ''
		};
	},
	created() {
		this.innerValue = this.value;
		this.updateValue(this.innerValue);
	},
	watch: {
		value(val, oldVal) {
			if (val !== oldVal) {
				this.innerValue = val;
				this.updateValue(val);
			}
		}
	},
	methods: {
		onTouchStart(event) {
			if (this.disabled) return;
			let index = event.currentTarget.dataset.index;
			if (typeof index === 'number') {
				this.buttonIndex = index;
			}
			this.touchStart(event);
			this.startValue = this.format(this.innerValue);
			this.newValue = this.innerValue;
			if (this.isRange(this.newValue)) {
				this.startValue = this.newValue.map(val => {
					return this.format(val);
				});
			} else {
				this.startValue = this.format(this.newValue);
			}
			this.dragStatus = 'start';
		},
		onTouchMove(event) {
			if (this.disabled) return;
			if (this.dragStatus === 'start') {
				this.$emit('drag-start');
			}
			this.touchMove(event);
			this.dragStatus = 'draging';
			this.$u.utils.getRect(this, '.van-slider').then(rect => {
				let diff = (this.deltaX / rect.width) * this.getRange();
				if (this.isRange(this.startValue)) {
					this.newValue[this.buttonIndex] = this.startValue[this.buttonIndex] + diff;
				} else {
					this.newValue = this.startValue + diff;
				}
				this.updateValue(this.newValue, false, true);
			});
		},
		onTouchEnd() {
			if (this.disabled) return;
			if (this.dragStatus === 'draging') {
				this.updateValue(this.newValue, true);
				this.$emit('drag-end');
			}
		},
		onClick(event) {
			if (this.disabled) return;
			this.$u.utils.getRect(this, '.van-slider').then(rect => {
				let value = ((event.detail.x - rect.left) / rect.width) * this.getRange() + this.min;
				if (this.isRange(this.innerValue)) {
					let _a = this.innerValue,
						left = _a[0],
						right = _a[1];
					let middle = (left + right) / 2;
					if (value <= middle) {
						this.updateValue([value, right], true);
					} else {
						this.updateValue([left, value], true);
					}
				} else {
					this.updateValue(value, true);
				}
			});
		},
		isRange(val) {
			return this.range && Array.isArray(val);
		},
		handleOverlap(value) {
			if (value[0] > value[1]) {
				return value.slice(0).reverse();
			}
			return value;
		},
		updateValue(value, end, drag) {
			if (this.isRange(value)) {
				value = this.handleOverlap(value).map(val => {
					return this.format(val);
				});
			} else {
				value = this.format(value);
			}
			this.innerValue = value;
			let left = 0;
			if (this.isRange(value)) {
				let leftvalue = Math.max(value[0]-this.min, 0)
				left = (leftvalue*100)/this.getScope() + '%'
			}
			this.barStyle = {
				width: this.calcMainAxis(),
				left
			};
			if (drag) {
				this.$set(this.barStyle, 'transition', 'none');
			}
			if (drag) {
				this.$emit('drag', { value: value });
			}
			if (end) {
				this.$emit('change', value);
				this.$emit('input', value);
			}
		},
		getScope() {
			return Number(this.max) - Number(this.min);
		},
		getRange() {
			return this.max - this.min;
		},
		// 计算选中条的长度百分比
		calcMainAxis() {
			let value = this.innerValue;
			let scope = this.getScope();
			if (this.isRange(value)) {
				return ((value[1] - value[0]) * 100) / scope + '%';
			}
			return ((value - Number(this.min)) * 100) / scope + '%';
		},
		format(value) {
			return Math.round(Math.max(this.min, Math.min(value, this.max)) / this.step) * this.step;
		}
		// barStyle(barHeight, activeColor) {
		// 	return this.$u.style({
		// 		height: this.$u.addUnit(barHeight),
		// 		background: activeColor
		// 	});
		// }
	}
};
</script>

<style lang="scss" scoped>
.van-slider {
	position: relative;
	height: $slider-bar-height;
	border-radius: $border-radius-max;
	background-color: $slider-inactive-background-color;
}

.van-slider:before {
	position: absolute;
	right: 0;
	left: 0;
	content: '';
	top: -$padding-xs;
	bottom: -$padding-xs;
}

.van-slider__bar {
	position: relative;
	width: 100%;
	height: 100%;
	background-color: $slider-active-background-color;
	border-radius: inherit;
	transition: all 0.2s;
	transition: all $animation-duration-fast;
}

.van-slider__button {
	width: $slider-button-width;
	height: $slider-button-height;
	border-radius: $slider-button-border-radius;
	box-shadow: $slider-button-box-shadow;
	background-color: $slider-button-background-color;
}

.van-slider__button-wrapper,
.van-slider__button-wrapper-right {
	position: absolute;
	top: 50%;
	right: 0;
	transform: translate3d(50%, -50%, 0);
}

.van-slider__button-wrapper-left {
	position: absolute;
	top: 50%;
	left: 0;
	transform: translate3d(-50%, -50%, 0);
}

.van-slider--disabled {
	opacity: $slider-disabled-opacity;
}
</style>
