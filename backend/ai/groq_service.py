from groq import Groq
from config.settings import settings


class GroqService:
    """Groq LLM service"""
    
    def __init__(self):
        self.client = Groq(api_key=settings.GROQ_API_KEY)
        self.model = settings.GROQ_MODEL
    
    def generate_response(self, messages: list, temperature: float = 0.7) -> str:
        """Generate response from Groq LLM"""
        try:
            completion = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=temperature,
                max_tokens=1024
            )
            return completion.choices[0].message.content
        except Exception as e:
            print(f"Error generating response: {str(e)}")
            return ""
