export async function POST(request: Request) {
  try {
    const { botToken, chatId, type, data } = await request.json()

    if (!botToken || !chatId || !type) {
      return Response.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`

    let message = ""

    switch (type) {
      case "health":
        message = `🏃‍♂️ <b>Health Check Reminder</b>\n\nTime to log your daily health metrics:\n• Weight\n• Steps taken\n• Water intake\n• Sleep hours\n\nStay consistent with your health goals! 💪`
        break

      case "tasks":
        message = `📋 <b>Task Review Reminder</b>\n\nTime to review your tasks:\n• Check pending tasks\n• Update task progress\n• Plan tomorrow's priorities\n\nStay productive! ✅`
        break

      case "goals":
        message = `🎯 <b>Goal Update Reminder</b>\n\nTime to update your personal growth:\n• Log progress on current goals\n• Celebrate completed milestones\n• Adjust targets if needed\n\nKeep growing! 🌱`
        break

      case "weekly":
        message = `📊 <b>Weekly Progress Report</b>\n\nHere's your week in review:\n• Health: ${data?.healthProgress || "N/A"}\n• Tasks: ${data?.tasksCompleted || 0} completed\n• Goals: ${data?.goalsProgress || "N/A"}\n• Finance: ${data?.financeUpdate || "N/A"}\n\nGreat work this week! 🎉`
        break

      case "milestone":
        message = `🎉 <b>Milestone Achieved!</b>\n\n${data?.goalName || "Goal"}: ${data?.milestone || "Milestone reached"}\n\nCongratulations on your progress! Keep it up! 🌟`
        break

      default:
        message = `📱 <b>Sooshyant's Dash Reminder</b>\n\n${data?.message || "Time to check Sooshyant's Dash!"}`
    }

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return Response.json({ error: error.description || "Failed to send reminder" }, { status: 400 })
    }

    return Response.json({ success: true, message: "Reminder sent successfully!" })
  } catch (error) {
    console.error("Telegram reminder error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
