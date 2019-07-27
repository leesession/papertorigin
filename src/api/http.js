import xhr from '../utils/xhr.js'

export const http = {
	//登录
	login(data, successFun) {
		xhr({
			method: 'post',
			url: '/login/loginAccount',
			data: data,
			type: 'json'
		}).then(res => {
			successFun(res);
		});
  },
  test(data, successFun) {
		xhr({
			method: 'get',
			url: '/login/testget',
			data: data,
			type: 'json'
		}).then(res => {
			successFun(res);
		});
  }
  
}