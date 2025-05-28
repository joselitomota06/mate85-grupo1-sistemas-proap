import {
  Grid,
  Paper,
  Typography,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Card,
  Divider,
  alpha,
} from '@mui/material';
import LoginFormContainer from '../../containers/login/LoginFormContainer';
import { LoginGrid, LoginPaperContainer } from './LoginPage.style';
import { Lock as LockIcon } from '@mui/icons-material';
import logo from '../../assets/logo_ic_grande.png';

export default function LoginPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: '100vh',
        padding: 0,
        background: `linear-gradient(45deg, ${alpha(theme.palette.primary.dark, 0.8)} 0%, ${alpha(theme.palette.primary.main, 0.6)} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
      }}
    >
      <Card
        sx={{
          maxWidth: '1000px',
          width: isMobile ? 'calc(100% - 32px)' : '100%',
          maxHeight: isSmall ? '100vh' : 'none',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
          borderRadius: 2,
          m: isMobile ? 2 : 4,
        }}
      >
        {/* Left Side - Brand/Information */}
        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            p: { xs: 2, sm: 3 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: isMobile ? '100%' : '40%',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1, mr: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <img
                src={logo}
                height={isMobile ? 150 : 200}
                alt="Logo Instituto de Computação UFBA"
              />
            </Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom mt={2}>
              PROAP
            </Typography>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Sistema de Apoio à Pós-Graduação
            </Typography>
            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', my: 2 }} />
            <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
              Acesse sua conta para gerenciar solicitações, acompanhar processos
              e utilizar os serviços disponíveis.
            </Typography>
          </Box>

          {/* Background pattern */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              background:
                'radial-gradient(circle, transparent 20%, #000 20%, #000 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, #000 20%, #000 80%, transparent 80%, transparent) 25px 25px, linear-gradient(#fff 2px, transparent 2px) 0 -1px, linear-gradient(90deg, #fff 2px, #000 2px) -1px 0',
              backgroundSize: '50px 50px, 50px 50px, 25px 25px, 25px 25px',
            }}
          />
        </Box>

        {/* Right Side - Login Form */}
        <Box
          sx={{
            p: { xs: 2, sm: 3 },
            width: isMobile ? '100%' : '60%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflow: 'auto',
            boxSizing: 'border-box',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'primary.main',
                color: 'white',
                width: isSmall ? 32 : 40,
                height: isSmall ? 32 : 40,
                borderRadius: '50%',
                mr: 2,
              }}
            >
              <LockIcon fontSize={isSmall ? 'small' : 'medium'} />
            </Box>
            <Typography
              color="primary"
              component="h1"
              variant="h5"
              fontWeight="bold"
              sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' } }}
            >
              Acessar sua conta
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Entre com suas credenciais para acessar o sistema
          </Typography>

          <LoginFormContainer />
        </Box>
      </Card>
    </Container>
  );
}
