import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const RemoveFavoriteModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Confirmar eliminación
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          ¿Estás seguro de que quieres eliminar esta receta de favoritos?
        </Typography>
        <Button onClick={onConfirm}>Aceptar</Button>
        <Button onClick={onClose}>Cancelar</Button>
      </Box>
    </Modal>
  );
};

export default RemoveFavoriteModal;
