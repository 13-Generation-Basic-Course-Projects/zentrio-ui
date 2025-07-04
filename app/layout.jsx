import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { Provider } from "@radix-ui/react-tooltip";
import OneSignalInitializer from "@/components/onesignal/OneSignalInitializer";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Zentrio | 안녕하세요",
  description: "Please fill up the credentail",
  icons: {
    icon: "/mylogo.svg", // or .png or .svg depending on your file
  },
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={`font-poppin`}>
        <NextTopLoader color="#59BAD5" showSpinner={false} />
        {/* <NextUIProvider> */}
        <Provider>{children}</Provider>
        {/* </NextUIProvider> */}
        {/* Onesignal */}
        <OneSignalInitializer />
        <ToastContainer position="top-right" autoClose={4000} />
      </body>
    </html>
  );
}
