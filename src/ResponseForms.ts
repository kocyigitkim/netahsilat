export const PaymentFailedResponseForm = (title: string, message: string) => {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
      rel="stylesheet"
    />

    <title>${title}</title>
    <style>
      body {
        font-family: "Roboto", sans-serif;
      }

      .error-container {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: whitesmoke;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .error-content {
        max-width: 600px;
        flex: 1;
        background-color: rgb(155, 76, 76);
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0px 10px 10px rgba(155, 76, 76, 0.1),
          0px 10px 30px rgba(155, 76, 76, 0.2),
          0px 10px 50px rgba(155, 76, 76, 0.2);
      }
      .error-title {
        font-size: 1.5rem;
        color: white;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .error-detail {
        color: white;
      }
    </style>
  </head>
  <body>
    <div class="error-container">
      <div class="error-content">
        <div class="error-title">${title}</div>
        <div class="error-detail">${message}</div>
      </div>
    </div>
  </body>
</html>
`;
}

export const PaymentSuccessResponseForm = (title: string, message: string) => {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
      rel="stylesheet"
    />

    <title>${title}</title>
    <style>
      body {
        font-family: "Roboto", sans-serif;
      }

      .success-container {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: whitesmoke;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .success-content {
        max-width: 600px;
        flex: 1;
        background-color: rgb(76, 155, 87);
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0px 10px 10px rgba(76, 155, 87, 0.1),
          0px 10px 30px rgba(76, 155, 87, 0.2),
          0px 10px 50px rgba(76, 155, 87, 0.2);
      }
      .success-title {
        font-size: 1.5rem;
        color: white;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .success-detail {
        color: white;
      }
    </style>
  </head>
  <body>
    <div class="success-container">
      <div class="success-content">
        <div class="success-title">${title}</div>
        <div class="success-detail">
          ${message}
        </div>
      </div>
    </div>
  </body>
</html>
`;
}