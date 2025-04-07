import axios from "axios";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const generateReportPrompt = (stocks: any[]): string => {
    const stockSummary = stocks.map(stock => `${stock.symbol}: ${stock.price}`).join(", ");
    return `Generate a daily stock report for the following stocks: ${stockSummary}.`;
};

export const generateReport = async (prompt: string): Promise<string> => {
    const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
            model: "gpt-4",
            prompt,
            max_tokens: 500,
        },
        {
            headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
        }
    );
    return response.data.choices[0].text;
};