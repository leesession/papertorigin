import xhr from '../utils/xhr.js'

export const http = {
    // 登录
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
    // 注册
    register(data, successFun) {
        xhr({
            method: 'post',
            url: '/login/registAccount',
            data: data,
            type: 'json'
        }).then(res => {
            successFun(res);
        });
    },
    // 查询浏览量、分享量
    getListNum(data, successFun) {
        xhr({
            method: 'post',
            url: '/management/getRecord',
            data: data,
            type: 'json'
        }).then(res => {
            successFun(res);
        });
    },
    // 更新浏览量、分享量
    addListNum(data, successFun) {
        xhr({
            method: 'post',
            url: '/management/updateRecord',
            data: data,
            type: 'json'
        }).then(res => {
            successFun(res);
        });
    },
    // 重置密码
    changePWDByOldPwd(data, successFun) {
        xhr({
            method: 'post',
            url: '/login/changePWDByOldPwd',
            data: data,
            type: 'json'
        }).then(res => {
            successFun(res);
        });
    },
    //发送邮箱短信
    sendCodeToMail(data, successFun) {
        xhr({
            method: 'post',
            url: '/login/sendCodeToMail',
            data: data,
            type: 'json'
        }).then(res => {
            successFun(res);
        });
    },
    //忘记密码 修改密码
    findPasswordByCode(data, successFun) {
        xhr({
            method: 'post',
            url: '/login/findPasswordByCode',
            data: data,
            type: 'json'
        }).then(res => {
            successFun(res);
        });
    },
    //用于下载pdf时
    downLoadPdfByUrl(data, successFun) {
        xhr({
            method: 'post',
            url: 'nonAuthorityQuery/downLoadPdfByUrl',
            data: data,
            type: 'json'
        }).then(res => {
            successFun(res);
        });
    },


    // 查询主页面选项的值
    search(data, successFun) {
        xhr({
            method: 'GET',
            url: '/metadata/json',
            data: data,
        }).then(res => {
            successFun(res);
        });
    },


}
