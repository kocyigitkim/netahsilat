# Netahsilat

Netahsilat wrapper for Node.JS

# Installation

    npm install netahsilat

# Usage

HPMExpressMiddleware is middleware for express.js. You can define payment process, success, fail pages with it.

- usePaymentProcess - Defines payment process.
  - action - You can modify payment parameters with this function.
- usePaymentSuccess - Defines payment success page.
  - action - Its for view payment success state and process the payment as completed.
- usePaymentFailed - Defines payment failure page.
  - action - You can view payment failure state and process the payment as failed.
