import { Schema, model } from "mongoose";

const team_membersSchema = new Schema({
    image: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    Social: {
        type: Map,
        of: String
    },
    Portfolio_website: {
        type: String
    }
});

export default model("team_members_get", team_membersSchema);
