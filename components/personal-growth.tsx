"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, Plus, BookOpen, Dumbbell, Brain, Heart } from "lucide-react"

interface Goal {
  id: string
  title: string
  description: string
  category: string
  progress: number
  target: number
  unit: string
}

export function PersonalGrowth() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Read Books",
      description: "Read 24 books this year",
      category: "Learning",
      progress: 8,
      target: 24,
      unit: "books",
    },
    {
      id: "2",
      title: "Meditation",
      description: "Meditate daily for mental wellness",
      category: "Wellness",
      progress: 45,
      target: 365,
      unit: "days",
    },
    {
      id: "3",
      title: "Learn Spanish",
      description: "Complete Spanish course",
      category: "Skills",
      progress: 60,
      target: 100,
      unit: "lessons",
    },
    {
      id: "4",
      title: "Exercise",
      description: "Workout 4 times per week",
      category: "Fitness",
      progress: 32,
      target: 52,
      unit: "weeks",
    },
  ])

  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "",
    target: "",
    unit: "",
  })

  const [progressUpdate, setProgressUpdate] = useState<{ [key: string]: string }>({})

  const addGoal = () => {
    if (newGoal.title && newGoal.target) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        description: newGoal.description,
        category: newGoal.category,
        progress: 0,
        target: Number.parseInt(newGoal.target),
        unit: newGoal.unit,
      }
      setGoals([...goals, goal])
      setNewGoal({ title: "", description: "", category: "", target: "", unit: "" })
    }
  }

  const updateProgress = (goalId: string) => {
    const newProgress = Number.parseInt(progressUpdate[goalId] || "0")
    setGoals(
      goals.map((goal) => (goal.id === goalId ? { ...goal, progress: Math.min(newProgress, goal.target) } : goal)),
    )
    setProgressUpdate({ ...progressUpdate, [goalId]: "" })
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "learning":
        return <BookOpen className="w-4 h-4" />
      case "fitness":
        return <Dumbbell className="w-4 h-4" />
      case "skills":
        return <Brain className="w-4 h-4" />
      case "wellness":
        return <Heart className="w-4 h-4" />
      default:
        return <Target className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "learning":
        return "bg-blue-500 dark:bg-blue-700"
      case "fitness":
        return "bg-green-500 dark:bg-green-700"
      case "skills":
        return "bg-purple-500 dark:bg-purple-700"
      case "wellness":
        return "bg-pink-500 dark:bg-pink-700"
      default:
        return "bg-gray-500 dark:bg-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      {/* Goals Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {goals.map((goal) => (
          <Card key={goal.id} className="relative overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            <div className={`absolute top-0 left-0 w-full h-1 ${getCategoryColor(goal.category)}`} />
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium dark:text-gray-100">{goal.title}</CardTitle>
                {getCategoryIcon(goal.category)}
              </div>
              <Badge variant="outline" className="w-fit dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
                {goal.category}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm dark:text-gray-300">
                  <span>
                    {goal.progress} / {goal.target} {goal.unit}
                  </span>
                  <span>{Math.round((goal.progress / goal.target) * 100)}%</span>
                </div>
                <Progress value={(goal.progress / goal.target) * 100} />
                <p className="text-xs text-muted-foreground dark:text-gray-400">{goal.description}</p>

                {/* Quick Progress Update */}
                <div className="flex gap-2 mt-3">
                  <Input
                    type="number"
                    placeholder="Update"
                    value={progressUpdate[goal.id] || ""}
                    onChange={(e) =>
                      setProgressUpdate({
                        ...progressUpdate,
                        [goal.id]: e.target.value,
                      })
                    }
                    className="h-8 text-xs dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                  />
                  <Button
                    size="sm"
                    onClick={() => updateProgress(goal.id)}
                    className="h-8 px-2 text-xs dark:bg-blue-600 dark:hover:bg-blue-500 dark:text-gray-100"
                  >
                    Update
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Goal */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-gray-100">
            <Plus className="w-5 h-5" />
            Add New Goal
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Set a new personal growth goal to track your progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="goal-title" className="dark:text-gray-100">
                Goal Title
              </Label>
              <Input
                id="goal-title"
                placeholder="e.g., Learn Piano"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="goal-category" className="dark:text-gray-100">
                Category
              </Label>
              <Input
                id="goal-category"
                placeholder="e.g., Skills, Fitness, Learning"
                value={newGoal.category}
                onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="goal-target" className="dark:text-gray-100">
                Target
              </Label>
              <Input
                id="goal-target"
                type="number"
                placeholder="100"
                value={newGoal.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="goal-unit" className="dark:text-gray-100">
                Unit
              </Label>
              <Input
                id="goal-unit"
                placeholder="e.g., hours, books, days"
                value={newGoal.unit}
                onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="goal-description" className="dark:text-gray-100">
                Description
              </Label>
              <Textarea
                id="goal-description"
                placeholder="Describe your goal and why it's important to you"
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              />
            </div>
          </div>
          <Button onClick={addGoal} className="mt-4 dark:bg-blue-600 dark:hover:bg-blue-500 dark:text-gray-100">
            Add Goal
          </Button>
        </CardContent>
      </Card>

      {/* Progress Summary */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-gray-100">Progress Summary</CardTitle>
          <CardDescription className="dark:text-gray-400">Your overall growth metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-500">
                {goals.filter((g) => g.progress / g.target >= 1).length}
              </div>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Goals Completed</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-500">
                {goals.filter((g) => g.progress / g.target >= 0.5 && g.progress / g.target < 1).length}
              </div>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Goals In Progress</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-500">
                {Math.round((goals.reduce((acc, goal) => acc + goal.progress / goal.target, 0) / goals.length) * 100)}%
              </div>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Average Progress</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
