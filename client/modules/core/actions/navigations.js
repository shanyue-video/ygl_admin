export default {
    urlGo({Meteor, FlowRouter}, key) {
        FlowRouter.go('/' + key);
    }
}
