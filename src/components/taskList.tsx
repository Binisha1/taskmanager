import { useState } from "react";
import { Plus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";
import { useTasks } from "@/context/TaskContext";

export function TaskList() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask({
        title: newTaskTitle,
        description: newTaskDescription,
      });
      setNewTaskTitle("");
      setNewTaskDescription("");

      setIsDialogOpen(false);
    }
  };

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-black to-white text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Create a new task to keep track of your work.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  placeholder="Enter task title"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter task description"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTask}>Add Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center">
        <Input
          placeholder="Quick add task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="mr-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
        />
        <Button onClick={handleAddTask}>Add</Button>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="pending">
            Pending ({pendingTasks.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedTasks.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription>
                Tasks that need to be completed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingTasks.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No pending tasks. Add a new task to get started!
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                      <Checkbox
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <Label
                          htmlFor={`task-${task.id}`}
                          className="text-base font-medium cursor-pointer"
                        >
                          {task.title}
                        </Label>
                        {task.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {task.description}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTask(task.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Tasks</CardTitle>
              <CardDescription>
                Tasks you have already completed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {completedTasks.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No completed tasks yet. Complete a task to see it here!
                </div>
              ) : (
                <div className="space-y-4">
                  {completedTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                      <Checkbox
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <Label
                          htmlFor={`task-${task.id}`}
                          className="text-base font-medium cursor-pointer line-through text-muted-foreground"
                        >
                          {task.title}
                        </Label>
                        {task.description && (
                          <p className="text-sm text-muted-foreground mt-1 line-through">
                            {task.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-muted-foreground">
                            {new Date(task.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTask(task.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  completedTasks.forEach((task) => deleteTask(task.id));
                }}
                disabled={completedTasks.length === 0}
              >
                <Trash className="mr-2 h-4 w-4" />
                Clear completed tasks
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
