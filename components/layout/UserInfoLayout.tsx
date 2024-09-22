import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { UserInfo } from "@/components/page/UserInfo";

export function UserInfoLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 bg-[url('/placeholder.svg?height=600&width=600')] bg-repeat space-y-15">
      <Header />
      <UserInfo />
      <Footer />
    </div>
  );
}
