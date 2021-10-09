<template>
	<van-cell
		:size="size"
		:icon="leftIcon"
		:center="center"
		:border="border"
		:is-link="isLink"
		:required="required"
		:clickable="clickable"
		:title-width="titleWidth"
		:title-style="{ 'margin-right': '24rpx' }"
		:custom-style="customStyle"
		:arrow-direction="arrowDirection"
		custom-class="van-field"
	>
		<view slot="icon"><slot name="left-icon" /></view>
		<view v-if="label" class="label-class" :class="[$u.bem('field__label', { disabled })]" slot="title">{{ label }}</view>
		<slot v-else name="label" slot="title" />
		<view :class="[$u.bem('field__body', [type])]">
			<view :class="[$u.bem('field__control', [inputAlign, 'custom'])]" @click="onClickInput"><slot name="input" /></view>
			<textarea
				v-if="type === 'textarea'"
				class="input-class"
				:class="[$u.bem('field__control', [inputAlign, type, { disabled, error }])]"
				:fixed="fixed"
				:focus="focus"
				:cursor="cursor"
				:value="innerValue"
				:auto-focus="autoFocus"
				:disabled="disabled || readonly"
				:maxlength="maxlength"
				:placeholder="placeholder"
				:placeholder-style="placeholderStyle"
				:placeholder-class="$u.bem('field__placeholder', { error, disabled })"
				:auto-height="!!autosize"
				:style="[inputStyle()]"
				:cursor-spacing="cursorSpacing"
				:adjust-position="adjustPosition"
				:show-confirm-bar="showConfirmBar"
				:hold-keyboard="holdKeyboard"
				:selection-end="selectionEnd"
				:selection-start="selectionStart"
				:disable-default-padding="disableDefaultPadding"
				@input="onInput"
				@tap="onClickInput"
				@blur="onBlur"
				@focus="onFocus"
				@confirm="onConfirm"
				@linechange="onLineChange"
				@keyboardheightchange="onKeyboardHeightChange"
			/>
			<input
				v-else
				class="input-class"
				:class="[$u.bem('field__control', [inputAlign, { disabled, error }])]"
				:type="type"
				:focus="focus"
				:cursor="cursor"
				:value="innerValue"
				:auto-focus="autoFocus"
				:disabled="disabled || readonly"
				:maxlength="maxlength"
				:placeholder="placeholder"
				:placeholder-style="placeholderStyle"
				:placeholder-class="$u.bem('field__placeholder', { error })"
				:confirm-type="confirmType"
				:confirm-hold="confirmHold"
				:hold-keyboard="holdKeyboard"
				:cursor-spacing="cursorSpacing"
				:adjust-position="adjustPosition"
				:selection-end="selectionEnd"
				:selection-start="selectionStart"
				:password="password || type === 'password'"
				@input="onInput"
				@tap="onClickInput"
				@blur="onBlur"
				@focus="onFocus"
				@confirm="onConfirm"
				@keyboardheightchange="onKeyboardHeightChange"
			/>
			<van-icon v-if="showClear" :name="clearIcon" class="van-field__clear-root van-field__icon-root" @click="onClear" />
			<view class="van-field__icon-container" @tap="onClickIcon">
				<van-icon v-if="rightIcon || icon" :name="rightIcon || icon" class="van-field__icon-root" :class="iconClass" custom-class="right-icon-class" />
				<slot name="right-icon" />
				<slot name="icon" />
			</view>
			<view class="van-field__button"><slot name="button" /></view>
		</view>
		<view v-if="showWordLimit && maxlength" class="van-field__word-limit">
			<view :class="[$u.bem('field__word-num', { full: value.length >= maxlength })]">{{ value.length >= maxlength ? maxlength : value.length }}</view>
			/{{ maxlength }}
		</view>
		<view v-if="errorMessage" :class="[$u.bem('field__error-message', [errorMessageAlign, { disabled, error }])]">{{ errorMessage }}</view>
	</van-cell>
</template>

