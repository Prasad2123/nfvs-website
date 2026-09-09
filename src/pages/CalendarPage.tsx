import React, { useEffect, useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Phone } from 'lucide-react';
import { api } from '@/utils/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface FollowUp {
  id: number;
  service_call_id: number;
  customer_name: string;
  follow_up_date: string;
  notes: string;
  status: string;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchFollowUps = async () => {
      try {
        const res = await api.get<FollowUp[]>('/api/follow-ups');
        if (res.success && res.data) {
          setFollowUps(res.data);
        }
      } catch (error) {
        console.error('Failed to fetch follow-ups', error);
      }
    };
    fetchFollowUps();
  }, []);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getFollowUpsForDate = (date: Date) => {
    return followUps.filter(f => {
      const fDate = new Date(f.follow_up_date);
      return isSameDay(fDate, date);
    });
  };

  const selectedDayFollowUps = getFollowUpsForDate(selectedDate);

  return (
    <div className="p-6 h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <CalendarIcon className="h-6 w-6 text-blue-600" />
          Follow-up Calendar
        </h1>
        <p className="text-gray-500">View and manage scheduled follow-ups</p>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        <Card className="flex-1 flex flex-col shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
            <CardTitle className="text-xl">{format(currentDate, 'MMMM yyyy')}</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-4">
            <div className="grid grid-cols-7 gap-2 mb-2 text-center text-sm font-semibold text-gray-500">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {daysInMonth.map((day, i) => {
                const dayFollowUps = getFollowUpsForDate(day);
                const hasFollowUps = dayFollowUps.length > 0;
                const isSelected = isSameDay(day, selectedDate);
                
                return (
                  <div
                    key={day.toString()}
                    onClick={() => setSelectedDate(day)}
                    className={`
                      min-h-[80px] p-2 rounded-md border cursor-pointer transition-all
                      ${!isSameMonth(day, currentDate) ? 'opacity-30' : ''}
                      ${isToday(day) ? 'border-blue-400 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}
                      ${isSelected ? 'ring-2 ring-blue-600 ring-offset-1' : ''}
                    `}
                    style={{ gridColumnStart: i === 0 ? day.getDay() + 1 : 'auto' }}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`text-sm ${isToday(day) ? 'font-bold text-blue-600' : 'text-gray-700'}`}>
                        {format(day, 'd')}
                      </span>
                      {hasFollowUps && (
                        <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
                      )}
                    </div>
                    {hasFollowUps && (
                      <div className="mt-2 text-xs text-gray-500 font-medium">
                        {dayFollowUps.length} call{dayFollowUps.length > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="w-96 flex flex-col shadow-sm">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-lg flex justify-between items-center">
              <span>{format(selectedDate, 'MMMM d, yyyy')}</span>
              {isToday(selectedDate) && <Badge variant="secondary" className="bg-blue-100 text-blue-800">Today</Badge>}
            </CardTitle>
          </CardHeader>
          <ScrollArea className="flex-1 p-4">
            {selectedDayFollowUps.length === 0 ? (
              <div className="text-center text-gray-500 mt-10">
                <CalendarIcon className="h-10 w-10 mx-auto text-gray-300 mb-2" />
                <p>No follow-ups scheduled for this day.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedDayFollowUps.map(f => (
                  <div key={f.id} className="p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors bg-white">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                        <Phone className="h-4 w-4 text-blue-500" />
                        {f.customer_name}
                      </h4>
                      <Badge variant="outline">{f.status}</Badge>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                      <Clock className="h-3 w-3" />
                      {new Date(f.follow_up_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      {f.notes || 'No notes provided.'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
