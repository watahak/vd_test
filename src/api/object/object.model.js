import mongoose from 'mongoose';

const ObjectSchema = new mongoose.Schema({
    key: {
        type: String,
        required : true,
        unique : true
    },
    value: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required : true,
        unique : true
    }
});
ObjectSchema.index({ key: 1, timestamp: 1}, { unique: true });

const ObjectModel = mongoose.model('Object', ObjectSchema);

export default ObjectModel;
