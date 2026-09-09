import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/utils/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const companySchema = z.object({
  company_name: z.string().min(1, 'Company Name is required'),
  company_address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  gst_number: z.string().optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function SettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'company';
  
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [settingsList, setSettingsList] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const companyForm = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      company_name: '',
      company_address: '',
      phone: '',
      email: '',
      gst_number: '',
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get<any[]>('/api/settings');
        if (res.success && res.data) {
          setSettingsList(res.data);
          
          // Map array to object for form
          const settingsObj: any = {};
          res.data.forEach((s) => {
            settingsObj[s.setting_key] = s.setting_value;
          });
          
          companyForm.reset({
            company_name: settingsObj.company_name || '',
            company_address: settingsObj.company_address || '',
            phone: settingsObj.phone || '',
            email: settingsObj.email || '',
            gst_number: settingsObj.gst_number || '',
          });
        }
      } catch (error) {
        console.error('Failed to fetch settings', error);
      } finally {
        setLoadingData(false);
      }
    };
    fetchSettings();
  }, [companyForm]);

  const onCompanySubmit = async (values: z.infer<typeof companySchema>) => {
    setIsLoading(true);
    try {
      const res = await api.put('/api/settings', values);
      if (res.success) {
        toast({
          title: 'Success',
          description: 'Company information updated successfully',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update settings',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onPasswordSubmit = async (values: z.infer<typeof passwordSchema>) => {
    setIsLoading(true);
    try {
      const res = await api.post('/api/auth/change-password', {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword
      });
      if (res.success) {
        toast({
          title: 'Success',
          description: 'Password changed successfully',
        });
        passwordForm.reset();
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to change password',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue={defaultTab} onValueChange={(v) => setSearchParams({ tab: v })}>
        <TabsList className="mb-6">
          <TabsTrigger value="company">Company Info</TabsTrigger>
          <TabsTrigger value="password">Change Password</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your company details for reports and invoices.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...companyForm}>
                <form onSubmit={companyForm.handleSubmit(onCompanySubmit)} className="space-y-4">
                  <FormField
                    control={companyForm.control}
                    name="company_name"
                    render={({ field }: any) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={companyForm.control}
                    name="company_address"
                    render={({ field }: any) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={companyForm.control}
                      name="phone"
                      render={({ field }: any) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl><Input {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={companyForm.control}
                      name="email"
                      render={({ field }: any) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl><Input {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={companyForm.control}
                    name="gst_number"
                    render={({ field }: any) => (
                      <FormItem>
                        <FormLabel>GST Number</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }: any) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl><Input type="password" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }: any) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl><Input type="password" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }: any) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl><Input type="password" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Change Password'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Hardware Service Pro</CardTitle>
              <CardDescription>System information and current configurations.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 space-y-2">
                <p><strong>App Version:</strong> 1.0.0</p>
                <p><strong>Developed By:</strong> Prasadsoftware and Technical Solutions</p>
                <p><strong>Database:</strong> SQLite Local</p>
              </div>

              <h3 className="text-lg font-semibold mb-4">Raw Settings Data</h3>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Key</TableHead>
                      <TableHead>Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {settingsList.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center py-4">No settings found</TableCell>
                      </TableRow>
                    ) : (
                      settingsList.map((s) => (
                        <TableRow key={s.setting_key}>
                          <TableCell className="font-medium">{s.setting_key}</TableCell>
                          <TableCell>{s.setting_value}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
