import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-dGKrz9SNnnaNKL8kjdvYGKY8",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const question = req.body.question || '';
  if (question.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid question",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "curie:ft-personal:v0-1-2023-03-28-15-23-23",
      prompt: generatePrompt(question),
      temperature: 0.1,
      stop: ["###"],
      max_tokens: 100
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(question) {
  const suffix = "\n\n###\n\n"
  const question_trimmed = question.replace(/s+/g, ' ').trim();
  return `${question_trimmed}${suffix}`
}
