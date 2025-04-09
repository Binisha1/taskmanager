import { DashboardHeader } from "@/components/dashboardHeader";
import { TaskList } from "@/components/taskList";

function Dashboard() {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full max-w-3xl mx-auto p-4">
        <TaskList />
      </div>
    </div>
  );
}

export default Dashboard;
