import mongoose, { SchemaType, Types } from "mongoose";
import { Schema } from 'mongoose'

const UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true, unique:  true},
})

export const User = mongoose.model('Users', UserSchema);

const TagsSchema = new Schema({
    title: {type: String, required: true, unique: true},
})

export const Tag = mongoose.model('Tag', TagsSchema);


const ContentSchema = new Schema({
    link: {type: String, required: true},
    type: {type: String, required: true},
    title: {type: String, required: true},
    tags: {type: Types.ObjectId, ref:Tag,},
    userId: {type: Types.ObjectId, ref: User},
})

export const Content = mongoose.model('Content', ContentSchema);

const LinkSchema = new Schema({
    hash: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: User, required: true},
})

export const Link = mongoose.model('Link', LinkSchema);
