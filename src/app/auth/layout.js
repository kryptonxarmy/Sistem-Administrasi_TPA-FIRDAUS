import { Toaster } from "@/components/ui/toast";

export const metadata = {
  title: "Login - Create Next App",
  description: "Login page for Create Next App",
};

export default function AuthLayout({ children }) {
  return <div className="flex h-screen">{children}</div>;
}
