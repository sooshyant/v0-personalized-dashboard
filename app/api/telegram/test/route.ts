export async function POST(request: Request) {
  try {
    const { botToken, chatId } = await request.json()

    if (!botToken || !chatId) {
      return Response.json({ error: "Missing bot token or chat ID" }, { status: 400 })
    }

    // Test the Telegram bot connection
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: "🎯 Test message from Sooshyant's Dash!\n\nYour Telegram notifications are working correctly. You'll receive reminders for:\n• Health metrics\n• Task deadlines\n• Goal milestones\n• Weekly progress reports",
        parse_mode: "HTML",
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return Response.json({ error: error.description || "Failed to send message" }, { status: 400 })
    }

    return Response.json({ success: true, message: "Test message sent successfully!" })
  } catch (error) {
    console.error("Telegram test error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
