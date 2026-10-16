import { Box, Typography } from "@mui/material";

interface PagePlaceholderProps {
  title: string;
  description?: string;
}

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>

      {description && (
        <Typography color="text.secondary">{description}</Typography>
      )}
    </Box>
  );
}
