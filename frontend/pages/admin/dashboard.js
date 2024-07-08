import Sidebar from '@/components/Admin/Admin-Sidebar';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 text-black">
    <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
    <p>Welcome to the Admin Dashboard. Here you can manage users, view reports, and more.</p>
</div>
""
    </div>
  );
};

export default Dashboard;
