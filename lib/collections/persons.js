import {Mongo} from 'meteor/mongo';

const Persons = new Mongo.Collection('persons');

export default Persons;
