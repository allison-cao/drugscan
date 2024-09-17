export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { imageData } = req.body;

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "gpt-4o-2024-08-06",
                    messages: [
                        {
                            role: "system",
                            content: "You are an assistant that helps recognize drugs in images and provides information on their addictiveness."
                        },
                        {
                            role: "user",
                            content: [
                                {
                                    type: "text",
                                    text: "what is this drug? is this drug addictive or not? i only want to know these two things"
                                },
                                {
                                    type: "image_url",
                                    image_url: {
                                        url: imageData
                                    }
                                }
                            ]
                        }
                    ],
                    max_tokens: 500,
                    response_format: {
                        type: "json_schema",
                        json_schema: {
                            name: "drug_response",
                            schema: {
                                type: "object",
                                properties: {
                                    drugs: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                name: {
                                                    type: "string",
                                                    description: "The name of the drug."
                                                },
                                                summary: {
                                                    type: "string",
                                                    description: "A brief summary about the drug's properties."
                                                },
                                                addictive_or_not: {
                                                    type: "boolean",
                                                    description: "Indicates whether the drug is addictive (true) or not (false)."
                                                }
                                            },
                                            required: ["name", "summary", "addictive_or_not"],
                                            additionalProperties: false
                                        }
                                    },
                                },
                                required: ["drugs"],
                                additionalProperties: false
                            },
                            strict: true
                        }
                    }
                })
            });  

            const data = await response.json();
            res.status(200).json({ message: data.choices[0].message.content });
        } catch (error) {
            console.error('Error recognizing drugs:', error);
            res.status(500).json({ error: 'Failed to recognize the drug(s). Please try again.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
