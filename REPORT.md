# OpenAI GPT-3 Fine-Tuning Report
## Key Capabilities 
- Complete one-time task (cannot be in conversational format)
- Provide answer from dataset trained from the Internet up to Sept 2021 
- Train on new set of completion to answer more question
- Can utilizes gpt-3 models (ada, babbagem, curie, davinci) up to 2,049 tokens (about 1,500 words)
- Lower latency compared to non-fine-tuned models

## Potential Downsides
- If the question can be answered with data trained from the Internet. It is likely to provide that answer since it has been learned with higher confidence than the customized answers we provided. So only a few unique questions will result in answer as we provided.
- Require large amount of data for the model to perform accurately (300+ prompts)
- Even with large pools of training data, there's no guarantee that the model will return answers as we provided.
  - [This person trained on 1000 prompts and still got non-factual answer](https://community.openai.com/t/qa-fine-tuned-chatbot-not-answering-from-the-trained-data-but-nonfactual/21999?page=2)
  - [Similar case](https://community.openai.com/t/qa-fine-tuned-chatbot-not-answering-from-the-trained-data-but-nonfactual/21999?page=2)
- Guarding (the bot saying it doesn't know when it doesn't) requires training
  - E.g. Will COVID-19 worsen my autism?
    - It's unlikely there's such information occured on the Internet as well as in provided prompts.
    - Ideally it should say it doesn't know. But oftentime it proceeds give a non-factual answer
    - We can train it to say "I don't know", which means more data to needed

## Future Actions
- I think it wise to reach out to some people who attempted or successfully implemented fine-tuning for specialized tasks such as ours. It does not seems as straightforwards when similar information is also available on the Internet.
- We might need to consider other models with less volatilities. They might meet our needs better by providing answer close to training set.
- Considering [Embedding](https://platform.openai.com/docs/guides/embeddings/what-are-embeddings). 
  - This features measures similarity between two sentences.
  - We can find the prompts in our question bank, that is more similar to the question asked by users, and provide the answer.
- If continuing with fine-tuning, more training data, and data to teach it how to say "I don't know" is needed.