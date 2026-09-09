import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/utils/api';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Edit, Activity, User, Phone, Mail, MapPin, Briefcase } from 'lucide-react';
import { Engineer } from '@/services/engineerService';

export default function EngineerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [engineer, setEngineer] = useState<Engineer | null>(null);
  const [recentCalls, setRecentCalls] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [engRes, callsRes] = await Promise.all([
          api.get<Engineer>(`/api/engineers/${id}`),
          api.get<any[]>(`/api/engineers/${id}/service-calls?limit=5`)
        ]);

        if (engRes.success && engRes.data) {
          setEngineer(engRes.data);
        } else {
          throw new Error('Failed to load engineer');
        }

        if (callsRes.success && callsRes.data) {
          setRecentCalls(callsRes.data);
        }
      } catch (error: any) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        navigate('/engineers');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [id, navigate, toast]);

  if (isLoading) return <div className="p-8 flex justify-center"><Activity className="animate-spin text-blue-600 h-8 w-8" /></div>;
  if (!engineer) return null;

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      available: 'bg-green-100 text-green-800',
      busy: 'bg-amber-100 text-amber-800',
      on_leave: 'bg-red-100 text-red-800'
    };
    return <Badge className={variants[status] || ''} variant="outline">{status.replace('_', ' ')}</Badge>;
  };

  const skills = engineer.skills ? JSON.parse(engineer.skills) : [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/engineers')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">{engineer.name}</h1>
          {getStatusBadge(engineer.status)}
        </div>
        <Button onClick={() => navigate(`/engineers/${engineer.id}/edit`)}>
          <Edit className="w-4 h-4 mr-2" /> Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-sm border-gray-100 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Profile Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <User className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-gray-500 w-24">Code:</span>
              <span>{engineer.engineer_code}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-gray-500 w-24">Mobile:</span>
              <span>{engineer.mobile}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-gray-500 w-24">Email:</span>
              <span>{engineer.email || '-'}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-gray-500 w-24">Dept:</span>
              <span>{engineer.department || '-'}</span>
            </div>
            <div className="flex items-start gap-3 text-gray-700">
              <MapPin className="w-4 h-4 text-gray-400 mt-1" />
              <span className="font-medium text-gray-500 w-24">Address:</span>
              <span className="flex-1">{engineer.address || '-'}</span>
            </div>
            
            {skills.length > 0 && (
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill: string, i: number) => (
                    <Badge key={i} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-100 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Recent Service Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Call #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Device Type</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCalls.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                      No service calls found.
                    </TableCell>
                  </TableRow>
                ) : (
                  recentCalls.map((call) => (
                    <TableRow key={call.id} className="cursor-pointer hover:bg-gray-50" onClick={() => navigate(`/service-calls/${call.id}`)}>
                      <TableCell className="font-medium">{call.call_number}</TableCell>
                      <TableCell>{new Date(call.date).toLocaleDateString()}</TableCell>
                      <TableCell>{call.device_type || '-'}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{call.status}</Badge>
                      </TableCell>
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
