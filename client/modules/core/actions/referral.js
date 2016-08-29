export default {
    update_referral(re_id, doctor_id) {
        Meteor.call('notify_referral.send', {re_id, doctor_id}, (err, result) => {
            console.log('err--->');
            console.log(err);
            console.log('result--->');
            console.log(result);
        });
    }
}
