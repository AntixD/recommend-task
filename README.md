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
- **Testing**: Jest + React Testing Library

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd canvas-chat-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage

The application includes comprehensive test coverage for critical hooks:

#### `useChat` Hook Tests

- **Message Sending**: Verifies user messages are properly added to the store
- **Response Generation**: Ensures AI responses are generated and added correctly
- **Streaming Integration**: Tests integration with the streaming simulator
- **First Message Handling**: Validates the first message flag is properly managed
- **Error Handling**: Confirms streaming errors are caught and logged gracefully
- **Unique ID Generation**: Ensures each message gets a unique identifier
- **State Management**: Tests proper interaction with Zustand store

#### `useStreamingContent` Hook Tests

- **Null Editor Safety**: Handles cases when editor is not initialized
- **Focus Management**: Ensures editor focuses at the end when messages increase
- **Content Streaming**: Tests incremental content appending during streaming
- **Welcome Text Clearing**: Verifies initial placeholder is removed on first stream
- **Message Separators**: Tests proper insertion of separators between multiple messages
- **Scroll Behavior**: Validates auto-scroll to bottom during streaming
- **Reset Functionality**: Confirms proper cleanup when streaming completes

#### `useStreamSimulator` Hook Tests

- **Initialization State**: Verifies initial streaming state is false
- **Chunk Processing**: Tests text chunking and sequential processing
- **Custom Parameters**: Validates configurable chunk sizes and delays
- **Start/Stop Control**: Ensures streaming can be properly started and stopped
- **Concurrent Stream Handling**: Tests behavior when starting new stream while one is active
- **Store Integration**: Verifies proper updates to global state during streaming
- **Cleanup**: Confirms proper cleanup of timers and state on completion

### Testing Architecture

- **Mocking Strategy**: External dependencies (Zustand store, utilities) are mocked for isolation
- **Timer Control**: Uses Jest fake timers for deterministic testing of streaming delays
- **Act Wrapper**: Properly wraps state updates in `act()` for React Testing Library
- **Cleanup**: Each test is isolated with proper setup and teardown

## 🏗️ Architecture

### Project Structure

- **/components**: UI components organized by atomic design
  - **atoms**: Basic building blocks (Button, TextField)
  - **molecules**: Composed components (ChatMessage, EditorToolbar)
  - **organisms**: Complex components (ChatPanel, EditorContainer)
- **/hooks**: Custom React hooks for business logic
  - ****tests****: Comprehensive test suites for all hooks
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

## 📊 Code Quality

- **Type Safety**: Full TypeScript coverage
- **Testing**: Comprehensive unit tests for business logic hooks
- **Modularity**: Clean separation of concerns
- **Performance**: Optimized re-renders with Zustand selectors
- **Accessibility**: Semantic HTML and ARIA attributes
