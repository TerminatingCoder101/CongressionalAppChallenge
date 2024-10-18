const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/api/clinics', async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required.' });
  }

  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const radius = 10000;
    const type = 'hospital';

    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${radius}&type=${type}&key=${apiKey}`;

    const response = await axios.get(placesUrl);
    const places = response.data.results;

    res.json({ results: places });

  } catch (error) {
    console.log('Error fetching clinics:', error);
    res.status(500).json({ error: 'Failed to fetch clinics.' });
  }
});

app.get('/api/clinic-details', async (req, res) => {
  const { placeId } = req.query;

  if (!placeId) {
    return res.status(400).json({ error: 'Place ID is required.' });
  }

  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

    const response = await axios.get(detailsUrl);
    const details = response.data;

    res.json(details);

  } catch (error) {
    console.log('Error fetching clinic details:', error);
    res.status(500).json({ error: 'Failed to fetch clinic details.' });
  }
});

app.get('/api/geocode', async (req, res) => {
  const { zipCode } = req.query;

  if (!zipCode) {
    return res.status(400).json({ error: 'ZIP code is required.' });
  }

  try {
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&country=us&format=json`;
    const response = await axios.get(geocodeUrl);

    if (response.data.length === 0) {
      return res.status(404).json({ error: 'No location found for the provided ZIP code.' });
    }

    const { lat, lon } = response.data[0];
    res.json({ lat, lon });

  } catch (error) {
    console.log('Error geocoding ZIP code:', error);
    res.status(500).json({ error: 'Failed to geocode ZIP code.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
