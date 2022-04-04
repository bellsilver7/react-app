import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

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
        props.onChangeMode(Number(event.target.id)); // id 값을 넘겨주기 위해 target 인 a 태그의 id 값을 가져오도록 했다.
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

function Create(props)
{
  return <article>
    <h2>Create</h2>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title" /></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="Create" /></p>
    </form>
  </article>
}

function Update(props)
{
  // title 과 body 속성으로 상태값을 만들어 입력될 때마다 값이 설정되게 한다.
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event => {
      event.preventDefault();
      props.onUpdate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title" value={title} onChange={event => {
        setTitle(event.target.value);
      }} /></p>
      <p><textarea name="body" placeholder="body" value={body} onChange={event => {
        setBody(event.target.value);
      }}></textarea></p>
      <p><input type="submit" value="Update" /></p>
    </form>
  </article>
}

function App() {
  // 변하지 않는 변수는 const로 선언하여 코드를 튼튼하게 할 수 있다.
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null); // null 로 초기화
  const [nextId, setNextId] = useState(4); // topics 의 원소 중 마지막 id 값이 3 이므로 다음에 들어갈 4 라는 값으로 초기화
  const [topics, setTopics] = useState([ // topics 를 읽고 쓸 수 있도록 상태로 변경
    {id: 1, title: 'html', body: 'html is ...'},
    {id: 2, title: 'css', body: 'css is ...'},
    {id: 3, title: 'javascript', body: 'javascript is ...'}
  ]);

  let content = null;
  let contextControl = null; // 페이지 이동 링크
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello WEB!"></Article>;
    contextControl = <li><a href="/create" onClick={event => {
      event.preventDefault();
      setMode('CREATE');
    }}>Create</a></li>;
  } else if (mode === 'READ') {
    let title, body = null;
    topics.map(x => {
      if (x.id === id) {
        title = x.title;
        body = x.body;
      }
    });
    content = <Article title={title} body={body}></Article>;
    contextControl = <>
        <li><a href={'/update/' + id} onClick={event => {
          event.preventDefault();
          setMode('UPDATE');
        }}>Update</a></li>
        <li><button type="button" onClick={event => {
          const newTopics = [];
          topics.map(topic => {
            if (topic.id !== id) newTopics.push(topic);
          });
          setTopics(newTopics);
          setMode('WELCOME');
        }}>Delete</button></li>
      </>;
  } else if (mode === 'CREATE') {
    content = <Create onCreate={(_title, _body) => {
      const newTopic = {id: nextId, title: _title, body: _body};
      const newTopics = [...topics]; // topics 를 복제해 newTopics 를 만든다.
      newTopics.push(newTopic); // 복제한 newTopics 에 newTopic 을 추가하고
      setTopics(newTopics); // 새로운 newTopics 를 topics 의 상태로 변경한다.
      setMode('READ'); // Create 후 상세 보기로 넘어가도록 mode 상태를 READ 값으로 변경한다.
      setId(nextId); // id 는 nextId 로 변경 하고
      setNextId(nextId + 1); // nextId 는 거기에 + 1
    }}></Create>;
  } else if (mode === 'UPDATE') {
    let title, body = null;
    topics.map(x => {
      if (x.id === id) {
        title = x.title;
        body = x.body;
      }
    });
    content = <Update title={title} body={body} onUpdate={(_title, _body) => {
      const updatedTopic = {id: id, title: _title, body: _body};
      const newTopics = [...topics];
      newTopics.map((topic, index) => {
        if (topic.id === id) {
          newTopics[index] = updatedTopic;
        }
      });
      setTopics(newTopics);
      setMode('READ');
    }}></Update>;
  }

  return (
    <div>
      <Header title="REACT" onChangeMode={event => {
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
      <ul>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;