import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './home.jsx';
import Login from './login.jsx';
import Signup from './signup.jsx'
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import Budgets from './budgets.jsx';
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
  },
  {
    path:"/dashboard",
      element:<Dashboard/>
    } ,
  {
    path:"/budgets",
      element:<Budgets/>
    }
])
function App() {
  return <>
<RouterProvider router={router}></RouterProvider>
    
  </>;
}

export default App;
