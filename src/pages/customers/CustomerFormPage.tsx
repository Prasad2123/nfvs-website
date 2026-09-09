import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { customerService } from '../../services/customerService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  companyName: z.string().optional(),
  phone: z.string().min(10, 'Phone is required and must be valid'),
  altPhone: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  gstNumber: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CustomerFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = id !== 'new' && id !== undefined;
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      companyName: '',
      phone: '',
      altPhone: '',
      email: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      gstNumber: '',
      notes: '',
    },
  });

  useEffect(() => {
    if (isEdit) {
      const loadCustomer = async () => {
        try {
          const data = await customerService.fetchCustomer(id);
          if (data) {
            form.reset({
              name: data.name || '',
              companyName: data.companyName || (data as any).company_name || '',
              phone: data.phone || '',
              altPhone: data.altPhone || (data as any).alt_phone || '',
              email: data.email || '',
              address: data.address || '',
              city: data.city || '',
              state: data.state || '',
              pincode: data.pincode || '',
              gstNumber: data.gstNumber || (data as any).gst_number || '',
              notes: data.notes || '',
            });
          }
        } catch (error) {
          toast({ title: 'Error', description: 'Failed to load customer details', variant: 'destructive' });
        } finally {
          setInitialLoading(false);
        }
      };
      loadCustomer();
    }
  }, [id, isEdit, form, toast]);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      if (isEdit) {
        await customerService.updateCustomer(id, values);
        toast({ title: 'Success', description: 'Customer updated successfully' });
      } else {
        await customerService.createCustomer(values);
        toast({ title: 'Success', description: 'Customer created successfully' });
      }
      navigate('/customers');
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save customer', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="flex justify-center p-10"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => navigate('/customers')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <h1 className="text-2xl font-bold text-slate-800">
          {isEdit ? 'Edit Customer' : 'Add New Customer'}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="companyName" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl><Input placeholder="Company Ltd" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Phone *</FormLabel>
                    <FormControl><Input placeholder="1234567890" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="altPhone" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Alternative Phone</FormLabel>
                    <FormControl><Input placeholder="0987654321" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input placeholder="email@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="gstNumber" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>GST Number</FormLabel>
                    <FormControl><Input placeholder="22AAAAA0000A1Z5" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="md:col-span-2">
                  <FormField control={form.control} name="address" render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl><Input placeholder="123 Street Name" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="city" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl><Input placeholder="City" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="state" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl><Input placeholder="State" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="pincode" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Pincode</FormLabel>
                    <FormControl><Input placeholder="123456" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="md:col-span-2">
                  <FormField control={form.control} name="notes" render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl><Textarea placeholder="Any additional details..." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" type="button" onClick={() => navigate('/customers')}>Cancel</Button>
                <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isEdit ? 'Update Customer' : 'Save Customer'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerFormPage;
