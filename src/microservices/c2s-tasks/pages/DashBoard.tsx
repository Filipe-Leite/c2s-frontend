import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, Task } from "../../../sessions/tasks/sessionTasks";
import './dashboard.css';

export default function DashBoard() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.sessionTasks.loading);
  const tasks = useSelector((state: RootState) => state.sessionTasks.tasks);
  const [taskStatuses, setTaskStatuses] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    function fetchTasks() {
      console.log("fetchTasks >>>>");
      const response = dispatch(getTasks());
      console.log(response);
    }

    fetchTasks();
  }, [dispatch]);

  const handleStatusChange = (taskId: number, newStatus: string) => {
    setTaskStatuses({
      ...taskStatuses,
      [taskId]: newStatus,
    });
  };

  const getColorForStatus = (status: string) => {
    switch (status) {
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

  return (
    <div id="tasks-page">
      <h1>DashBoard</h1>
      <div id="container-list-tasks">
        <table>
          <thead>
            <tr>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks && tasks.length > 0 && tasks.map((task: Task, index) => (
              <tr key={index}>
                <td>{task.createdAt}</td>
                <td>{task.updatedAt}</td>
                <td>{task.url}</td>
                <td style={{ backgroundColor: getColorForStatus(taskStatuses[task.id] || "Pending") }}>
                  <select
                    value={taskStatuses[task.id] || "Pending"}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Failed">Failed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
