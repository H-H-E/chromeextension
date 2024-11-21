
# YouTube Interactive Worksheet Generator

A Chrome Extension (manifest v3) that generates interactive educational worksheets from YouTube video transcripts using OpenAI's GPT-4 technology. This extension helps educators and learners create engaging learning materials from educational videos.

## Features

- Automatic transcript extraction from YouTube videos
- AI-powered worksheet generation with multiple question types:
  - Multiple choice questions
  - Fill-in-the-blanks
  - Short answer questions
- PDF export functionality
- Worksheet sharing capabilities
- Support for multiple languages (auto-detects available transcripts)

## Installation

1. Clone this repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenAI API key:
```bash
OPENAI_API_KEY=your_api_key_here
```

4. Build the extension:
```bash
npm run build
# or for production
npm run build-release
```

5. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` directory from this project

## Usage

1. Navigate to any YouTube video
2. Click the "Interactive Worksheet Generator" button in the sidebar
3. Select your preferred language if multiple transcripts are available
4. Click "Generate Worksheet" to create an interactive worksheet
5. Use the "Export PDF" button to download the worksheet
6. Share the worksheet using the "Share" button

## Development

The extension is built using:
- Manifest V3
- OpenAI GPT-4 API
- Webpack
- HTML2Canvas & jsPDF for PDF generation

To contribute:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## Security & Privacy

- API keys are stored securely using Chrome's storage API
- All API calls are made directly to OpenAI's servers
- No user data is stored or transmitted except for video transcripts
- Worksheet generation is performed client-side

## Limitations

- Requires videos to have closed captions/transcripts available
- API usage is subject to OpenAI's rate limits and pricing
- PDF export quality depends on worksheet content and formatting

## Support

For issues, feature requests, or contributions, please:
1. Check existing GitHub issues
2. Create a new issue if needed
3. Include browser version and steps to reproduce any bugs

## License

This project is licensed under the MIT License - see the LICENSE file for details.