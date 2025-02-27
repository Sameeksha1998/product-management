import React from "react";
import { Grid, Paper, Typography, Card, CardContent, useTheme } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";

const salesData = [
  { month: "Jan", sales: 1200, profit: 300 },
  { month: "Feb", sales: 1500, profit: 400 },
  { month: "Mar", sales: 1800, profit: 450 },
  { month: "Apr", sales: 2000, profit: 500 },
  { month: "May", sales: 2200, profit: 600 },
  { month: "Jun", sales: 2500, profit: 700 },
];

const summaryMetrics = [
  { label: "Total Sales", value: "$12,500" },
  { label: "Total Orders", value: "320" },
  { label: "Total Profit", value: "$4,500" },
];

const SalesAnalytics = () => {
  const theme = useTheme(); // Access MUI theme

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      {/* Summary Metrics */}
      {summaryMetrics.map((metric, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Card sx={{ textAlign: "center", padding: 2, backgroundColor: theme.palette.background.paper }}>
            <CardContent>
              <Typography variant="h6" color={theme.palette.primary.main}>
                {metric.label}
              </Typography>
              <Typography variant="h5" fontWeight="bold" color={theme.palette.secondary.main}>
                {metric.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}

      {/* Sales Bar Chart */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ padding: 3, backgroundColor: theme.palette.background.default }}>
          <Typography variant="h6" gutterBottom color={theme.palette.primary.dark}>
            Monthly Sales
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <XAxis dataKey="month" stroke={theme.palette.text.primary} />
              <YAxis stroke={theme.palette.text.primary} />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill={theme.palette.primary.main} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Profit Line Chart */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ padding: 3, backgroundColor: theme.palette.background.default }}>
          <Typography variant="h6" gutterBottom color={theme.palette.primary.dark}>
            Monthly Profit
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <XAxis dataKey="month" stroke={theme.palette.text.primary} />
              <YAxis stroke={theme.palette.text.primary} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="profit" stroke={theme.palette.secondary.main} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SalesAnalytics;
