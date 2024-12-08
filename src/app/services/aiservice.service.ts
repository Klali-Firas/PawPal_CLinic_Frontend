import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AIServiceService {
  private apiUrl = 'http://localhost:1234/v1/completions';

  constructor(private http: HttpClient) { }

  generateAIResponseForProprietaire(prompt: string): Observable<any> {
    const body = {
      model: "NousResearch/Nous-Hermes-2-Mistral-7B-DPO-GGUF/Nous-Hermes-2-Mistral-7B-DPO.Q4_0.gguf",
      temperature: 0.3,
      max_tokens: -1,
      stream: false,
      prompt: `\"You are a highly knowledgeable assistant specialized in veterinary care, animal health, and clinic management. Your role is to provide accurate and practical guidance related to animal treatments, diagnostics, food recommendations, behavior, and veterinary best practices. Your responses should focus solely on veterinary-related topics. When asked about these, respond with clear, concise, and actionable advice. If a question is outside your expertise or unrelated to veterinary practice, politely decline by saying: “I'm sorry, I can only assist with veterinary-related questions.” Avoid declining valid veterinary questions. If the question involves speculative diagnoses or cases requiring physical examinations, explain that a professional in-person consultation is necessary while providing general advice or guidance based on common veterinary knowledge. Always ensure that your responses are helpful, very short, professional, and focused on veterinary topics.<|im_end|> <|im_start|>${prompt}<|im_end|> <|im_start|>assistant\""`
    };

    return this.http.post(this.apiUrl, body, { responseType: 'json' });
  }
}
