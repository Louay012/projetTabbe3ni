import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './home.jsx';
import Login from './login.jsx';
import Signup from './signup.jsx';
import Income from './income.jsx';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import Budgets from './budgets.jsx';
import Transactions from './transactions.jsx';
import Categories from './Categories.jsx';
import { UserProvider } from './UserContext'; // Import the context provider
import ProtectedRoute from './ProtectedRoute';
import  { Toaster } from 'react-hot-toast';
import Docs from './docs.jsx'
import Contact from './contact.jsx'
const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/contact",
    element:<Contact/>
  },
  {
    path:"/docs",
    element:<Docs/>
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
    path:"/income",
      element:<ProtectedRoute><Income/></ProtectedRoute>
    },
  {
    path:"/dashboard",
      element:<ProtectedRoute><Dashboard/></ProtectedRoute>
    } ,
  {
    path:"/budgets",
      element:<ProtectedRoute><Budgets/></ProtectedRoute>
    },
    {path:"/transactions",
      element:<ProtectedRoute><Transactions/></ProtectedRoute>
    }
    ,
    {path:"/categories",
      element:<ProtectedRoute><Categories/></ProtectedRoute>
    }
])
function App() {
  return (
    <UserProvider> 
      <Toaster/>
      <RouterProvider router={router} ></RouterProvider>
    </UserProvider>
  );
}

export default App;
