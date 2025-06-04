export async function analyzeCode(task, code, language = 'javascript') {
  const API_URL = ``; // Example endpoint
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_AI_KEY}`
    },
    body: JSON.stringify({
      model: "deepseek-coder",
      messages: [
        {
          role: "system",
          content: `Analyze this ${language} code. Respond with JSON format: {output: string, error: string, suggestion: string}`
        },
        {
          role: "user",
          content: `Task: ${task}\n\nCode:\n${code}`
        }
      ],
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) throw new Error('API request failed');
  
  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}