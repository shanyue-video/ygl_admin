export default {
    sendMessage({Meteor}, wx_chart_history_id, message, role) {
        Meteor.call('wx.chart', {wx_chart_history_id, message, role}, (error, result) => {
            if(!error) {
                console.log('no error' + result);
            }
        });
    }
}
