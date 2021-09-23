<template>
	<view class="custom-class" :class="[$u.bem('rate')]" @touchmove="onTouchMove">
		<view
			:class="$u.bem('rate__item')"
			v-for="(value, index) in innerCountArray"
			:key="index"
			:style="$u.style({ paddingRight: index !== count - 1 ? $u.addUnit(gutter) : null })"
		>
			<van-icon
				:name="index + 1 <= innerValue ? icon : voidIcon"
				:class="[$u.bem('rate__icon', [{ disabled, full: index + 1 <= innerValue }])]"
				:style="$u.style({ fontSize: $u.addUnit(size) })"
				custom-class="icon-class"
				:data-score="index"
				:color="disabled ? disabledColor : index + 1 <= innerValue ? color : voidColor"
				@tap="onSelect(index)"
			/>

			<van-icon
				v-if="allowHalf"
				:name="index + 0.5 <= innerValue ? icon : voidIcon"
				:class="[$u.bem('rate__icon', ['half', { disabled, full: index + 0.5 <= innerValue }])]"
				:style="$u.style({ fontSize: $u.addUnit(size) })"
				custom-class="icon-class"
				:data-score="index - 0.5"
				:color="disabled ? disabledColor : index + 0.5 <= innerValue ? color : voidColor"
				@tap="onSelect(index)"
			/>
		</view>
	</view>
</template>

<script>
/**
 * @property {Number} value 当前分值
 * @property {Number} count 图标总数
 * @property {String | Number} size 图标大小，默认单位为 rpx
 * @property {String | Number} gutter 图标间距，默认单位为 rpx
 * @property {String} color 选中时的颜色
 * @property {String} void-color 未选中时的颜色
 * @property {String} icon 选中时的图标名称或图片链接，可选值见 Icon 组件
 * @property {String} void-icon 未选中时的图标名称或图片链接，可选值见 Icon 组件
 * @property {Boolean} allow-half 是否允许半选
 * @property {Boolean} readonly 是否为只读状态
 * @property {Boolean} disabled 是否禁用评分
 * @property {String} disabled-color 禁用时颜色
 * @property {Boolean} touchable 是否禁用单选框内容点击
 * @event {Function} change 当前分值变化时触发的事件
 */
export default {
	props: {
		value: {
			type: Number
		},
		readonly: Boolean,
		disabled: Boolean,
		allowHalf: Boolean,
		size: String | Number,
		icon: {
			type: String,
			default: 'star'
		},
		voidIcon: {
			type: String,
			default: 'star-o'
		},
		color: String,
		voidColor: String,
		disabledColor: String,
		count: {
			type: Number,
			default: 5
		},
		gutter: String | Number,
		touchable: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			innerValue: 0,
			innerCountArray: Array.from({ length: 5 })
		};
	},
	watch: {
		value(val) {
			if (val !== this.innerValue) {
				this.innerValue = val;
			}
		},
		count(val) {
			this.innerCountArray = Array(val);
		}
	},
	mounted() {
		this.innerValue = this.value;
		this.count && (this.innerCountArray = Array(this.count));
	},
	methods: {
		onSelect(event) {
			if (!event) {
				return;
			}
			let score = typeof event==='number' ? event : event.currentTarget.dataset.score;
			if (!this.disabled && !this.readonly) {
				this.innerValue = score + 1;
				setTimeout(() => {
					this.$emit('input', score + 1);
					this.$emit('change', score + 1);
				}, 0);
			}
		},
		onTouchMove(event) {
			if (!this.touchable) return;
			let clientX = event.touches[0].clientX;
			this.$u.utils.getAllRect(this, '.van-rate__icon').then(list => {
				let target = list
					.sort((cur, next) => {
						return cur.dataset.score - next.dataset.score;
					})
					.find(item => {
						return clientX >= item.left && clientX <= item.right;
					});
				if (target != null) {
					this.onSelect(Object.assign(Object.assign({}, event), { currentTarget: target }));
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.van-rate {
	display: inline-flex;
	-webkit-user-select: none;
	user-select: none;
}

.van-rate__item {
	position: relative;
	padding: 0 $rate-horizontal-padding;
}

.van-rate__item:not(:last-child) {
	padding-right: $rate-icon-gutter;
}

.van-rate__icon {
	display: block;
	height: 1em;
	color: $rate-icon-void-color;
	font-size: $rate-icon-size;
}

.van-rate__icon--half {
	position: absolute;
	top: 0;
	width: 0.5em;
	overflow: hidden;
	left: $rate-horizontal-padding;
}

.van-rate__icon--full,
.van-rate__icon--half {
	color: $rate-icon-full-color;
}

.van-rate__icon--disabled {
	color: $rate-icon-disabled-color;
}
</style>
