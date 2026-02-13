export default async function handler(req, res) {
    // 1. MUST HAVE THESE HEADERS TO STOP "CONNECTION ERROR"
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Content-Type');

    // 2. Handle the "Pre-flight" check
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 3. Simple Test Logic
    try {
        const { prompt } = req.body;
        return res.status(200).json({ 
            name: `Debug Success! You typed: ${prompt || "nothing"}` 
        });
    } catch (err) {
        return res.status(500).json({ name: "Server Error" });
    }
}
