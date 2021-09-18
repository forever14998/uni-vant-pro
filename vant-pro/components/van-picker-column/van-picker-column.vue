<template>
	<view
		class="van-picker-column custom-class"
		:style="rootStyle()"
		@touchstart="onTouchStart"
		@touchmove="onTouchMove"
		@touchend="onTouchEnd"
		@touchcancel="onTouchEnd"
	>
		<view :style="wrapperStyle()">
			<view
				v-for="(option, index) in options"
				:key="index"
				:style="`height: ${itemHeight}rpx`"
				class="van-ellipsis"
				:class="[
					$u.bem('picker-column__item', { disabled: option && option.disabled, selected: index === currentIndex }),
					index === currentIndex ? 'active-class' : ''
				]"
				@click="onClickItem"
			>
				{{ optionText(option) }}
			</view>
		</view>
	</view>
</template>

<script>
const DEFAULT_DURATION = 200;
export default {
	classes: ['active-class'],
	props: {
		valueKey: String,
		className: String,
		itemHeight: Number,
		visibleItemCount: Number,
		initialOptions: {
			type: Array,
			default: () => []
		},
		defaultIndex: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			startY: 0,
			offset: 0,
			duration: 0,
			startOffset: 0,
			options: [],
			currentIndex: 0
		};
	},
	watch: {
		defaultIndex(value) {
			this.setIndex(value);
		}
	},
	created() {
		this.currentIndex = this.defaultIndex;
		this.options = this.initialOptions;
		this.setIndex(this.defaultIndex);
	},
	methods: {
		getCount() {
			return this.options.length;
		},
		onTouchStart(event) {
			this.startY = event.touches[0].clientY;
			this.startOffset = this.offset;
			this.duration = 0;
		},
		onTouchMove(event) {
			const deltaY = event.touches[0].clientY - this.startY;
			this.offset = this.$u.utils.range(this.startOffset + deltaY, -(this.getCount() * this.itemHeight), this.itemHeight);
		},
		onTouchEnd() {
			if (this.offset !== this.startOffset) {
				this.duration = DEFAULT_DURATION
				const index = this.$u.utils.range(-Math.round(this.offset / this.itemHeight), 0, this.getCount() - 1);
				this.setIndex(index, true);
			}
		},
		onClickItem(event) {
			const { index } = event.currentTarget.dataset;
			this.setIndex(index, true);
		},
		adjustIndex(index) {
			const count = this.getCount();
			index = this.$u.utils.range(index, 0, count);
			for (let i = index; i < count; i++) {
				if (!this.isDisabled(this.options[i])) return i;
			}
			for (let i = index - 1; i >= 0; i--) {
				if (!this.isDisabled(this.options[i])) return i;
			}
		},
		isDisabled(option) {
			return this.$u.validator.isObj(option) && option.disabled;
		},
		getOptionText(option) {
			return this.$u.validator.isObj(option) && option[this.valueKey] ? option[this.valueKey] : option;
		},
		setIndex(index, userAction) {
			index = this.adjustIndex(index) || 0;
			this.offset = -index * this.itemHeight;
			if (index !== this.currentIndex) {
				this.currentIndex = index;
				userAction && this.$emit('change', index);
			}
		},
		setValue(value) {
			for (let i = 0; i < this.options.length; i++) {
				if (this.getOptionText(this.options[i]) === value) {
					return this.setIndex(i);
				}
			}
			return Promise.resolve();
		},
		getValue() {
			return this.options[this.currentIndex];
		},
		optionText(option) {
			return this.$u.validator.isObj(option) && option[this.valueKey] != null ? option[this.valueKey] : option;
		},
		rootStyle() {
			return this.$u.style({
				height: this.$u.addUnit(this.itemHeight * this.visibleItemCount)
			});
		},
		wrapperStyle() {
			let offset = this.$u.addUnit(this.offset + (this.itemHeight * (this.visibleItemCount - 1)) / 2);
			return this.$u.style({
				transition: 'transform ' + this.duration + 'ms',
				'line-height': this.$u.addUnit(this.itemHeight),
				transform: 'translate3d(0, ' + offset + ', 0)'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
	.van-picker-column {
	  overflow: hidden;
	  text-align: center;
	  color: $picker-option-text-color;
	  font-size: $picker-option-font-size
	}
	
	.van-picker-column__item {
	  padding: 0 10rpx
	}
	
	.van-picker-column__item--selected {
	  font-weight: $font-weight-bold;
	  color: $picker-option-selected-text-color
	}
	
	.van-picker-column__item--disabled {
	  opacity: $picker-option-disabled-opacity
	}
</style>
