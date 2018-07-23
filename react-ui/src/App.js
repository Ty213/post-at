import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import CardList from './components/CardList';
import configureStore from './store/configureStore';
import { addBlep,getBleps,fetchBleps } from './actions/bleps';
import './App.css';


const store = configureStore();

store.subscribe(() => {
  const state = store.getState();
  console.log(state);
});

store.dispatch(addBlep({ title: "mah test", content: "here sum content" }));
store.dispatch(fetchBleps()).then(() => console.log(store.getState()))


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Header />
          <CardList />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;


