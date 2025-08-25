import ReusableTable from "../../ui-components/ReusableTable";

type Trade = {
  id: number;
  symbol: string;
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  entryDate: string;
  pnl: number;
};

// Sample dummy active trades
const activeTrades: Trade[] = [
  {
    id: 1,
    symbol: "TCS",
    quantity: 20,
    entryPrice: 3400,
    currentPrice: 3560,
    entryDate: "2025-05-25",
    pnl: (3560 - 3400) * 20,
  },
  {
    id: 2,
    symbol: "INFY",
    quantity: 50,
    entryPrice: 1520,
    currentPrice: 1490,
    entryDate: "2025-05-22",
    pnl: (1490 - 1520) * 50,
  },
  {
    id: 3,
    symbol: "RELIANCE",
    quantity: 15,
    entryPrice: 2800,
    currentPrice: 2950,
    entryDate: "2025-05-29",
    pnl: (2950 - 2800) * 15,
  },
  {
    id: 4,
    symbol: "HDFCBANK",
    quantity: 40,
    entryPrice: 1600,
    currentPrice: 1580,
    entryDate: "2025-05-20",
    pnl: (1580 - 1600) * 40,
  },
];

const columns = [
  { id: "symbol", label: "Symbol" },
  { id: "quantity", label: "Qty" },
  { id: "entryPrice", label: "Entry ₹" },
  { id: "currentPrice", label: "Current ₹" },
  {
    id: "pnl",
    label: "P&L",
    render: (value: number) => (
      <span style={{ color: value >= 0 ? "green" : "red" }}>
        ₹{value.toFixed(2)}
      </span>
    ),
  },
  { id: "entryDate", label: "Date" },
];

const ActiveTrades = () => {
  return (
    <ReusableTable
      data={activeTrades}
      columns={columns}
      showCheckbox
      rowKey="id"
      tableHeader="Active Trades"
    />
  );
};

export default ActiveTrades;
