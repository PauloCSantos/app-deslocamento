"use client";

import { FormEvent, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Collapse,
  Grid,
} from "../MaterialUi/MaterialUi";
import { Deslocamento } from "@/models/api-deslocamento";

interface DeslocamentoFormProps {
  initialData: Deslocamento | null;
}

const onSubmit = async (objDeslocamento: Deslocamento) => {
  const obj = {
    kmInicial: objDeslocamento.kmFinal,
    inicioDeslocamento: objDeslocamento.inicioDeslocamento,
    checkList: objDeslocamento.checkList,
    motivo: objDeslocamento.motivo,
    observacao: objDeslocamento.observacao,
    idCondutor: objDeslocamento.idCondutor,
    idVeiculo: objDeslocamento.idVeiculo,
    idCliente: objDeslocamento.idCliente,
  };
  const jsonClient = JSON.stringify(obj);
  const res = await fetch(
    "https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/IniciarDeslocamento",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonClient,
    }
  );
};

const onUpdate = async (objDeslocamento: Deslocamento) => {
  const obj = {
    id: objDeslocamento.id,
    kmFinal: objDeslocamento.kmFinal,
    fimDeslocamento: objDeslocamento.observacao,
  };
  const jsonClient = JSON.stringify(obj);
  const res = await fetch(
    `https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/${objDeslocamento.id}/EncerrarDeslocamento`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonClient,
    }
  );
};

export default function FormCollapseDeslocamento({
  initialData,
}: DeslocamentoFormProps) {
  const [kmInicial, setKmInicial] = useState(initialData?.kmInicial || 0);
  const [kmFinal, setKmFinal] = useState(initialData?.kmFinal || 0);
  const [inicioDeslocamento, setInicioDeslocamento] = useState(
    initialData?.inicioDeslocamento || ""
  );
  const [fimDeslocamento, setFimDeslocamento] = useState(
    initialData?.fimDeslocamento || ""
  );
  const [checkList, setCheckList] = useState(initialData?.checkList || "");
  const [motivo, setMotivo] = useState(initialData?.motivo || "");
  const [observacao, setObservacao] = useState(initialData?.observacao || "");
  const [idCondutor, setIdCondutor] = useState(initialData?.idCondutor || 0);
  const [idVeiculo, setIdVeiculo] = useState(initialData?.idVeiculo || 0);
  const [idCliente, setIdCliente] = useState(initialData?.idCliente || 0);

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

    const dataInput = "27/06/2023";
    const dataConvertida = formatarData(dataInput);

    if (
      initialData &&
      kmInicial &&
      kmFinal &&
      inicioDeslocamento &&
      fimDeslocamento &&
      checkList &&
      motivo &&
      observacao &&
      idCondutor &&
      idVeiculo &&
      idCliente
    ) {
      onUpdate({
        id: initialData.id,
        kmFinal,
        fimDeslocamento: dataConvertida,
        observacao,
        //vencimentoHabilitacao: dataConvertida,
      });
    } else {
      onSubmit({
        kmInicial,
        inicioDeslocamento: dataConvertida,
        checkList,
        motivo,
        observacao,
        idCondutor,
        idVeiculo,
        idCliente,
        //vencimentoHabilitacao: dataConvertida,
      });
    }

    setKmInicial(0);
    setKmFinal(0);
    setInicioDeslocamento("");
    setFimDeslocamento("");
    setCheckList("");
    setMotivo("");
    setObservacao("");
    setIdCondutor(0);
    setIdVeiculo(0);
    setIdCliente(0);
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleButtonClick}>
        Abrir Formulário
      </Button>
      <Collapse in={open}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {initialData === null ? (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    label="Km inicial"
                    value={kmInicial}
                    onChange={(e) => setKmInicial(parseInt(e.target.value))}
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
                    label="Inicio do deslocamento"
                    value={inicioDeslocamento}
                    onChange={(e) => setInicioDeslocamento(e.target.value)}
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
                    label="Checklist"
                    value={checkList}
                    onChange={(e) => setCheckList(e.target.value)}
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
                    label="Motivo"
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
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
                    label="Observacao"
                    value={observacao}
                    onChange={(e) => setObservacao(e.target.value)}
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
                    label="Id condutor"
                    value={idCondutor}
                    onChange={(e) => setIdCondutor(parseInt(e.target.value))}
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
                    label="Id veiculo"
                    value={idVeiculo}
                    onChange={(e) => setIdVeiculo(parseInt(e.target.value))}
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
                    label="Id cliente"
                    value={idCliente}
                    onChange={(e) => setIdCliente(parseInt(e.target.value))}
                    variant="standard"
                    fullWidth
                    margin="normal"
                    sx={{ fontSize: "1rem", padding: "2px" }}
                    inputProps={{ style: { fontSize: "1rem" } }}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    label="Km final"
                    value={kmFinal}
                    onChange={(e) => setKmFinal(parseInt(e.target.value))}
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
                    label="Fim do deslocamento"
                    value={fimDeslocamento}
                    onChange={(e) => setFimDeslocamento(e.target.value)}
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
                    label="Observacao"
                    value={observacao}
                    onChange={(e) => setObservacao(e.target.value)}
                    variant="standard"
                    fullWidth
                    margin="normal"
                    sx={{ fontSize: "1rem", padding: "2px" }}
                    inputProps={{ style: { fontSize: "1rem" } }}
                  />
                </Grid>
              </>
            )}
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
