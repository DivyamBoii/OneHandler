const { model, Schema } = require("mongoose");

/**
 * @param {User} String - The User field likely represents the name or ID of the User that has been blacklisted.
 * @param {Reason} String - When a User is blacklisted, the Reason for that action would be stored in this field. This information could then be retrieved later to understand why that action was taken.
 * @param {Time} Number - The time when a User was blacklisted. or The duration for which a User is blacklisted. or A timestamp related to the User.
 */

module.exports = model("blacklist-user", new Schema(
    { User: { type: String }, Reason: { type: String }, Time: { type: Number } }
))