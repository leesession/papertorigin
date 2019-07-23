/**
 * 判断数组是否为空
 * @param arr  数组
 */
export const isEmpty = (arr) => {
	return !(arr !== undefined && arr !== null && arr.length > 0);
}

/**
 * 时间格式化
 * @param date  时间格式
 * @param fmt  格式
 */
export const formatDate = (date, fmt) => {
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	month = month < 10 ? "0"+ month : month;
	let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	let second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	if (fmt == 'YYYY-MM-DD') {
		return year + '-' + month + '-' + day;
	} else if (fmt == 'YYYY-MM-DD hh:mm') {
		return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
	} else{
		return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + second;
	}
}

