const axios = require("axios");

// Determine if using Ollama (free local) or OpenAI (paid cloud)
const USE_OLLAMA = process.env.USE_OLLAMA === "true";
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "mistral"; // Fast & good quality
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Helper for Ollama API calls
async function _makeOllamaCall(prompt, model) {
  const response = await axios.post(
    `${OLLAMA_BASE_URL}/api/generate`,
    {
      model,
      prompt,
      stream: false,
    }
  );
  return response.data.response;
}

// Helper for OpenAI API calls
async function _makeOpenAICall(prompt, model) {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model,
      messages: [{ role: "system", content: prompt }],
      temperature: 0.2,
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.choices[0].message.content;
}

/**
 * Call the LLM with a prompt.
 * If USE_OLLAMA=true, uses local free Ollama model.
 * Otherwise, attempts OpenAI with fallback.
 */
const callLLM = async (prompt) => {
  if (USE_OLLAMA) {
    // Use free local Ollama model - no API key needed
    return await _makeOllamaCall(prompt, OLLAMA_MODEL);
  }

  // Fallback to OpenAI (original behavior)
  if (!OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY not set and USE_OLLAMA not enabled. " +
      "Set USE_OLLAMA=true to use free local Ollama, or provide OPENAI_API_KEY for cloud API."
    );
  }

  // try first with higher‑tier model
  try {
    return await _makeOpenAICall(prompt, "gpt-4o-mini");
  } catch (err) {
    const status = err?.response?.status;
    // if we hit rate limit or model unavailable, try cheaper fallback
    if (status === 429 || status === 400 || status === 404) {
      try {
        return await _makeOpenAICall(prompt, "gpt-3.5-turbo");
      } catch (err2) {
        // bubble original error if fallback also fails
        throw err;
      }
    }
    // other errors propagate
    throw err;
  }
};

module.exports = { callLLM };
