# Slope Checkout Demo
## Overview
This is a Node.js + ReactJS single page web app that demonstrates a basic implementation for
integrating with the Slope APIs & JS SDK. It provides example setup user checkout flow end to end
to help developers get started quickly & easily.
## Setup
### Requirements
- nodejs (tested on v14+)
- npm (tested on v6+)

### Development
- Add `BASIC_AUTH_TOKEN={YOUR_BASE_64_BASIC_AUTH}` to a `.env.local` file on the root folder. See 
https://developers.slope.so/docs/authentication for help. Then run:
- Run `npm install && npm run dev` 
- Open up [http://localhost:3004](http://localhost:3004) and you're good to go!

### Sandbox Environment Testing

For testing with the Slope frontend checkout service running locally:

```bash
BASIC_AUTH_TOKEN=your_token_here NEXT_PUBLIC_PUBLIC_KEY=pk_sndbx_62590d4d470c46c3a7dea3145af8dad0675d687ec9b749f889f125fff1e90b22 NEXT_PUBLIC_CHECKOUT_HOST=http://localhost:4203 npm run dev
```

**Important Testing Notes:**
- The "Pay later with Slope" button is located at the bottom of the page in the Payment section
- You must scroll down to access the payment button for testing
- The BASIC_AUTH_TOKEN is required for successful API authentication in sandbox environment
- Ensure the frontend checkout service is running on port 4203 before testing

## Help
Visit [https://developers.slope.so/](https://developers.slope.so/) for developer support
