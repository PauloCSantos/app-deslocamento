"use client";

import { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
} from "../MaterialUi/MaterialUi";
import { Veiculo } from "@/models/api-veiculo";
import ModalVeiculo from "../Modal/ModalVeiculo";

interface ListDataVeiculoProps {
  veiculos: Veiculo[] | null;
}

export default function ListDataVeiculo({ veiculos }: ListDataVeiculoProps) {
  const [modalOpenId, setModalOpenId] = useState<number | undefined>(undefined);

  const handleOpenModal = (id: number | undefined) => {
    setModalOpenId(id);
  };

  const handleCloseModal = () => {
    setModalOpenId(undefined);
  };

  return (
    <List disablePadding>
      {veiculos !== undefined && veiculos !== null ? (
        veiculos.map((veiculo) => (
          <ListItem disablePadding key={veiculo.id} sx={{ display: 'block'}}>
            <ListItemText
              primary={`ID:${veiculo.id}`}
              secondary={`\nNome:${veiculo.placa}`}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleOpenModal(veiculo.id)}
              disableElevation
              sx={{ marginLeft: 'auto', marginRight: '30px' }}
            >
              Abrir Modal
            </Button>
            <ModalVeiculo
              open={modalOpenId === veiculo.id}
              onClose={handleCloseModal}
              id={veiculo.id}
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
