import  Router  from './router/index';
import { BrowserRouter } from 'react-router-dom';
import { RouterProvider } from './router/RouterContext';
import { AuthProvider } from './context/AuthProvider';


function App() {
  return (
    <BrowserRouter>
        <RouterProvider>
          <AuthProvider>
            <Router/>
          </AuthProvider>
        </RouterProvider>
    </BrowserRouter>
  );
}

export default App;
