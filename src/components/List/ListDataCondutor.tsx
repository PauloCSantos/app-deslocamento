"use client";

import { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
} from "../MaterialUi/MaterialUi";
import { Condutor } from "@/models/api-condutor";
import ModalCondutor from "../Modal/ModalCondutor";


interface ListDataConductorProps {
  condutores: Condutor[] | null;
}

export default function ListDataCondutor({ condutores }: ListDataConductorProps) {
  const [modalOpenId, setModalOpenId] = useState<number | undefined>(undefined);

  const handleOpenModal = (id: number | undefined) => {
    setModalOpenId(id);
  };

  const handleCloseModal = () => {
    setModalOpenId(undefined);
  };

  return (
    <List disablePadding>
      {condutores !== undefined && condutores !== null ? (
        condutores.map((condutor) => (
          <ListItem disablePadding key={condutor.id} sx={{ display: 'block'}}>
            <ListItemText
              primary={`ID:${condutor.id}`}
              secondary={`\nNome:${condutor.nome}`}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleOpenModal(condutor.id)}
              disableElevation
              sx={{ marginLeft: 'auto', marginRight: '30px' }}
            >
              Abrir Modal
            </Button>
            <ModalCondutor
              open={modalOpenId === condutor.id}
              onClose={handleCloseModal}
              id={condutor.id}
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
