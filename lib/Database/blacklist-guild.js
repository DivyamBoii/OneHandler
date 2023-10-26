const { model, Schema } = require("mongoose");

/**
 * @param {Guild} String - The Guild field likely represents the name or ID of the guild that has been blacklisted.
 * @param {Reason} String - When a guild is blacklisted, the Reason for that action would be stored in this field. This information could then be retrieved later to understand why that action was taken.
 * @param {Time} Number - The time when a guild was blacklisted. or The duration for which a guild is blacklisted. or A timestamp related to the guild.
 */

module.exports = model("blacklist-guild", new Schema(
    { Guild: { type: String }, Reason: { type: String }, Time: { type: Number } }
))