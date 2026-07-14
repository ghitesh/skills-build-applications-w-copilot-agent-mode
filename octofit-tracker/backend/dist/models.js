import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    fitnessLevel: { type: String, required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
});
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    sport: { type: String, required: true },
    captainId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});
const activitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: Number,
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});
const leaderboardEntrySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    totalPoints: { type: Number, required: true },
    rank: { type: Number, required: true },
}, { collection: 'leaderboard' });
const workoutSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    focus: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true },
});
export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const Leaderboard = mongoose.model('Leaderboard', leaderboardEntrySchema);
export const Workout = mongoose.model('Workout', workoutSchema);
