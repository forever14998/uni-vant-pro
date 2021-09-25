export const pickerProps = {
  title: String,
  loading: Boolean,
  showToolbar: Boolean,
  cancelButtonText: {
    type: String,
    default: '取消',
  },
  confirmButtonText: {
    type: String,
    default: '确认',
  },
  visibleItemCount: {
    type: Number,
    default: 6,
  },
  itemHeight: {
    type: Number,
    default: 88,
  },
};
