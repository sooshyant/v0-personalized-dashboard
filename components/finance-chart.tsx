"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { DollarSign, TrendingUp, TrendingDown, Settings } from "lucide-react"

// Mock financial data - in real app, this would come from your API
const portfolioData = [
  { date: "Jan", value: 10000, growth: 0 },
  { date: "Feb", value: 10500, growth: 5 },
  { date: "Mar", value: 9800, growth: -2 },
  { date: "Apr", value: 11200, growth: 12 },
  { date: "May", value: 11800, growth: 18 },
  { date: "Jun", value: 12500, growth: 25 },
]

const expenseData = [
  { name: "Housing", value: 1200, color: "#8884d8" },
  { name: "Food", value: 400, color: "#82ca9d" },
  { name: "Transportation", value: 300, color: "#ffc658" },
  { name: "Entertainment", value: 200, color: "#ff7300" },
  { name: "Savings", value: 800, color: "#00ff00" },
]

export function FinanceChart() {
  const [apiKey, setApiKey] = useState("")
  const [isConnected, setIsConnected] = useState(false)

  const connectAPI = () => {
    if (apiKey.trim()) {
      setIsConnected(true)
      // In real app, you would validate and store the API key
      console.log("Connecting to financial API with key:", apiKey)
    }
  }

  const currentValue = portfolioData[portfolioData.length - 1].value
  const previousValue = portfolioData[portfolioData.length - 2].value
  const changePercent = (((currentValue - previousValue) / previousValue) * 100).toFixed(2)
  const isPositive = Number.parseFloat(changePercent) >= 0

  return (
    <div className="space-y-6">
      {/* API Connection */}
      {!isConnected && (
        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950 dark:border-orange-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Connect Financial API
            </CardTitle>
            <CardDescription>Enter your financial API key to display real-time portfolio data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter your financial API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Supports Alpha Vantage, Yahoo Finance, or similar APIs
                </p>
              </div>
              <div className="flex items-end">
                <Button onClick={connectAPI}>Connect</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="dark:bg-gray-900 dark:border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentValue.toLocaleString()}</div>
            <p
              className={`text-xs flex items-center gap-1 ${isPositive ? "text-green-600" : "text-red-600"} dark:text-gray-400`}
            >
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {changePercent}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-900 dark:border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,200</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">+8% from last month</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-900 dark:border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,900</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">-3% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Performance Chart */}
      <Card className="dark:bg-gray-900 dark:border-gray-800">
        <CardHeader>
          <CardTitle>Portfolio Performance</CardTitle>
          <CardDescription className="dark:text-gray-400">
            {isConnected
              ? "Real-time data from your connected API"
              : "Sample data - connect your API for real-time updates"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] dark:bg-gray-800">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={portfolioData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                <XAxis dataKey="date" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip formatter={(value: any) => [`$${value.toLocaleString()}`, "Portfolio Value"]} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  strokeWidth={3}
                  dot={{ fill: "#8884d8", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Expense Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dark:bg-gray-900 dark:border-gray-800">
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription className="dark:text-gray-400">Monthly spending by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] dark:bg-gray-800">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => `$${value}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-900 dark:border-gray-800">
          <CardHeader>
            <CardTitle>Financial Goals</CardTitle>
            <CardDescription className="dark:text-gray-400">Track your savings and investment targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1 text-gray-500 dark:text-gray-400">
                <span>Emergency Fund</span>
                <span>$8,000 / $10,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "80%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1 text-gray-500 dark:text-gray-400">
                <span>House Down Payment</span>
                <span>$15,000 / $50,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "30%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1 text-gray-500 dark:text-gray-400">
                <span>Retirement Fund</span>
                <span>$25,000 / $100,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: "25%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
