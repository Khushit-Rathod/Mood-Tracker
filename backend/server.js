const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
// import OpenAI from 'openai';

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Create OpenAI API configuration
console.log('Initializing OpenAI API...');

const openai = new OpenAI({
  apiKey: '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', // Replace with your OpenAI API key
});
console.log('OpenAI API initialized successfully.');

// const openai = new OpenAIApi(configuration);

// Endpoint for generating insights
app.post('/insights', async (req, res) => {
  const { mood, description } = req.body;

  const prompt = `The user reported a mood of ${mood} with the description: "${description}". Provide insightful feedback to help them.`;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 100,
    });

    // Send the AI-generated insight back to the client
    res.json({ insight: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500).json({ error: 'Failed to generate insights' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
