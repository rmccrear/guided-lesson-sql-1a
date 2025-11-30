# SQL Guided Masterclass

An interactive, browser-based SQL learning platform featuring real-time query execution via SQLite (WASM) and an AI Tutor powered by Gemini.

## Running in GitHub Codespaces

1.  **Install Dependencies**
    Open the terminal in your Codespace and run:
    ```bash
    npm install
    ```

2.  **Configure API Key**
    You need a valid Gemini API Key from [Google AI Studio](https://aistudio.google.com/).
    
    Export it in your terminal session:
    ```bash
    export API_KEY=your_actual_api_key_here
    ```
    
    *Or create a `.env` file in the root directory:*
    ```env
    API_KEY=your_actual_api_key_here
    ```

3.  **Start the App**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Codespaces will detect the running port (usually 5173). Click the "Open in Browser" popup to view the application.

## Technologies
- **Vite**: Build tool and dev server
- **React**: UI Framework
- **SQLite (WASM)**: In-browser database engine
- **Gemini API**: AI Tutor integration
- **Tailwind CSS**: Styling
