export default async function handler(req, res) {
    // Only allow POST requests as your Framer setup expects
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { prompt } = req.body;

        // This is a simple logic example. 
        // You can later connect this to OpenAI.
        const ideas = [
            `How to master ${prompt} in 30 seconds`,
            `The secret truth about ${prompt} they won't tell you`,
            `Stop doing this if you want to succeed at ${prompt}`
        ];

        // We return "name" because your Framer Fetch path was looking for "name"
        return res.status(200).json({ 
            name: ideas[Math.floor(Math.random() * ideas.length)] 
        });
        
    } catch (error) {
        return res.status(500).json({ error: 'Failed to generate idea' });
    }
}
