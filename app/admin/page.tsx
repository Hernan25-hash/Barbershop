import { AdminDashboard } from "@/components/admin-dashboard";

export const metadata = {
  title: "Admin Dashboard | My BarberShop",
  description: "Manage appointments and customers",
};

export default function AdminPage() {
  // temporary dummy data (UI only)

  const user = {
    uid: "demo-user",
  };

  const profile = {
    role: "admin",
    full_name: "Admin User",
  };

  const appointments = [];

  const customers = [];

  return (
    <AdminDashboard
      user={user}
      profile={profile}
      appointments={appointments}
      customers={customers}
    />
  );
}
