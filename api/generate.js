export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const { prompt } = req.body;
        const topic = prompt && prompt.trim() !== "" ? prompt : "Viral Content";

        const hooks = [
            // The "Mistake" Style
            `Stop doing ${topic} the old way. You're losing followers.`,
            `3 ${topic} mistakes that are killing your growth.`,
            `I bet you didn't know this ${topic} hack...`,
            
            // The "Secret/Success" Style
            `How I mastered ${topic} in just 7 days (Step-by-step).`,
            `The secret ${topic} tool the pros don't want you to find.`,
            `This ${topic} strategy feels like a cheat code.`,
            
            // The "POV/Relatable" Style
            `POV: You finally figured out the ${topic} algorithm.`,
            `That moment when ${topic} actually starts working for you.`,
            `Is it just me, or is ${topic} getting harder every day?`,
            
            // The "Challenge" Style
            `I challenge you to try this ${topic} routine for 24 hours.`,
            `The $0 way to start ${topic} from scratch in 2026.`,
            `Can we talk about how ${topic} is changing the game?`
        ];

        const randomHook = hooks[Math.floor(Math.random() * hooks.length)];

        // Log the success for your Vercel dashboard
        console.log(`Generated hook for topic: ${topic}`);

        return res.status(200).json({ name: randomHook });

    } catch (error) {
        return res.status(200).json({ name: "Connection stable! Click again." });
    }
}
