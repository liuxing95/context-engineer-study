// Example: Basic Token Counter Usage
import { TokenCounter } from '../../src/lib/token-counter';

// Basic usage example
const counter = new TokenCounter('gpt-4o-mini');

// Count tokens in a simple text
const text = "Hello, world! This is a sample text.";
const tokenCount = counter.count(text);
console.log(`Token count: ${tokenCount}`);

// Calculate cost for input/output
const inputText = "What is the weather like today?";
const outputText = "Today's weather is sunny with a temperature of 75°F.";
const costAnalysis = counter.calculateCost(inputText, outputText);

console.log('Cost Analysis:', costAnalysis);
// Output: Cost Analysis: {
//   inputTokens: 8,
//   outputTokens: 13,
//   totalTokens: 21,
//   inputCost: 0.00024,
//   outputCost: 0.00078,
//   totalCost: 0.00102
// }

// Don't forget to free memory when done
counter.free();