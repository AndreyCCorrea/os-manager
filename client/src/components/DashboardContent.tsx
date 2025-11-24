import { Card } from "@/components/ui/card";
import { Users, BookOpen, GraduationCap, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: typeof Users;
  trend?: string;
}

function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <Card className="p-6 hover-elevate">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground" data-testid={`text-${title.toLowerCase().replace(/\s+/g, '-')}`}>{value}</p>
          {trend && (
            <p className="text-xs text-primary flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {trend}
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </Card>
  );
}

export default function DashboardContent() {
  const stats = [
    { title: "Total Students", value: "12,458", icon: Users, trend: "+12% from last month" },
    { title: "Active Courses", value: "342", icon: BookOpen, trend: "+8% from last month" },
    { title: "Faculty Members", value: "856", icon: GraduationCap, trend: "+5% from last month" },
    { title: "Completion Rate", value: "94.2%", icon: TrendingUp, trend: "+2.4% from last month" },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-welcome">Welcome Back!</h1>
        <p className="text-muted-foreground">Here's what's happening at OAK University today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
        <Card className="p-6">
          <div className="space-y-4">
            {[
              { action: "New student enrollment", department: "Computer Science", time: "2 hours ago" },
              { action: "Course updated", department: "Mathematics", time: "5 hours ago" },
              { action: "Faculty meeting scheduled", department: "Engineering", time: "1 day ago" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.department}</p>
                </div>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
