"use client";

import { FormEvent, useState, ChangeEvent } from "react";
import {
  Box,
  Button,
  TextField,
  Collapse,
  Grid,
} from "../MaterialUi/MaterialUi";
import { Veiculo } from "@/models/api-veiculo";

interface VeiculoFormProps {
  initialData: Veiculo | null;
}

const onSubmit = async (objVeiculo: Veiculo) => {
  const jsonClient = JSON.stringify(objVeiculo);
  const res = await fetch(
    "https://api-deslocamento.herokuapp.com/api/v1/Veiculo",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonClient,
    }
  );
};

const onUpdate = async (objVeiculo: Veiculo) => {
  const obj = {
    id: objVeiculo.id,
    marcarModelo: objVeiculo.marcaModelo,
    anoFabricacao: objVeiculo.anoFabricacao,
    kmAtual: objVeiculo.kmAtual,
  };
  const jsonClient = JSON.stringify(obj);
  const res = await fetch(
    `https://api-deslocamento.herokuapp.com/api/v1/Veiculo/${objVeiculo.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonClient,
    }
  );
};

export default function FormCollapseVeiculo({ initialData }: VeiculoFormProps) {
  const [marcaModelo, setMarcaModelo] = useState(
    initialData?.marcaModelo || ""
  );
  const [placa, setPlaca] = useState(initialData?.placa || "");
  const [anoFabricacao, setAnoFabricacao] = useState(
    initialData?.anoFabricacao || 0
  );
  const [kmAtual, setKmAtual] = useState(initialData?.kmAtual || 0);

  const [open, setOpen] = useState(false);

  const handleButtonClick = () => {
    setOpen(!open);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (initialData && marcaModelo && anoFabricacao && kmAtual && placa) {
      onUpdate({
        id: initialData.id,
        marcaModelo,
        anoFabricacao,
        kmAtual,
      });
    } else {
      onSubmit({
        placa,
        marcaModelo,
        anoFabricacao,
        kmAtual,
      });
    }

    setPlaca("");
    setMarcaModelo("");
    setAnoFabricacao(0);
    setKmAtual(0);
  };

  const handleInputChangeAno = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;
    const onlyNumbers = value.replace(/[^0-9]/g, "");
    setAnoFabricacao(parseInt(onlyNumbers));
  };

  const handleInputChangeKm = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;
    const onlyNumbers = value.replace(/[^0-9]/g, "");
    setKmAtual(parseInt(onlyNumbers));
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleButtonClick}>
        Abrir Formulário
      </Button>
      <Collapse in={open}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {initialData === null && (
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  label="Placa do veiculo"
                  value={placa}
                  onChange={(e) => setPlaca(e.target.value)}
                  variant="standard"
                  fullWidth
                  margin="normal"
                  sx={{ fontSize: "1rem", padding: "2px" }}
                  inputProps={{ style: { fontSize: "1rem" } }}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                label="Marca/Modelo do veiculo"
                value={marcaModelo}
                onChange={(e) => setMarcaModelo(e.target.value)}
                variant="standard"
                fullWidth
                margin="normal"
                sx={{ fontSize: "1rem", padding: "2px" }}
                inputProps={{ style: { fontSize: "1rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                label="Ano de fabricacao do veiculo"
                type="number"
                value={anoFabricacao}
                onChange={handleInputChangeAno}
                variant="standard"
                fullWidth
                margin="normal"
                sx={{ fontSize: "1rem", padding: "2px" }}
                inputProps={{ style: { fontSize: "1rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                label="Quilometragem atual"
                value={kmAtual}
                onChange={handleInputChangeKm}
                variant="standard"
                fullWidth
                margin="normal"
                sx={{ fontSize: "1rem", padding: "2px" }}
                inputProps={{ style: { fontSize: "1rem" } }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            sx={{ fontSize: "1rem", padding: "2px" }}
          >
            {initialData ? "Atualizar" : "Cadastrar"}
          </Button>
        </form>
      </Collapse>
    </Box>
  );
}
