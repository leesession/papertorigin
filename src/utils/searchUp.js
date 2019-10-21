//city
export function getCity() {
    return returnCitySN['cname']
}
//ip
export function getIp() {
    return returnCitySN['cip']
}
export function getBrowse() {  // 获取浏览器名
    var rMsie = /(msie\s|trident\/7)([\w\.]+)/;
    var rTrident = /(trident)\/([\w.]+)/;
    var rEdge = /(chrome)\/([\w.]+)/;//IE

    var rFirefox = /(firefox)\/([\w.]+)/;  //火狐
    var rOpera = /(opera).+version\/([\w.]+)/;  //旧Opera
    var rNewOpera = /(opr)\/(.+)/;  //新Opera 基于谷歌
    var rChrome = /(chrome)\/([\w.]+)/; //谷歌
    var rUC = /(chrome)\/([\w.]+)/;//UC
    var rMaxthon = /(chrome)\/([\w.]+)/;//遨游
    var r2345 =  /(chrome)\/([\w.]+)/;//2345
    var rQQ =  /(chrome)\/([\w.]+)/;//QQ
    //var rMetasr =  /(metasr)\/([\w.]+)/;//搜狗
    var rSafari = /version\/([\w.]+).*(safari)/;

    var ua = navigator.userAgent.toLowerCase();

    var matchBS, matchBS2;
    //IE 低版
    matchBS = rMsie.exec(ua);
    if (matchBS != null) {
        matchBS2 = rTrident.exec(ua);
        if (matchBS2 != null) {
            switch (matchBS2[2]) {
                case "4.0":
                    return {
                        browser:
                            "Microsoft IE",
                        version: "IE: 8"  //内核版本号
                    };
                    break;
                case "5.0":
                    return {
                        browser:
                            "Microsoft IE",
                        version: "IE: 9"
                    };
                    break;
                case "6.0":
                    return {
                        browser:
                            "Microsoft IE",
                        version: "IE: 10"
                    };
                    break;
                case "7.0":
                    return {
                        browser:
                            "Microsoft IE",
                        version: "IE: 11"
                    };
                    break;
                default:
                    return {
                        browser:
                            "Microsoft IE",
                        version: "Undefined"
                    };
            }
        } else {
            return {
                browser: "Microsoft IE",
                version: "IE:"+matchBS[2] || "0"
            };
        }
    }
    //IE最新版
    matchBS = rEdge.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
        return {
            browser: "Microsoft Edge",
            version: "Chrome/"+matchBS[2] || "0"
        };
    }
    //UC浏览器
    matchBS = rUC.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
        return {
            browser: "UC",
            version: "Chrome/"+matchBS[2] || "0"
        };
    }
    //火狐浏览器
    matchBS = rFirefox.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
        return {
            browser: "火狐",
            version: "Firefox/"+matchBS[2] || "0"
        };
    }
    //Oper浏览器
    matchBS = rOpera.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
        return {
            browser: "Opera",
            version: "Chrome/"+matchBS[2] || "0"
        };
    }
    //遨游
    matchBS = rMaxthon.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
        return {
            browser: "遨游",
            version: "Chrome/"+matchBS[2] || "0"
        };
    }
    //2345浏览器
    matchBS = r2345.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
        return {
            browser: "2345",
            version: "Chrome/ "+matchBS[2] || "0"
        };
    }
    //QQ浏览器
    matchBS = rQQ.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
        return {
            browser: "QQ",
            version: "Chrome/"+matchBS[2] || "0"
        };
    }
    //Safari（苹果）浏览器
    matchBS = rSafari.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
        return {
            browser: "Safari",
            version: "Safari/"+matchBS[1] || "0"
        };
    }
    //谷歌浏览器
    matchBS = rChrome.exec(ua);
    if ((matchBS != null) && (!(window.attachEvent))) {
        matchBS2 = rNewOpera.exec(ua);
        if (matchBS2 == null) {
            return {
                browser: "谷歌",
                version: "Chrome/"+matchBS[2] || "0"
            };
        } else {
            return {
                browser: "Opera",
                version: "opr/"+matchBS2[2] || "0"
            };
        }
    }
};

export function getBrowseData() {
    var appName = navigator.appName; //浏览器的正式名称
    var appVersion = navigator.appVersion; //浏览器的版本号
    var platform = navigator.platform; // 浏览器正在运行的操作系统平台，包括Win16(windows3.x)
    return `{appName:${appName},appVersion:${appVersion},platform:${platform}`
}

export function getDate() {
    var date = new Date();//实例一个时间对象；
    var year = date.getFullYear();//获取系统的年；
    var month = date.getMonth()+1;//获取系统月份，由于月份是从0开始计算，所以要加1
    var day = date.getDate();//获取系统日
    return `${year}-${month}-${day}`
}

export function getTime() {
    var date = new Date();//实例一个时间对象；
    var hour = date.getHours();//获取系统时间
    var minute = date.getMinutes(); //分
    var second = date.getSeconds();//秒
    return `${addZero(hour)}:${addZero(minute)}:${addZero(second)}`
}

function addZero(number){
    if(number<10)
        return '0'+number;
    else return number
}
