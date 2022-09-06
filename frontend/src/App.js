import Main from "./Components/Main/Main";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigureStore } from "./Redux/configureStore";
import { Link } from "react-router-dom";


const store = ConfigureStore();

function App() {
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main />
        
      </BrowserRouter>
    </Provider>
  );
}

export default App;
