import Image from "next/image";
import FootballDashboard from "./components/FootballDashboard";

export const metadata = {
  title: "WNF Dashboard",
  description:
    "Track player statistics and game results for 5-a-side football matches on Wednesday nights.",
};

export default function Home() {
  return (
    <main className="min-h-screen w-full text-wheat-100">
      <div className="md:mx-auto max-w-[2400px] p-4 md:p-8">
        <header className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 space-x-4 md:space-x-8">
          <div className="relative w-32 h-32 md:w-48 md:h-48 flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/icon.png"
              alt="WNF Dashboard Icon"
              layout="fill"
              objectFit="contain"
              className="drop-shadow-lg"
            />
          </div>
          <div className="flex items-center space-x-4 mb-4 md:mb-0 flex-1">
            <h1 className="text-6xl text-center lg:text-left lg:text-8xl font-black uppercase tracking-tighter drop-shadow-lg">
              WNF Dash
            </h1>
          </div>
          <div className="relative w-32 h-32 md:w-48 md:h-48 flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/logo.png"
              alt="WNF Dashboard Logo"
              layout="fill"
              objectFit="contain"
              className="drop-shadow-lg"
            />
          </div>
        </header>

        <div className=" rounded-xl shadow-2xl">
          <FootballDashboard />
        </div>
      </div>
    </main>
  );
}
