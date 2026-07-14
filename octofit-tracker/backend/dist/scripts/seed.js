import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.insertMany([
            {
                name: 'Ava Chen',
                email: 'ava.chen@example.com',
                age: 16,
                fitnessLevel: 'Intermediate',
            },
            {
                name: 'Marcus Lee',
                email: 'marcus.lee@example.com',
                age: 17,
                fitnessLevel: 'Advanced',
            },
            {
                name: 'Sofia Patel',
                email: 'sofia.patel@example.com',
                age: 15,
                fitnessLevel: 'Beginner',
            },
        ]);
        const teams = await Team.insertMany([
            {
                name: 'Velocity Squad',
                sport: 'Running',
                captainId: users[0]._id,
                members: [users[0]._id, users[1]._id],
            },
            {
                name: 'Core Crushers',
                sport: 'Strength',
                captainId: users[2]._id,
                members: [users[2]._id],
            },
        ]);
        await User.updateMany({ _id: { $in: users.map((user) => user._id) } }, { $set: { teamId: teams[0]._id } });
        await Activity.insertMany([
            {
                userId: users[0]._id,
                type: 'Run',
                durationMinutes: 35,
                distanceKm: 5.2,
                caloriesBurned: 320,
                date: new Date('2026-07-12T06:30:00.000Z'),
            },
            {
                userId: users[1]._id,
                type: 'Strength',
                durationMinutes: 45,
                caloriesBurned: 410,
                date: new Date('2026-07-13T17:00:00.000Z'),
            },
            {
                userId: users[2]._id,
                type: 'Walk',
                durationMinutes: 25,
                distanceKm: 3.1,
                caloriesBurned: 180,
                date: new Date('2026-07-14T07:15:00.000Z'),
            },
        ]);
        await Leaderboard.insertMany([
            { userId: users[0]._id, totalPoints: 180, rank: 1 },
            { userId: users[1]._id, totalPoints: 160, rank: 2 },
            { userId: users[2]._id, totalPoints: 120, rank: 3 },
        ]);
        await Workout.insertMany([
            {
                userId: users[0]._id,
                title: 'Tempo Run',
                focus: 'Cardio',
                durationMinutes: 30,
                difficulty: 'Intermediate',
            },
            {
                userId: users[1]._id,
                title: 'Upper Body Power',
                focus: 'Strength',
                durationMinutes: 40,
                difficulty: 'Advanced',
            },
            {
                userId: users[2]._id,
                title: 'Beginner Mobility',
                focus: 'Recovery',
                durationMinutes: 20,
                difficulty: 'Beginner',
            },
        ]);
        const counts = {
            users: await User.countDocuments(),
            teams: await Team.countDocuments(),
            activities: await Activity.countDocuments(),
            leaderboard: await Leaderboard.countDocuments(),
            workouts: await Workout.countDocuments(),
        };
        console.log('Database seeding complete');
        console.log(JSON.stringify(counts, null, 2));
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
