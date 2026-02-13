export default async function handler(req, res) {
    // 1. HEADERS: Crucial for fixing "Connection Error"
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle Framer's "pre-flight" check
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow the Button's POST request
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { prompt } = req.body;
        // Use a default topic if the user left the input empty
        const topic = prompt && prompt.trim() !== "" ? prompt : "Viral Growth";

        // 2. OPENAI CALL: Sending the prompt to the AI brain
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a viral hook expert. Write one short, punchy sentence to grab attention." },
                    { role: "user", content: `Generate a viral hook for: ${topic}` }
                ],
                max_tokens: 60,
            }),
        });

        const data = await response.json();

        // 3. THE "NAME" FIX: Making sure the result is in the exact field Framer expects
        const aiResponse = data.choices?.[0]?.message?.content?.trim();
        
        if (!aiResponse) {
            // Backup hooks in case OpenAI fails or credits are empty
            const fallbacks = [
                `How to master ${topic} in 2026!`,
                `The secret to ${topic} nobody tells you.`,
                `Stop failing at ${topic} today.`
            ];
            const fallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
            return res.status(200).json({ name: fallback });
