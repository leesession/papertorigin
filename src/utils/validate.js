/**
 * @description 表单验证封装
 * @author WXF
 * @update 2019-06-20 
 */
export const regExp = {
	//10字符必填（同理20字符必填，50字符必填，1500字符必填）
	validateLen(rule, value, callback) {
	  let stringLen1 = /^[\s\S]{1,10}$/;
	  if (value === '') {
	    callback(new Error("请填写XXXX"));
	  } else if (!stringLen1.test(value)) {
	    callback(new Error("超过10字符限制"));
	  } else {
	    callback();
	  }
	},
	//手机号 （eg:138********,159********）
	validatePhone(rule, value, callback) {
		let regPhone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
		if (value === '') {
			callback(new Error("请输入手机号码"));
		} else if (!regPhone.test(value)) {
			callback(new Error("手机号格式错误"));
		} else {
			callback();
		}
	},
	//用户名 （eg:a123456）
	validateUserName(rule, value, callback) {
		let regUserName = /^[a-zA-Z][a-zA-Z0-9_]{6,20}$/;
		if (value === '') {
			callback(new Error("请输入登录账号"));
		} else if (!regUserName.test(value)) {
			callback(new Error("请输入以字母开头的，6-20位由字母、数字或下划线组成的登录账号"));
		} else {
			callback();
		}
	},
	//密码
	validatePassword(rule, value, callback) {
		let regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
		if (value === '') {
			callback(new Error("请输入密码"));
		} else if (!regPassword.test(value)) {
			callback(new Error("密码格式错误"));
		} else {
			callback();
		}
	},
	//邮箱
	validateEmails(rule, value, callback) {
		let regEmail = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
		if (value === '') {
			callback(new Error("请输入邮箱"));
		} else if (!regEmails.test(value)) {
			callback(new Error("邮箱格式错误"));
		} else {
			callback();
		}
	},
	//金额验证
	validateAmount(rule, value, callback) {
		let regAmount = /(^[0-9]{1,10}$)|(^[0-9]{1,10}[\.]{1}[0-9]{1,2}$)/;
		if (value === '') {
			callback(new Error("请输入注册资本"));
		} else if (!regAmount.test(value)) {
			callback(new Error("金额格式错误，最多允许输入10位整数及2位小数"));
		} else {
			callback();
		}
	},
	//身份证验证
	validateIdCard(rule, value, callback) {
		let regIdCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
		if (value === '') {
			callback();
		} else if (!regIdCard.test(value)) {
			callback(new Error("身份证号码格式错误"));
		} else {
			callback();
		}
	},
	//非零正整数验证
	validateNum(rule, value, callback) {
		let reg = /^\+?[1-9][0-9]*$/;
		if (value === '') {
			callback(new Error("请填写非零正整数"));
		} else {
			if (reg.test(value) == false) {
				callback(new Error('请输入非零的正整数'));
			} else {
				callback();
			}
		}
	},
	//银行卡
	validateBankCard(rule, value, callback) {
		let regBankCard = /^(\d{16}|\d{19})$/;
		if (value == '') {
			callback(new Error("请输入银行卡号"));
		} else {
			if (regBankCard.test(value) == false) {
				callback(new Error('银行卡号格式错误'));
			} else {
				callback();
			}
		}
	},
	//固话格式
	validateTel(rule, value, callback) {
		let regTel = /^(0\d{2,3}-?)?\d{7,8}$/;
		if (value == '') {
			callback(new Error("请输入座机号码"));
		} else {
			if (regTel.test(value) == false) {
				callback(new Error('座机号码格式错误'));
			} else {
				callback();
			}
		}
	}
	
	
	
}



