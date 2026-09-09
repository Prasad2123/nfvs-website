import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { engineerService, Engineer, PaginatedResponse } from '@/services/engineerService';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Search, Edit, Eye, Trash2, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function EngineerListPage() {
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [meta, setMeta] = useState<PaginatedResponse<Engineer>['meta']>({ total: 0, page: 1, limit: 10, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [status, setStatus] = useState('All');
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const loadEngineers = async () => {
    setIsLoading(true);
    try {
      const data = await engineerService.fetchEngineers(meta.page, meta.limit, debouncedSearch, status === 'All' ? '' : status.toLowerCase());
      if (data) {
        setEngineers(data.data);
        setMeta(data.meta);
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEngineers();
  }, [meta.page, debouncedSearch, status]);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this engineer?')) return;
    try {
      await engineerService.deleteEngineer(id);
      toast({ title: 'Success', description: 'Engineer deleted successfully' });
      loadEngineers();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      available: 'bg-green-100 text-green-800',
      busy: 'bg-amber-100 text-amber-800',
      on_leave: 'bg-red-100 text-red-800'
    };
    return <Badge className={variants[status] || ''} variant="outline">{status.replace('_', ' ')}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Engineers</h1>
        <Button onClick={() => navigate('/engineers/new')}>
          <PlusCircle className="w-4 h-4 mr-2" /> Add Engineer
        </Button>
      </div>

      <Card className="shadow-sm border-gray-100">
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search engineers..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="on_leave">On Leave</SelectItem>
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
                    <TableHead>Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Skills</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {engineers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                        No engineers found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    engineers.map((engineer) => (
                      <TableRow key={engineer.id}>
                        <TableCell className="font-medium">{engineer.engineer_code}</TableCell>
                        <TableCell>{engineer.name}</TableCell>
                        <TableCell>{engineer.mobile}</TableCell>
                        <TableCell>{engineer.department || '-'}</TableCell>
                        <TableCell>{getStatusBadge(engineer.status)}</TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {engineer.skills ? JSON.parse(engineer.skills).slice(0, 3).join(', ') : '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => navigate(`/engineers/${engineer.id}`)}>
                              <Eye className="h-4 w-4 text-gray-500" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => navigate(`/engineers/${engineer.id}/edit`)}>
                              <Edit className="h-4 w-4 text-blue-500" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(engineer.id)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
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

          {/* Pagination could be added here */}
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
