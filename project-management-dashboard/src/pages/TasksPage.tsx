// src/components/TasksPage.tsx

import React, { useState } from 'react';
import { Plus, Calendar } from 'lucide-react';
import type { Filters, Task } from '../types';
import { FilterBar } from '../components/FilterBar';
import { useTask } from '../hooks/useTask';
import { TaskTableRow } from '../components/TaskTableRow';

interface TasksPageProps {
  onEditTask: (task: Task) => void;
  onAddTask: () => void;
}

export const TasksPage: React.FC<TasksPageProps> = ({ onEditTask, onAddTask }) => {
  const { state } = useTask();
  const [filters, setFilters] = useState<Filters>({
    status: 'All',
    priority: 'All',
    category: 'All',
    dueDate: 'All',
    assignedUser: 'All'
  });

  const filterTasks = (tasks: Task[]): Task[] => {
    return tasks.filter(task => {
      // Your existing filtering logic is correct and will be used as-is.
      if (filters.status === 'Completed' && !task.completed) return false;
      if (filters.status === 'Incomplete' && task.completed) return false;
      if (filters.priority !== 'All' && task.priority !== filters.priority) return false;
      if (filters.category !== 'All' && task.category !== filters.category) return false;
      if (filters.assignedUser !== 'All' && task.assignedUser !== task.assignedUser) return false;

      if (filters.dueDate !== 'All') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (filters.dueDate === 'No Due Date' && task.dueDate) return false;
        if (filters.dueDate !== 'No Due Date' && !task.dueDate) return false;

        if (task.dueDate) {
          const dueDate = new Date(task.dueDate);
          dueDate.setHours(0, 0, 0, 0);

          if (filters.dueDate === 'Overdue' && dueDate >= today) return false;
          if (filters.dueDate === 'Today' && dueDate.getTime() !== today.getTime()) return false;
          if (filters.dueDate === 'Upcoming' && dueDate <= today) return false;
        }
      }
      return true;
    });
  };

  const filteredTasks = filterTasks(state.tasks);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="py-8">
          <h1 className="text-3xl font-bold text-gray-600">Team Tasks</h1>
          <p className="text-gray-600 mt-1">Manage all your team tasks</p>
        </div>
        <button
          onClick={onAddTask}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Task
        </button>
      </div>

      <FilterBar filters={filters} setFilters={setFilters} />

      <div className=" bg-white rounded-lg border border-gray-200 p-6 flex-auto px-2 md:px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            All Tasks ({filteredTasks.length})
          </h2>
        </div>

        {filteredTasks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Task Name</th>
                  <th className="py-3 px-6 text-left w-32">Priority</th>
                  <th className="py-3 px-6 text-left w-32">Category</th>
                  <th className="py-3 px-6 text-left w-35">Due Date</th>
                  <th className="py-3 px-6 text-left w-48">Assigned To</th>
                  <th className="py-3 px-6 text-center w-24">Status</th>
                  <th className="py-3 px-6 text-center w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {filteredTasks.map(task => (
                  <TaskTableRow key={task.id} task={task} onEdit={onEditTask} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No tasks found</p>
            <p className="text-gray-400 text-sm"> try to filter or add a new task</p>
          </div>
        )}
      </div>
    </div>
  );
};