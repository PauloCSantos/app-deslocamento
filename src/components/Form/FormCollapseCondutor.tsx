"use client";

import { FormEvent, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Collapse,
  Grid,
} from "../MaterialUi/MaterialUi";
import { Condutor } from "@/models/api-condutor";

interface CondutorFormProps {
  initialData: Condutor | null;
}

const onSubmit = async (objCondutor: Condutor) => {
  const jsonClient = JSON.stringify(objCondutor);
  const res = await fetch(
    "https://api-deslocamento.herokuapp.com/api/v1/Condutor",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonClient,
    }
  );
};

const onUpdate = async (objCondutor: Condutor) => {
  const obj = {
    id: objCondutor.id,
    categoriaHabilitacao: objCondutor.categoriaHabilitacao,
    vencimentoHabilitacao: objCondutor.vencimentoHabilitacao,
  };
  const jsonClient = JSON.stringify(obj);
  const res = await fetch(
    `https://api-deslocamento.herokuapp.com/api/v1/Condutor/${objCondutor.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonClient,
    }
  );
};

export default function FormCollapseCondutor({
  initialData,
}: CondutorFormProps) {
  const [nome, setNome] = useState(initialData?.nome || "");
  const [numeroHabilitacao, setNumeroHabilitacao] = useState(
    initialData?.numeroHabilitacao || ""
  );
  const [categoriaHabilitacao, setCategoriaHabilitacao] = useState(
    initialData?.categoriaHabilitacao || ""
  );
  const [vencimentoHabilitacao, setVencimentoHabilitacao] = useState(
    initialData?.vencimentoHabilitacao || ""
  );

  const [open, setOpen] = useState(false);

  const handleButtonClick = () => {
    setOpen(!open);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    function formatarData(dataString: String) {
      const partes = dataString.split("/");
      const dia = partes[0];
      const mes = partes[1];
      const ano = partes[2];

      const dataFormatada = new Date(`${ano}-${mes}-${dia}T00:00:00.000Z`);
      return dataFormatada;
    }

    const dataInput = "28/06/2023";
    const dataConvertida = formatarData(dataInput);

    if (
      initialData &&
      nome &&
      numeroHabilitacao &&
      categoriaHabilitacao &&
      vencimentoHabilitacao
    ) {
      onUpdate({
        id: initialData.id,
        categoriaHabilitacao,
        vencimentoHabilitacao: dataConvertida,
      });
    } else {
      onSubmit({
        nome,
        numeroHabilitacao,
        categoriaHabilitacao,
        vencimentoHabilitacao: dataConvertida,
      });
    }

    setNome("");
    setCategoriaHabilitacao("");
    setNumeroHabilitacao("");
    setVencimentoHabilitacao("");
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
                  label="Nome do condutor"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  variant="standard"
                  fullWidth
                  margin="normal"
                  sx={{ fontSize: "1rem", padding: "2px" }}
                  inputProps={{ style: { fontSize: "1rem" } }}
                />
              </Grid>
            )}
            {initialData === null && (
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  label="Numero da habilitacao"
                  value={numeroHabilitacao}
                  onChange={(e) => setNumeroHabilitacao(e.target.value)}
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
                label="Categoria da habilitacao"
                value={categoriaHabilitacao}
                onChange={(e) => setCategoriaHabilitacao(e.target.value)}
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
                label="Vencimento da habilitacao"
                value={vencimentoHabilitacao}
                onChange={(e) => setVencimentoHabilitacao(e.target.value)}
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
