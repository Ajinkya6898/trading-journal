"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RiskBasedPSFormProps {
  onCalculate: (data: {
    capital: number;
    riskPercent: number;
    stopLoss: number;
    entryPrice: number;
  }) => void;
}

export function RiskBasedPSForm({ onCalculate }: RiskBasedPSFormProps) {
  const [capital, setCapital] = useState("");
  const [riskPercent, setRiskPercent] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [entryPrice, setEntryPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const capitalNum = parseFloat(capital);
    const riskPercentNum = parseFloat(riskPercent);
    const stopLossNum = parseFloat(stopLoss);
    const entryPriceNum = parseFloat(entryPrice);

    if (
      isNaN(capitalNum) ||
      isNaN(riskPercentNum) ||
      isNaN(stopLossNum) ||
      isNaN(entryPriceNum)
    ) {
      alert("Please enter valid numbers in all fields.");
      return;
    }

    onCalculate({
      capital: capitalNum,
      riskPercent: riskPercentNum,
      stopLoss: stopLossNum,
      entryPrice: entryPriceNum,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-3xl mx-auto"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <Label
            htmlFor="capital"
            className="mb-1 text-gray-700 font-bold dark:text-gray-300"
          >
            Trading Capital
          </Label>
          <Input
            id="capital"
            type="number"
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
            placeholder="Enter total capital"
            min={0}
            step="any"
            required
            className="placeholder-gray-400 mt-3 h-10 dark:placeholder-gray-500"
          />
        </div>

        <div className="flex flex-col">
          <Label
            htmlFor="riskPercent"
            className="mb-1 text-gray-700 font-bold dark:text-gray-300"
          >
            Risk Percentage (%)
          </Label>
          <Input
            id="riskPercent"
            type="number"
            value={riskPercent}
            onChange={(e) => setRiskPercent(e.target.value)}
            placeholder="Enter risk %"
            min={0}
            max={100}
            step="any"
            required
            className="placeholder-gray-400 mt-3 h-10 dark:placeholder-gray-500"
          />
        </div>

        <div className="flex flex-col">
          <Label
            htmlFor="stopLoss"
            className="mb-1 text-gray-700 font-bold dark:text-gray-300"
          >
            Stop Loss
          </Label>
          <Input
            id="stopLoss"
            type="number"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
            placeholder="Enter stop loss"
            min={0}
            step="any"
            required
            className="placeholder-gray-400 mt-3 h-10 dark:placeholder-gray-500"
          />
        </div>

        <div className="flex flex-col">
          <Label
            htmlFor="entryPrice"
            className="mb-1 text-gray-700 font-bold dark:text-gray-300"
          >
            Entry Price
          </Label>
          <Input
            id="entryPrice"
            type="number"
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
            placeholder="Enter entry price"
            min={0}
            step="any"
            required
            className="placeholder-gray-400 mt-3 h-10 dark:placeholder-gray-500"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button type="submit" className="px-8 text-lg font-medium">
          Calculate
        </Button>
      </div>
    </form>
  );
}
