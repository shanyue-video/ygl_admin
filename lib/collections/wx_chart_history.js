import {Mongo} from 'meteor/mongo';

const WxChartHistory = new Mongo.Collection('wx_chart_history');

export default WxChartHistory;
