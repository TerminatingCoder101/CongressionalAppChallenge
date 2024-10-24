const express = require('express');
const axios = require('axios');
const { OpenAI } = require('openai');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000; 

app.use(cors());
app.use(express.json());


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});


app.post('/api/gpt', async (req, res) => {
  const { answers } = req.body;

  if (!answers) {
    return res.status(400).json({ error: 'Answers are required' });
  }

  const questions = {
    question1: 'What is the date today (from memory) Day____ Month____ Year',
    question2: 'How many nickels are in 60 cents?',
    question3: 'You are buying $13.45 worth of groceries. How much in change do you receive back from a $20 bill?',
    question4: 'On the last question of the test, write "I am done."',
    question5: 'Do you have trouble making decisions even for everyday things such as what to eat, clothes to wear, making plans with family/friends, what to read?',
    question6: 'Do you have trouble focusing or concentrating while watching TV, playing on your phone/tablet, or listening to music?',
    question7: 'Do you forget the names of familiar objects and use general phrases such as "you know what I mean" or "that thing"?',
    question8: 'How many quarters are in $10?',
    question9: 'When talking, do you forget the point you are trying to make?',
    question10: 'Write down the names of 5 US states.'
  };

  const gptPrompt = `
    The patient provided the following answers to a cognitive test:
    - ${questions.question1}: ${answers.question1Answer.join(', ')}
    - ${questions.question2}: ${answers.question2Answer}
    - ${questions.question3}: ${answers.question3Answer}
    - ${questions.question4}: Answered ${answers.question4Answer ? 'Yes' : 'No'} 
    - ${questions.question5}: ${answers.question5Answer}
    - ${questions.question6}: ${answers.question6Answer}
    - ${questions.question7}: ${answers.question7Answer}
    - ${questions.question8}: ${answers.question8Answer}
    - ${questions.question9}: ${answers.question9Answer}
    - ${questions.question10}: ${answers.question10Answer}

    Based on these answers, can you assess whether the patient is likely to have dementia? Please return "True" if dementia is likely, or "False" otherwise.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: gptPrompt }],
      max_tokens: 50,
      temperature: 0,
    });
    console.log("POST reuqest recieved")
    console.log("response:", response.choices[0].message.content)
    res.json({ diagnosis: response.choices[0].message.content});
  } catch (error) {
    console.error('Error from OpenAI API:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

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
    console.error('Error fetching clinics:', error);
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
    console.error('Error fetching clinic details:', error);
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
    console.error('Error geocoding ZIP code:', error);
    res.status(500).json({ error: 'Failed to geocode ZIP code.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});