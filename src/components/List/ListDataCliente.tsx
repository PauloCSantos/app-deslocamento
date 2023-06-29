"use client";

import { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Grid,
} from "../MaterialUi/MaterialUi";
import { Cliente } from "@/models/api-cliente";
import ModalCliente from "../Modal/ModalCliente";

interface ListDataClientProps {
  clientes: Cliente[] | null;
}

export default function ListDataCliente({ clientes }: ListDataClientProps) {
  const [modalOpenId, setModalOpenId] = useState<number | undefined>(undefined);

  const handleOpenModal = (id: number | undefined) => {
    setModalOpenId(id);
  };

  const handleCloseModal = () => {
    setModalOpenId(undefined);
  };

  return (
    <List disablePadding>
      {clientes !== undefined && clientes !== null ? (
        clientes.map((cliente) => (
          <ListItem disablePadding key={cliente.id} sx={{ display: 'block'}}>
            <ListItemText
              primary={`ID:${cliente.id}`}
              secondary={`\nNome:${cliente.nome}`}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleOpenModal(cliente.id)}
              disableElevation
              sx={{ marginLeft: 'auto', marginRight: '30px' }}
            >
              Abrir Modal
            </Button>
            <ModalCliente
              open={modalOpenId === cliente.id}
              onClose={handleCloseModal}
              id={cliente.id}
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
