export default {
    insert(obj) {
        Meteor.call("news_insert", obj, (err, result) => {
            console.log('err--->');
            console.log(err);
            console.log('result--->');
            console.log(result);
        });
    },
    update(obj, __id) {
        Meteor.call("news_update", {obj, __id}, (err, result) => {
            console.log('news_update err--->');
            console.log(err);
            console.log('news_update result--->');
            console.log(result);
        });
    }
}
