import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    fromUserId: { type: Number },
    fromUserName: { type: String },
    fromUserLastName: { type: String },
    toUserId: { type: Number },
    toUserFirstName: { type: String },
    text: { type: String },
    date: { type: Date },
    warning: { type: Boolean },
    warningDescription: { type: String },
    ban: { type: Boolean },
    banDescription: { type: String },
    mute: { type: Boolean },
    muteDescription: { type: String },
})

export const UserSchema = model('User', userSchema);