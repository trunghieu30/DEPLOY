import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Routers from './routers/Router';

function App() {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
}

export default App;
