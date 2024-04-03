import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function PrayersCard({ name, time, image }) {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={image}
      />
      <CardContent style={{ backgroundColor: "#161616" }}>
        <Typography gutterBottom variant="h5" component="div" color={"white"}>
          {name}
        </Typography>
        <Typography
          variant="h2"
          color="text.secondary"
          style={{ color: "white" }}
        >
          {time}
        </Typography>
      </CardContent>
    </Card>
  );
}
export default PrayersCard;
