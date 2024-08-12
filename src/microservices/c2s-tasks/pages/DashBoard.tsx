import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { createTask, deleteTask, editTask, getTasks, getTasksStatuses, Task, TaskStatus } from "../../../sessions/tasks/sessionTasks";
import CreateModal from '../components/CreateModal';
import './dashboard.css';
import AddIcon from '../../../assets/add-icon.png';
import { toast } from 'react-toastify';
import { format } from "date-fns";

export default function DashBoard() {
  const loading = useSelector((state: RootState) => state.sessionTasks.loading);
  const tasks = useSelector((state: RootState) => state.sessionTasks.tasks);
  const tasksStatuses = useSelector((state: RootState) => state.sessionTasks.tasksStatuses);
  const [taskStatuses, setTaskStatuses] = useState<{ [key: number]: number }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTasksStatuses());
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    const initialStatuses: { [key: number]: number } = {};
    tasks.forEach((task: Task) => {
      initialStatuses[task.id] = task.taskStatusId;
    });
    setTaskStatuses(initialStatuses);
  }, [tasks]);

  function handleFormatDate(date: any){
    const originalDate = new Date(date);
    const formattedDate = format(originalDate, 'dd MMM yyyy HH:mm:ss');
    return formattedDate
  }

  async function handleStatusChange(taskId: number, taskStatusId: number) {
    setTaskStatuses({
      ...taskStatuses,
      [taskId]: taskStatusId,
    });

    const response = await dispatch(editTask({ taskId, taskStatusId }));

    if (response.meta.requestStatus !== 'fulfilled') {
      toast.error('Failed to update task status');
    }
  }

  const getColorForStatus = (status: number) => {
    const statusDescription = tasksStatuses.find(statusObj => statusObj.id === status)?.description;
    switch (statusDescription) {
      case "Failed":
        return "red";
      case "In Progress":
        return "orange";
      case "Completed":
        return "green";
      default:
        return "white";
    }
  };

  const handleAddTaskClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  async function handleCreateTask(url: string) {
    if (url === '') {
      return toast.error("URL field cannot be blank");
    } else {
      const response = await dispatch(createTask({ url }));

      if (response.meta.requestStatus !== 'fulfilled') {
        toast.error('Something went wrong');
      }
    }
  }

  async function handleDeleteTask(taskId: number) {

    console.log("handleDeleteTask taskId >>>", taskId)

    const response = await dispatch(deleteTask({taskId: taskId}));

    console.log("response >>>> ", response)

    if (response.meta.requestStatus !== 'fulfilled') {
      toast.error('Something went wrong');
    }
  }

  return (
    <div id="tasks-page">
      <div id="container-title-task-button-add">
        <h1>Tasks</h1>
        <button id='add-task-button' onClick={handleAddTaskClick}>
          <img src={AddIcon} alt="Add Task" />
        </button>
      </div>
      <div id="container-list-tasks">
        <table>
          <thead>
            <tr>
              <th>Created At</th>
              <th>Updated At</th>
              <th>URL</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tasks && tasks.length > 0 && tasks.map((task: Task) => (
              <tr key={task.id}>
                <td id='cell-dashboard-date-info'>{handleFormatDate(task.createdAt)}</td>
                <td id='cell-dashboard-date-info'>{handleFormatDate(task.updatedAt)}</td>
                <td id='dashboard-url-cell' title={task.url}>{task.url}</td>
                <td style={{ backgroundColor: getColorForStatus(taskStatuses[task.id]) }}>
                  <select
                    value={taskStatuses[task.id] || ''}
                    onChange={(e) => handleStatusChange(task.id, parseInt(e.target.value))}
                  >
                    <option value="" disabled>Select status</option>
                    {tasksStatuses && tasksStatuses.length > 0 && tasksStatuses.map((taskStatus: TaskStatus) => (
                      <option key={taskStatus.id} value={taskStatus.id}>{taskStatus.description}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <button id='extract-data-button'>
                    Extract Data
                  </button>
                </td>
                <td>
                  <button id='delete-task-button'
                          onClick={() => {handleDeleteTask(task.id)}}>
                    Delete Task
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleCreateTask}
      />
    </div>
  );
}
