import RevenueChart from '../components/charts/RevenueChart';

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Sales Dashboard</h1>
      <RevenueChart />
    </main>
  );
}
