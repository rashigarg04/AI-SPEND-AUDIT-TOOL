type ToolInput = {
  tool: string;
  plan: string;
  spend: number;
  seats: number;
};

type AuditResult = {
  tool: string;
  currentPlan: string;
  recommendation: string;
  monthlySavings: number;
  yearlySavings: number;
  reason: string;
};

export function runAudit(tools: ToolInput[]): AuditResult[] {
  return tools.map((tool) => {
    let recommendation = "Current plan is optimal";
    let savings = 0;
    let reason = "Your setup looks cost-efficient.";

    // ChatGPT
    if (
      tool.tool === "ChatGPT" &&
      tool.plan === "Team" &&
      tool.seats <= 2
    ) {
      recommendation = "Switch to ChatGPT Plus";
      savings = tool.spend - 20 * tool.seats;

      reason =
        "ChatGPT Team is expensive for very small teams.";
    }

    // Claude
    if (
      tool.tool === "Claude" &&
      tool.plan === "Team" &&
      tool.seats <= 2
    ) {
      recommendation = "Switch to Claude Pro";
      savings = tool.spend - 20 * tool.seats;

      reason =
        "Claude Team pricing is better suited for larger teams.";
    }

    // Cursor
    if (
      tool.tool === "Cursor" &&
      tool.plan === "Business" &&
      tool.seats <= 3
    ) {
      recommendation = "Switch to Cursor Pro";
      savings = tool.spend - 20 * tool.seats;

      reason =
        "Cursor Business usually becomes valuable above 3 seats.";
    }

    // Copilot
    if (
      tool.tool === "GitHub Copilot" &&
      tool.plan === "Enterprise" &&
      tool.seats < 10
    ) {
      recommendation = "Switch to Copilot Business";
      savings = tool.spend - 19 * tool.seats;

      reason =
        "Enterprise plans are difficult to justify for smaller engineering teams.";
    }

    // Gemini
    if (
      tool.tool === "Gemini" &&
      tool.plan === "Ultra"
    ) {
      recommendation = "Downgrade to Gemini Pro";
      savings = tool.spend - 20 * tool.seats;

      reason =
        "Most teams do not fully utilize Gemini Ultra.";
    }

    return {
      tool: tool.tool,
      currentPlan: tool.plan,
      recommendation,
      monthlySavings: Math.max(0, savings),
      yearlySavings: Math.max(0, savings * 12),
      reason,
    };
  });
}