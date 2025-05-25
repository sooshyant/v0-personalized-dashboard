"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Activity, Droplets, Moon, Plus } from "lucide-react"

interface HealthData {
  date: string
  weight: number
  steps: number
  water: number
  sleep: number
}

export function HealthMetrics() {
  const [healthData, setHealthData] = useState<HealthData[]>([
    { date: "2024-01-01", weight: 70, steps: 8500, water: 2.1, sleep: 7.5 },
    { date: "2024-01-02", weight: 69.8, steps: 9200, water: 2.3, sleep: 8.0 },
    { date: "2024-01-03", weight: 69.9, steps: 7800, water: 1.9, sleep: 7.0 },
    { date: "2024-01-04", weight: 69.7, steps: 10500, water: 2.5, sleep: 8.2 },
    { date: "2024-01-05", weight: 69.5, steps: 9800, water: 2.2, sleep: 7.8 },
  ])

  const [newEntry, setNewEntry] = useState({
    weight: "",
    steps: "",
    water: "",
    sleep: "",
  })

  const [weightGoal, setWeightGoal] = useState(68)
  const [stepsGoal, setStepsGoal] = useState(10000)
  const [waterGoal, setWaterGoal] = useState(2.5)
  const [sleepGoal, setSleepGoal] = useState(8)

  const addHealthEntry = () => {
    if (newEntry.weight && newEntry.steps && newEntry.water && newEntry.sleep) {
      const today = new Date().toISOString().split("T")[0]
      const entry: HealthData = {
        date: today,
        weight: Number.parseFloat(newEntry.weight),
        steps: Number.parseInt(newEntry.steps),
        water: Number.parseFloat(newEntry.water),
        sleep: Number.parseFloat(newEntry.sleep),
      }
      setHealthData([...healthData, entry])
      setNewEntry({ weight: "", steps: "", water: "", sleep: "" })
    }
  }

  const latestData = healthData[healthData.length - 1]

  return (
    <div className="space-y-6">
      {/* Current Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">Weight</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{latestData?.weight} kg</div>
            <p className="text-xs text-muted-foreground dark:text-gray-300">Target: {weightGoal} kg</p>
            <Progress value={((70 - latestData?.weight) / (70 - weightGoal)) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">Steps</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{latestData?.steps?.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground dark:text-gray-300">Goal: {stepsGoal.toLocaleString()} steps</p>
            <Progress value={(latestData?.steps / stepsGoal) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">Water</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{latestData?.water}L</div>
            <p className="text-xs text-muted-foreground dark:text-gray-300">Goal: {waterGoal}L daily</p>
            <Progress value={(latestData?.water / waterGoal) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium dark:text-white">Sleep</CardTitle>
            <Moon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{latestData?.sleep}h</div>
            <p className="text-xs text-muted-foreground dark:text-gray-300">Goal: {sleepGoal} hours</p>
            <Progress value={(latestData?.sleep / sleepGoal) * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Add New Entry */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-white">
            <Plus className="w-5 h-5" />
            Add Today's Metrics
          </CardTitle>
          <CardDescription className="dark:text-gray-300">Track your daily health metrics manually</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight" className="dark:text-white">
                Weight (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="70.0"
                value={newEntry.weight}
                className="dark:bg-gray-700 dark:text-white"
                onChange={(e) => setNewEntry({ ...newEntry, weight: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="steps" className="dark:text-white">
                Steps
              </Label>
              <Input
                id="steps"
                type="number"
                placeholder="10000"
                value={newEntry.steps}
                className="dark:bg-gray-700 dark:text-white"
                onChange={(e) => setNewEntry({ ...newEntry, steps: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="water" className="dark:text-white">
                Water (L)
              </Label>
              <Input
                id="water"
                type="number"
                step="0.1"
                placeholder="2.5"
                value={newEntry.water}
                className="dark:bg-gray-700 dark:text-white"
                onChange={(e) => setNewEntry({ ...newEntry, water: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sleep" className="dark:text-white">
                Sleep (hours)
              </Label>
              <Input
                id="sleep"
                type="number"
                step="0.1"
                placeholder="8.0"
                value={newEntry.sleep}
                className="dark:bg-gray-700 dark:text-white"
                onChange={(e) => setNewEntry({ ...newEntry, sleep: e.target.value })}
              />
            </div>
          </div>
          <Button onClick={addHealthEntry} className="mt-4">
            Add Entry
          </Button>
        </CardContent>
      </Card>

      {/* Health Trends */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Health Trends</CardTitle>
          <CardDescription className="dark:text-gray-300">Track your progress over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] dark:bg-gray-900">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                <XAxis dataKey="date" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
