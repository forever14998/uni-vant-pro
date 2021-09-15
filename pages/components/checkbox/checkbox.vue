<template>
	<view class="content">
		<view class="result-div">
			<view class="headline">结果展示</view>
			<view class="result-content">
				<!-- groupDisabled -->
				<van-checkbox-group v-if="!checkState" :disabled="groupDisabled" :max="2" :value="['a', 'b', 'c']">
					<van-checkbox v-model="groupState.a" name="a">
						复选框1
					</van-checkbox>
					<van-checkbox v-model="groupState.b" name="b">
						复选框2
					</van-checkbox>
					<van-checkbox v-model="groupState.c" name="c">
						复选框2
					</van-checkbox>
				</van-checkbox-group>
			</view>
		</view>
		<view class="condition-headline">
			<van-checkbox v-model="checkState" :disabled="selectDisabled" :useIconSlot="selectIcon">
				<van-icon name="thumb-circle-o" slot="icon" :color="checkState ? '#3f8cf4' : ''" v-if="selectIcon" />
				复选框
			</van-checkbox>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否禁用</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectDisabled === item.type }"
					v-for="(item, index) in disabledInfo"
					:key="index"
					@click="chooseType('selectDisabled', item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">自定义图标</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectIcon === item.type }"
					v-for="(item, index) in iconInfo"
					:key="index"
					@click="chooseType('selectIcon', item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-headline">
			<van-checkbox :value="!checkState" @change="checkState=!checkState">复选框组</van-checkbox>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否禁用</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': groupDisabled === item.type }"
					v-for="(item, index) in groupDisabledInfo"
					:key="index"
					@click="chooseType('groupDisabled', item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否显示单元格左侧图标</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectIcon === item.type }"
					v-for="(item, index) in iconInfo"
					:key="index"
					@click="chooseType('selectIcon', item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否显示右侧内容</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectValue === item.type }"
					v-for="(item, index) in valueInfo"
					:key="index"
					@click="chooseType('selectValue', item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否显示描述信息</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectLabel === item.type }"
					v-for="(item, index) in labelInfo"
					:key="index"
					@click="chooseType('selectLabel', item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否显示单元格下边框</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectCellBorder === item.type }"
					v-for="(item, index) in cellBorderInfo"
					:key="index"
					@click="chooseType('selectCellBorder', item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否显示右箭头并点击开启反馈</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectLink === item.type }"
					v-for="(item, index) in linkInfo"
					:key="index"
					@click="chooseType('selectLink', item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否使用 label solt</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': selectSolt === item.type }"
					v-for="(item, index) in soltInfo"
					:key="index"
					@click="chooseType('selectSolt', item.type)"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			checkState: false,
			groupState: {
				a: false,
				b: false,
				c: false
			},
			disabledInfo: [{ type: null, mode: '默认' }, { type: true, mode: '是' }],
			selectDisabled: null,
			iconInfo: [{ type: null, mode: '默认' }, { type: true, mode: '是' }],
			selectIcon: null,
			groupDisabledInfo: [{ type: false, mode: '默认' }, { type: true, mode: '是' }],
			groupDisabled: false,
			// iconInfo: [{ type: null, mode: '默认' }, { type: 'http://doc.vantpro.com/assets/logo.png', mode: '是' }],
			// selectIcon: null,
			valueInfo: [{ type: null, mode: '默认' }, { type: '右侧内容', mode: '是' }],
			selectValue: null,
			labelInfo: [{ type: null, mode: '默认' }, { type: '描述内容', mode: '是' }],
			selectLabel: null,
			cellBorderInfo: [{ type: true, mode: '默认' }, { type: false, mode: '否' }],
			selectCellBorder: true,
			linkInfo: [{ type: false, mode: '默认' }, { type: true, mode: '是' }],
			selectLink: false,
			soltInfo: [{ type: false, mode: '默认' }, { type: true, mode: '是' }],
			selectSolt: false
		};
	},
	onLoad() {},
	methods: {
		/**
		 * @param {Object} type
		 * 属性设置
		 */
		chooseType(info, type) {
			this[info] = type;
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	padding: 32rpx;
	.result-div {
		background-color: $gray-1;
		border: 1rpx dotted $gray-5;
		border-radius: 16rpx;
		padding: 32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		.headline {
			font-size: 32rpx;
			color: #333333;
			font-weight: bold;
			padding-bottom: 32rpx;
		}
		.result-content {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.condition-headline {
		margin: 50rpx 0 10rpx;
		// padding: 0 24rpx;
		font-size: 34rpx;
		color: #333333;
		font-weight: bold;
		position: relative;
	}
	// .condition-headline::after {
	// 	content: '';
	// 	position: absolute;
	// 	left: 0;
	// 	top: 0;
	// 	bottom: 0;
	// 	width: 10rpx;
	// 	background-color: $blue;
	// }
	.condition-div {
		.condition-title {
			padding: 32rpx 24rpx;
			font-size: 32rpx;
			color: #333333;
			font-weight: bold;
		}
		.condition-content {
			background-color: $gray-1;
			border-radius: 8rpx;
			padding: 16rpx;
			margin: 24rpx;
			display: flex;
			justify-content: space-between;
			.condition-unit {
				width: 100%;
				padding: 0 32rpx;
				font-size: 28rpx;
				color: #333333;
				border-radius: 8rpx;
				text-align: center;
			}
			.select-unit {
				background-color: $white;
			}
		}
	}
}
</style>
