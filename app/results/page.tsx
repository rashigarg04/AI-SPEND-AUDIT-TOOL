"use client";

import { useEffect, useState } from "react";
import { runAudit } from "@/lib/auditEngine";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import jsPDF from "jspdf";
import { db } from "@/lib/firebase";

import {
  collection,
  addDoc,
} from "firebase/firestore";

export default function ResultsPage() {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("audit-tools");

    if (stored) {
      const parsed = JSON.parse(stored);

      const formatted = parsed.map((item: any) => ({
        ...item,
        spend: Number(item.spend),
        seats: Number(item.seats),
      }));

      const auditResults = runAudit(formatted);

      setResults(auditResults);
    }
  }, []);

  const totalMonthlySavings = results.reduce(
    (acc, item) => acc + item.monthlySavings,
    0
  );

  const totalYearlySavings = results.reduce(
    (acc, item) => acc + item.yearlySavings,
    0
  );
  const biggestSaving =
  results.length > 0
    ? results.reduce((prev, current) =>
        prev.monthlySavings > current.monthlySavings
          ? prev
          : current
      )
    : null;
    const saveAudit = async () => {
  try {
    await addDoc(collection(db, "audits"), {
      results,
      totalMonthlySavings,
      totalYearlySavings,
      createdAt: new Date(),
    });

    alert("Audit saved successfully!");
  } catch (error) {
    console.error(error);

    alert("Failed to save audit");
  }
};

    const downloadPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("AI Spend Audit Report", 20, 20);

  doc.setFontSize(14);

  doc.text(
    `Monthly Savings: $${totalMonthlySavings}`,
    20,
    40
  );

  doc.text(
    `Yearly Savings: $${totalYearlySavings}`,
    20,
    50
  );

  let y = 70;

  results.forEach((item, index) => {
    doc.setFontSize(16);

    doc.text(`${index + 1}. ${item.tool}`, 20, y);

    y += 10;

    doc.setFontSize(12);

    doc.text(
      `Current Plan: ${item.currentPlan}`,
      25,
      y
    );

    y += 8;

    doc.text(
      `Recommendation: ${item.recommendation}`,
      25,
      y
    );

    y += 8;

    doc.text(
      `Monthly Savings: $${item.monthlySavings}`,
      25,
      y
    );

    y += 8;

    doc.text(
      `Reason: ${item.reason}`,
      25,
      y
    );

    y += 15;
  });

  doc.save("AI-Spend-Audit-Report.pdf");
};
    

    


  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="bg-indigo-600 text-white rounded-2xl p-10 mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Your AI Spend Audit
          </h1>

          <p className="text-lg">
            Potential Savings Identified
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-6">

            <div className="bg-white/10 rounded-xl p-5">
              <p className="text-sm">
                Monthly Savings
              </p>

              <h2 className="text-3xl font-bold">
                ${totalMonthlySavings}
              </h2>
            </div>

            <div className="bg-white/10 rounded-xl p-5">
              <p className="text-sm">
                Yearly Savings
              </p>

              <h2 className="text-3xl font-bold">
                ${totalYearlySavings}
              </h2>
            </div>

          </div>
        </div>
        {/* AI Summary */}
<div className="bg-white rounded-2xl shadow p-6 mb-8">
  <h2 className="text-2xl font-bold mb-4">
    AI Optimization Summary
  </h2>

  <p className="text-gray-700 leading-7">
    Based on your current AI stack, your team may be
    overspending on redundant or enterprise-grade plans.
    The biggest optimization opportunity appears in{" "}
    <strong>{biggestSaving?.tool}</strong>, where
    switching plans could significantly reduce recurring
    costs.
  </p>

  <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">
    <p className="text-green-700 font-medium">
      Estimated Annual Savings: $
      {totalYearlySavings}
    </p>
  </div>
</div>
{/* Savings Chart */}
<div className="bg-white rounded-2xl shadow p-6 mb-8">
  <h2 className="text-2xl font-bold mb-6">
    Savings Breakdown
  </h2>

  <div className="h-[350px]">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={results}>
        <XAxis dataKey="tool" />
        <YAxis />
        <Tooltip />

        <Bar dataKey="monthlySavings" />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>
<div className="flex justify-end mb-6">
  <button>
    Download PDF Report
  </button>

  <button>
    Save Audit
  </button>
</div>
<div className="flex justify-end mb-6">
  <button
    onClick={downloadPDF}
    className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
  >
    Download PDF Report
  </button>
</div>

        {/* Results */}
        <div className="space-y-6">
          {results.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">
                  {item.tool}
                </h2>

                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                  Save ${item.monthlySavings}/mo
                </span>
              </div>

              <p className="text-gray-700 mb-2">
                <strong>Current Plan:</strong>{" "}
                {item.currentPlan}
              </p>

              <p className="text-gray-700 mb-2">
                <strong>Recommendation:</strong>{" "}
                {item.recommendation}
              </p>

              <p className="text-gray-600">
                {item.reason}
              </p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}