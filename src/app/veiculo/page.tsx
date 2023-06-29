import { Veiculo } from "@/models/api-veiculo";
import { Typography, Box, Container } from "../../components/MaterialUi/MaterialUi";
import FormCollapseVeiculo from "@/components/Form/FormCollapseVeiculo";
import ListDataVeiculo from "@/components/List/ListDataVeiculo";


export const metadata = {
    title: "APP-DESLOCAMENTO - Veiculos",
}


async function getVeiculos(): Promise<[Veiculo] | null> {
  try {
    const response = await fetch(
      `https://api-deslocamento.herokuapp.com/api/v1/Veiculo`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Erro ao obter os veiculos");
    }

    const data = await response.json();
    const veiculos: [Veiculo] = data;

    return veiculos;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Page() {
  const veiculos = await getVeiculos();
  return (
    <Container sx={{ padding: '20px' }}>
      <Box>
        <Typography variant="h4">Adicionar novo condutor</Typography>
        <FormCollapseVeiculo initialData={null}/>
      </Box>
      <Box>
        <Typography variant="h5" component="h5">
          Lista de Condutores
        </Typography>
        <ListDataVeiculo veiculos={veiculos} />
      </Box>
    </Container>
  );
}
