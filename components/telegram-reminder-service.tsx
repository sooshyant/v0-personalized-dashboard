"use client"

import { useEffect } from "react"

interface TelegramReminderServiceProps {
  botToken: string
  chatId: string
  reminderTimes: {
    healthCheck: string
    taskReview: string
    goalUpdate: string
  }
  enabled: boolean
}

export function TelegramReminderService({ botToken, chatId, reminderTimes, enabled }: TelegramReminderServiceProps) {
  useEffect(() => {
    if (!enabled || !botToken) return

    const scheduleReminders = () => {
      const now = new Date()
      const today = now.toDateString()

      // Schedule health reminder
      const healthTime = new Date(`${today} ${reminderTimes.healthCheck}`)
      if (healthTime > now) {
        const healthTimeout = healthTime.getTime() - now.getTime()
        setTimeout(() => {
          sendReminder("health")
        }, healthTimeout)
      }

      // Schedule task reminder
      const taskTime = new Date(`${today} ${reminderTimes.taskReview}`)
      if (taskTime > now) {
        const taskTimeout = taskTime.getTime() - now.getTime()
        setTimeout(() => {
          sendReminder("tasks")
        }, taskTimeout)
      }

      // Schedule goal reminder
      const goalTime = new Date(`${today} ${reminderTimes.goalUpdate}`)
      if (goalTime > now) {
        const goalTimeout = goalTime.getTime() - now.getTime()
        setTimeout(() => {
          sendReminder("goals")
        }, goalTimeout)
      }
    }

    const sendReminder = async (type: string) => {
      try {
        await fetch("/api/telegram/send-reminder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            botToken,
            chatId,
            type,
          }),
        })
      } catch (error) {
        console.error("Failed to send reminder:", error)
      }
    }

    scheduleReminders()

    // Set up daily recurring reminders
    const dailyInterval = setInterval(scheduleReminders, 24 * 60 * 60 * 1000)

    return () => {
      clearInterval(dailyInterval)
    }
  }, [botToken, chatId, reminderTimes, enabled])

  return null // This is a service component, no UI
}