<script>
/**
 * @property {String} label 输入框左侧文本
 * @property {String} size 单元格大小，可选值为 large
 * @property {String} value 当前输入的值
 * @property {String} type 可设置为任意原生类型, 如 number idcard textarea digit
 * @property {Boolean} fixed 如果 type 为 textarea 且在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
 * @property {Boolean} focus 获取焦点	
 * @property {Boolean} border 是否显示内边框		
 * @property {Boolean} disabled 是否禁用输入框
 * @property {Boolean} readonly 是否只读
 * @property {Boolean} clickable 是否开启点击反馈
 * @property {Boolean} clearable 是否启用清除控件
 * @property {Boolean} required 是否显示表单必填星号
 * @property {Boolean} center 是否使内容垂直居中
 * @property {Boolean} password 是否是密码类型
 * @property {String|Number} title-width 标题宽度
 * @property {Number} maxlength 最大输入长度，设置为 -1 的时候不限制最大长度
 * @property {String} placeholder 输入框为空时占位符
 * @property {String} placeholder-style 指定 placeholder 的样式	
 * @property {String} custom-style 自定义样式
 * @property {Boolean} is-link 是否展示右侧箭头并开启点击反馈	
 * @property {String} arrow-direction 箭头方向，可选值为 right | left | up | down
 * @property {Boolean} show-word-limit 是否显示字数统计，需要设置maxlength属性	
 * @property {Boolean} error 是否将输入内容标红	
 * @property {String} error-message	 底部错误提示文案，为空时不展示	
 * @property {String} error-message-align 底部错误提示文案对齐方式，可选值为 left center right
 * @property {String} input-align 输入框内容对齐方式，可选值为 left center right
 * @property {Object} autosize 否自适应内容高度，只对 textarea 有效，可传入对象,如 { maxHeight: 100, minHeight: 50 }，单位为rpx
 * @property {String} left-icon	左侧图标名称或图片链接，可选值见 Icon 组件
 * @property {String} right-icon 右侧图标名称或图片链接，可选值见 Icon 组件
 * @property {String} confirm-type 设置键盘右下角按钮的文字，仅在 type='text' 时生效
 * @property {Boolean} confirm-hold 点击键盘右下角按钮时是否保持键盘不收起，在 type='textarea' 时无效	
 * @property {Boolean} hold-keyboard focus 时，点击页面的时候不收起键盘		
 * @property {Number} cursor-spacing 输入框聚焦时底部与键盘的距离		
 * @property {Boolean} adjust-position 键盘弹起时，是否自动上推页面			
 * @property {Boolean} show-confirm-bar 是否显示键盘上方带有”完成“按钮那一栏，只对 textarea 有效				
 * @property {Number} selection-start 光标起始位置，自动聚集时有效，需与 selection-end 搭配使用				
 * @property {Number} selection-end 光标结束位置，自动聚集时有效，需与 selection-start 搭配使用					
 * @property {Boolean} auto-focus 自动聚焦，拉起键盘
 * @property {Boolean} disable-default-padding 是否去掉 iOS 下的默认内边距，只对 textarea 有效	
 * @property {Number} cursor 指定 focus 时的光标位置	
 * @property {String} clear-trigger 显示清除图标的时机，always 表示输入框不为空时展示，focus 表示输入框聚焦且不为空时展示
 * @event {Function} input 输入内容时触发	，event: 当前输入值
 * @event {Function} change 输入内容时触发，event: 当前输入值
 * @event {Function} confirm 点击完成按钮时触发，event: 当前输入值
 * @event {Function} click-icon 点击尾部图标时触发
 * @event {Function} focus 输入框聚焦时触发，event: 当前输入值
 * @event {Function} blur 输入框失焦时触发，event.value: 当前输入值;event.cursor: 游标位置
 * @event {Function} clear 点击清空控件时触发
 * @event {Function} click-input 点击输入区域时触发
 * @event {Function} linechange 输入框行数变化时调用，只对 textarea 有效
 * @event {Function} keyboardheightchange 键盘高度发生变化的时候触发此事件
 */
