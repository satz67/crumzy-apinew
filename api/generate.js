export default async function handler(req, res) {
    // 1. Headers to allow Framer to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const { prompt } = req.body;
        // If the user didn't type anything, use "Viral Content"
        const topic = prompt && prompt.trim() !== "" ? prompt : "Viral Content";

        // 2. The "Pseudo-AI" List
        const hooks = [
            `Stop scrolling! Here is the secret to ${topic}.`,
            `I tried ${topic} for 30 days and this happened...`,
            `3 mistakes you are making with ${topic} right now.`,
            `The ${topic} hack that feels illegal to know.`,
            `Why nobody is telling you the truth about ${topic}.`,
            `This is exactly how I mastered ${topic} in 24 hours.`,
            `The only ${topic} guide you will ever need.`,
            `POV: You just discovered the best way to do ${topic}.`
        ];

        // 3. Pick one at random
        const randomHook = hooks[Math.floor(Math.random() * hooks.length)];

        // 4. Send it back to Framer in the 'name' field
        return res.status(200).json({ name: randomHook });

    } catch (error) {
        return res.status(200).json({ name: "Oops! Try clicking again." });
    }
}
