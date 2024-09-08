import Image from "next/image";
import FootballDashboard from "./components/FootballDashboard";

export const metadata = {
  title: "WNF Dashboard",
  description:
    "Track player statistics and game results for 5-a-side football matches on Wednesday nights.",
};

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <div className="md:mx-auto max-w-[2400px] p-4 md:p-8">
        <header className="flex justify-end mb-4 md:mb-8">
          <div className="flex bg-white shadow-md rounded-full w-40 h-40">
            {/* <Image
              src="/images/logo.png"
              alt="WNF Dashboard Logo"
              width={120}
              height={120}
              className="justify-center items-center"
            /> */}
          </div>
        </header>

        <FootballDashboard />
      </div>
    </main>
  );
}
