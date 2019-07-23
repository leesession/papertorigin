/**
 * @description dialog封装
 * @author WXF
 * @update 2019-06-20 
 */
import { Message, MessageBox } from 'element-ui';

export const dialog = {
  //成功提示
  success: function(msg) {
    Message.success({
      showClose: true,
      message: msg || '操作成功',
      type: 'success',
      closeOnClickModal: false
    });
  },
  //错误提示
  error: function(msg) {
    Message.error({
      showClose: true,
      message: msg || '操作失败',
      type: 'error',
      closeOnClickModal: false
    });
  },
  //警告提示
  warning: function(msg) {
    Message.warning({
      showClose: true,
      message: msg || '系统警告',
      type: 'warning',
      closeOnClickModal: false
    });
  },
  //小提示
  tips: function(msg) {
    Message({
      showClose: true,
      message: msg || '系统提示',
      closeOnClickModal: false
    });
  },
  /**
   * 确认提示框
   * @param vm vue实例
   * @param msg 提示信息
   * @param confirmCallback 确认回调
   * @param cancelCallback 取消回调
   */
  confirm: function(msg, confirmCallback, cancelCallback) {
    MessageBox.confirm(msg, '系统提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      closeOnClickModal: false
    }).then(function() {
      confirmCallback();
    }).catch(function() {
      if (cancelCallback) {
        cancelCallback();
      }
    });
  }
};
