import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { Provider } from "@radix-ui/react-tooltip";


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
        <NextTopLoader color="#70A973" />
        {/* <NextUIProvider> */}
          <Provider>{children}</Provider>
        {/* </NextUIProvider> */}

        {/* <Toaster position="top-center" reverseOrder={false} /> */}
      </body>
      
    </html>
  );
}
