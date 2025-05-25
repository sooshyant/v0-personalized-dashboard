"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Target,
  DollarSign,
  CheckSquare,
  Save,
  RotateCcw,
  Bell,
  Palette,
  Shield,
  MessageCircle,
  Send,
} from "lucide-react"

interface Goals {
  health: {
    targetWeight: number
    dailySteps: number
    dailyWater: number
    dailySleep: number
  }
  finance: {
    emergencyFund: number
    monthlyBudget: number
    savingsRate: number
    investmentTarget: number
  }
  tasks: {
    dailyTaskTarget: number
    weeklyTaskTarget: number
    highPriorityLimit: number
  }
  growth: {
    monthlyGoalLimit: number
    yearlyGoalLimit: number
    defaultProgressUnit: string
  }
}

interface Preferences {
  notifications: {
    healthReminders: boolean
    taskDeadlines: boolean
    goalMilestones: boolean
    weeklyReports: boolean
    telegramEnabled: boolean
  }
  display: {
    darkMode: boolean
    compactView: boolean
    showCompletedTasks: boolean
  }
  telegram: {
    botToken: string
    chatId: string
    reminderTimes: {
      healthCheck: string
      taskReview: string
      goalUpdate: string
    }
  }
}

interface SettingsPageProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

export function SettingsPage({ darkMode, toggleDarkMode }: SettingsPageProps) {
  const [goals, setGoals] = useState<Goals>({
    health: {
      targetWeight: 68,
      dailySteps: 10000,
      dailyWater: 2.5,
      dailySleep: 8,
    },
    finance: {
      emergencyFund: 10000,
      monthlyBudget: 3000,
      savingsRate: 20,
      investmentTarget: 100000,
    },
    tasks: {
      dailyTaskTarget: 5,
      weeklyTaskTarget: 30,
      highPriorityLimit: 3,
    },
    growth: {
      monthlyGoalLimit: 5,
      yearlyGoalLimit: 12,
      defaultProgressUnit: "hours",
    },
  })

  const [preferences, setPreferences] = useState<Preferences>({
    notifications: {
      healthReminders: true,
      taskDeadlines: true,
      goalMilestones: true,
      weeklyReports: false,
      telegramEnabled: false,
    },
    display: {
      darkMode: false,
      compactView: false,
      showCompletedTasks: true,
    },
    telegram: {
      botToken: "",
      chatId: "78090569",
      reminderTimes: {
        healthCheck: "09:00",
        taskReview: "18:00",
        goalUpdate: "20:00",
      },
    },
  })

  const [hasChanges, setHasChanges] = useState(false)
  const [testingTelegram, setTestingTelegram] = useState(false)
  const [telegramStatus, setTelegramStatus] = useState<"idle" | "success" | "error">("idle")

  const updateGoal = (section: keyof Goals, field: string, value: number) => {
    setGoals((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
    setHasChanges(true)
  }

  const updatePreference = (section: keyof Preferences, field: string, value: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
    setHasChanges(true)
  }

  const updateTelegramSetting = (field: string, value: string) => {
    setPreferences((prev) => ({
      ...prev,
      telegram: {
        ...prev.telegram,
        [field]: value,
      },
    }))
    setHasChanges(true)
  }

  const updateReminderTime = (type: string, time: string) => {
    setPreferences((prev) => ({
      ...prev,
      telegram: {
        ...prev.telegram,
        reminderTimes: {
          ...prev.telegram.reminderTimes,
          [type]: time,
        },
      },
    }))
    setHasChanges(true)
  }

  const testTelegramConnection = async () => {
    if (!preferences.telegram.botToken) {
      setTelegramStatus("error")
      return
    }

    setTestingTelegram(true)
    setTelegramStatus("idle")

    try {
      const response = await fetch("/api/telegram/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          botToken: preferences.telegram.botToken,
          chatId: preferences.telegram.chatId,
        }),
      })

      if (response.ok) {
        setTelegramStatus("success")
      } else {
        setTelegramStatus("error")
      }
    } catch (error) {
      setTelegramStatus("error")
    } finally {
      setTestingTelegram(false)
    }
  }

  const saveSettings = () => {
    // In a real app, this would save to your backend/localStorage
    console.log("Saving goals:", goals)
    console.log("Saving preferences:", preferences)
    setHasChanges(false)

    // If Telegram is enabled, set up the reminder schedule
    if (preferences.notifications.telegramEnabled && preferences.telegram.botToken) {
      setupTelegramReminders()
    }
  }

  const setupTelegramReminders = () => {
    // This would typically be handled by your backend with a cron job or scheduler
    console.log("Setting up Telegram reminders with schedule:", preferences.telegram.reminderTimes)
  }

  const resetToDefaults = () => {
    setGoals({
      health: {
        targetWeight: 68,
        dailySteps: 10000,
        dailyWater: 2.5,
        dailySleep: 8,
      },
      finance: {
        emergencyFund: 10000,
        monthlyBudget: 3000,
        savingsRate: 20,
        investmentTarget: 100000,
      },
      tasks: {
        dailyTaskTarget: 5,
        weeklyTaskTarget: 30,
        highPriorityLimit: 3,
      },
      growth: {
        monthlyGoalLimit: 5,
        yearlyGoalLimit: 12,
        defaultProgressUnit: "hours",
      },
    })
    setHasChanges(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Sooshyant's Dash Settings</h2>
          <p className="text-muted-foreground">Customize your personal command center</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetToDefaults}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={saveSettings} disabled={!hasChanges}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="goals" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="goals">Goal Settings</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="goals" className="space-y-6">
          {/* Health Goals */}
          <Card className="bg-card text-card-foreground shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Health Goals
              </CardTitle>
              <CardDescription>Set your target health metrics and daily goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="target-weight">Target Weight (kg)</Label>
                  <Input
                    id="target-weight"
                    type="number"
                    step="0.1"
                    value={goals.health.targetWeight}
                    onChange={(e) => updateGoal("health", "targetWeight", Number.parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="daily-steps">Daily Steps Goal</Label>
                  <Input
                    id="daily-steps"
                    type="number"
                    value={goals.health.dailySteps}
                    onChange={(e) => updateGoal("health", "dailySteps", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="daily-water">Daily Water Goal (L)</Label>
                  <Input
                    id="daily-water"
                    type="number"
                    step="0.1"
                    value={goals.health.dailyWater}
                    onChange={(e) => updateGoal("health", "dailyWater", Number.parseFloat(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="daily-sleep">Daily Sleep Goal (hours)</Label>
                  <Input
                    id="daily-sleep"
                    type="number"
                    step="0.5"
                    value={goals.health.dailySleep}
                    onChange={(e) => updateGoal("health", "dailySleep", Number.parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Finance Goals */}
          <Card className="bg-card text-card-foreground shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                Financial Goals
              </CardTitle>
              <CardDescription>Configure your financial targets and budget limits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="emergency-fund">Emergency Fund Target ($)</Label>
                  <Input
                    id="emergency-fund"
                    type="number"
                    value={goals.finance.emergencyFund}
                    onChange={(e) => updateGoal("finance", "emergencyFund", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthly-budget">Monthly Budget ($)</Label>
                  <Input
                    id="monthly-budget"
                    type="number"
                    value={goals.finance.monthlyBudget}
                    onChange={(e) => updateGoal("finance", "monthlyBudget", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="savings-rate">Savings Rate (%)</Label>
                  <Input
                    id="savings-rate"
                    type="number"
                    value={goals.finance.savingsRate}
                    onChange={(e) => updateGoal("finance", "savingsRate", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="investment-target">Investment Target ($)</Label>
                  <Input
                    id="investment-target"
                    type="number"
                    value={goals.finance.investmentTarget}
                    onChange={(e) => updateGoal("finance", "investmentTarget", Number.parseInt(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Task Goals */}
          <Card className="bg-card text-card-foreground shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-blue-500" />
                Task Management Goals
              </CardTitle>
              <CardDescription>Set productivity targets and task limits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="daily-task-target">Daily Task Target</Label>
                  <Input
                    id="daily-task-target"
                    type="number"
                    value={goals.tasks.dailyTaskTarget}
                    onChange={(e) => updateGoal("tasks", "dailyTaskTarget", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weekly-task-target">Weekly Task Target</Label>
                  <Input
                    id="weekly-task-target"
                    type="number"
                    value={goals.tasks.weeklyTaskTarget}
                    onChange={(e) => updateGoal("tasks", "weeklyTaskTarget", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="high-priority-limit">High Priority Task Limit</Label>
                  <Input
                    id="high-priority-limit"
                    type="number"
                    value={goals.tasks.highPriorityLimit}
                    onChange={(e) => updateGoal("tasks", "highPriorityLimit", Number.parseInt(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Growth Goals */}
          <Card className="bg-card text-card-foreground shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-500" />
                Personal Growth Goals
              </CardTitle>
              <CardDescription>Configure limits and defaults for personal development</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="monthly-goal-limit">Monthly Goal Limit</Label>
                  <Input
                    id="monthly-goal-limit"
                    type="number"
                    value={goals.growth.monthlyGoalLimit}
                    onChange={(e) => updateGoal("growth", "monthlyGoalLimit", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearly-goal-limit">Yearly Goal Limit</Label>
                  <Input
                    id="yearly-goal-limit"
                    type="number"
                    value={goals.growth.yearlyGoalLimit}
                    onChange={(e) => updateGoal("growth", "yearlyGoalLimit", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-progress-unit">Default Progress Unit</Label>
                  <Input
                    id="default-progress-unit"
                    value={goals.growth.defaultProgressUnit}
                    onChange={(e) =>
                      setGoals((prev) => ({
                        ...prev,
                        growth: { ...prev.growth, defaultProgressUnit: e.target.value },
                      }))
                    }
                    placeholder="e.g., hours, days, books"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          {/* Display Preferences */}
          <Card className="bg-card text-card-foreground shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Display Preferences
              </CardTitle>
              <CardDescription>Customize how your dashboard looks and feels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Use dark theme for the dashboard</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Compact View</Label>
                  <p className="text-sm text-muted-foreground">Show more information in less space</p>
                </div>
                <Switch
                  checked={preferences.display.compactView}
                  onCheckedChange={(checked) => updatePreference("display", "compactView", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Completed Tasks</Label>
                  <p className="text-sm text-muted-foreground">Display completed tasks in task lists</p>
                </div>
                <Switch
                  checked={preferences.display.showCompletedTasks}
                  onCheckedChange={(checked) => updatePreference("display", "showCompletedTasks", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          {/* Telegram Notifications */}
          <Card className="bg-card text-card-foreground shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                Telegram Notifications
              </CardTitle>
              <CardDescription>Send reminders directly to your Telegram</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Telegram Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send reminders to Telegram ID: 78090569</p>
                </div>
                <Switch
                  checked={preferences.notifications.telegramEnabled}
                  onCheckedChange={(checked) => updatePreference("notifications", "telegramEnabled", checked)}
                />
              </div>

              {preferences.notifications.telegramEnabled && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bot-token">Telegram Bot Token</Label>
                      <Input
                        id="bot-token"
                        type="password"
                        placeholder="Enter your Telegram bot token"
                        value={preferences.telegram.botToken}
                        onChange={(e) => updateTelegramSetting("botToken", e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Create a bot with @BotFather on Telegram to get your token
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="chat-id">Chat ID</Label>
                      <Input
                        id="chat-id"
                        value={preferences.telegram.chatId}
                        onChange={(e) => updateTelegramSetting("chatId", e.target.value)}
                        disabled
                      />
                      <p className="text-xs text-muted-foreground">Your Telegram user ID (pre-filled)</p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={testTelegramConnection}
                        disabled={testingTelegram || !preferences.telegram.botToken}
                        variant="outline"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {testingTelegram ? "Testing..." : "Test Connection"}
                      </Button>
                      {telegramStatus === "success" && (
                        <Badge variant="default" className="bg-green-500">
                          ✓ Connected
                        </Badge>
                      )}
                      {telegramStatus === "error" && <Badge variant="destructive">✗ Failed</Badge>}
                    </div>
                  </div>

                  <Separator />
                  <div className="space-y-4">
                    <h4 className="font-medium">Reminder Schedule</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="health-reminder">Health Check Reminder</Label>
                        <Input
                          id="health-reminder"
                          type="time"
                          value={preferences.telegram.reminderTimes.healthCheck}
                          onChange={(e) => updateReminderTime("healthCheck", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="task-reminder">Task Review Reminder</Label>
                        <Input
                          id="task-reminder"
                          type="time"
                          value={preferences.telegram.reminderTimes.taskReview}
                          onChange={(e) => updateReminderTime("taskReview", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="goal-reminder">Goal Update Reminder</Label>
                        <Input
                          id="goal-reminder"
                          type="time"
                          value={preferences.telegram.reminderTimes.goalUpdate}
                          onChange={(e) => updateReminderTime("goalUpdate", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Standard Notifications */}
          <Card className="bg-card text-card-foreground shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Standard Notifications
              </CardTitle>
              <CardDescription>Choose what notifications you'd like to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Health Reminders</Label>
                  <p className="text-sm text-muted-foreground">Daily reminders to log health metrics</p>
                </div>
                <Switch
                  checked={preferences.notifications.healthReminders}
                  onCheckedChange={(checked) => updatePreference("notifications", "healthReminders", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Task Deadlines</Label>
                  <p className="text-sm text-muted-foreground">Notifications for upcoming task due dates</p>
                </div>
                <Switch
                  checked={preferences.notifications.taskDeadlines}
                  onCheckedChange={(checked) => updatePreference("notifications", "taskDeadlines", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Goal Milestones</Label>
                  <p className="text-sm text-muted-foreground">Celebrate when you reach goal milestones</p>
                </div>
                <Switch
                  checked={preferences.notifications.goalMilestones}
                  onCheckedChange={(checked) => updatePreference("notifications", "goalMilestones", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">Weekly summary of your progress</p>
                </div>
                <Switch
                  checked={preferences.notifications.weeklyReports}
                  onCheckedChange={(checked) => updatePreference("notifications", "weeklyReports", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          {/* API Integrations */}
          <Card className="bg-card text-card-foreground shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                API Integrations
              </CardTitle>
              <CardDescription>Manage your connected services and API keys</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Microsoft To-Do</h4>
                    <p className="text-sm text-muted-foreground">Sync tasks with Microsoft To-Do</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Financial API</h4>
                    <p className="text-sm text-muted-foreground">Connect your investment portfolio</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Health Sync</h4>
                    <p className="text-sm text-muted-foreground">Import data from fitness trackers</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="bg-card text-card-foreground shadow-sm">
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Export, import, or reset your dashboard data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Button variant="outline">Export Data</Button>
                <Button variant="outline">Import Data</Button>
                <Button variant="destructive">Reset All Data</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
