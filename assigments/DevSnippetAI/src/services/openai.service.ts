import { getValue, KEYS } from "./secure-store.service";

export const explainWithOpenAI =
    async (code: string) => {

        const apiKey = await getValue(KEYS.OPENAI);
        console.log("using open ai key :  ", apiKey)

        const response =
            await fetch(
                "https://api.openai.com/v1/chat/completions",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization:
                            `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify({
                        model: "gpt-4o-mini",
                        messages: [
                            {
                                role: "user",
                                content:
                                    `Explain the following code.

IMPORTANT:
Return ONLY valid JSON.

{
  "summary": "",
  "explanation": "",
  "improvements": [],
  "bestPractices": []
}

Code:
${code}`,
                            },
                        ],
                    }),
                }
            );

        const data = await response.json();

        // console.log("OPENAI RESPONSE:", JSON.stringify(data, null, 2));
        return data.choices[0].message.content;
    };