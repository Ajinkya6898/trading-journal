import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AccountBalance,
  MonetizationOn,
  Assessment,
  Star,
  Timeline,
  PieChart as PieChartIcon
} from '@mui/icons-material';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer
} from 'recharts';

const TradingDashboard = () => {
  // Mock data
  const portfolioSummary = {
    totalInvested: 150000,
    currentValue: 167500,
    netReturns: 17500,
    netReturnsPercent: 11.67,
    availableCash: 25000
  };

  const assetBreakdown = {
    stocks: {
      invested: 90000,
      currentValue: 98500,
      gainLoss: 9.44
    },
    mutualFunds: {
      invested: 60000,
      currentValue: 69000,
      gainLoss: 15.0
    }
  };

  const portfolioAllocation = [
    { name: 'Stocks', value: 58.8, amount: 98500, color: '#8884d8' },
    { name: 'Mutual Funds', value: 41.2, amount: 69000, color: '#82ca9d' },
    { name: 'Cash', value: 14.9, amount: 25000, color: '#ffc658' }
  ];

  const portfolioGrowth = [
    { month: 'Jan', value: 150000 },
    { month: 'Feb', value: 152000 },
    { month: 'Mar', value: 148000 },
    { month: 'Apr', value: 155000 },
    { month: 'May', value: 162000 },
    { month: 'Jun', value: 167500 }
  ];

  const monthlyPL = [
    { month: 'Jan', profit: 2000 },
    { month: 'Feb', profit: 3500 },
    { month: 'Mar', profit: -4000 },
    { month: 'Apr', profit: 7000 },
    { month: 'May', profit: 4500 },
    { month: 'Jun', profit: 4500 }
  ];

  const performanceMetrics = {
    winRate: 65.5,
    avgProfitPerTrade: 1250,
    bestTrade: 8500,
    worstTrade: -3200
  };

  const recentStockTrades = [
    { symbol: 'AAPL', entry: 150.25, exit: 165.80, pl: 1555, plPercent: 10.35 },
    { symbol: 'GOOGL', entry: 2800.00, exit: 2650.50, pl: -1495, plPercent: -5.34 },
    { symbol: 'MSFT', entry: 330.15, exit: 348.90, pl: 1875, plPercent: 5.68 },
    { symbol: 'TSLA', entry: 850.00, exit: 920.75, pl: 7075, plPercent: 8.32 },
    { symbol: 'AMZN', entry: 3200.50, exit: 3350.25, pl: 1497, plPercent: 4.68 }
  ];

  const recentMFTransactions = [
    { fundName: 'Vanguard S&P 500', date: '2024-08-15', amount: 5000, nav: 420.50, units: 11.89 },
    { fundName: 'Fidelity Total Market', date: '2024-08-10', amount: 3000, nav: 110.25, units: 27.21 },
    { fundName: 'HDFC Large Cap', date: '2024-08-05', amount: 2500, nav: 85.75, units: 29.15 },
    { fundName: 'SBI Small Cap', date: '2024-08-01', amount: 4000, nav: 155.80, units: 25.68 },
    { fundName: 'ICICI Bluechip', date: '2024-07-28', amount: 3500, nav: 92.40, units: 37.88 }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercent = (percent) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  const SummaryCard = ({ title, value, subtitle, icon: Icon, color = 'primary' }) => (
    <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h5" component="div" fontWeight="bold">
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color={color === 'error' ? 'error' : 'success.main'}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Avatar sx={{ bgcolor: `${color}.main`, width: 48, height: 48 }}>
            <Icon />
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  const AssetCard = ({ title, invested, currentValue, gainLoss, icon: Icon }) => (
    <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40, mr: 2 }}>
            <Icon />
          </Avatar>
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body2" color="textSecondary">
            Invested:
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            {formatCurrency(invested)}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body2" color="textSecondary">
            Current Value:
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            {formatCurrency(currentValue)}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="textSecondary">
            Gain/Loss:
          </Typography>
          <Chip
            label={formatPercent(gainLoss)}
            color={gainLoss >= 0 ? 'success' : 'error'}
            size="small"
            variant="outlined"
          />
        </Box>
      </CardContent>
    </Card>
  );

  const MetricCard = ({ title, value, icon: Icon, color = 'primary' }) => (
    <Card elevation={2} sx={{ borderRadius: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {value}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: `${color}.main`, width: 40, height: 40 }}>
            <Icon fontSize="small" />
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 1, bgcolor: 'background.paper', border: 1, borderColor: 'divider' }}>
          <Typography variant="body2">{`${label}: ${formatCurrency(payload[0].value)}`}</Typography>
        </Paper>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Paper sx={{ p: 1, bgcolor: 'background.paper', border: 1, borderColor: 'divider' }}>
          <Typography variant="body2">{`${data.name}: ${formatCurrency(data.amount)} (${data.value.toFixed(1)}%)`}</Typography>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box sx={{ p: 3, bgcolor: 'grey.50', minHeight: '100vh' }}>
      {/* Portfolio Overview */}
      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
        Trading Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <SummaryCard
            title="Total Invested"
            value={formatCurrency(portfolioSummary.totalInvested)}
            icon={MonetizationOn}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <SummaryCard
            title="Current Value"
            value={formatCurrency(portfolioSummary.currentValue)}
            icon={Assessment}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <SummaryCard
            title="Net Returns"
            value={formatCurrency(portfolioSummary.netReturns)}
            subtitle={formatPercent(portfolioSummary.netReturnsPercent)}
            icon={TrendingUp}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <SummaryCard
            title="Available Cash"
            value={formatCurrency(portfolioSummary.availableCash)}
            icon={AccountBalance}
            color="warning"
          />
        </Grid>
      </Grid>

      {/* Asset Breakdown */}
      <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
        Asset Breakdown
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <AssetCard
            title="Stocks"
            invested={assetBreakdown.stocks.invested}
            currentValue={assetBreakdown.stocks.currentValue}
            gainLoss={assetBreakdown.stocks.gainLoss}
            icon={TrendingUp}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AssetCard
            title="Mutual Funds"
            invested={assetBreakdown.mutualFunds.invested}
            currentValue={assetBreakdown.mutualFunds.currentValue}
            gainLoss={assetBreakdown.mutualFunds.gainLoss}
            icon={PieChartIcon}
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
        Portfolio Analytics
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={4}>
          <Card elevation={2} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Portfolio Allocation
              </Typography>
              <Box height={300}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolioAllocation}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {portfolioAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} lg={8}>
          <Card elevation={2} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Portfolio Growth
              </Typography>
              <Box height={300}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={portfolioGrowth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8884d8" 
                      strokeWidth={3}
                      dot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Card elevation={2} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Monthly P&L
              </Typography>
              <Box height={300}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyPL}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="profit" 
                      fill="#82ca9d"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Performance Insights */}
      <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
        Performance Insights
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={3}>
          <MetricCard
            title="Win Rate"
            value={`${performanceMetrics.winRate}%`}
            icon={Star}
            color="success"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <MetricCard
            title="Avg Profit/Trade"
            value={formatCurrency(performanceMetrics.avgProfitPerTrade)}
            icon={Timeline}
            color="primary"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <MetricCard
            title="Best Trade"
            value={formatCurrency(performanceMetrics.bestTrade)}
            icon={TrendingUp}
            color="success"
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <MetricCard
            title="Worst Trade"
            value={formatCurrency(performanceMetrics.worstTrade)}
            icon={TrendingDown}
            color="error"
          />
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
        Recent Activity
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Card elevation={2} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Recent Stock Trades
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Symbol</strong></TableCell>
                      <TableCell align="right"><strong>Entry</strong></TableCell>
                      <TableCell align="right"><strong>Exit</strong></TableCell>
                      <TableCell align="right"><strong>P&L</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentStockTrades.map((trade, index) => (
                      <TableRow key={index}>
                        <TableCell>{trade.symbol}</TableCell>
                        <TableCell align="right">₹{trade.entry.toFixed(2)}</TableCell>
                        <TableCell align="right">₹{trade.exit.toFixed(2)}</TableCell>
                        <TableCell align="right">
                          <Chip
                            label={`₹${trade.pl.toFixed(0)} (${formatPercent(trade.plPercent)})`}
                            color={trade.pl >= 0 ? 'success' : 'error'}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} lg={6}>
          <Card elevation={2} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Recent MF Transactions
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Fund Name</strong></TableCell>
                      <TableCell align="right"><strong>Date</strong></TableCell>
                      <TableCell align="right"><strong>Amount</strong></TableCell>
                      <TableCell align="right"><strong>Units</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentMFTransactions.map((transaction, index) => (
                      <TableRow key={index}>
                        <TableCell>{transaction.fundName}</TableCell>
                        <TableCell align="right">{transaction.date}</TableCell>
                        <TableCell align="right">₹{transaction.amount.toLocaleString()}</TableCell>
                        <TableCell align="right">{transaction.units.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TradingDashboard;