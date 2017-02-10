export default {
    insert(obj) {
        Meteor.call("region_insert", obj, (err, result) => {
            console.log('err--->');
            console.log(err);
            console.log('result--->');
            console.log(result);
        });
    },
    insert_or_update(obj) {
        Meteor.call("region_insert_or_update", obj, (err, result) => {
            console.log('err--->');
            console.log(err);
            console.log('result--->');
            console.log(result);
        });
    }
}