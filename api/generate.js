export default async function handler(req, res) {
    // 1. FIX CONNECTION ERROR: Allow Framer to talk to Vercel
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); // This allows any site to call the API
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle the pre-flight check (Framer sends this first)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests from your button
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // 2. GET THE DATA: Capture what the user typed in the box
        const { prompt } = req.body;
        
        // Fallback if the input box was empty
        const topic = prompt && prompt.trim() !== "" ? prompt : "Viral Content";

        // 3. THE MAGIC: Your Viral Hook Templates
        const ideas = [
            `🔥 How to master ${topic} in 30 seconds`,
            `❌ Stop doing this if you want to succeed at ${topic}`,
            `🤫 The secret truth about ${topic} they won't tell you`,
            `🚀 Why ${topic} is the future of content in 2026`,
            `💡 3 simple steps to 10x your results with ${topic}`
        ];

        // Pick a random one from the list
        const randomHook = ideas[Math.floor(Math.random() * ideas.length)];

        // 4. THE RESULT: Send it back to Framer
        return res.status(200).json({
            name: randomHook
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to generate idea' });
    }
}
