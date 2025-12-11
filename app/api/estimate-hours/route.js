// app/api/estimate-hours/route.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // important: NEXT_PUBLIC_ (public key)
  dangerouslyAllowBrowser: true, // only for client-side testing (production me better way hai)
});

export async function POST(req) {
  const { description, projectType } = await req.json();

  if (!description) {
    return Response.json({ hours: null, error: "No description" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert project estimator. Estimate total hours required for this project in numbers only (like 40 or 120). 
          Project type: ${projectType || "Not specified"}.
          Return ONLY a number, no text, no explanation.`
        },
        { role: "user", content: description }
      ],
      temperature: 0.3,
      max_tokens: 10
    });

    const hours = parseInt(completion.choices[0].message.content.trim()) || null;

    return Response.json({ hours });
  } catch (error) {
    console.error("OpenAI error:", error);
    return Response.json({ hours: null, error: error.message });
  }
}