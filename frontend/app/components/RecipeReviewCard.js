"use client";
import * as React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Avatar,
  IconButton,
  Box,
  Rating,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Image from "next/image";
import { useState, useEffect } from "react";
export default function RecipeReviewCard(props) {
  const [average, setAverage] = useState(null);
  useEffect(() => {
    fetch(`/api/v1/recipe/ratingAverage/${props.id}`)
      .then((response) => response.json())
      .then((data) => setAverage(data[0].avgRating));
  }, []);

  return (
    <Card sx={{ maxWidth: 494, position: "relative", borderRadius: "16px" }}>
      <CardActionArea href={props.recipeDetailUrl}>
        <div className="relative w-full h-80">
          <Image
            className="object-cover"
            src={props.img}
            fill
            image={props.img}
            alt={props.title}
          />
        </div>

        <CardContent
          sx={{
            bgcolor: "#F6E9E0",
            "& .MuiCardHeader-title": {
              color: "#e89256",
            },
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Avatar
              sx={{ bgcolor: "#502918", marginRight: "10px" }}
              aria-label="recipe"
            ></Avatar>
            <h2>{props.title}</h2>
          </div>

          <Rating name="read-only" value={average} readOnly />
          <p style={{ marginTop: "10px", fontSize: "12px", color: "gray" }}>
            Updated: {props.updated.split("T")[0]}
          </p>
        </CardContent>
      </CardActionArea>

      <Box sx={{ position: "absolute", bottom: 20, right: 10, zIndex: 1 }}>
        <IconButton aria-label="add to favorites">
          <FavoriteBorderIcon />
        </IconButton>
      </Box>
    </Card>
  );
}
