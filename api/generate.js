export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const { prompt } = req.body;
        const topic = prompt || "Viral Content";

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { 
                        role: "system", 
                        content: `You are a viral hook expert. It is currently ${new Date().toISOString()}. Never repeat the same hook twice. Be creative and edgy.` 
                    },
                    { role: "user", content: `Generate a unique viral hook for: ${topic}` }
                ],
                temperature: 0.9, // Higher = more creative/random
                presence_penalty: 0.6, // Discourages repeating topics
            }),
        });

        const data = await response.json();
        const aiHook = data.choices?.[0]?.message?.content?.trim();

        return res.status(200).json({ name: aiHook || "Try again for a fresh hook!" });

    } catch (error) {
        return res.status(200).json({ name: "AI is refreshing... click again!" });
    }
}
