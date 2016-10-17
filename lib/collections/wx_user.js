import {Mongo} from 'meteor/mongo';

const WxUser = new Mongo.Collection('wx_user');

export default WxUser;
