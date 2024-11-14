import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './home';
import Login from './login';
import Signup from './signup'
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
  path:"/login",
    element:<Login/>
  },
  {
  path:"/signup",
    element:<Signup/>
  }
])
function App() {
  return <>
<RouterProvider router={router}></RouterProvider>
    
  </>;
}

export default App;
