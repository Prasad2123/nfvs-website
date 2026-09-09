import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { serviceCallService, ServiceCall, PaginatedResponse } from '@/services/serviceCallService';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Search, Edit, Eye, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ServiceCallListPage() {
  const [calls, setCalls] = useState<ServiceCall[]>([]);
  const [meta, setMeta] = useState<PaginatedResponse<ServiceCall>['meta']>({ total: 0, page: 1, limit: 10, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [priority, setPriority] = useState('All');
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const loadCalls = async () => {
      setIsLoading(true);
      try {
        const data = await serviceCallService.fetchServiceCalls(
          meta.page, 
          meta.limit, 
          debouncedSearch, 
          status === 'All' ? '' : status, 
          priority === 'All' ? '' : priority
        );
        if (data) {
          setCalls(data.data);
          setMeta(data.meta);
        }
      } catch (error: any) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    };
    loadCalls();
  }, [meta.page, debouncedSearch, status, priority, toast]);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      open: 'bg-gray-100 text-gray-800',
      assigned: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-amber-100 text-amber-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return <Badge className={variants[status] || 'bg-gray-100 text-gray-800'} variant="outline">{status.replace(/_/g, ' ')}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, string> = {
      critical: 'bg-red-100 text-red-800',
      high: 'bg-orange-100 text-orange-800',
      medium: 'bg-blue-100 text-blue-800',
      low: 'bg-gray-100 text-gray-800'
    };
    return <Badge className={variants[priority] || ''} variant="secondary">{priority}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Service Calls</h1>
        <Button onClick={() => navigate('/service-calls/new')}>
          <PlusCircle className="w-4 h-4 mr-2" /> New Service Call
        </Button>
      </div>

      <Card className="shadow-sm border-gray-100">
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by call #, customer, or device..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger><SelectValue placeholder="Priority" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Priorities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center p-8"><Activity className="animate-spin text-blue-600 h-8 w-8" /></div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Call #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Device Type</TableHead>
                    <TableHead>Engineer</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {calls.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                        No service calls found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    calls.map((call) => (
                      <TableRow key={call.id} className="cursor-pointer hover:bg-gray-50" onClick={() => navigate(`/service-calls/${call.id}`)}>
                        <TableCell className="font-medium text-blue-600">{call.call_number}</TableCell>
                        <TableCell>{new Date(call.date).toLocaleDateString()}</TableCell>
                        <TableCell>{call.customer?.name}</TableCell>
                        <TableCell>{call.device_type || '-'}</TableCell>
                        <TableCell>{call.engineer?.name || <span className="text-gray-400 italic">Unassigned</span>}</TableCell>
                        <TableCell>{getPriorityBadge(call.priority)}</TableCell>
                        <TableCell>{getStatusBadge(call.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2" onClick={e => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" onClick={() => navigate(`/service-calls/${call.id}`)}>
                              <Eye className="h-4 w-4 text-gray-500" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => navigate(`/service-calls/${call.id}/edit`)}>
                              <Edit className="h-4 w-4 text-blue-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">
              Showing page {meta.page} of {meta.totalPages}
            </span>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={meta.page <= 1}
                onClick={() => setMeta(m => ({ ...m, page: m.page - 1 }))}
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={meta.page >= meta.totalPages}
                onClick={() => setMeta(m => ({ ...m, page: m.page + 1 }))}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
