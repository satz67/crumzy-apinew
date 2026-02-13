export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    // This script does NOT use OpenAI, so it cannot fail due to an API key
    const { prompt } = req.body;
    const testHook = `Debug Success! You typed: ${prompt || "nothing"}`;

    return res.status(200).json({ name: testHook });
}
