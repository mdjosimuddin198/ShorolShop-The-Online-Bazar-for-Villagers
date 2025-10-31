import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import StatsCards from "./StatsCards";

const UserDashboard = ({ stats }) => {
  return (
    <main className="container px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <Link href="/addproducts">
          <Button className="gap-2 cursor-pointer">
            <LogOut size={16} />
            Log Out
          </Button>
        </Link>
      </div>
      {/* stats card overview  */}
      <StatsCards stats={stats} />
    </main>
  );
};

export default UserDashboard;
