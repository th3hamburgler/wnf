import FootballDashboard from "./components/FootballDashboard";

export const metadata = {
  title: "WNF Dashboard",
  description:
    "Track player statistics and game results for 5-a-side football matches on Wednesday nights.",
};

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gray-100 py-4 md:py-8">
      <div className="px-4 md:px-8  md:mx-auto max-w-[2400px]">
        <h1 className="text-4xl font-bold text-center mb-4 md:mb-8">
          WNF Dashboard
        </h1>
        <FootballDashboard />
      </div>
    </main>
  );
}
