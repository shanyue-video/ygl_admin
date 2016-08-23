export default {
    insert(obj) {
        Meteor.call("banner_insert", obj, (err, result) => {
            console.log('err--->');
            console.log(err);
            console.log('result--->');
            console.log(result);
        });
    },
    update(obj, __id) {
        Meteor.call("banner_update", {obj, __id}, (err, result) => {
            console.log('err--->');
            console.log(err);
            console.log('result--->');
            console.log(result);
        });
    }
}
