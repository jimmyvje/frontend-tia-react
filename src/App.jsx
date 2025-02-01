import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './themeConfig'
import Contenedor from './components/Contenedor';
//import { IconButton } from '@mui/material';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Contenedor></Contenedor>
    </ThemeProvider>
  );
}

export default App;
