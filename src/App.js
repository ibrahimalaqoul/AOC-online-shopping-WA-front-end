import './App.css';
import Auth from './context/Auth';
import Items from './context/items';
import Home from './components/Home';
import SignUp from './components/auth/signUp';
import {Route ,Routes} from 'react-router-dom';
import UpdateItem from './components/items/update-item';

function App() {
  return (
    <div className="App">
      <Auth>
        <Items>

<Routes>
<Route path="/" element={<Home/>} />
<Route path="/signUp" element={<SignUp/>} />
<Route path="/update/:id" element={<UpdateItem/>} />

</Routes>
        </Items>
      </Auth>
    </div>
  );
}

export default App;
