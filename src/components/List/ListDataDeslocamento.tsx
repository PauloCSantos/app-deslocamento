"use client";

import { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
} from "../MaterialUi/MaterialUi";
import { Deslocamento } from "@/models/api-deslocamento";
import ModalDeslocamento from "../Modal/ModalDeslocamento";


interface ListDataDeslocamentoProps {
  deslocamentos: Deslocamento[] | null;
}

export default function ListDataDeslocamento({ deslocamentos }: ListDataDeslocamentoProps) {
  const [modalOpenId, setModalOpenId] = useState<number | undefined>(undefined);

  const handleOpenModal = (id: number | undefined) => {
    setModalOpenId(id);
  };

  const handleCloseModal = () => {
    setModalOpenId(undefined);
  };

  return (
    <List disablePadding>
      {deslocamentos !== undefined && deslocamentos !== null ? (
        deslocamentos.map((deslocamento) => (
          <ListItem disablePadding key={deslocamento.id} sx={{ display: 'block'}}>
            <ListItemText
              primary={`ID:${deslocamento.id}`}
              secondary={`\nInicio deslocamento:${deslocamento.inicioDeslocamento}\n\nMotivo: ${deslocamento.motivo} `}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleOpenModal(deslocamento.id)}
              disableElevation
              sx={{ marginLeft: 'auto', marginRight: '30px' }}
            >
              Abrir Modal
            </Button>
            <ModalDeslocamento
              open={modalOpenId === deslocamento.id}
              onClose={handleCloseModal}
              id={deslocamento.id}
            />
          </ListItem>
        ))
      ) : (
        <ListItem disablePadding>
          <ListItemText primary="Não houve retorno" />
        </ListItem>
      )}
    </List>
  );
  
}
