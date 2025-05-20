import "./globals.css";

export const metadata = {
  title: "Zentrio | root",
  description: "Please fill up the credentail",
};

//this layout is use for dashbaord

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={`font-poppin`}>{children}</body>
    </html>
  );
}
