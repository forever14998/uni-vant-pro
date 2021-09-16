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
			<van-icon v-else name="success" color="transparent" :class="[$u.bem('checkbox__icon', [shape, { disabled: disabled || parentDisabled, checked: checked }])]" :custom-style="iconStyle(checkedColor, checked, disabled, parentDisabled, iconSize)" custom-class="icon-class" />
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
	props: {
		value: Boolean, // 是否选中
		name: String, // 标识 Checkbox 名称
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
			checked: null,
			parentDisabled: false,
			direction: 'vertical',
			parentInfo: null
		};
	},
	watch: {
		value: function(val) {
			this.checked = val
		}
	},
	mounted() {
		uni.$on('updateCheckbox',(msg)=> {
			this.parentInfo = msg;
			this.parentDisabled = msg.disabled
			this.direction = msg.direction
		})
	},
	beforeDestroy() {
		uni.$off('updateCheckbox')
	},
	methods: {
		emit(target, value) {
			target.$emit('input', value);
			target.$emit('change', value);
		},
		emitChange(value) {
			if (this.parentInfo) {
				this.setParentValue(this.parentInfo, value);
			} else {
				this.emit(this, value);
			}
		},
		toggle() {
			if (!this.disabled && !this.parentDisabled) {
				console.log(!this.checked)
				this.emitChange(!this.checked);
			}
		},
		onClickLabel() {
			if (!this.disabled && !this.labelDisabled && !this.parentDisabled) {
				this.emitChange(!this.checked);
			}
		},
		setParentValue(parent, value) {
			// ? this.parentInfo.value.slice() : []
			const parentValue = this.parentInfo.checkedList;
			const { max } = this.parentInfo;
			console.log(value);
			if (value) {
				if (max && parentValue.length >= max) {
					return;
				}
				if (parentValue.indexOf(this.name) === -1) {
					parentValue.push(this.name);
					console.log(value)
					this.emit(this.parentInfo, true);
				}
			} else {
				const index = parentValue.indexOf(this.name);
				if (index !== -1) {
					parentValue.splice(index, 1);
					this.emit(this.parentInfo, parentValue);
				}
			}
		},
		iconStyle(checkedColor, value, disabled, parentDisabled, iconSize) {
			var styles = {
				'font-size': this.$u.addUnit(iconSize),
			};
			if (checkedColor && value && !disabled && !parentDisabled) {
				styles['border-color'] = checkedColor;
				styles['background-color'] = checkedColor;
			}
			if (value) {
				styles['color'] = disabled? '#c8c9cc': '#fff';
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
