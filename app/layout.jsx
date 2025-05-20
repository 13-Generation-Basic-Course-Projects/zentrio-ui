import "./globals.css";

export const metadata = {
  title: "Zentrio | root",
  description: "Please fill up the credentail",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={`font-poppin`}>{children}</body>
    </html>
  );
}
