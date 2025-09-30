# Canvas Chat Editor

A modern document editor with AI chat integration built with React 19, Next.js 15, and TipTap.

## 🚀 Features

- **Live Chat Interface**: ChatGPT-like interface with simulated LLM responses
- **Real-time Streaming**: Responses stream into the editor with realistic typing animation
- **Rich Text Editing**: Full-featured editor powered by TipTap
- **State Management**: Zustand for efficient global state management
- **Modern UI**: Material-UI components with Tailwind CSS styling
- **Preview Mode**: View-only mode for document preview
- **Modular Architecture**: Atomic design pattern (atoms/molecules/organisms)

## 📦 Tech Stack

- **Framework**: Next.js 15 with React 19
- **Editor**: TipTap (ProseMirror-based)
- **State**: Zustand
- **UI**: Material-UI + Tailwind CSS
- **Language**: TypeScript
- **Styling**: Emotion + Tailwind

## 🛠️ Installation

1. Clone the repository:
   \`\`\`bash
   git clone [repository-url]
   cd canvas-chat-app
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Run development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000)

## 🏗️ Architecture

### Project Structure

- **/components**: UI components organized by atomic design
  - **atoms**: Basic building blocks (Button, TextField)
  - **molecules**: Composed components (ChatMessage, EditorToolbar)
  - **organisms**: Complex components (ChatPanel, EditorContainer)
- **/hooks**: Custom React hooks for business logic
- **/store**: Zustand store for global state
- **/utils**: Utility functions (text chunking, mock responses)
- **/types**: TypeScript type definitions

### State Management

Global state is managed via Zustand with clear separation:

- **Chat State**: Messages, streaming status
- **Editor State**: Content, editable status, streaming content
- **UI State**: Focus management

### Data Flow

1. User sends message in ChatPanel
2. Message stored in Zustand store
3. Mock LLM response generated
4. Response streams to EditorContainer via chunks
5. Editor updates with live typing animation
6. User can edit the streamed content

### Streaming Implementation

- Text chunked into configurable word groups
- Variable delays between chunks for natural feel
- State management prevents race conditions
- Editor maintains cursor position during streaming

## 🎯 Key Features Implementation

### Live Typing Stream

- Configurable chunk size (default: 3-5 words)
- Variable delay between chunks (80-120ms)
- Smooth append to editor without flickering
- Maintains formatting during stream

### Editor Features

- Bold, Italic, Lists, Headings
- Code blocks and blockquotes
- Undo/Redo functionality
- Placeholder text
- Auto-focus management

### Chat Features

- Message history with timestamps
- User/Assistant message styling
- Auto-scroll to latest message
- Loading indicators during streaming
- Input disabled during streaming

### Basic Workflow

1. Application loads with chat panel focused
2. Type a message in the chat input
3. Press Enter or click Send
4. Watch as response streams into editor
5. Edit the streamed content as needed
6. Click Preview to see read-only version
