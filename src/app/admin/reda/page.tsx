import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">
        Welcome to the Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Hero Section" link="/admin/reda/hero" />
        <DashboardCard
          title="Featured Collections"
          link="/admin/reda/featured-collections"
        />
        <DashboardCard title="Categories" link="/admin/reda/categories" />
        <DashboardCard title="Products" link="/admin/reda/products" />
      </div>
    </div>
  );
}

function DashboardCard({ title, link }: { title: string; link: string }) {
  return (
    <Link
      href={link}
      className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">Manage {title.toLowerCase()}</p>
    </Link>
  );
}
