import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    role: { type: String, default: 'user', enum: ['user', 'vendor', 'admin',] },
    avatar: { type: String },
    bio: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    lastLoginAt: { type: Date },
});




userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


export default mongoose.model('User', userSchema);
