import type { Metadata } from "next";
import { DashboardScreen } from "@/src/screens/admin/DashboardScreen";

export const metadata: Metadata = {
  title: "Dashboard | Admin",
};

export default function AdminDashboardPage() {
  return <DashboardScreen />;
}
