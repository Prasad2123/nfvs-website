import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/utils/api';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Edit, Activity, User, Monitor, Clock, CheckCircle } from 'lucide-react';
import { ServiceCall } from '@/services/serviceCallService';

export default function ServiceCallDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [call, setCall] = useState<ServiceCall | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [remarks, setRemarks] = useState('');
  const [workPerformed, setWorkPerformed] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [callRes, histRes] = await Promise.all([
          api.get<ServiceCall>(`/api/service-calls/${id}`),
          api.get<any[]>(`/api/service-calls/${id}/history`)
        ]);

        if (callRes.success && callRes.data) {
          setCall(callRes.data);
          setRemarks(callRes.data.remarks || '');
          setWorkPerformed(callRes.data.work_performed || '');
        } else {
          throw new Error('Failed to load service call');
        }

        if (histRes.success && histRes.data) {
          setHistory(histRes.data);
        }
      } catch (error: any) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        navigate('/service-calls');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [id, navigate, toast]);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const res = await api.put(`/api/service-calls/${id}`, { remarks, work_performed: workPerformed });
      if (res.success) {
        toast({ title: 'Success', description: 'Updates saved successfully' });
      } else {
        throw new Error(res.error || 'Failed to update');
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) return <div className="p-8 flex justify-center"><Activity className="animate-spin text-blue-600 h-8 w-8" /></div>;
  if (!call) return null;

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
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/service-calls')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{call.call_number}</h1>
            <div className="flex gap-2 mt-1">
              {getStatusBadge(call.status)}
              {getPriorityBadge(call.priority)}
            </div>
          </div>
        </div>
        <Button onClick={() => navigate(`/service-calls/${call.id}/edit`)}>
          <Edit className="w-4 h-4 mr-2" /> Edit Call
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-sm border-gray-100">
              <CardHeader className="pb-3 border-b border-gray-100">
                <CardTitle className="text-md flex items-center gap-2"><User className="w-4 h-4 text-blue-600" /> Customer Info</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-2 text-sm">
                <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Name:</span><span className="col-span-2 font-medium">{call.customer?.name}</span></div>
                <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Contact:</span><span className="col-span-2">{call.customer?.contact_person || '-'}</span></div>
                <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Phone:</span><span className="col-span-2">{call.customer?.mobile || '-'}</span></div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-gray-100">
              <CardHeader className="pb-3 border-b border-gray-100">
                <CardTitle className="text-md flex items-center gap-2"><Monitor className="w-4 h-4 text-purple-600" /> Device Info</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-2 text-sm">
                <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Type:</span><span className="col-span-2">{call.device_type || '-'}</span></div>
                <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Brand:</span><span className="col-span-2">{call.brand || '-'} {call.model_name}</span></div>
                <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">S/N:</span><span className="col-span-2">{call.serial_number || '-'}</span></div>
                <div className="grid grid-cols-3"><span className="text-gray-500 font-medium">Warranty:</span><span className="col-span-2">{call.warranty_status || '-'}</span></div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-sm border-gray-100">
            <CardHeader className="pb-3 border-b border-gray-100">
              <CardTitle className="text-md flex items-center gap-2"><Clock className="w-4 h-4 text-amber-600" /> Call Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4 text-sm">
              <div className="grid grid-cols-4 gap-4">
                <div><span className="text-gray-500 block text-xs uppercase mb-1">Date</span><span className="font-medium">{new Date(call.date).toLocaleDateString()}</span></div>
                <div><span className="text-gray-500 block text-xs uppercase mb-1">Time</span><span className="font-medium">{call.time}</span></div>
                <div><span className="text-gray-500 block text-xs uppercase mb-1">Source</span><span className="font-medium">{call.call_source || '-'}</span></div>
                <div><span className="text-gray-500 block text-xs uppercase mb-1">Engineer</span><span className="font-medium text-blue-600">{call.engineer?.name || 'Unassigned'}</span></div>
              </div>
              <div>
                <span className="text-gray-500 block text-xs uppercase mb-1">Complaint Description</span>
                <p className="bg-gray-50 p-3 rounded-md text-gray-800">{call.complaint_description}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-gray-100">
            <CardHeader className="pb-3 border-b border-gray-100 flex flex-row items-center justify-between">
              <CardTitle className="text-md flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Work & Remarks</CardTitle>
              <Button size="sm" onClick={handleUpdate} disabled={isUpdating}>{isUpdating ? 'Saving...' : 'Save Updates'}</Button>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Work Performed</label>
                <Textarea value={workPerformed} onChange={e => setWorkPerformed(e.target.value)} rows={3} placeholder="Describe the work done..." />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Remarks / Internal Notes</label>
                <Textarea value={remarks} onChange={e => setRemarks(e.target.value)} rows={2} placeholder="Any additional remarks..." />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm border-gray-100">
            <CardHeader className="pb-3 border-b border-gray-100">
              <CardTitle className="text-md">Timeline & History</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {history.length > 0 ? (
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                  {history.map((item, idx) => (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-slate-300 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                      <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                          <div className="font-semibold text-slate-900 text-xs">{item.action}</div>
                          <time className="text-xs text-slate-500">{new Date(item.created_at).toLocaleDateString()}</time>
                        </div>
                        <div className="text-slate-500 text-xs">{item.user?.name || 'System'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-sm text-gray-500 py-4">No history available</div>
              )}
            </CardContent>
          </Card>

          {call.follow_up_date && (
            <Card className="shadow-sm border-gray-100 bg-blue-50/50">
              <CardContent className="p-4 flex items-start gap-3">
                <Activity className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Scheduled Follow-up</h4>
                  <p className="text-sm text-gray-600 mt-1">{new Date(call.follow_up_date).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
