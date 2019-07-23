import xhr from '../utils/xhr.js'

export const home = {
	//登录
	login(data, successFun) {
		xhr({
			method: 'post',
			url: '/financial/sysUser/login',
			data: data,
			type: 'json'
		}).then(res => {
			successFun(res);
		});
	}
}