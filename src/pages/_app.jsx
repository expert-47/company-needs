import store from "@/redux/store";
import { Provider } from "react-redux";
import ReactModal from "react-modal";

import "../styles/index.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/apollo-client";
import { NextIntlClientProvider } from "next-intl";
import NextNProgress from "nextjs-progressbar";

import localFont from "@next/font/local";

const myFont = localFont({
  src: [
    {
      path: "./Helvetica.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Helvetica-Bold.woff2",
      weight: "900",
      style: "bold",
    },
  ],
});

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}
if (typeof window !== "undefined") {
  ReactModal.setAppElement("body");
}
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export default function App({ Component, pageProps }) {
  return (
    <NextIntlClientProvider messages={pageProps.messages}>
      <Provider store={store}>
        <NextNProgress
          // color="var(--tp-theme-secondary)"
          color="black"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <ApolloProvider client={client}>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          >
            {/*<Elements stripe={stripePromise}> */}
            <main className={myFont.className}>
              <div id="root">
                <Component {...pageProps} />
              </div>
            </main>
            {/*<Elements /> */}
          </GoogleOAuthProvider>
        </ApolloProvider>
      </Provider>
    </NextIntlClientProvider>
  );
}
