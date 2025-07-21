import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
// import { getFiiDiiData } from "../../services/fiiDiiService";
import { getFiiDiiData } from "./fiiDiiService";

interface Flow {
  buy: number;
  sell: number;
  net: number;
}

interface FiiDiiResponse {
  date: string;
  fii_cash: Flow;
  dii_cash: Flow;
  fii_futures?: Flow;
  dii_futures?: Flow;
}

const FiiDiiDashboard: React.FC = () => {
  const [data, setData] = useState<FiiDiiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await getFiiDiiData();
        setData(resp);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <CircularProgress />;

  if (!data) return null;

  return (
    <Grid container spacing={3} sx={{ mt: 4 }}>
      {["cash", "futures"].map((seg) => (
        <Grid item xs={12} md={6} key={seg}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6">
                {seg === "cash" ? "Cash Segment" : "Futures Segment"} –{" "}
                {data.date}
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {["fii", "dii"].map((inst) => {
                  const flow: Flow = data[
                    `${inst}_${seg}` as keyof typeof data
                  ] as Flow;
                  return (
                    <Grid item xs={12} sm={6} key={inst}>
                      <Typography variant="subtitle2">
                        {inst.toUpperCase()}
                      </Typography>
                      <Typography>Buy: ₹{flow.buy} Cr</Typography>
                      <Typography>Sell: ₹{flow.sell} Cr</Typography>
                      <Typography>Net: ₹{flow.net} Cr</Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}

      {/* Optional: Historical table */}
      <Grid item xs={12}>
        <Typography variant="h6">Last 5 Days FII/DII Cash Net Flow</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>FII Net</TableCell>
              <TableCell>DII Net</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.history?.map((h) => (
              <TableRow key={h.date}>
                <TableCell>{h.date}</TableCell>
                <TableCell>{h.fii_cash.net}</TableCell>
                <TableCell>{h.dii_cash.net}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default FiiDiiDashboard;
