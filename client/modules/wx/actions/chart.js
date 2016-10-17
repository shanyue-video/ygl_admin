export default {
    sendMessage({Meteor}, wx_chart_history_id, message) {
        Meteor.call('wx.chart', {wx_chart_history_id, message}, (error, result) => {
            if(!error) {
                console.log('no error' + result);
            }
        });
    }
}
