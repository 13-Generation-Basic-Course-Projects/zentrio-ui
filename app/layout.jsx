import "./globals.css";


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
     
      <body className={`font-poppin`}>{children}</body>
    </html>
  );
}
