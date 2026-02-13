import { Data, Override } from "framer"

const data = Data({
    hookResult: "Your viral hooks will appear here...",
    userPrompt: "",
})

export function GetInput(): Override {
    return {
        onValueChange: (value) => {
            data.userPrompt = value
        },
    }
}

export function GetHookButton(): Override {
    return {
        onTap: async () => {
            console.log("Button Clicked!") // Check this in your browser console
            data.hookResult = "Wait... calling Vercel..."
            
            try {
                const response = await fetch("https://crumzy-apinew.vercel.app/api/generate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt: data.userPrompt }),
                })
                const result = await response.json()
                data.hookResult = result.name // This updates the text layer
            } catch (error) {
                data.hookResult = "Connection failed."
            }
        },
    }
}

export function DisplayHook(): Override {
    return {
        text: data.hookResult, // This is what forces the screen to change
    }
}
