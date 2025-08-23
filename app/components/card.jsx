import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function DisplayCard({ Name, Mail }) {
  return (
    <Card
      sx={{
        maxWidth: 400,
        borderRadius: "20px",
        backgroundColor: "#f5f5f5", 
        color: "#1a1a1a",
        border: "2px solid #ffffff", 
        boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.15)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 10px 35px rgba(0, 255, 128, 0.5)", 
        },
        p: 2,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", mb: 1, color: "#111" }}
        >
          {Name}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "rgba(50, 50, 50, 0.8)" }}
        >
          {Mail}
        </Typography>
      </CardContent>
    </Card>
  );
}
