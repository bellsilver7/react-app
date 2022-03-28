import logo from './logo.svg';
import './App.css';

function Header(props) {
  return <header>
    <h1><a href="/">{props.title}</a></h1>
  </header>
}

function Nav(props)
{
  const lis = [];
  props.topics.map((t) => {
    // 동적으로 만들어주는 태그는 key라는 prop을 가져야 한다.
    lis.push(<li key={t.id}><a href={'/read/' + t.id}>{t.title}</a></li>);
  });
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function Article(props)
{
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function App() {
  // 변하지 않는 변수는 const로 선언하여 코드를 튼튼하게 할 수 있다.
  const topics = [
    {id: 1, title: "html", body: "html is ..."},
    {id: 2, title: "css", body: "css is ..."},
    {id: 3, title: "javascript", body: "javascript is ..."}
  ];
  return (
    <div>
      <Header title="REACT"></Header>
      <Nav topics={topics}></Nav>
      <Article title="Welcome" body="Hello React!"></Article>
    </div>
  );
}

export default App;