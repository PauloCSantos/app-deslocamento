import { Typography, Box, Container } from "../../components/MaterialUi/MaterialUi";
import FormCollapse from "@/components/Form/FormCollapseCliente";
import FormCollapseCondutor from "@/components/Form/FormCollapseCondutor";
import ListDataCondutor from "@/components/List/ListDataCondutor";
import { Condutor } from "@/models/api-condutor";


export const metadata = {
    title: "APP-DESLOCAMENTO - Condutores",
}
async function getCondutores(): Promise<[Condutor] | null> {
  try {
    const response = await fetch(
      `https://api-deslocamento.herokuapp.com/api/v1/Condutor`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Erro ao obter os condutores");
    }

    const data = await response.json();
    const condutores: [Condutor] = data;

    return condutores;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Page() {
  const condutores = await getCondutores();
  return (
    <Container sx={{ padding: '20px' }}>
      <Box>
        <Typography variant="h4">Adicionar novo condutor</Typography>
        <FormCollapseCondutor initialData={null}/>
      </Box>
      <Box>
        <Typography variant="h5" component="h5">
          Lista de Condutores
        </Typography>
        <ListDataCondutor condutores={condutores} />
      </Box>
    </Container>
  );
}
