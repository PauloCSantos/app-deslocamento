import { Typography, Box, Container } from "../../components/MaterialUi/MaterialUi";
import FormCollapseCliente from "@/components/Form/FormCollapseCliente";
import ListDataCliente from "@/components/List/ListDataCliente";
import { Cliente } from "@/models/api-cliente";

export const metadata = {
  title: "DeslocAPP-Clientes",
};

async function getClientes(): Promise<[Cliente] | null> {
  try {
    const response = await fetch(
      `https://api-deslocamento.herokuapp.com/api/v1/Cliente`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Erro ao obter os clientes");
    }

    const data = await response.json();
    const clientes: [Cliente] = data;

    return clientes;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Page() {
  const clientes = await getClientes();
  return (
    <Container sx={{ padding: '20px' }}>
      <Box>
        <Typography variant="h4">Adicionar novo cliente</Typography>
        <FormCollapseCliente initialData={null}/>
      </Box>
      <Box>
        <Typography variant="h5" component="h5">
          Lista de Clientes
        </Typography>
        <ListDataCliente clientes={clientes} />
      </Box>
    </Container>
  );
}
