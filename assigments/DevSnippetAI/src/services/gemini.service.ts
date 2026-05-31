import { getValue, KEYS } from "./secure-store.service";

export const explainWithGemini = async (code: string) => {

    const apiKey = await getValue(KEYS.GEMINI);
    // console.log("Using gemini api key : ", apiKey)
    
    const response =
      await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text:
                      `Explain this code:\n${code}`,
                  },
                ],
              },
            ],
          }),
        }
      );

    const data =
      await response.json();

    return data
      ?.candidates?.[0]
      ?.content?.parts?.[0]
      ?.text;
  };