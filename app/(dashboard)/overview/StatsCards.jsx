import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  ShoppingBag,
  DollarSign,
  Users,
  TrendingUp,
} from "lucide-react";

const StatsCards = ({ products, MyOrder, users }) => {
  const totalRevenue = MyOrder?.reduce(
    (sum, product) => sum + product?.totalPrice,
    0
  );
  const stats = [
    {
      title: "Total Products",
      value: products?.length,
      change: "+12%",
      icon: Package,
      trend: "up",
    },
    {
      title: "Total Orders",
      value: MyOrder?.length,
      change: "+8%",
      icon: ShoppingBag,
      trend: "up",
    },
    {
      title: "Revenue",
      value: `${totalRevenue} $`,
      change: "+23%",
      icon: DollarSign,
      trend: "up",
    },
    {
      title: "Customers",
      value: users?.length,
      change: "+5%",
      icon: Users,
      trend: "up",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="shadow-secondary  hover:shadow-md transition duration-100"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stat.value}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp size={12} className="text-primary" />
              <span className="text-primary">{stat.change}</span> from last
              month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
