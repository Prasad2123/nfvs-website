import { CallStatus, CallPriority } from '../types';

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d.getDate().toString().padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  const dateStr = formatDate(d);
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${dateStr} ${hours}:${minutes}`;
}

export function formatTime(time: string): string {
  const parts = time.split(':');
  if (parts.length < 2) return time;
  
  const h = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);
  
  if (isNaN(h) || isNaN(m)) return time;
  
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hours = h % 12 || 12;
  const minutes = m.toString().padStart(2, '0');
  
  return `${hours}:${minutes} ${ampm}`;
}

export function getStatusColor(status: CallStatus): string {
  switch (status) {
    case 'open': return 'bg-blue-100 text-blue-800';
    case 'assigned': return 'bg-indigo-100 text-indigo-800';
    case 'engineer_on_way': return 'bg-purple-100 text-purple-800';
    case 'in_progress': return 'bg-yellow-100 text-yellow-800';
    case 'waiting_customer': return 'bg-orange-100 text-orange-800';
    case 'waiting_parts': return 'bg-pink-100 text-pink-800';
    case 'completed': return 'bg-green-100 text-green-800';
    case 'closed': return 'bg-teal-100 text-teal-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function getStatusLabel(status: CallStatus): string {
  return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export function getPriorityColor(priority: CallPriority): string {
  switch (priority) {
    case 'low': return 'bg-blue-100 text-blue-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'high': return 'bg-orange-100 text-orange-800';
    case 'critical': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function getPriorityLabel(priority: CallPriority): string {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

export function generateCallNumber(): string {
  const date = new Date();
  const dateStr = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
  const randomStr = Math.floor(1000 + Math.random() * 9000).toString();
  return `SC-${dateStr}-${randomStr}`;
}

export function getInitials(name: string): string {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
}

export function truncate(str: string, length: number): string {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function isToday(dateStr: string): boolean {
  const date = new Date(dateStr);
  const today = new Date();
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
}

export function daysDiff(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}
