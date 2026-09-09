import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { customerService, Customer } from '../../services/customerService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Plus, Search, Eye, Edit } from 'lucide-react';

const CustomerListPage: React.FC = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    loadCustomers();
  }, [page, search]);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const result = await customerService.fetchCustomers(page, limit, search);
      setCustomers(result.data);
      setTotal(result.total);
    } catch (error) {
      console.error('Failed to load customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Customers</h1>
        <Button onClick={() => navigate('/customers/new')} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Customer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex justify-between items-center">
            <span>Customer Directory</span>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search customers..."
                className="pl-8"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : customers.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              No customers found. Try adjusting your search or add a new customer.
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.customerCode}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.companyName || '-'}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.city || '-'}</TableCell>
                      <TableCell>
                        <Badge variant={customer.status === 'Active' ? 'default' : 'secondary'}
                               className={customer.status === 'Active' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/customers/${customer.id}`)}>
                          <Eye className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/customers/${customer.id}/edit`)}>
                          <Edit className="w-4 h-4 text-slate-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {!loading && customers.length > 0 && (
             <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-slate-500">
                  Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} customers
                </span>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled={page * limit >= total} onClick={() => setPage(p => p + 1)}>
                    Next
                  </Button>
                </div>
             </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerListPage;
