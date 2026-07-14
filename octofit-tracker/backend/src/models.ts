import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
  fitnessLevel: string;
  teamId?: mongoose.Types.ObjectId;
}

export interface ITeam extends Document {
  name: string;
  sport: string;
  captainId: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
}

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  caloriesBurned: number;
  date: Date;
}

export interface ILeaderboardEntry extends Document {
  userId: mongoose.Types.ObjectId;
  totalPoints: number;
  rank: number;
}

export interface IWorkout extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  focus: string;
  durationMinutes: number;
  difficulty: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  fitnessLevel: { type: String, required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
});

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  sport: { type: String, required: true },
  captainId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: Number,
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  totalPoints: { type: Number, required: true },
  rank: { type: Number, required: true },
}, { collection: 'leaderboard' });

const workoutSchema = new Schema<IWorkout>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  focus: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
});

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export const Team: Model<ITeam> = mongoose.model<ITeam>('Team', teamSchema);
export const Activity: Model<IActivity> = mongoose.model<IActivity>('Activity', activitySchema);
export const Leaderboard: Model<ILeaderboardEntry> = mongoose.model<ILeaderboardEntry>('Leaderboard', leaderboardEntrySchema);
export const Workout: Model<IWorkout> = mongoose.model<IWorkout>('Workout', workoutSchema);
