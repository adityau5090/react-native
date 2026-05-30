import {getValue,KEYS} from "./secure-store.service";

import {explainWithOpenAI} from "./openai.service";

import {
  explainWithGemini,
} from "./gemini.service";

export const explainCode =
  async (code: string) => {

    const provider =
      await getValue(
        KEYS.PROVIDER
      );

    if (provider === "gemini") {
      return explainWithGemini(
        code
      );
    }

    return explainWithOpenAI(
      code
    );
  };