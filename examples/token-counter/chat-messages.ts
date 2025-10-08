// Example: Chat Messages Token Counting
import { ChatTokenCounter } from '../../src/lib/token-counter';

// Initialize chat token counter
const chatCounter = new ChatTokenCounter('gpt-4o-mini');

// Example chat messages
const messages = [
  {
    role: 'system',
    content: 'You are a helpful assistant that provides weather information.'
  },
  {
    role: 'user',
    content: 'What is the weather like in San Francisco today?'
  },
  {
    role: 'assistant',
    content: 'I don\'t have access to real-time weather data, but I can help you find weather information through weather APIs or websites.'
  }
];

// Count tokens for the entire conversation
const totalTokens = chatCounter.countMessages(messages);
console.log(`Total tokens in conversation: ${totalTokens}`);

// Count individual message tokens
messages.forEach((message, index) => {
  const tokens = chatCounter.count(message.content);
  console.log(`Message ${index + 1} (${message.role}): ${tokens} tokens`);
});

// Clean up
chatCounter.free();