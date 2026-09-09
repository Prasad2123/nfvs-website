import { useEffect, useState } from 'react';
import { api } from '@/utils/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Activity, Users, FileText, CheckCircle, Clock, XCircle, AlertCircle, Calendar } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, PieChart, Pie, Cell } from 'recharts';

interface Stats {
  today_calls: number;
  pending_calls: number;
  completed_calls: number;
  cancelled_calls: number;
  total_customers: number;
  engineers_count: number;
  followups_today: number;
  missed_followups: number;
}

interface RecentCall {
  id: number;
  call_number: string;
  customer: { name: string };
  device_type: string;
  status: string;
  priority: string;
  engineer?: { name: string };
}

interface FollowUp {
  id: number;
  call_number: string;
  customer: { name: string };
  follow_up_date: string;
}

export function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentCalls, setRecentCalls] = useState<RecentCall[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [monthlyChart, setMonthlyChart] = useState<any[]>([]);
  const [engineerStatus, setEngineerStatus] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, callsRes, followUpsRes, chartRes, engStatusRes] = await Promise.all([
          api.get<Stats>('/api/dashboard/stats'),
          api.get<RecentCall[]>('/api/dashboard/recent-calls'),
          api.get<FollowUp[]>('/api/dashboard/follow-ups-today'),
          api.get<Record<string, number>>('/api/dashboard/monthly-chart'),
          api.get<any[]>('/api/dashboard/engineer-status')
        ]);

        if (statsRes.success && statsRes.data) {
          setStats(statsRes.data);
        } else {
          setStats({
            today_calls: 0, pending_calls: 0, completed_calls: 0, cancelled_calls: 0,
            total_customers: 0, engineers_count: 0, followups_today: 0, missed_followups: 0
          });
        }

        if (callsRes.success && callsRes.data) setRecentCalls(callsRes.data);
        if (followUpsRes.success && followUpsRes.data) setFollowUps(followUpsRes.data);
        
        if (chartRes.success && chartRes.data) {
          const formattedChart = Object.entries(chartRes.data).map(([month, count]) => ({ month, count }));
          setMonthlyChart(formattedChart.length > 0 ? formattedChart : [{ month: 'No Data', count: 0 }]);
        }
        
        if (engStatusRes.success && engStatusRes.data) {
          const grouped = engStatusRes.data.reduce((acc, curr) => {
            acc[curr.status] = (acc[curr.status] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);
          
          const formattedStatus = Object.entries(grouped).map(([name, value]) => ({ name, value }));
          setEngineerStatus(formattedStatus.length > 0 ? formattedStatus : []);
        }
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to load dashboard data', variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [toast]);

  if (isLoading) return <div className="p-8 flex justify-center"><Activity className="animate-spin text-blue-600 h-8 w-8" /></div>;

  const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="space-x-3">
          <Button variant="outline" onClick={() => navigate('/customers/new')}>
            <Users className="w-4 h-4 mr-2" /> Add Customer
          </Button>
          <Button onClick={() => navigate('/service-calls/new')}>
            <PlusCircle className="w-4 h-4 mr-2" /> New Service Call
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Today's Calls" value={stats?.today_calls || 0} icon={<Calendar className="w-4 h-4 text-blue-500" />} />
        <StatCard title="Pending Calls" value={stats?.pending_calls || 0} icon={<Clock className="w-4 h-4 text-amber-500" />} />
        <StatCard title="Completed Calls" value={stats?.completed_calls || 0} icon={<CheckCircle className="w-4 h-4 text-green-500" />} />
        <StatCard title="Cancelled Calls" value={stats?.cancelled_calls || 0} icon={<XCircle className="w-4 h-4 text-red-500" />} />
        <StatCard title="Total Customers" value={stats?.total_customers || 0} icon={<Users className="w-4 h-4 text-indigo-500" />} />
        <StatCard title="Total Engineers" value={stats?.engineers_count || 0} icon={<FileText className="w-4 h-4 text-cyan-500" />} />
        <StatCard title="Today's Follow-ups" value={stats?.followups_today || 0} icon={<Activity className="w-4 h-4 text-purple-500" />} />
        <StatCard title="Missed Follow-ups" value={stats?.missed_followups || 0} icon={<AlertCircle className="w-4 h-4 text-rose-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-sm border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg">Calls by Month</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyChart}>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip />
                <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg">Engineer Status</CardTitle>
          </CardHeader>
          <CardContent className="h-72 flex justify-center items-center">
            {engineerStatus.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={engineerStatus} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {engineerStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-gray-400">No engineer data</div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg">Recent Service Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Call #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Engineer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCalls.length > 0 ? recentCalls.map(call => (
                  <TableRow key={call.id}>
                    <TableCell className="font-medium">{call.call_number}</TableCell>
                    <TableCell>{call.customer?.name}</TableCell>
                    <TableCell><Badge variant="outline">{call.status}</Badge></TableCell>
                    <TableCell>{call.engineer?.name || '-'}</TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500 py-4">No recent calls</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg">Today's Follow-ups</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Call #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {followUps.length > 0 ? followUps.map(followup => (
                  <TableRow key={followup.id}>
                    <TableCell className="font-medium">{followup.call_number}</TableCell>
                    <TableCell>{followup.customer?.name}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/service-calls/${followup.id}`)}>View</Button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-gray-500 py-4">No follow-ups today</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: number, icon: React.ReactNode }) {
  return (
    <Card className="shadow-sm border-gray-100">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
      </CardContent>
    </Card>
  );
}
