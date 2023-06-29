"use client";

import { useEffect, useState } from "react";
import { Box, Button, Typography, Modal } from "../MaterialUi/MaterialUi";
import { Veiculo } from "@/models/api-veiculo";
import FormCollapseVeiculo from "../Form/FormCollapseVeiculo";


interface ModalVeiculoProps {
  open: boolean;
  onClose: () => void;
  id: number | null | undefined;
}

async function getVeiculo(id: number): Promise<Veiculo | null> {
  try {
    const response = await fetch(
      `https://api-deslocamento.herokuapp.com/api/v1/Veiculo/${id}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Erro ao obter o veiculo");
    }

    const data = await response.json();
    const veiculo: Veiculo = data;

    return veiculo;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function deleteVeiculo(id: number): Promise<void> {
  try {
    const jsonClient = JSON.stringify({ id: id });
    const response = await fetch(
      `https://api-deslocamento.herokuapp.com/api/v1/Veiculo/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonClient,
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao deletar o veiculo");
    }
  } catch (error) {
    console.error(error);
  }
}

export default function ModalVeiculo({
  open,
  onClose,
  id,
}: ModalVeiculoProps) {
  const [data, setData] = useState<Veiculo | null>(null);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    if (open && id) {
      const fetchData = async () => {
        try {
          const response = await getVeiculo(id);
          setData(response);
        } catch (error) {
          console.error("Erro ao buscar dados da API:", error);
        }
      };

      fetchData();
    }
  }, [open, id]);

  const handleDelete = async () => {
    if (id) {
      await deleteVeiculo(id);
      onClose();
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    backgroundColor: "#fff",
    border: "2px solid #000",
    boxShadow: "24px",
    padding: "16px",
  };
  
  return (
    <Modal open={open} onClose={onClose}>
      <>
        <Box sx={modalStyle}>
          {data ? (
            <>
              <Typography variant="h5">{data.id}</Typography>
              <Typography variant="body1">Nome: {data.marcaModelo}</Typography>
              <Typography variant="body1">
                Placa: {data.placa}
              </Typography>
              <Typography variant="body1">
                Ano de fabricacao: {data.anoFabricacao}
              </Typography>
              <Typography variant="body1">
                Km atual: {data.kmAtual}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setUpdate(true)}
              >
                Atualizar
              </Button>
              <Button variant="contained" color="error" size="small" onClick={handleDelete}>
                Deletar
              </Button>
            </>
          ) : (
            <Typography variant="body1">Carregando...</Typography>
          )}
          <Button size="small" onClick={onClose}>Fechar</Button>
          {update && <FormCollapseVeiculo initialData={data}></FormCollapseVeiculo>}
        </Box>
      </>
    </Modal>
  );
}
