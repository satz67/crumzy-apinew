export default async function handler(req, res) {
    // These 4 lines are MANDATORY to stop the Connection Error
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const { prompt } = req.body;
        // This is what Framer is looking for
        return res.status(200).json({ 
            name: `Success! I see your prompt: ${prompt || "Empty"}` 
        });
    } catch (err) {
        return res.status(200).json({ name: "Server connected!" });
    }
}
