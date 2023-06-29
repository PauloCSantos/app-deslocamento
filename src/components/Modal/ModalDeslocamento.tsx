"use client";

import { useEffect, useState } from "react";
import { Box, Button, Typography, Modal } from "../MaterialUi/MaterialUi";
import { Deslocamento } from "@/models/api-deslocamento";
import FormCollapseDeslocamento from "../Form/FormCollapseDeslocamento";

interface ModalDeslocamentoProps {
  open: boolean;
  onClose: () => void;
  id: number | null | undefined;
}

async function getDeslocamento(id: number): Promise<Deslocamento | null> {
  try {
    const response = await fetch(
      `https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/${id}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Erro ao obter o deslocamento");
    }

    const data = await response.json();
    const deslocamento: Deslocamento = data;

    return deslocamento;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function deleteDeslocamento(id: number): Promise<void> {
  try {
    const jsonClient = JSON.stringify({ id: id });
    const response = await fetch(
      `https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonClient,
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao deletar o deslocamento");
    }
  } catch (error) {
    console.error(error);
  }
}

export default function ModalDeslocamento({
  open,
  onClose,
  id,
}: ModalDeslocamentoProps) {
  const [data, setData] = useState<Deslocamento | null>(null);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    if (open && id) {
      const fetchData = async () => {
        try {
          const response = await getDeslocamento(id);
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
      await deleteDeslocamento(id);
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

  let nData
  let nData2
    data ? nData = new Date().toLocaleDateString() : nData = "Sem data"
    data ? nData2 = new Date("28/06/23").toLocaleDateString() : nData2 = "Sem data"
  return (
    <Modal open={open} onClose={onClose}>
      <>
        <Box sx={modalStyle}>
          {data ? (
            <>
              <Typography variant="h5">{data.id}</Typography>
              <Typography variant="body1">
                KmInicial: {data.kmInicial}
              </Typography>
              <Typography variant="body1">KmFinal: {data.kmFinal}</Typography>
              <Typography variant="body1">
                Inicio do Deslocamento: {nData}
              </Typography>
              <Typography variant="h5">
                Fim do Deslocamento: {nData2}
              </Typography>
              <Typography variant="body1">
                Checklist: {data.checkList}
              </Typography>
              <Typography variant="body1">Motivo: {data.motivo}</Typography>
              <Typography variant="body1">
                Observacao: {data.observacao}
              </Typography>
              <Typography variant="body1">
                Id Condutor: {data.idCondutor}
              </Typography>
              <Typography variant="body1">
                Id Veiculo: {data.idVeiculo}
              </Typography>
              <Typography variant="body1">
                Id Cliente: {data.idCliente}
              </Typography>
              {/* <div>Data vencimento: {nData}</div> */}
              <Button
                variant="contained"
                color="primary"
                size="small"
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
          {update && (
            <FormCollapseDeslocamento initialData={data}></FormCollapseDeslocamento>
          )}
        </Box>
      </>
    </Modal>
  );
}
