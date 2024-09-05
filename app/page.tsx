import FootballDashboard from "./components/FootballDashboard";

export const metadata = {
  title: "WNF Dashboard",
  description:
    "Track player statistics and game results for 5-a-side football matches on Wednesday nights.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">WNF Dashboard</h1>
        <FootballDashboard />
      </div>
    </main>
  );
}
