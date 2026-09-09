import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { engineerService } from '@/services/engineerService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Activity, ArrowLeft } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  mobile: z.string().min(10, 'Mobile must be at least 10 digits'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  department: z.string().optional(),
  address: z.string().optional(),
  status: z.enum(['available', 'busy', 'on_leave']),
  skills: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function EngineerFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(isEdit);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      mobile: '',
      email: '',
      department: '',
      address: '',
      status: 'available',
      skills: '',
    }
  });

  useEffect(() => {
    const fetchEngineer = async () => {
      if (!isEdit) return;
      try {
        const data = await engineerService.fetchEngineer(Number(id));
        if (data) {
          form.reset({
            name: data.name,
            mobile: data.mobile,
            email: data.email || '',
            department: data.department || '',
            address: data.address || '',
            status: data.status,
            skills: data.skills ? JSON.parse(data.skills).join(', ') : '',
          });
        }
      } catch (error: any) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        navigate('/engineers');
      } finally {
        setIsLoading(false);
      }
    };
    fetchEngineer();
  }, [id, isEdit, form, navigate, toast]);

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...values,
        skills: values.skills ? JSON.stringify(values.skills.split(',').map(s => s.trim())) : undefined,
      };

      if (isEdit) {
        await engineerService.updateEngineer(Number(id), payload);
        toast({ title: 'Success', description: 'Engineer updated successfully' });
      } else {
        await engineerService.createEngineer(payload);
        toast({ title: 'Success', description: 'Engineer created successfully' });
      }
      navigate('/engineers');
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="p-8 flex justify-center"><Activity className="animate-spin text-blue-600 h-8 w-8" /></div>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/engineers')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Engineer' : 'Add Engineer'}</h1>
      </div>

      <Card className="shadow-sm border-gray-100">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="name" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="mobile" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Mobile *</FormLabel>
                    <FormControl><Input placeholder="9876543210" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="email" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input type="email" placeholder="john@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="department" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl><Input placeholder="Hardware" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="status" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="busy">Busy</SelectItem>
                        <SelectItem value="on_leave">On Leave</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="skills" render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Skills (comma separated)</FormLabel>
                    <FormControl><Input placeholder="Networking, Printers, Laptops" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="address" render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl><Textarea placeholder="Full address" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="flex justify-end gap-4">
                <Button variant="outline" type="button" onClick={() => navigate('/engineers')}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Activity className="w-4 h-4 mr-2 animate-spin" /> : null}
                  {isEdit ? 'Update Engineer' : 'Save Engineer'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
