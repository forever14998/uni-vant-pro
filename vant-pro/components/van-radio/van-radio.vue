<template>
	<view :class="[$u.bem('radio', [direction])]" class="custom-class">
		<view
			v-if="labelPosition === 'left'"
			class="label-class"
			:class="[$u.bem('radio__label', [labelPosition, { disabled: disabled || parentDisabled }])]"
			@click="onClickLabel"
		>
			<slot />
		</view>
		<view class="van-radio__icon-wrap" :style="'font-size: ' + $u.addUnit(iconSize)" @click="onChange">
			<slot v-if="useIconSlot" name="icon" />
			<van-icon
				v-else
				name="success"
				:class="[$u.bem('radio__icon', [shape, { disabled: disabled || parentDisabled, checked: innerValue === name }])]"
				:style="iconStyle()"
				custom-class="icon-class"
				:custom-style="iconCustomStyle()"
			/>
		</view>
		<view
			v-if="labelPosition === 'right'"
			class="label-class"
			:class="[$u.bem('radio__label', [labelPosition, { disabled: disabled || parentDisabled }])]"
			@click="onClickLabel"
		>
			<slot />
		</view>
	</view>
</template>

<script>
/**
 * @property value 是否选中
 * @property {String} name 标识符
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} use-icon-slot 是否使用 icon slot
 * @property {String} checked-color 选中状态颜色
 * @property {String} label-position 文本位置，可选值为 right|left
 * @property {Boolean} label-disabled 是否禁用单选框内容点击
 * @property {String} shape 形状，可选值为 round|square
 * @property {String|Number} icon-size icon 大小
 * @event {Function} change 当绑定值变化时触发的事件
 */
export default {
	props: {
		name: String,
		value: null,
		disabled: Boolean,
		useIconSlot: Boolean,
		checkedColor: String,
		labelPosition: {
			type: String,
			default: 'right'
		},
		labelDisabled: Boolean,
		shape: {
			type: String,
			default: 'round'
		},
		iconSize: {
			type: Number | String,
			default: 30
		}
	},
	data() {
		return {
			innerValue: '',
			direction: '',
			parentDisabled: false
		};
	},
	mounted() {
		this.innerValue = this.value;
	},
	watch: {
		value(val) {
			this.innerValue = val;
		}
	},
	methods: {
		updateFromParent() {
			if (!(this.$parent.$parent && this.$parent.$parent.VAN_RADIO_GROUP_STATE)) {
				return;
			}
			this.innerValue = this.$parent.$parent.value;
			this.direction = this.$parent.$parent.direction;
			this.parentDisabled = this.$parent.$parent.disabled;
		},
		emitChange(value) {
			let instance = this.$parent.$parent && this.$parent.$parent.VAN_RADIO_GROUP_STATE ? this.$parent.$parent : this;
			instance.$emit('input', value);
			instance.$emit('change', value);
		},
		onChange() {
			if (!this.disabled && !this.parentDisabled) {
				this.emitChange(this.name);
			}
		},
		onClickLabel() {
			if (!(this.disabled || this.parentDisabled) && !this.labelDisabled) {
				this.emitChange(this.name);
			}
		},
		iconStyle() {
			let styles = {
				'font-size': this.$u.addUnit(this.iconSize)
			};
			if (this.checkedColor && !(this.disabled || this.parentDisabled) && this.innerValue === this.name) {
				styles['border-color'] = this.checkedColor;
				styles['background-color'] = this.checkedColor;
			}

			return this.$u.style(styles);
		},
		iconCustomStyle() {
			return this.$u.style({
				'line-height': '1.2em',
				'font-size': '.8em',
				display: 'block'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.van-radio {
	display: flex;
	align-items: center;
	overflow: hidden;
	-webkit-user-select: none;
	user-select: none;
	margin-bottom: 16rpx;
}

.van-radio__icon-wrap {
	flex: none;
}

.van-radio--horizontal {
	margin-right: $padding-sm;
}

.van-radio__icon {
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	width: 1.2em;
	height: 1.2em;
	color: transparent;
	text-align: center;
	transition-property: color, border-color, background-color;
	border: 1rpx solid $radio-border-color;
	font-size: $radio-size;
	transition-duration: $radio-transition-duration;
}

.van-radio__icon--round {
	border-radius: 100%;
}

.van-radio__icon--checked {
	color: $white;
	background-color: $radio-checked-icon-color;
	border-color: $radio-checked-icon-color;
}

.van-radio__icon--disabled {
	background-color: $radio-disabled-background-color;
	border-color: $radio-disabled-icon-color;
}

.van-radio__icon--disabled.van-radio__icon--checked {
	color: $radio-disabled-icon-color;
}

.van-radio__label {
	word-wrap: break-word;
	padding-left: $radio-label-margin;
	color: $radio-label-color;
	line-height: $radio-size;
}

.van-radio__label--left {
	float: left;
	margin: 0 $radio-label-margin 0 0;
}

.van-radio__label--disabled {
	color: $radio-disabled-label-color;
}

.van-radio__label:empty {
	margin: 0;
}
</style>
