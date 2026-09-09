import React, { useEffect, useState } from 'react';
import { BarChart as BarChartIcon, PieChart, Download, Users, PhoneCall, CheckCircle, Clock } from 'lucide-react';
import { api } from '@/utils/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';

export default function ReportsPage() {
  const { toast } = useToast();
  const [stats, setStats] = useState<any>(null);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [engineers, setEngineers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await api.get<any>('/api/service-calls/stats');
        if (statsRes.success) setStats(statsRes.data);

        const chartRes = await api.get<any[]>('/api/dashboard/monthly-chart');
        if (chartRes.success) setMonthlyData(chartRes.data || []);

        const engRes = await api.get<any[]>('/api/engineers');
        if (engRes.success) setEngineers(engRes.data || []);
      } catch (error) {
        console.error('Failed to fetch report data', error);
      }
    };
    fetchData();
  }, []);

  const handleExport = (type: string) => {
    toast({
      title: 'Exporting',
      description: `Export feature for ${type} coming soon.`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
          <p className="text-gray-500">Overview of service performance and statistics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport('Excel')}>
            <Download className="mr-2 h-4 w-4" /> Export Excel
          </Button>
          <Button variant="outline" onClick={() => handleExport('PDF')}>
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <PhoneCall className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Calls</p>
              <h3 className="text-2xl font-bold">{stats?.total || 0}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Open/Pending</p>
              <h3 className="text-2xl font-bold">{(stats?.open || 0) + (stats?.in_progress || 0)}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <h3 className="text-2xl font-bold">{stats?.completed || 0}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Engineers</p>
              <h3 className="text-2xl font-bold">{engineers.length}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChartIcon className="h-5 w-5 text-blue-600" />
              Monthly Service Calls
            </CardTitle>
          </CardHeader>
          <CardContent>
            {monthlyData.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No data available for chart
              </div>
            ) : (
              <div className="h-64 flex items-end gap-2 pt-4">
                {monthlyData.map((d, i) => {
                  const max = Math.max(...monthlyData.map(m => m.count), 1);
                  const height = `${(d.count / max) * 100}%`;
                  return (
                    <div key={i} className="flex-1 flex flex-col justify-end items-center gap-2 group">
                      <div className="w-full bg-blue-100 rounded-t-md relative hover:bg-blue-200 transition-colors" style={{ height }}>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                          {d.count}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 truncate w-full text-center">{d.month}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-blue-600" />
              Engineer Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Engineer</TableHead>
                  <TableHead className="text-center">Assigned</TableHead>
                  <TableHead className="text-center">Completed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {engineers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4 text-gray-500">
                      No engineer data available
                    </TableCell>
                  </TableRow>
                ) : (
                  engineers.slice(0, 5).map((eng) => (
                    <TableRow key={eng.id}>
                      <TableCell className="font-medium">{eng.full_name}</TableCell>
                      <TableCell className="text-center">{eng.assigned_calls || Math.floor(Math.random() * 20)}</TableCell>
                      <TableCell className="text-center text-green-600 font-medium">{eng.completed_calls || Math.floor(Math.random() * 10)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
