import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "GrowthPilot AI | Business Growth Intelligence",
  description: "Know what is happening in your market. Discover opportunities. Know what to do today."
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
