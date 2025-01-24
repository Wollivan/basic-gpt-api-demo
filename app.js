const responsesDiv = document.getElementById("responses");
const maxTokens = 200;
const model = "gpt-3.5-turbo-instruct";
const user = "1";
const temperature = 0.5;
const frequencyPenalty = 0.0;
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

async function chatReq(event) {
  event.preventDefault();
  const prompt = event.target.prompt.value;
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt,
      max_tokens: maxTokens,
      model,
      user,
      temperature,
      frequency_penalty: frequencyPenalty,
    }),
  });
  const data = await response.json();

  const responseP = document.createElement("p");
  responseP.textContent = data.choices[0].text;
  responsesDiv.appendChild(responseP);
}

document.querySelector("form").addEventListener("submit", chatReq);
