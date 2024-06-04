import OpenAI from "openai";
import { ApiResponse } from "../utils/response.utils.js";
import { asyncHandler } from "../utils/async.utils.js";
import { checkImage } from "../utils/image.utils.js";

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY, // This is the default and can be omitted
});

function getCardAnalysisPrompt() {
    return `
      First, determine if the image provided is likely a business card. If it is, analyze the image and extract the information. Return the data in a structured JSON format like this {"fullName": "<Name on Card>", "companyName": "<Comapany on Card>", "email": "<Email on Card>", "mobile": "<Mobile on Card>", "address": "<Address on Card>"}:
      If it is not a business card, return a response with same JSON structure with empty string.
    `;
  }
 
const getDetails = asyncHandler(async (req, res) => {
    const { imageUrl } = req.query;
    if (!imageUrl) {
        return res.status(400).json(new ApiResponse(400, "Please provide an image URL"));
    }
    const imageCheck = await checkImage(imageUrl);
    if (!imageCheck) {
        return res.status(400).json(new ApiResponse(400, "The URL provided is not an image"));
    }

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: getCardAnalysisPrompt() },
              {
                type: "image_url",
                image_url: {
                  "url": imageUrl,
                },
              },
            ],
        },
        ],
      });
      console.log(response.choices[0].message.content);
    const responseText = response.choices[0].message.content;
    const jsonFormat = JSON.parse(responseText);

    return res
    .status(200)
    .json(
      new ApiResponse(200, jsonFormat)
    );
});

export { getDetails };