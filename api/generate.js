export default async function handler(req, res) {
    // 1. SECURITY HEADERS: These are the only way to stop "Connection Error" in Framer
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Content-Type');

    // 2. PRE-FLIGHT CHECK: Required by browsers before sending data
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 3. LOGIC: What happens when the button is clicked
    try {
        const { prompt } = req.body;
        const topic = prompt && prompt.trim() !== "" ? prompt : "Viral Content";

        // 4. TALK TO OPENAI
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a viral hook expert for Crumzy AI. Generate one short, high-energy hook." },
                    { role: "user", content: `Topic: ${topic}` }
                ],
                max_tokens: 60,
            }),
        });

        const data = await response.json();
        const aiHook = data.choices?.[0]?.message?.content?.trim();

        // 5. THE RESULT: This MUST be inside 'name' for Framer to see it
        if (aiHook) {
            return res.status(200).json({ name: aiHook });
        } else {
            // Backup if OpenAI is empty/no credits
            return res.status(200).json({ name: `🔥 How to 10x your results with ${topic}!` });
        }

    } catch (error) {
        // Even if everything breaks, send a 'name' field so Framer doesn't error
        return res.status(200).json({ name: "Success! (Using backup mode: Try checking your OpenAI Key)" });
    }
}
