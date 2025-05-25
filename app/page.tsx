"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  Heart,
  TrendingUp,
  DollarSign,
  CheckSquare,
  Target,
  Calendar,
  Settings,
  Moon,
  Sun,
} from "lucide-react"
import { HealthMetrics } from "@/components/health-metrics"
import { PersonalGrowth } from "@/components/personal-growth"
import { FinanceChart } from "@/components/finance-chart"
import { TaskManager } from "@/components/task-manager"
import { SettingsPage } from "@/components/settings-page"
import { LoginPage } from "@/components/login-page"
import { DashboardMain } from "@/components/dashboard-main"

export default function PersonalDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [darkMode, setDarkMode] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    }

    // Check if user is already logged in
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAuthenticated(true)
      localStorage.setItem("isAuthenticated", "true")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userProfileImage")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-navy-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mx-auto mb-4 animate-pulse"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading Sooshyant's Dash...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-navy-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-navy-600 dark:to-blue-700 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Sooshyant's Dash</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your personal command center for health, growth, and success
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardMain onLogout={handleLogout}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 lg:w-fit bg-white dark:bg-gray-800 border dark:border-gray-700">
              <TabsTrigger
                value="overview"
                className="flex items-center gap-2 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-navy-700 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-300"
              >
                <Activity className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="health"
                className="flex items-center gap-2 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-navy-700 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-300"
              >
                <Heart className="w-4 h-4" />
                Health
              </TabsTrigger>
              <TabsTrigger
                value="growth"
                className="flex items-center gap-2 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-navy-700 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-300"
              >
                <Target className="w-4 h-4" />
                Growth
              </TabsTrigger>
              <TabsTrigger
                value="finance"
                className="flex items-center gap-2 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-navy-700 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-300"
              >
                <DollarSign className="w-4 h-4" />
                Finance
              </TabsTrigger>
              <TabsTrigger
                value="tasks"
                className="flex items-center gap-2 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-navy-700 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-300"
              >
                <CheckSquare className="w-4 h-4" />
                Tasks
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="flex items-center gap-2 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-navy-700 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-300"
              >
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 text-white border-0 shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium opacity-90">Health Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">85%</div>
                    <p className="text-xs opacity-75">+5% from last week</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-navy-600 dark:to-blue-700 text-white border-0 shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium opacity-90">Growth Goals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3/5</div>
                    <p className="text-xs opacity-75">Goals completed this month</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 text-white border-0 shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium opacity-90">Portfolio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12.5%</div>
                    <p className="text-xs opacity-75">This month's performance</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white border-0 shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium opacity-90">Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs opacity-75">Pending tasks</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <TrendingUp className="w-5 h-5" />
                      Recent Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Daily Exercise</span>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      >
                        Completed
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Reading Goal</span>
                      <Badge
                        variant="outline"
                        className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                      >
                        In Progress
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Meditation</span>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      >
                        Completed
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <Calendar className="w-5 h-5" />
                      Upcoming Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Team meeting</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Today 2:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Gym workout</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Today 6:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Review finances</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Tomorrow</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="health">
              <HealthMetrics />
            </TabsContent>

            <TabsContent value="growth">
              <PersonalGrowth />
            </TabsContent>

            <TabsContent value="finance">
              <FinanceChart />
            </TabsContent>

            <TabsContent value="tasks">
              <TaskManager />
            </TabsContent>

            <TabsContent value="settings">
              <SettingsPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </TabsContent>
          </Tabs>
        </DashboardMain>
      </main>
    </div>
  )
}
