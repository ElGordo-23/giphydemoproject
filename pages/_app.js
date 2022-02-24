import { css, Global } from '@emotion/react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global
        styles={css`
          *,
          ::before,
          *::after {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, Helvetica, sans-serif;
          }
        `}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