import * as props_1 from '../../libs/js/van-field/prop.js';
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
export default {
	props: __assign(__assign(__assign(__assign({}, props_1.commonProps), props_1.inputProps), props_1.textareaProps), {
		size: String,
		icon: String,
		label: String,
		error: Boolean,
		center: Boolean,
		isLink: Boolean,
		leftIcon: String,
		rightIcon: String,
		autosize: Object,
		required: Boolean,
		iconClass: String,
		clickable: Boolean,
		inputAlign: String,
		customStyle: String,
		errorMessage: String,
		arrowDirection: String,
		showWordLimit: Boolean,
		errorMessageAlign: String,
		readonly: {
			type: Boolean
		},
		clearable: {
			type: Boolean
		},
		clearTrigger: {
			type: String,
			default: 'focus'
		},
		border: {
			type: Boolean,
			default: true
		},
		titleWidth: {
			type: String|Number,
			default: 180
		},
		clearIcon: {
			type: String,
			default: 'clear'
		}
	}),
	data() {
		return {
			focused: false,
			innerValue: '',
			showClear: false
		};
	},
	created() {
		this.innerValue = this.value;
	},
	watch: {
		value(val) {
			this.innerValue = val
		},
		readonly() {
			this.setShowClear();
		},
		clearable() {
			this.setShowClear();
		}
	},
	methods: {
		onInput(event) {
			let _a = (event.detail || {}).value,
				value = _a === void 0 ? '' : _a;
			this.innerValue = _a;
			this.setShowClear();
			this.emitChange();
		},
		onFocus(event) {
			this.focused = true;
			this.setShowClear();
			this.$emit('focus', event);
		},
		onBlur(event) {
			this.focused = false;
			setTimeout(()=>{
				this.setShowClear();
			}, 200)
			this.$emit('blur', event);
		},
		onClickIcon() {
			this.$emit('click-icon');
		},
		onClickInput(event) {
			this.$emit('click-input', event);
		},
		onClear() {
			this.innerValue = '';
			this.setShowClear();
			this.$u.utils.nextTick(() => {
				this.emitChange();
				this.$emit('clear', '');
			});
		},
		onConfirm(event) {
			let _a = (event || {}).value,
				value = _a === void 0 ? '' : _a;
			this.innerValue = value;
			this.setShowClear();
			this.$emit('confirm', value);
		},
		setValue(value) {
			this.innerValue = value;
			this.setShowClear();
			this.emitChange();
		},
		onLineChange(event) {
			this.$emit('linechange', event);
		},
		onKeyboardHeightChange(event) {
			this.$emit('keyboardheightchange', event);
		},
		emitChange() {
			this.$u.utils.nextTick(() => {
				this.$emit('input', this.innerValue);
				this.$emit('change', this.innerValue);
			});
		},
		setShowClear() {
			let showClear = false;
			if (this.clearable && !this.readonly) {
				let hasValue = !!this.innerValue;
				let trigger = this.clearTrigger === 'always' || (this.clearTrigger === 'focus' && this.focused);
				showClear = hasValue && trigger;
			}
			this.showClear = showClear;
		},
		noop() {},
		inputStyle() {
			if (this.autosize) {
				return this.$u.style({
					'min-height': this.$u.addUnit(this.autosize.minHeight),
					'max-height': this.$u.addUnit(this.autosize.maxHeight)
				});
			}

			return '';
		}
	}
};
</script>

<style lang="scss" scoped>
.van-field {
	--cell-icon-size: $field-icon-size;
}

.van-field__label {
	color: $field-label-color;
}

.van-field__label--disabled {
	color: $field-disabled-text-color;
}

.van-field__body {
	display: flex;
	align-items: center;
}

.van-field__body--textarea {
	box-sizing: border-box;
	line-height: $cell-line-height;
	min-height: $cell-line-height;
}

.van-field__control:empty + .van-field__control {
	display: block;
}

.van-field__control {
	position: relative;
	display: none;
	box-sizing: border-box;
	width: 100%;
	margin: 0;
	padding: 0;
	line-height: $cell-line-height;
	text-align: left;
	background-color: initial;
	border: 0;
	resize: none;
	color: $field-input-text-color;
	height: $cell-line-height;
	min-height: $cell-line-height;
}

.van-field__control:empty {
	display: none;
}

.van-field__control--textarea {
	height: $field-text-area-min-height;
	min-height: $field-text-area-min-height;
}

.van-field__control--error {
	color: $field-input-error-text-color;
}

.van-field__control--disabled {
	background-color: initial;
	opacity: 1;
	color: $field-input-disabled-text-color;
}

.van-field__control--center {
	text-align: center;
}

.van-field__control--right {
	text-align: right;
}

.van-field__control--custom {
	display: flex;
	align-items: center;
	min-height: $cell-line-height;
}

.van-field__placeholder {
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	pointer-events: none;
	color: $field-placeholder-text-color;
}

.van-field__placeholder--error {
	color: $field-error-message-color;
}

.van-field__icon-root {
	display: flex;
	align-items: center;
	min-height: $cell-line-height;
}

.van-field__clear-root,
.van-field__icon-container {
	line-height: inherit;
	vertical-align: middle;
	padding: 0 $padding-xs;
	margin-right: -$padding-xs;
}

.van-field__button,
.van-field__clear-root,
.van-field__icon-container {
	flex-shrink: 0;
}

.van-field__clear-root {
	font-size: $field-clear-icon-size;
	color: $field-clear-icon-color;
}

.van-field__icon-container {
	font-size: $field-icon-size;
	color: $field-icon-container-color;
}

.van-field__icon-container:empty {
	display: none;
}

.van-field__button {
	padding-left: $padding-xs;
}

.van-field__button:empty {
	display: none;
}

.van-field__error-message {
	text-align: left;
	font-size: $field-error-message-text-font-size;
	color: $field-error-message-color;
}

.van-field__error-message--center {
	text-align: center;
}

.van-field__error-message--right {
	text-align: right;
}

.van-field__word-limit {
	text-align: right;
	margin-top: $padding-base;
	color: $field-word-limit-color;
	font-size: $field-word-limit-font-size;
	line-height: $field-word-limit-line-height;
}

.van-field__word-num {
	display: inline;
}

.van-field__word-num--full {
	color: $field-word-num-full-color;
}
</style>
