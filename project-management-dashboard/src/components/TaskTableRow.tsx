// src/components/TaskTableRow.tsx

import React from 'react';
import { Trash, Pencil } from 'lucide-react';
import type { Task } from '../types';
import { useTask } from '../hooks/useTask';

interface TaskTableRowProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export const TaskTableRow: React.FC<TaskTableRowProps> = ({ task, onEdit }) => {
  const { dispatch } = useTask();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch({ type: 'DELETE_TASK', payload: task.id });
    }
  };

  const handleToggleComplete = () => {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: task.id });
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
            className="form-checkbox h-4 w-4 text-green-600 rounded cursor-pointer"
          />
          <span className={`ml-2 font-medium ${task.completed ? ' text-gray-500' : ''}`}>
            {task.taskName}
          </span>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
          task.priority === 'High' ? 'bg-red-200 text-red-600' :
          task.priority === 'Medium' ? 'bg-yellow-200 text-yellow-600' :
          'bg-green-200 text-green-600'
        }`}>
          {task.priority}
        </span>
      </td>
      <td className="py-3 px-6 text-left">
        {task.category}
      </td>
      <td className="py-3 px-6 text-left">
        {task.dueDate}
      </td>
      <td className="py-3 px-6 text-left">
        {task.assignedUser}
      </td>
      <td className="py-3 px-6 text-center">
        <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
          task.completed ? 'bg-green-200 text-green-600' : 'bg-gray-200 text-gray-600'
        }`}>
          {task.completed ? 'Completed' : 'Incomplete'}
        </span>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex item-center justify-center space-x-2">
          <button onClick={() => onEdit(task)} className="text-gray-500 hover:text-blue-500">
            <Pencil className="w-5 h-5" />
          </button>
          <button onClick={handleDelete} className="text-gray-500 hover:text-red-500">
            <Trash className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};