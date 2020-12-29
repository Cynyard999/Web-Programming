

function checkRegister() {
    var user_name = document.getElementById("register_name");
    var email = document.getElementById("register_email");
    var pwd = document.getElementById("register_pwd");
    var re_pwd = document.getElementById("re_register_pwd");
    if (!checkName(user_name.value)) {
        console.log(user_name.value);
        //user_name.setCustomValidity("用户名不得少于4位，多于16位");
        alert("用户名不得少于4位，多于16位");
        return false;
    }
    if (!checkEmail(email.value)) {
        //email.setCustomValidity("请输入有效的邮箱地址");
        console.log(email.value);
        alert("请输入有效的邮箱地址");
        return false;
    }
    if (!checkPassword(pwd.value)) {
        //pwd.setCustomValidity("密码必须包含大小写字母以及数字");
        console.log(pwd.value);
        alert("密码必须包含大小写字母以及数字");
        return false;
    }
    if (!checkSame(pwd.value, re_pwd.value)) {
        //re_pwd.setCustomValidity("两次密码输入不一致");
        console.log(re_pwd.value);
        alert("两次密码输入不一致");
        return false;
    }
    return true;
}


function checkLogin() {
    var email = document.getElementById("login_email");
    if (!checkEmail(email.value)) {
        console.log(email.value);
        alert("请输入正确的邮箱格式");
        return false;
    }
    return true;
}


function checkEmail(email) {
    var ePattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    return ePattern.test(email);

}

function checkName(name) {
    var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
    return uPattern.test(name);
}

function checkPassword(pwd) {
    // 至少包含一个数字，一个大写字母，一个小写字母
    var pPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,}$/;
    return pPattern.test(pwd);
}

function checkSame(pwd1, pwd2) {
    return pwd1 === pwd2;
}


