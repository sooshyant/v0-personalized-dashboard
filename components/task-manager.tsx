"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckSquare, Plus, Calendar, Clock, AlertCircle, Settings } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  priority: "low" | "medium" | "high"
  dueDate: string
  category: string
}

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Team meeting preparation",
      description: "Prepare slides for quarterly review",
      completed: false,
      priority: "high",
      dueDate: "2024-01-15",
      category: "Work",
    },
    {
      id: "2",
      title: "Grocery shopping",
      description: "Buy ingredients for meal prep",
      completed: false,
      priority: "medium",
      dueDate: "2024-01-14",
      category: "Personal",
    },
    {
      id: "3",
      title: "Gym workout",
      description: "Upper body strength training",
      completed: true,
      priority: "medium",
      dueDate: "2024-01-13",
      category: "Health",
    },
    {
      id: "4",
      title: "Read chapter 5",
      description: "Continue reading 'Atomic Habits'",
      completed: false,
      priority: "low",
      dueDate: "2024-01-16",
      category: "Learning",
    },
  ])

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    dueDate: "",
    category: "",
  })

  const [isConnected, setIsConnected] = useState(false)

  const addTask = () => {
    if (newTask.title) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        completed: false,
        priority: newTask.priority,
        dueDate: newTask.dueDate,
        category: newTask.category,
      }
      setTasks([...tasks, task])
      setNewTask({ title: "", description: "", priority: "medium", dueDate: "", category: "" })
    }
  }

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const connectMicrosoftToDo = () => {
    setIsConnected(true)
    // In real app, this would initiate Microsoft Graph API authentication
    console.log("Connecting to Microsoft To-Do...")
  }

  const pendingTasks = tasks.filter((task) => !task.completed)
  const completedTasks = tasks.filter((task) => task.completed)

  return (
    <div className="space-y-6">
      {/* Microsoft To-Do Integration */}
      {!isConnected && (
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900 dark:border-blue-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Connect Microsoft To-Do
            </CardTitle>
            <CardDescription>Sync your tasks with Microsoft To-Do for seamless productivity</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={connectMicrosoftToDo}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Connect to Microsoft To-Do
            </Button>
            <p className="text-xs text-muted-foreground mt-2 dark:text-gray-400">
              This will require Microsoft Graph API authentication
            </p>
          </CardContent>
        </Card>
      )}

      {isConnected && (
        <Card className="border-green-200 bg-green-50 dark:bg-green-900 dark:border-green-700">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-green-800 font-medium dark:text-green-300">Connected to Microsoft To-Do</span>
              <Badge variant="secondary">Synced</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Task Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="dark:bg-gray-900 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-gray-100">Total Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-gray-50">{tasks.length}</div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-900 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-gray-100">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{pendingTasks.length}</div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-900 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-gray-100">Completed</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{completedTasks.length}</div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-900 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-gray-100">High Priority</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {tasks.filter((task) => task.priority === "high" && !task.completed).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Note: Task targets are now configurable in Settings */}

      {/* Add New Task */}
      <Card className="dark:bg-gray-900 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-gray-100">
            <Plus className="w-5 h-5" />
            Add New Task
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Create a new task {isConnected && "that will sync with Microsoft To-Do"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="task-title" className="dark:text-gray-100">
                Task Title
              </Label>
              <Input
                id="task-title"
                placeholder="Enter task title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-category" className="dark:text-gray-100">
                Category
              </Label>
              <Input
                id="task-category"
                placeholder="e.g., Work, Personal, Health"
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-priority" className="dark:text-gray-100">
                Priority
              </Label>
              <Select
                value={newTask.priority}
                onValueChange={(value: any) => setNewTask({ ...newTask, priority: value })}
              >
                <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-due" className="dark:text-gray-100">
                Due Date
              </Label>
              <Input
                id="task-due"
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="task-description" className="dark:text-gray-100">
                Description
              </Label>
              <Textarea
                id="task-description"
                placeholder="Task description (optional)"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50"
              />
            </div>
          </div>
          <Button onClick={addTask} className="mt-4">
            Add Task
          </Button>
        </CardContent>
      </Card>

      {/* Task Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Tasks */}
        <Card className="dark:bg-gray-900 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-gray-100">
              <Clock className="w-5 h-5" />
              Pending Tasks ({pendingTasks.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start space-x-3 p-3 border rounded-lg dark:border-gray-700 dark:bg-gray-800"
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-green-400"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium dark:text-gray-50">{task.title}</h4>
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                    <Badge variant="outline">{task.category}</Badge>
                  </div>
                  {task.description && (
                    <p className="text-sm text-muted-foreground dark:text-gray-400">{task.description}</p>
                  )}
                  {task.dueDate && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground dark:text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {pendingTasks.length === 0 && (
              <p className="text-center text-muted-foreground py-8 dark:text-gray-400">No pending tasks</p>
            )}
          </CardContent>
        </Card>

        {/* Completed Tasks */}
        <Card className="dark:bg-gray-900 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-gray-100">
              <CheckSquare className="w-5 h-5" />
              Completed Tasks ({completedTasks.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start space-x-3 p-3 border rounded-lg opacity-60 dark:border-gray-700 dark:bg-gray-800"
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-green-400"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium line-through dark:text-gray-50">{task.title}</h4>
                    <Badge variant="outline">{task.category}</Badge>
                  </div>
                  {task.description && (
                    <p className="text-sm text-muted-foreground line-through dark:text-gray-400">{task.description}</p>
                  )}
                </div>
              </div>
            ))}
            {completedTasks.length === 0 && (
              <p className="text-center text-muted-foreground py-8 dark:text-gray-400">No completed tasks</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
