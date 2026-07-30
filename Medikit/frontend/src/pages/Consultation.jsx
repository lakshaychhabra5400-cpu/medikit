import { useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { Button, Card, Input } from '../components/Ui'

const initialMessages = [
  { id: 1, from: 'bot', text: 'Hello! I am your AI health guide. Describe your symptoms, medicines you are taking, or ask for precautions.' }
]

export default function Consultation() {
  const [messages, setMessages] = useState(initialMessages)
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)

  const addMessage = (message) => setMessages((current) => [...current, message])

  const handleSend = async (event) => {
    event.preventDefault()
    const trimmed = question.trim()
    if (!trimmed) return

    const userMessage = { id: Date.now(), from: 'user', text: trimmed }
    addMessage(userMessage)
    setQuestion('')
    setLoading(true)

    const simulatedResponse = generateBotResponse(trimmed)
    await new Promise((resolve) => setTimeout(resolve, 800))
    addMessage({ id: Date.now() + 1, from: 'bot', text: simulatedResponse })
    setLoading(false)
  }

  const getMedicineSuggestions = (text) => {
    if (text.includes('headache')) return ['Paracetamol', 'Ibuprofen', 'Aspirin (if not contraindicated)']
    if (text.includes('fever')) return ['Paracetamol', 'Ibuprofen', 'Cold compress']
    if (text.includes('cough')) return ['Cough syrup with dextromethorphan', 'Honey and warm liquids']
    if (text.includes('cold') || text.includes('flu')) return ['Vitamin C supplements', 'Zinc syrup', 'Steam inhalation']
    if (text.includes('stomach') || text.includes('acidity')) return ['Antacids', 'Proton pump inhibitor like omeprazole']
    return []
  }

  const generateBotResponse = (input) => {
    const text = input.toLowerCase()
    const suggestions = getMedicineSuggestions(text)

    if (text.includes('headache') || text.includes('fever')) {
      const base = 'It sounds like you may have a mild infection or stress-related headache. Stay hydrated, rest, and take pain relief as directed.'
      return suggestions.length
        ? `${base} Useful medicines for this condition may include: ${suggestions.join(', ')}.`
        : base
    }
    if (text.includes('cough')) {
      return `For cough symptoms, it may help to take medicines such as ${suggestions.join(', ')}. Keep your throat moist and rest.`
    }
    if (text.includes('cold') || text.includes('flu')) {
      return `These symptoms often respond to supportive care and medicines like ${suggestions.join(', ')}. Drink warm fluids and follow a light meal schedule.`
    }
    if (text.includes('stomach') || text.includes('acidity')) {
      return `For digestive discomfort, consider medicines like ${suggestions.join(', ')} and avoid spicy or oily foods. Eat small meals and stay hydrated.`
    }
    if (text.includes('medicine') || text.includes('dose')) {
      return 'Please tell me the medicine name and how you are currently taking it. I can then suggest if it looks like the usual routine or if you should ask your doctor for clarification.'
    }
    if (text.includes('precaution') || text.includes('avoid')) {
      return 'Keep a balanced diet, avoid skipping meals, and stay hydrated. If you are on medication, avoid alcohol and follow the timing carefully, especially before or after lunch as instructed.'
    }
    return 'Thanks for sharing. Can you tell me more about your symptoms, or the name of the medicine you are taking so I can guide you better on precautions and routine?'
  }

  return (
    <div className="page consultation-page">
      <div className="crumb">Home › AI Consultation</div>
      <div className="page-heading"><h1>1:1 AI Doctor Consultation</h1><p>Chat with a smart assistant for guidance on symptoms, medicines, and precautions.</p></div>
      <Card className="consultation-card">
        <div className="chat-list">
          {messages.map((message) => (
            <div key={message.id} className={`chat-message ${message.from}`}>
              <div className="chat-bubble"><p>{message.text}</p></div>
            </div>
          ))}
        </div>
        <form className="chat-form" onSubmit={handleSend}>
          <Input label="Ask the AI doctor" placeholder="Type your question..." value={question} onChange={(e) => setQuestion(e.target.value)} />
          <Button type="submit" disabled={loading}>{loading ? 'Thinking...' : <><FiSend /> Send</>}</Button>
        </form>
      </Card>
    </div>
  )
}
