import { OPENAI_API_KEY } from '../config';

export async function generateWorksheet(transcript) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an educational content creator. Create an interactive worksheet based on the provided transcript. Include multiple choice questions, fill-in-the-blanks, and short answer questions.'
          },
          {
            role: 'user',
            content: `Create an educational worksheet from this transcript: ${transcript}`
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    throw new Error('Failed to generate worksheet: ' + error.message);
  }
}