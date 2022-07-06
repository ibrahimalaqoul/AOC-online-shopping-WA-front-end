import './App.css';
import Auth from './context/Auth';
import Items from './context/items';
import Home from './components/Home';
import SignUp from './components/auth/signUp';
import {Route ,Routes} from 'react-router-dom';
import UpdateItem from './components/items/update-item';
import Fav from './components/Fav/fav';
import FavCon from './context/fav';
import CartCon from './context/Cart';
import Cart from './components/Cart/Cart';
import CommentCon from './context/comment';
function App() {
  return (
    <div className="App">
      <Auth>

        <Items>
    <FavCon>
    <CartCon>
    <CommentCon>
<Routes>
<Route path="/" element={<Home/>} />
<Route path="/signUp" element={<SignUp/>} />
<Route path="/update/:id" element={<UpdateItem/>} />

<Route path="/fav" element={<Fav/>} />
<Route path="/cart" element={<Cart/>} />

</Routes>
</CommentCon>
</CartCon>
</FavCon>

        </Items>
      </Auth>
    </div>
  );
}

export default App;
