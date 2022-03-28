import logo from './logo.svg';
import './App.css';

function Header(props) {
  return <header>
    <h1><a href="/" onClick={(event) => {
      event.preventDefault(); // a 태그의 기본 동작을 방지
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}

function Nav(props)
{
  const lis = [];
  props.topics.map((t) => {
    // 동적으로 만들어주는 태그는 key라는 prop을 가져야 한다.
    // event => {} 파라미터가 하나일 경우 괄호를 생략할 수 있다.
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/' + t.id} onClick={event => {
        event.preventDefault();
        props.onChangeMode(event.target.id); // id 값을 넘겨주기 위해 target 인 a 태그의 id 값을 가져오도록 했다.
      }}>{t.title}</a>
      </li>);
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
    {id: 1, title: 'html', body: 'html is ...'},
    {id: 2, title: 'css', body: 'css is ...'},
    {id: 3, title: 'javascript', body: 'javascript is ...'}
  ];
  return (
    <div>
      <Header title="REACT" onChangeMode={(event) => {
        alert('Header');
      }}></Header>
      <Nav topics={topics} onChangeMode={(id) => {
        alert(id);
      }}></Nav>
      <Article title="Welcome" body="Hello React!"></Article>
    </div>
  );
}

export default App;