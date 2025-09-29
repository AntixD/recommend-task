const responses = [
  "I'll help you understand this concept. Let me break it down step by step. First, we need to consider the fundamental principles at play here. The architecture you're building relies on several key components working together seamlessly.",

  "That's an interesting question! From my analysis, there are multiple approaches we could take. Each has its own advantages and trade-offs. Let me outline the main options for you to consider.",

  "Based on what you've described, I recommend focusing on three key areas: performance optimization, user experience, and maintainability. These will provide the best foundation for your project.",

  'Let me explain this differently. Think of it like building blocks - each component serves a specific purpose. When combined properly, they create a robust and scalable system.',

  'Great follow-up question! Building on our previous discussion, we should also consider error handling, testing strategies, and documentation. These often-overlooked aspects are crucial for long-term success.',

  "To summarize our conversation so far: we've covered the basic architecture, implementation strategies, and best practices. The next step would be to create a proof of concept to validate these ideas.",
];

let responseIndex = 0;

export function getRandomResponse(): string {
  const response = responses[responseIndex % responses.length];
  responseIndex++;
  return response;
}

export function resetResponseIndex(): void {
  responseIndex = 0;
}
