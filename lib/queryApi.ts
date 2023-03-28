import openai from './chatgpt';

type QueryProps = {
  queryText: string;
  model: string;
};

const query = async ({ queryText, model }: QueryProps) => {
  const res = await openai
    .createCompletion({
      model,
      prompt: queryText,
      temperature: 0.9,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 1000,
    })
    .then((res) => {
      return res.data.choices[0].text;
    })
    .catch((err) => {
      return `ChatGPT was unable to return an answer at the moment. Error: ${err.message}`;
    });

  return res;
};

export default query;
