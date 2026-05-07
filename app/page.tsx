"use client";

import { pricingData } from "@/lib/pricingData";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";

const toolOptions = [
  "ChatGPT",
  "Claude",
  "Cursor",
  "GitHub Copilot",
  "Gemini",
  "OpenAI API",
  "Anthropic API",
  "Windsurf",
];

const useCases = [
  "Coding",
  "Writing",
  "Research",
  "Data Analysis",
  "Mixed",
];

export default function Home() {
  const router = useRouter();

  const [tools, setTools] = useLocalStorage("audit-tools", [
    {
      tool: "",
      plan: "",
      spend: "",
      seats: 1,
    },
  ]);

  const handleChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedTools = [...tools];

    updatedTools[index] = {
      ...updatedTools[index],
      [field]: value,
    };

    setTools(updatedTools);
  };

  const addTool = () => {
    setTools([
      ...tools,
      {
        tool: "",
        plan: "",
        spend: "",
        seats: 1,
      },
    ]);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 bg-white border-b">
        <h1 className="text-2xl font-bold text-indigo-600">
          AuditAI
        </h1>
        <button
  onClick={() => router.push("/auth")}
  className="text-gray-700 font-medium"
>
  Login
</button>

        <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
          Start Free Audit
        </button>
      </nav>

      {/* Hero */}
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
          Stop Overpaying <br /> for AI Tools
        </h1>

        <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
          Discover hidden savings across ChatGPT, Claude,
          Cursor, Copilot, and more in under 30 seconds.
        </p>
      </section>

      {/* Form Section */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            AI Spend Audit
          </h2>

          {/* Tool Cards */}
          <div className="space-y-6">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="border rounded-xl p-5 bg-gray-50"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  
                  {/* Tool */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      AI Tool
                    </label>

                    <select
                      value={tool.tool}
                      onChange={(e) =>
                        handleChange(index, "tool", e.target.value)
                      }
                      className="w-full border rounded-lg p-3"
                    >
                      <option value="">Select Tool</option>

                      {toolOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Plan */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Current Plan
                    </label>

                    <select
                      value={tool.plan}
                      onChange={(e) =>
                        handleChange(index, "plan", e.target.value)
                      }
                      className="w-full border rounded-lg p-3"
                    >
                      <option value="">Select Plan</option>

                      {tool.tool &&
                        pricingData[
                          tool.tool as keyof typeof pricingData
                        ]?.plans.map((plan) => (
                          <option
                            key={plan.name}
                            value={plan.name}
                          >
                            {plan.name} (${plan.price}/mo)
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Spend */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Monthly Spend ($)
                    </label>

                    <input
                      type="number"
                      placeholder="e.g. 50"
                      value={tool.spend}
                      onChange={(e) =>
                        handleChange(index, "spend", e.target.value)
                      }
                      className="w-full border rounded-lg p-3"
                    />
                  </div>

                  {/* Seats */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Number of Seats
                    </label>

                    <input
                      type="number"
                      placeholder="e.g. 5"
                      value={tool.seats}
                      onChange={(e) =>
                        handleChange(index, "seats", e.target.value)
                      }
                      className="w-full border rounded-lg p-3"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Tool */}
          <button
            onClick={addTool}
            className="mt-6 text-indigo-600 font-medium hover:underline"
          >
            + Add Another Tool
          </button>

          {/* Team Info */}
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Team Size
              </label>

              <input
                type="number"
                placeholder="e.g. 12"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Primary Use Case
              </label>

              <select className="w-full border rounded-lg p-3">
                <option>Select Use Case</option>

                {useCases.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={() => router.push("/results")}
            className="w-full mt-10 bg-indigo-600 hover:bg-indigo-700 transition text-white py-4 rounded-xl text-lg font-semibold"
          >
            Generate Free Audit
          </button>

        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 text-sm">
        Built for startups spending on AI tools ⚡
      </footer>
    </main>
  );
}