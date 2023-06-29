import { Deslocamento } from "@/models/api-deslocamento";
import { Typography, Box, Container } from "../../components/MaterialUi/MaterialUi";
import FormCollapseDeslocamento from "@/components/Form/FormCollapseDeslocamento";
import ListDataDeslocamento from "@/components/List/ListDataDeslocamento";

export const metadata = {
    title: "APP-DESLOCAMENTO - Deslocamentos",
}


async function getDeslocamentos(): Promise<[Deslocamento] | null> {
  try {
    const response = await fetch(
      `https://api-deslocamento.herokuapp.com/api/v1/Deslocamento`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Erro ao obter os deslocamentos");
    }

    const data = await response.json();
    const deslocamentos: [Deslocamento] = data;

    return deslocamentos;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Page() {
  const deslocamentos = await getDeslocamentos();
  return (
    <Container sx={{ padding: '20px' }}>
      <Box>
        <Typography variant="h4">Adicionar novo deslocamento</Typography>
        <FormCollapseDeslocamento initialData={null}/>
      </Box>
      <Box>
        <Typography variant="h5" component="h5">
          Lista de Condutores
        </Typography>
        <ListDataDeslocamento deslocamentos={deslocamentos} />
      </Box>
    </Container>
  );
}
