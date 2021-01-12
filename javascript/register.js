$(document).ready(function () {
    var username = $("#username");
    var password = $("#password");
    var confirmPassword = $("#confirm-password");
    var email = $("#email-address");

    email.on("change", function () {
        emailFormatVerification(email.val());
    });

    password.on("change", function () {
        checkLegal(password.val());
    });

    confirmPassword.on("change", function () {
        checkEqual(password.val(), confirmPassword.val());
    });

    var identifiedCodeBtn = $("#getPass-btn");

    identifiedCodeBtn.on("click", function () {
        var email_value = email.val();

        var time = 30;

        if(email_value !== ""){
            var timerH = setInterval(function () {
                if (time === 0) {
                    identifiedCodeBtn.html("重新获取验证码");
                    clearInterval(timerH);
                } else {
                    identifiedCodeBtn.html("(" + time + ")s");
                    time--;
                }
            }, 1000);

            // 构造params，方便传给后台
                var params = {};
                params.email_add=email_value;
                //ajax的type,url,dataType,contentType,data属性
                $.ajax({
                    async : false,
                    cache : false,
                    type : 'POST',
                    url : 'xxx',   //后台收到请求加以处理
                    dataType : "json",
                    data : params,
                    error : function (data) {    //后台返回值就是data  带有result等属性 一般是Map
                        alert("Error! Can not send mail. "+data.result)
                    },
                    success : function (data) {
                            alert(data.result);  //弹出正确窗口
                            real_pass = data.key;   //设置验证码赋值给real_pass
                    }
                })

        }
    });
});

function checkEqual(password, confirm_password){
    if (confirm_password.length === 0){
        toast("确认密码错误", "确认密码不能为空", "notice");
    }
    if (password !== confirm_password){
        toast("确认密码错误", "与设定密码不符", "error");
    }
    else{
        toast("确认密码正确", "符合要求", "error");
    }
}

function checkLegal(password){
    if (password.length === 0){
        toast("密码错误", "密码不能为空", "notice");
    }
    else if ((password.length > 0 && password.length < 6) || password.length > 16){
        toast("密码错误", "密码过长或过短", "error");
    }
    else{
        toast("密码无误", "密码格式符合要求", "success");
    }
}

function emailFormatVerification(val) {
    if (val === null || val === "") {
        toast("邮箱错误", "邮箱不能为空", "notice");
        return false;
    }
    var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var domains = ["qq.com", "163.com", "vip.163.com", "263.net", "yeah.net", "sohu.com", "sina.cn", "sina.com", "eyou.com", "gmail.com", "hotmail.com", "42du.cn"];
    if (pattern.test(val)) {
        var domain = val.substring(val.indexOf("@") + 1);
        for (var i = 0; i < domains.length; i++) {
            if (domain === domains[i]) {
                toast("邮箱无误", "邮箱格式符合要求", "success");

            }
        }
    }
    toast("邮箱错误", "邮箱格式错误", "error");
    return false;
}

// error info success warning notice
function toast(title, message, type){
    $.Toast(title, message, type, {
        stack: true,
        has_icon:true,
        has_close_btn:true,
        fullscreen:false,
        timeout:2000,
        sticky:false,
        has_progress:true,
        rtl:false,
    });
}