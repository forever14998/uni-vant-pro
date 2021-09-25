<template>
	<view class="content">
		<view class="result-div">
			<view class="headline">结果展示</view>
			<view class="result-content">
				<van-picker :columns="columns" :show-toolbar="showToolbar" :default-index="defaultIndex" @cancel="oncancel" @confirm="onConfirm"></van-picker>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">列配置</view>
			<view class="condition-content">
				<view class="condition-unit" :class="{ 'select-unit': item.type }" v-for="(item, index) in columnsInfo" :key="index" @click="selectColumns(item)">
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">是否显示顶部状态栏</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': showToolbar === item.type }"
					v-for="(item, index) in toolbarInfo"
					:key="index"
					@click="chooseType(item.type, 'showToolbar')"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
		<view class="condition-div">
			<view class="condition-title">设置选中项索引（单列数据）</view>
			<view class="condition-content">
				<view
					class="condition-unit"
					:class="{ 'select-unit': defaultIndex === item.type }"
					v-for="(item, index) in indexInfo"
					:key="index"
					@click="chooseType(item.type, 'defaultIndex')"
				>
					{{ item.mode }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
const citys = {
	浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
	福建: ['福州', '厦门', '莆田', '三明', '泉州']
};
export default {
	data() {
		return {
			columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
			toolbarInfo: [{ type: false, mode: '默认' }, { type: true, mode: '是' }],
			showToolbar: false,
			indexInfo: [{ type: null, mode: '默认' }, { type: 2, mode: '2' }],
			defaultIndex: null,
			columnsInfo: [{ type: true, key: 1, mode: '单列数据' }, { type: false, key: 2, mode: '多列数据' }]
		};
	},
	onLoad() {},
	methods: {
		/**
		 * @param {Object} type
		 * 类型
		 */
		chooseType(type, name) {
			this[name] = type;
		},
		/**
		 * @param {Object} item
		 * 列数选择
		 */
		selectColumns(item) {
			if (!item.type) {
				this.columnsInfo.filter(el => el.type)[0].type = false;
				item.type = true;
				if (item.key === 1) {
					this.columns = ['杭州', '宁波', '温州', '嘉兴', '湖州'];
				} else {
					this.columns = [
						{
							values: Object.keys(citys),
							className: 'column1',
							disabled: true
						},
						{
							values: citys['浙江'],
							className: 'column2',
							defaultIndex: 2
						}
					];
				}
			}
		},
		onConfirm(event) {
			const { value, index } = event;
			console.log(`当前值：${value}, 当前索引：${index}`);
		},
		oncancel() {
			console.log('取消');
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
			// height: 200rpx;
			width: 100%;
		}
	}
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
