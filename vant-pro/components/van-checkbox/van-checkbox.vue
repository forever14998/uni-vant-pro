<template>
	<view :class="[$u.bem('checkbox', [{ horizontal: direction === 'horizontal' }])]" class="custom-class">
		<view
			v-if="labelPosition === 'left'"
			class="label-class"
			:class="[$u.bem('checkbox__label', [labelPosition, { disabled: disabled || parentDisabled }])]"
			@click="onClickLabel"
		>
			<slot />
		</view>
		<view class="van-checkbox__icon-wrap" @click="toggle">
			<slot v-if="useIconSlot" name="icon" />
			<van-icon name="success" :class="[$u.bem('checkbox__icon', [shape, { disabled: disabled || parentDisabled, checked: value }])]" :custom-style="iconStyle(checkedColor, value, disabled, parentDisabled, iconSize)" custom-class="icon-class" />
		</view>
		<view
			v-if="labelPosition === 'right'"
			class="label-class"
			:class="[$u.bem('checkbox__label', [labelPosition, { disabled: disabled || parentDisabled }])]"
			@click="onClickLabel"
		>
			<slot />
		</view>
	</view>
</template>

<script>
export default {
	inject: ['checkbox'],
	props: {
		value: Boolean, // 是否选中
		disabled: Boolean, // 是否禁用
		useIconSlot: Boolean, // 是否使用 icon slot
		checkedColor: String, // 选中状态颜色
		// 文本位置，可选值为 left
		labelPosition: {
			type: String,
			default: 'right'
		},
		labelDisabled: Boolean, // 是否禁用单选框内容点击
		// 形状，可选值为 round square
		shape: {
			type: String,
			default: 'round'
		},
		// icon 大小
		iconSize: {
			type: null,
			default: 28
		}
	},
	data() {
		return {
			parentDisabled: false,
			direction: 'vertical'
		};
	},
	methods: {
		emit(value) {
			this.$emit('input', value);
			this.$emit('change', value);
		},
		emitChange() {
			if (this.checkbox) {
				this.setParentValue(this.checkbox, !this.value);
			} else {
				this.emit(!this.value);
			}
		},
		toggle() {
			if (!this.disabled && !this.parentDisabled) {
				this.emitChange();
			}
		},
		onClickLabel() {
			if (!this.disabled && !this.labelDisabled && !this.parentDisabled) {
				this.emitChange();
			}
		},
		setParentValue(parent, value) {
			let parentInfo = parent({ name: this.name });
			const parentValue = parentInfo.value.slice();
			const { max } = parentInfo;
			if (value) {
				if (max && parentValue.length >= max) {
					return;
				}
				if (parentValue.indexOf(this.name) === -1) {
					parentValue.push(this.name);
					this.emit(this.parentValue);
				}
			} else {
				const index = parentValue.indexOf(name);
				if (index !== -1) {
					parentValue.splice(index, 1);
					this.emit(parentValue);
				}
			}
		},
		iconStyle(checkedColor, value, disabled, parentDisabled, iconSize) {
			var styles = {
				'font-size': this.$u.addUnit(iconSize),
				'color': '#fff'
			};
			if (checkedColor && value && !disabled && !parentDisabled) {
				styles['border-color'] = checkedColor;
				styles['background-color'] = checkedColor;
			}
			return this.$u.style(styles);
		}
	}
};
</script>

<style lang="scss" scoped>
.van-checkbox {
	display: flex;
	align-items: center;
	overflow: hidden;
	-webkit-user-select: none;
	user-select: none;
}

.van-checkbox--horizontal {
	margin-right: 12rpx;
}

.van-checkbox__icon-wrap,
.van-checkbox__label {
	line-height: $checkbox-size;
}

.van-checkbox__icon-wrap {
	overflow: hidden;
	flex: none;
}

.van-checkbox__icon {
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	color: transparent;
	text-align: center;
	transition-property: color, border-color, background-color;
	font-size: $checkbox-size;
	border: 1rpx solid $checkbox-border-color;
	transition-duration: $checkbox-transition-duration;
}

.van-checkbox__icon--round {
	border-radius: 100%;
}

.van-checkbox__icon--checked {
	background-color: $checkbox-checked-icon-color;
	border-color: $checkbox-checked-icon-color;
}

.van-checkbox__icon--disabled {
	background-color: $checkbox-disabled-background-color;
	border-color: $checkbox-disabled-icon-color;
}

.van-checkbox__icon--disabled.van-checkbox__icon--checked {
	color: $checkbox-disabled-icon-color;
}

.van-checkbox__label {
	word-wrap: break-word;
	margin-left: $checkbox-label-margin;
	color: $checkbox-label-color;
}

.van-checkbox__label--left {
	float: left;
	margin: 0 $checkbox-label-margin 0 0;
}

.van-checkbox__label--disabled {
	color: $checkbox-disabled-label-color;
}

.van-checkbox__label:empty {
	margin: 0;
}
</style>
