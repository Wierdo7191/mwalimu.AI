const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.generateAIResponse = async (prompt) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are Mwalimu AI, a helpful learning assistant for the Mwalimu Homeschooling platform. Provide clear, educational responses to help students with their questions." 
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating AI response:', error);
    return "I'm having trouble answering that right now. Please try again later.";
  }
};