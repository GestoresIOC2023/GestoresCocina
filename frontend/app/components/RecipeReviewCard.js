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
import ShareIcon from '@mui/icons-material/Share';
import Image from "next/image";
import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import DoneOutlineSharpIcon from "@mui/icons-material/DoneOutlineSharp";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function RecipeReviewCard(props) {
  const [average, setAverage] = useState(null);
  const [numberUsers, setNumberUsers] = useState(0)
  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetch(`/api/v1/recipe/ratingAverage/${props.id}`)
      .then((response) => response.json())
      .then((data) => {
        setAverage(data[0].avgRating);
        setNumberUsers(data[0].count);
      });

  }, []);

  function handleOnCLick() {
    const url = `http://localhost:3000${props.recipeDetailUrl}`
    setOpen(true)
    navigator.clipboard.writeText(url)

  }

  const handleClose = () => setOpen(false);

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
          <Box
            sx={{
              width: 200,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating
              name="read-only"
              value={average}
              precision={0.5}
              getLabelText={(value) => (value = "Hola")}
              readOnly
            />

            <Box sx={{ ml: 2 }}>({numberUsers})</Box>

          </Box>
          <p style={{ marginTop: "10px", fontSize: "12px", color: "gray" }}>
            Updated: {props.updated.split("T")[0]}
          </p>
        </CardContent>
      </CardActionArea>

      <Box sx={{ position: "absolute", bottom: 20, right: 10, zIndex: 1 }}>
        <IconButton aria-label="shre recipe" onClick={handleOnCLick}>
          <ShareIcon />
        </IconButton>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                align="center"
              >
                Enlace copiado <DoneOutlineSharpIcon color="success" />
              </Typography>
            </Box>
          </Fade>
        </Modal>

      </Box>
    </Card>
  );
}
