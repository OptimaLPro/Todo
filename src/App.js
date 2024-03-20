import logo from './logo.svg';
import './App.css';
import TodoContainer from './TodoContainer';
import CreateContainer from './CreateContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="title">T O D O</div>
        <CreateContainer />
        <TodoContainer />
      </header>
    </div>
  );
}

export default App;
