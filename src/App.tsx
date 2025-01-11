import { useState } from 'react'
import './App.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import 'bootstrap/dist/css/bootstrap.min.css';

import Markdown from 'react-markdown'

import DirectedGraphWidget from './DirectedGraph'

import PitchBoard from './PitchBoard'

function App() {
  const [currentMarkdown, setCurrentMarkdown] = useState(null)
  return (
    <>
    {/*profile*/}
    <div style={{position:'fixed', top: '50px', right: '50px', cursor: 'pointer', zIndex: '10'}}>
      sign out
    </div>
    {/*content*/}
    <div style={{alignContent: 'center',width: '100%', height: '90vh',top: '50px', position: 'fixed', transform: 'translateX(-50%)'}}>
    <h3>Team Planner</h3>
      <br/>
      <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-4"
      style={{width: '500px', margin: 'auto'}}
      fill
    >
      <Tab eventKey="profile" title="Board">
        <PitchBoard/>
      </Tab>
      <Tab eventKey="roles" title="Roles">
        <DirectedGraphWidget/>
      </Tab>
      <Tab eventKey="pitch" title="Pitch">
        <Container fluid>
          <p>add content to add a pitch to the team</p>
          <Row 
          style={{paddingLeft: '100px', paddingRight: '100px'}}
          >
            <Col><textarea style={{margin: '30px', width: '37vw', border: '1px solid lightgrey', height: '100%'}} onChange={(evt: any) => setCurrentMarkdown(evt.target.value)}></textarea></Col>
            <Col style={{margin: '30px',padding: '15px', width: '40vw', height: '100%', background: '#E6E6E3', textAlign: 'left'}}><Markdown >{currentMarkdown}</Markdown></Col>
          </Row>
        </Container>
        <div style={{position: 'fixed', bottom:'30px',right:'30px'}}><Button disabled={currentMarkdown==null}>Add Pitch</Button></div>

      </Tab>
    </Tabs>

    </div>
    </>
  )
}

export default App
