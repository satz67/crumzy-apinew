export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { prompt } = req.body;
        const topic = prompt || "Viral Content";

        // This talks to OpenAI instead of using a hard-coded list
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{
                    role: "system", 
                    content: "You are a viral hook expert. Generate one high-engagement hook for a video."
                }, {
                    role: "user", 
                    content: `Generate a viral hook about: ${topic}`
                }],
                max_tokens: 50,
            }),
        });

        const data = await response.json();
        const aiHook = data.choices[0].message.content.trim();

        return res.status(200).json({ name: aiHook }); // Sends the real AI hook back to Framer

    } catch (error) {
        return res.status(500).json({ error: 'AI failed to respond' });
    }
}
