import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema({
  item: {
    type: String,
    required: true
  },
  date: Date,
  location: String
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);
export default Itinerary;
