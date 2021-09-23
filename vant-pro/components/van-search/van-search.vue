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
				placeholder-style="placeholderStyle"
				:custom-style="{ padding: '10rpx 20rpx 10rpx 0', 'background-color': 'transparent' }"
				@blur="onBlur"
				@focus="onFocus"
				@change="onChange"
				@confirm="onSearch"
				@clear="onClear"
				@click-input="onClickInput"
			>
				<slot v-if="useLeftIconSlot" name="left-icon" slot="left-icon" />
				<slot v-if="useRightIconSlot" name="right-icon" slot="right-icon" />
			</van-field>
		</view>

		<view v-if="showAction || useActionSlot" class="van-search__action" hover-class="van-search__action--hover" hover-stay-time="70">
			<slot v-if="useActionSlot" name="action" />
			<view v-else @tap="onCancel" class="cancel-class">{{ actionText }}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		value: String|Number,
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
			console.log(event);
			this.$emit('change', event.detail);
		},
		onCancel() {
			/**
			 * 修复修改输入框值时，输入框失焦和赋值同时触发，赋值失效
			 * https://github.com/youzan/@vant/weapp/issues/1768
			 */
			setTimeout(() => {
				this.$emit('cancel');
				this.$emit('change', '');
			}, 200);
		},
		onSearch(event) {
			this.$emit('search', event.detail);
		},
		onFocus(event) {
			this.$emit('focus', event.detail);
		},
		onBlur(event) {
			this.$emit('blur', event.detail);
		},
		onClear(event) {
			this.$emit('clear', event.detail);
		},
		onClickInput(event) {
			this.$emit('click-input', event.detail);
		}
	}
};
</script>

<style>
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
