import "./globals.css";


export const metadata = {
  title: "Zentrio | 안녕하세요",
  description: "Please fill up the credentail",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
     
      <body className={`font-poppin`}>{children}</body>
    </html>
  );
}
