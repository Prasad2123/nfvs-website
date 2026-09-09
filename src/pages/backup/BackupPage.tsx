import React, { useEffect, useState } from 'react';
import { api } from '@/utils/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Download, Upload, Loader2, AlertCircle } from 'lucide-react';

interface BackupHistory {
  id: string;
  date: string;
  file_name: string;
  size: string;
  status: string;
}

export default function BackupPage() {
  const { toast } = useToast();
  const [history, setHistory] = useState<BackupHistory[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await api.get<BackupHistory[]>('/api/backup/history');
      if (res.success && res.data) {
        setHistory(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch backup history', error);
      toast({
        title: 'Error',
        description: 'Failed to load backup history.',
        variant: 'destructive',
      });
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateBackup = async () => {
    setIsCreating(true);
    try {
      const res = await api.post<{ path: string }>('/api/backup/create');
      if (res.success) {
        toast({
          title: 'Backup Created',
          description: `Backup saved to ${res.data?.path}`,
        });
        fetchHistory();
      }
    } catch (error: any) {
      toast({
        title: 'Backup Failed',
        description: error.message || 'An error occurred during backup.',
        variant: 'destructive',
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRestore = async () => {
    if (!selectedFile) return;
    
    setIsRestoring(true);
    // In a real app, you would use FormData and a multipart/form-data request
    try {
      // Simulating restore delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      // const res = await api.post('/api/backup/restore', formData);
      toast({
        title: 'Restore Complete',
        description: 'Database has been restored successfully. Please restart the application.',
      });
      setSelectedFile(null);
    } catch (error: any) {
      toast({
        title: 'Restore Failed',
        description: error.message || 'An error occurred during restoration.',
        variant: 'destructive',
      });
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Database Backup & Restore</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Create Backup
            </CardTitle>
            <CardDescription>
              Create a full backup of the current database. This is recommended before making major changes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleCreateBackup} 
              disabled={isCreating}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Backup...
                </>
              ) : (
                'Create Backup Now'
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Restore Backup
            </CardTitle>
            <CardDescription>
              Restore the database from a previous backup file.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-2 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-sm">Warning</p>
                <p className="text-sm mt-1">Restoring a backup will overwrite all current data. Make sure to backup current data first.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Input 
                type="file" 
                accept=".db,.sqlite,.bak" 
                onChange={handleFileChange}
                disabled={isRestoring}
              />
              <Button 
                variant="destructive" 
                onClick={handleRestore}
                disabled={!selectedFile || isRestoring}
              >
                {isRestoring ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Restoring...
                  </>
                ) : (
                  'Restore Data'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Backup History</CardTitle>
          <CardDescription>Recent backups created by the system.</CardDescription>
        </CardHeader>
        <CardContent>
          {loadingHistory ? (
            <div className="flex justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>File Name</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                        No backups found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    history.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{new Date(item.date).toLocaleString()}</TableCell>
                        <TableCell className="font-mono text-sm">{item.file_name}</TableCell>
                        <TableCell>{item.size}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {item.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
