import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { api } from '@/utils/api';
import { useToast } from '@/components/ui/use-toast';
import { serviceCallService } from '@/services/serviceCallService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Activity, ArrowLeft } from 'lucide-react';
import { Engineer } from '@/services/engineerService';

const formSchema = z.object({
  customer_id: z.string().min(1, 'Customer is required'),
  engineer_id: z.string().optional().or(z.literal('')),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  complaint_description: z.string().min(1, 'Complaint description is required'),
  device_type: z.string().optional(),
  brand: z.string().optional(),
  model_name: z.string().optional(),
  serial_number: z.string().optional(),
  warranty_status: z.string().optional(),
  invoice_number: z.string().optional(),
  call_source: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  status: z.string().optional(),
  work_performed: z.string().optional(),
  remarks: z.string().optional(),
  follow_up_date: z.string().optional().or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

export default function ServiceCallFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [customers, setCustomers] = useState<any[]>([]);
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_id: '',
      engineer_id: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().substring(0, 5),
      complaint_description: '',
      device_type: '',
      brand: '',
      model_name: '',
      serial_number: '',
      warranty_status: 'Not Applicable',
      invoice_number: '',
      call_source: 'Phone',
      priority: 'medium',
      status: 'open',
      work_performed: '',
      remarks: '',
      follow_up_date: '',
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [custRes, engRes] = await Promise.all([
          api.get<any>('/api/customers?limit=100'),
          api.get<Engineer[]>('/api/engineers/available')
        ]);

        if (custRes.success && custRes.data) setCustomers(custRes.data.data);
        if (engRes.success && engRes.data) setEngineers(engRes.data);

        if (isEdit) {
          const callData = await serviceCallService.fetchServiceCall(Number(id));
          if (callData) {
            form.reset({
              customer_id: callData.customer_id.toString(),
              engineer_id: callData.engineer_id ? callData.engineer_id.toString() : '',
              date: callData.date.split('T')[0],
              time: callData.time,
              complaint_description: callData.complaint_description,
              device_type: callData.device_type || '',
              brand: callData.brand || '',
              model_name: callData.model_name || '',
              serial_number: callData.serial_number || '',
              warranty_status: callData.warranty_status || 'Not Applicable',
              invoice_number: callData.invoice_number || '',
              call_source: callData.call_source || 'Phone',
              priority: callData.priority,
              status: callData.status,
              work_performed: callData.work_performed || '',
              remarks: callData.remarks || '',
              follow_up_date: callData.follow_up_date ? callData.follow_up_date.split('T')[0] : '',
            });
          }
        }
      } catch (error: any) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        if (isEdit) navigate('/service-calls');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, isEdit, form, navigate, toast]);

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const payload: any = {
        ...values,
        customer_id: parseInt(values.customer_id),
        engineer_id: values.engineer_id ? parseInt(values.engineer_id) : null,
      };

      if (!values.follow_up_date) delete payload.follow_up_date;

      if (isEdit) {
        await serviceCallService.updateServiceCall(Number(id), payload);
        toast({ title: 'Success', description: 'Service call updated successfully' });
      } else {
        await serviceCallService.createServiceCall(payload);
        toast({ title: 'Success', description: 'Service call created successfully' });
      }
      navigate('/service-calls');
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="p-8 flex justify-center"><Activity className="animate-spin text-blue-600 h-8 w-8" /></div>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/service-calls')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Service Call' : 'New Service Call'}</h1>
      </div>

      <Card className="shadow-sm border-gray-100">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="customer_id" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Customer *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={isEdit}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select customer" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {customers.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="engineer_id" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Assign Engineer</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Unassigned" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="">Unassigned</SelectItem>
                        {engineers.map(e => <SelectItem key={e.id} value={e.id.toString()}>{e.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="date" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Date *</FormLabel>
                    <FormControl><Input type="date" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="time" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Time *</FormLabel>
                    <FormControl><Input type="time" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="complaint_description" render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Complaint Description *</FormLabel>
                  <FormControl><Textarea rows={3} placeholder="Describe the issue..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField control={form.control} name="device_type" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Device Type</FormLabel>
                    <FormControl><Input placeholder="Laptop, Printer..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="brand" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl><Input placeholder="HP, Dell..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="model_name" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl><Input placeholder="ProBook..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField control={form.control} name="serial_number" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Serial Number</FormLabel>
                    <FormControl><Input placeholder="SN..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="invoice_number" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Invoice Number</FormLabel>
                    <FormControl><Input placeholder="INV-..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="warranty_status" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Warranty Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Under Warranty">Under Warranty</SelectItem>
                        <SelectItem value="Out of Warranty">Out of Warranty</SelectItem>
                        <SelectItem value="Not Applicable">Not Applicable</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField control={form.control} name="priority" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Priority *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Priority" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="call_source" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Call Source</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Source" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Walk-in">Walk-in</SelectItem>
                        <SelectItem value="Phone">Phone</SelectItem>
                        <SelectItem value="Email">Email</SelectItem>
                        <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                        <SelectItem value="Reference">Reference</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                {isEdit && (
                  <FormField control={form.control} name="status" render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="assigned">Assigned</SelectItem>
                          <SelectItem value="engineer_on_way">Engineer On Way</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="waiting_customer">Waiting Customer</SelectItem>
                          <SelectItem value="waiting_parts">Waiting Parts</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                )}
              </div>

              {isEdit && (
                <>
                  <FormField control={form.control} name="work_performed" render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Work Performed</FormLabel>
                      <FormControl><Textarea rows={2} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="remarks" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Remarks</FormLabel>
                    <FormControl><Textarea rows={2} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="follow_up_date" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Follow-up Date</FormLabel>
                    <FormControl><Input type="date" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" type="button" onClick={() => navigate('/service-calls')}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Activity className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {isEdit ? 'Update Service Call' : 'Save Service Call'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
