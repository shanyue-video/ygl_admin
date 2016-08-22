import {facc} from '/lib/model'

export default {
    login({}, userName, password) {
        Meteor.call('account_login_with_tel.sample', {
            "tel": userName,
            "password": password
        }, function(error, result) {
            if (typeof result == "object") {
                facc.set(result);
                alert(result.nickname + ',欢迎回来');
                facc.backto();
            } else if (result == "ERROR_RIGHT") {
                alert('权限不足');
            } else {
                alert('用户名/密码不匹配');
            }
        });
    }
}
