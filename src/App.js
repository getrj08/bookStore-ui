import './App.css';
import BookComponent from './components/BookComponent';
import HeaderComponent from './components/HeaderComponent';
import {Provider} from 'react-redux';
import store from './store'


function App() {
  return (
    <>
    
    <Provider store={store}>
        <HeaderComponent />
        <BookComponent />
    </Provider>
      
    </>
  );
}

export default App;
