"use client";

import { FormEvent, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Collapse,
  Grid,
} from "../MaterialUi/MaterialUi";
import { Cliente } from "@/models/api-cliente";

interface ClienteFormProps {
  initialData: Cliente | null;
}

const onSubmit = async (objCliente: Cliente) => {
  const jsonClient = JSON.stringify(objCliente);
  console.log(jsonClient);
  const res = await fetch(
    "https://api-deslocamento.herokuapp.com/api/v1/Cliente",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonClient,
    }
  );
};

const onUpdate = async (objCliente: Cliente) => {
  const obj = {
    id: objCliente.id,
    nome: objCliente.nome,
    logradouro: objCliente.logradouro,
    numero: objCliente.numero,
    bairro: objCliente.bairro,
    cidade: objCliente.cidade,
    uf: objCliente.uf,
  };
  const jsonClient = JSON.stringify(obj);
  console.log(jsonClient);
  const res = await fetch(
    `https://api-deslocamento.herokuapp.com/api/v1/Cliente/${objCliente.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonClient,
    }
  );
};

export default function FormCollapseCliente({ initialData }: ClienteFormProps) {
  const [numeroDoc, setNumeroDoc] = useState(
    initialData?.numeroDocumento || ""
  );
  const [tipoDoc, setTipoDoc] = useState(initialData?.tipoDocumento || "");
  const [nome, setNome] = useState(initialData?.nome || "");
  const [logradouro, setLogradouro] = useState(initialData?.logradouro || "");
  const [numero, setNumero] = useState(initialData?.numero || "");
  const [bairro, setBairro] = useState(initialData?.bairro || "");
  const [cidade, setCidade] = useState(initialData?.cidade || "");
  const [uf, setUf] = useState(initialData?.uf || "");

  const [open, setOpen] = useState(false);

  const handleButtonClick = () => {
    setOpen(!open);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      initialData &&
      numeroDoc &&
      tipoDoc &&
      nome &&
      logradouro &&
      numero &&
      bairro &&
      cidade &&
      uf
    ) {
      onUpdate({
        id: initialData.id,
        numeroDocumento: numeroDoc,
        tipoDocumento: tipoDoc,
        nome,
        logradouro,
        numero,
        bairro,
        cidade,
        uf,
      });
    } else {
      onSubmit({
        numeroDocumento: numeroDoc,
        tipoDocumento: tipoDoc,
        nome,
        logradouro,
        numero,
        bairro,
        cidade,
        uf,
      });
    }

    setNumeroDoc("");
    setTipoDoc("");
    setNome("");
    setLogradouro("");
    setNumero("");
    setBairro("");
    setCidade("");
    setUf("");
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
                  label="Numero do documento"
                  value={numeroDoc}
                  onChange={(e) => setNumeroDoc(e.target.value)}
                  variant="standard"
                  size="small"
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
                  label="Tipo do documento"
                  value={tipoDoc}
                  onChange={(e) => setTipoDoc(e.target.value)}
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
                label="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
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
                label="Logradouro"
                value={logradouro}
                onChange={(e) => setLogradouro(e.target.value)}
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
                label="Numero"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
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
                label="Bairro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
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
                label="Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
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
                label="UF"
                value={uf}
                onChange={(e) => setUf(e.target.value)}
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
