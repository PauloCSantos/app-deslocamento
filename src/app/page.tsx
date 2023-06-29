import Image from "next/image";
import styles from "./page.module.css";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
} from "../components/MaterialUi/MaterialUi";
import Link from "next/link";

export default function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      paddingTop={4}
      mx={2}
      sx={{
        marginX: '20%',
        maxWidth: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <Typography variant="h2" align="center">
        Seja bem-vindo ao DeslocAPI
      </Typography>
      <Typography variant="body1" align="center">
        Utilize o menu para navegar entre as páginas e realizar as ações
        necessárias.
      </Typography>
      <Grid container spacing={2} mt={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Link href="/cliente" passHref>
            <Card>
              <CardContent>
                <Typography variant="h5" align="center">
                  Cliente
                </Typography>
                <Typography variant="body2" align="center">
                  Gerencie os clientes
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Link href="/veiculo" passHref>
            <Card>
              <CardContent>
                <Typography variant="h5" align="center">
                  Veículo
                </Typography>
                <Typography variant="body2" align="center">
                  Gerencie os veículos
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Link href="/condutor" passHref>
            <Card>
              <CardContent>
                <Typography variant="h5" align="center">
                  Condutor
                </Typography>
                <Typography variant="body2" align="center">
                  Gerencie os condutores
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Link href="/deslocamento" passHref>
            <Card>
              <CardContent>
                <Typography variant="h5" align="center">
                  Deslocamento
                </Typography>
                <Typography variant="body2" align="center">
                  Gerencie os deslocamentos
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
