"use client";

import { useEffect, useState } from "react";
import { Box, Button, Typography, Modal } from "../MaterialUi/MaterialUi";

import FormCollapse from "../Form/FormCollapseCliente";
import { Cliente } from "@/models/api-cliente";

interface ModalClientProps {
  open: boolean;
  onClose: () => void;
  id: number | null | undefined;
}

async function getCliente(id: number): Promise<Cliente | null> {
  try {
    const response = await fetch(
      `https://api-deslocamento.herokuapp.com/api/v1/Cliente/${id}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Erro ao obter o cliente");
    }

    const data = await response.json();
    const cliente: Cliente = data;

    return cliente;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function deleteCliente(id: number): Promise<void> {
  try {
    const jsonClient = JSON.stringify({ id: id });
    const response = await fetch(
      `https://api-deslocamento.herokuapp.com/api/v1/Cliente/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonClient,
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao deletar o cliente");
    }
  } catch (error) {
    console.error(error);
  }
}

export default function ModalCliente({ open, onClose, id }: ModalClientProps) {
  const [data, setData] = useState<Cliente | null>(null);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    if (open && id) {
      const fetchData = async () => {
        try {
          const response = await getCliente(id);
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
      await deleteCliente(id);
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
              <Typography variant="body1">Bairro: {data.bairro}</Typography>
              <Typography variant="body1">Cidade: {data.cidade}</Typography>
              <Typography variant="body1">
                Logradouro: {data.logradouro}
              </Typography>
              <Typography variant="body1">Nome: {data.nome}</Typography>
              <Typography variant="body1">Número: {data.numero}</Typography>
              <Typography variant="body1">
                Número do Documento: {data.numeroDocumento}
              </Typography>
              <Typography variant="body1">
                Tipo de Documento: {data.tipoDocumento}
              </Typography>
              <Typography variant="body1">UF: {data.uf}</Typography>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => setUpdate(true)}
              >
                Atualizar
              </Button>
              <Button size="small" variant="contained" color="error" onClick={handleDelete}>
                Deletar
              </Button>
            </>
          ) : (
            <Typography variant="body1">Carregando...</Typography>
          )}
          <Button size="small" onClick={onClose}>Fechar</Button>
        {update && <FormCollapse initialData={data}></FormCollapse>}
        </Box>
      </>
    </Modal>
  );
}
