"use client";

import { useEffect, useState } from "react";
import { Box, Button, Typography, Modal } from "../MaterialUi/MaterialUi";
import { Condutor } from "@/models/api-condutor";
import FormCollapseCondutor from "../Form/FormCollapseCondutor";

interface ModalConductorProps {
  open: boolean;
  onClose: () => void;
  id: number | null | undefined;
}

async function getCondutor(id: number): Promise<Condutor | null> {
  try {
    const response = await fetch(
      `https://api-deslocamento.herokuapp.com/api/v1/Condutor/${id}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Erro ao obter o condutor");
    }

    const data = await response.json();
    const obj = {
      id: data.id,
      nome: data.nome,
      numeroHabilitacao: data.numeroHabilitacao,
      categoriaHabilitacao: data.catergoriaHabilitacao,
      vencimentoHabilitacao: data.vencimentoHabilitacao,
    };
    const condutor: Condutor = obj;

    return condutor;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function deleteCondutor(id: number): Promise<void> {
  try {
    const jsonClient = JSON.stringify({ id: id });
    const response = await fetch(
      `https://api-deslocamento.herokuapp.com/api/v1/Condutor/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonClient,
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao deletar o condutor");
    }
  } catch (error) {
    console.error(error);
  }
}

export default function ModalCondutor({
  open,
  onClose,
  id,
}: ModalConductorProps) {
  const [data, setData] = useState<Condutor | null>(null);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    if (open && id) {
      const fetchData = async () => {
        try {
          const response = await getCondutor(id);
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
      await deleteCondutor(id);
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

  let nData;
  data
    ? (nData = new Date(data.vencimentoHabilitacao).toLocaleDateString())
    : (nData = "Sem data");

  return (
    <Modal open={open} onClose={onClose}>
      <>
        <Box sx={modalStyle}>
          {data ? (
            <>
              <Typography variant="h5">{data.id}</Typography>
              <Typography variant="body1">Nome: {data.nome}</Typography>
              <Typography variant="body1">
                Categoria: {data.categoriaHabilitacao}
              </Typography>
              <Typography variant="body1">
                Numero: {data.numeroHabilitacao}
              </Typography>
              <div>Data vencimento: {nData}</div>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => setUpdate(true)}
              >
                Atualizar
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={handleDelete}
              >
                Deletar
              </Button>
            </>
          ) : (
            <Typography variant="body1">Carregando...</Typography>
          )}
          <Button size="small" onClick={onClose}>
            Fechar
          </Button>
          {update && (
            <FormCollapseCondutor initialData={data}></FormCollapseCondutor>
          )}
        </Box>
      </>
    </Modal>
  );
}
