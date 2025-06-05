"use client";

import {
  CalendarIcon,
  DollarSign,
  Hash,
  ImageIcon,
  Layers,
  NotebookPen,
  Tag,
  TrendingUp,
  Type,
  Users,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export default function AddTradeForm() {
  const { register, handleSubmit } = useForm();
  const [entryDate, setEntryDate] = useState<Date>();
  const [exitDate, setExitDate] = useState<Date>();

  const onSubmit = (data: any) => {
    console.log({ ...data, entryDate, exitDate });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card className="rounded-3xl border-none bg-gradient-to-tr from-[#f8fafc] to-[#e2e8f0] shadow-xl backdrop-blur-md">
        <CardHeader className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white rounded-t-3xl p-6">
          <CardTitle className="text-2xl flex align-middle font-semibold tracking-tight">
            <TrendingUp />
            <p className="ml-2">Add a New Trade</p>
          </CardTitle>
          <p className="text-sm opacity-90">
            Log your latest stock trade with full details.
          </p>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
            {/* SYMBOL */}
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <Hash className="w-4 h-4" /> Ticker
              </Label>
              <Input placeholder="AAPL, TSLA..." {...register("ticker")} />
            </div>

            {/* TRADE TYPE */}
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <Type className="w-4 h-4" /> Trade Type
              </Label>
              <Select {...register("tradeType")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* ENTRY DATE */}
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" /> Entry Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !entryDate && "text-muted-foreground"
                    )}
                  >
                    {entryDate ? format(entryDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={entryDate}
                    onSelect={setEntryDate}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* EXIT DATE */}
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" /> Exit Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !exitDate && "text-muted-foreground"
                    )}
                  >
                    {exitDate ? format(exitDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={exitDate}
                    onSelect={setExitDate}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* PRICES */}
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" /> Buy Price
              </Label>
              <Input type="number" step="0.01" {...register("entry")} />
            </div>

            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" /> Sell Price
              </Label>
              <Input type="number" step="0.01" {...register("exit")} />
            </div>

            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <Users className="w-4 h-4" /> Quantity
              </Label>
              <Input type="number" {...register("quantity")} />
            </div>

            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" /> Commission
              </Label>
              <Input type="number" step="0.01" {...register("comm")} />
            </div>

            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <Layers className="w-4 h-4" /> Strategy
              </Label>
              <Input
                placeholder="Breakout, Pullback..."
                {...register("strategy")}
              />
            </div>

            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <Tag className="w-4 h-4" /> Tags
              </Label>
              <Input
                placeholder="News, Swing, Pre-market..."
                {...register("tags")}
              />
            </div>

            <div className="col-span-full space-y-1">
              <Label className="flex items-center gap-2">
                <NotebookPen className="w-4 h-4" /> Notes
              </Label>
              <Textarea
                placeholder="Write your reasoning, emotions, outcome..."
                {...register("notes")}
              />
            </div>

            <div className="col-span-full space-y-1">
              <Label className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Screenshot
              </Label>
              <Input type="file" accept="image/*" {...register("image")} />
            </div>

            <div className="col-span-full text-right mt-4">
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-xl hover:scale-[1.02] transition-all"
              >
                🚀 Save Trade
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
