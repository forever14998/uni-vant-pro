<template>
	<view class="custom-class" :class="[$u.bem('search', { withaction: showAction || useActionSlot })]" :style="'background:' + background">
		<view :class="[$u.bem('search__content', [shape])]">
			<view class="van-search__label" v-if="label">{{ label }}</view>
			<slot v-else name="label" />
			<van-field
				type="search"
				:left-icon="!useLeftIconSlot ? leftIcon : ''"
				:right-icon="!useRightIconSlot ? rightIcon : ''"
				:focus="focus"
				:error="error"
				:border="false"
				confirm-type="search"
				class="van-search__field field-class"
				:value="value"
				:disabled="disabled"
				:readonly="readonly"
				:clearable="clearable"
				:clear-trigger="clearTrigger"
				:clear-icon="clearIcon"
				:maxlength="maxlength"
				:input-align="inputAlign"
				input-class="input-class"
				:placeholder="placeholder"
				:placeholder-style="placeholderStyle"
				titleWidth="0"
				custom-style="padding:16rpx 20rpx 20rpx 0;background-color: transparent"
				@blur="onBlur"
				@focus="onFocus"
				@change="onChange"
				@confirm="onSearch"
				@clear="onClear"
				@click-input="onClickInput"
			>
				<view slot="left-icon" v-if="useLeftIconSlot"><slot name="left-icon" /></view>
				<view slot="right-icon" v-if="useRightIconSlot"><slot name="right-icon" /></view>
			</van-field>
		</view>

		<view v-if="showAction || useActionSlot" class="van-search__action" hover-class="van-search__action--hover" hover-stay-time="70">
			<slot v-if="useActionSlot" name="action" />
			<view v-else @tap="onCancel" class="cancel-class">{{ actionText }}</view>
		</view>
	</view>
</template>

<script>
/**
 * @property {String|Number} value 当前输入的值
 * @property {String} label 搜索框左侧文本
 * @property {String} shape 形状，可选值为 square|round
 * @property {String} background 搜索框背景色
 * @property {Boolean} show-action 是否在搜索框右侧显示取消按钮
 * @property {String} action-text 取消按钮文字
 * @property {Boolean} focus 获取焦点
 * @property {Boolean} error 是否将输入内容标红
 * @property {Boolean} disabled 是否禁用输入框
 * @property {Boolean} readonly 是否只读
 * @property {Boolean} clearable 是否启用清除控件
 * @property {String} clear-trigger 显示清除图标的时机，always 表示输入框不为空时展示，focus 表示输入框聚焦且不为空时展示
 * @property {String} clear-icon 清除图标名称或图片链接
 * @property {Number} maxlength 最大输入长度，设置为 -1 的时候不限制最大长度
 * @property {Boolean} use-action-slot 是否使用 action slot
 * @property {String} placeholder 输入框为空时占位符
 * @property {String} placeholder-style 指定占位符的样式	
 * @property {String} input-align 输入框内容对齐方式，可选值为 left center right
 * @property {Boolean} use-left-icon-slot 是否使用输入框左侧图标 slot
 * @property {Boolean} use-right-icon-slot 是否使用输入框右侧图标 slot
 * @property {String} left-icon 输入框左侧图标名称或图片链接，可选值见 Icon 组件（如果设置了 use-left-icon-slot，则该属性无效）
 * @property {String} right-icon 输入框右侧图标名称或图片链接，可选值见 Icon 组件（如果设置了 use-right-icon-slot，则该属性无效）
 * @event {Function} change 当绑定值变化时触发的事件
 */
export default {
	props: {
		value: String | Number,
		label: String,
		focus: Boolean,
		error: Boolean,
		disabled: Boolean,
		readonly: Boolean,
		inputAlign: String,
		showAction: Boolean,
		useActionSlot: Boolean,
		useLeftIconSlot: Boolean,
		useRightIconSlot: Boolean,
		leftIcon: {
			type: String,
			default: 'search'
		},
		rightIcon: String,
		placeholder: String,
		placeholderStyle: String,
		actionText: {
			type: String,
			default: '取消'
		},
		background: {
			type: String,
			default: '#ffffff'
		},
		maxlength: {
			type: Number,
			default: -1
		},
		shape: {
			type: String,
			default: 'square'
		},
		clearable: {
			type: Boolean,
			default: true
		},
		clearTrigger: {
			type: String,
			default: 'focus'
		},
		clearIcon: {
			type: String,
			default: 'clear'
		}
	},
	methods: {
		onChange(event) {
			this.$emit('change', event);
		},
		onCancel() {
			setTimeout(() => {
				this.$emit('cancel');
				this.$emit('change', '');
			}, 200);
		},
		onSearch(event) {
			this.$emit('search', event);
		},
		onFocus(event) {
			this.$emit('focus', event);
		},
		onBlur(event) {
			this.$emit('blur', event);
		},
		onClear(event) {
			this.$emit('clear', event);
		},
		onClickInput(event) {
			this.$emit('click-input', event);
		}
	}
};
</script>

<style lang="scss" scoped>
.van-search {
	display: flex;
	align-items: center;
	box-sizing: border-box;
	padding: $search-padding;
}

.van-search__content {
	display: flex;
	flex: 1;
	padding-left: $padding-sm;
	border-radius: $border-radius-sm;
	background-color: $search-background-color;
}

.van-search__content--round {
	border-radius: $border-radius-max;
}

.van-search__label {
	padding: $search-label-padding;
	font-size: $search-label-font-size;
	line-height: $search-input-height;
	color: $search-label-color;
}

.van-search__field {
	flex: 1;
}

.van-search__field__left-icon {
	color: $search-left-icon-color;
}

.van-search--withaction {
	padding-right: 0;
}

.van-search__action {
	padding: $search-action-padding;
	font-size: $search-action-font-size;
	line-height: $search-input-height;
	color: $search-action-text-color;
}

.van-search__action--hover {
	background-color: $active-color;
}
</style>
