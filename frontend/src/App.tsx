import { BookOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Stack spacing={3} sx={{ alignItems: "flex-start" }}>
            <BookOutlined color="primary" sx={{ fontSize: 48 }} />

            <Typography variant="h3">VocAbb</Typography>

            <Typography color="text.secondary">
              Your personal English vocabulary.
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button variant="contained">Get Started</Button>

              <Button variant="outlined">Learn More</Button>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
