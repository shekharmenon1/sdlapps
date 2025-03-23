
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const EventSchema = new mongoose.Schema({
    Ename: { type: String, required: true, unique: true },
    Vname: { type: String, required: true, unique: true },
    Edate: { type: Date, required: true },
});

EventSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('Event', EventSchema);
