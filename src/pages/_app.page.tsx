import { useStore } from "@/modules/react-cms";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const store = useStore();
  useEffect(() => {
    store.populatePublishedStrings();
  }, []);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
