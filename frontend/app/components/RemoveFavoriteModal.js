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
                    width: 300,
                    bgcolor: "#F6E9E0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    p: 3,
                }}
            >
                <Typography
                    id="modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ color: "#FF6724", textAlign: "center", mb: 2 }}
                >
                    Confirmar eliminación
                </Typography>
                <Typography
                    id="modal-description"
                    sx={{ textAlign: "center", color: "#502918", mb: 2 }}
                >
                    ¿Estás seguro de que quieres eliminar esta receta de favoritos?
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        mt: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#FF6724",
                            color: "#F6E9E0",
                            "&:hover": {
                                backgroundColor: "transparent",
                                color: "#FF6724",
                                border: "1px solid #FF6724",
                            },
                        }}
                        onClick={onConfirm}
                    >
                        Aceptar
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#502918",
                            color: "#F6E9E0",
                            "&:hover": {
                                backgroundColor: "transparent",
                                color: "#502918",
                                border: "1px solid #502918",
                            },
                        }}
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default RemoveFavoriteModal;