import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { customerService, Customer } from '../../services/customerService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowLeft, Edit, Phone, Mail, MapPin, Briefcase, FileText, Wrench } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const CustomerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadCustomer(id);
    }
  }, [id]);

  const loadCustomer = async (customerId: string) => {
    try {
      const data = await customerService.fetchCustomer(customerId);
      setCustomer(data || null);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load customer details', variant: 'destructive' });
      navigate('/customers');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-10"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  if (!customer) {
    return <div className="p-10 text-center">Customer not found</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/customers')}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <h1 className="text-2xl font-bold text-slate-800">{customer.name}</h1>
          <Badge variant={customer.status === 'Active' ? 'default' : 'secondary'} className="ml-2">
            {customer.status}
          </Badge>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => navigate(`/customers/${customer.id}/edit`)}>
            <Edit className="w-4 h-4 mr-2" /> Edit
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => navigate(`/services/new?customerId=${customer.id}`)}>
            <Wrench className="w-4 h-4 mr-2" /> New Service Call
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-slate-500">Customer Code</p>
              <p className="font-medium">{customer.customerCode}</p>
            </div>
            
            {customer.companyName && (
              <div className="flex items-start space-x-3">
                <Briefcase className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-500">Company</p>
                  <p>{customer.companyName}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-500">Contact</p>
                <p>{customer.phone}</p>
                {customer.altPhone && <p className="text-sm text-slate-600">{customer.altPhone}</p>}
              </div>
            </div>

            {customer.email && (
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-500">Email</p>
                  <p className="break-all">{customer.email}</p>
                </div>
              </div>
            )}

            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-500">Address</p>
                <p>{customer.address || 'N/A'}</p>
                <p className="text-sm text-slate-600">
                  {[customer.city, customer.state, customer.pincode].filter(Boolean).join(', ')}
                </p>
              </div>
            </div>

            {customer.gstNumber && (
              <div className="flex items-start space-x-3">
                <FileText className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-500">GST Number</p>
                  <p>{customer.gstNumber}</p>
                </div>
              </div>
            )}

            {customer.notes && (
              <div className="pt-4 border-t">
                <p className="text-sm font-medium text-slate-500 mb-1">Notes</p>
                <p className="text-sm text-slate-700">{customer.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Service History</CardTitle>
          </CardHeader>
          <CardContent>
            {!customer.serviceHistory || customer.serviceHistory.length === 0 ? (
              <div className="text-center py-10 text-slate-500 bg-slate-50 rounded-lg border border-dashed">
                No service history found for this customer.
              </div>
            ) : (
              <div className="space-y-4">
                {customer.serviceHistory.map((call) => (
                  <div key={call.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50">
                    <div>
                      <p className="font-medium text-blue-600">#{call.callNumber}</p>
                      <p className="text-sm text-slate-600">{call.issue}</p>
                      <p className="text-xs text-slate-400 mt-1">{new Date(call.date).toLocaleDateString()}</p>
                    </div>
                    <Badge variant="outline">{call.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDetailPage;
