import logo from './logo.svg';
import './App.css';

function Header() {
  return <header>
    <h1><a href="/">Web</a></h1>
  </header>
}

function Nav()
{
  return <nav>
    <ol>
      <li><a href="/read/1">Html</a></li>
      <li><a href="/read/2">Css</a></li>
      <li><a href="/read/3">Javascript</a></li>
    </ol>
  </nav>
}

function Article()
{
  return <article>
    <h2>Welcome</h2>
    Hello React!
  </article>
}

function App() {
  return (
    <div>
      <Header></Header>
      <Nav></Nav>
      <Article></Article>
    </div>
  );
}

export default App;