import {
  Alert,
  AlertColor,
  Divider,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { UrlMapper } from '../../types/admin-type/SystemConfiguration';

interface TextPreviewAlertProps {
  value: string;
  alertSeverity?: AlertColor;
  links?: UrlMapper[];
  icon?: React.ReactNode;
}

export default function TextPreviewAlert({
  value,
  alertSeverity = 'warning',
  links = [],
  icon,
}: TextPreviewAlertProps) {
  return (
    <Alert
      severity={alertSeverity}
      sx={{ my: 1, fontSize: '0.8rem', borderRadius: 1 }}
      icon={icon}
    >
      {value}
      {links.length > 0 && (
        <Stack spacing={1} sx={{ mt: 1 }}>
          <Divider />
          <Typography variant="subtitle2">Links relacionados:</Typography>
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener"
              style={{ fontWeight: 'bold' }}
            >
              {link.urlTitle}
            </Link>
          ))}
        </Stack>
      )}
    </Alert>
  );
}
