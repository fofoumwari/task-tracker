import React from 'react';
import { List, Check, Calendar, AlertCircle } from 'lucide-react';
import type { Task } from '../types';
import { StatCard } from '../components/cards/StatCard';
import { useTask } from '../hooks/useTask';
import { Header } from '../components/Header';


interface DashboardPageProps {
  onEditTask: (task: Task) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onEditTask }) => {
  const { state } = useTask();
  
  const completedCount = state.tasks.filter(task => task.completed).length;
  const overdueCount = state.tasks.filter(task => 
    task.dueDate && new Date(task.dueDate) < new Date() && !task.completed
  ).length;
  const todayCount = state.tasks.filter(task =>
    task.dueDate && new Date(task.dueDate).toDateString() === new Date().toDateString() && !task.completed
  ).length;

  const recentTasks = state.tasks
    .sort((a, b) => new Date(b.assignedOn).getTime() - new Date(a.assignedOn).getTime())
    .slice(0, 5);

  const highPriorityTasks = state.tasks.filter(task => task.priority === 'High' && !task.completed);

  return (
    <div className="space-y-6">
      {/* header section */}
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Tasks"
          value={state.tasks.length}
          icon={<List className="w-6 h-6 text-blue-600" />}
          color="text-blue-600"
        />
        <StatCard
          title="Completed"
          value={completedCount}
          icon={<Check className="w-6 h-6 text-green-600" />}
          color="text-green-600"
        />
        <StatCard
          title="Due Today"
          value={todayCount}
          icon={<Calendar className="w-6 h-6 text-orange-600" />}
          color="text-orange-600"
        />
        <StatCard
          title="Overdue"
          value={overdueCount}
          icon={<AlertCircle className="w-6 h-6 text-red-600" />}
          color="text-red-600"
        />
      </div>
    </div>
  );
};