/**
 * @description loading封装
 * @author WXF
 * @update 2019-06-20 
 */
import { Loading } from 'element-ui';

let loadingCount = 0;
let loading;

const startLoading = () => {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.5)'
  });
};

const endLoading = () => {
  loading.close();
};

export const showLoading = () => {
  if (loadingCount === 0) {
    startLoading();
  }
  loadingCount += 1;
};

export const hideLoading = () => {
  if (loadingCount <= 0) {
    return;
  }
  loadingCount -= 1;
  if (loadingCount === 0) {
    endLoading();
  }
};