
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    Ename: { type: String, required: true, unique: true },
    Vname: { type: String, required: true },
    Edate: { type: Date, required: true },
});

module.exports = mongoose.model('Event', EventSchema);
