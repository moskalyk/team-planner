// PitchBoard.jsx
import { Container, Row, Col, Card, Badge, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PitchCard = ({ pitch, onClick }: any) => {
  return (
    <Card 
      className="pitch-card mb-3 cursor-pointer" 
      onClick={onClick}
      style={{
        // flexDirection: 'column',
  // height: '220px'
  aspectRatio: 1.15/1
      }}
    >
      <Card.Body>
        <Card.Title className="h6 mb-3">{pitch.title}</Card.Title>
        <div className="d-flex justify-content-between mb-2">
          <div className="votes">
            <Badge bg="success" className="me-2">
              Yes: {pitch.yesVotes}
            </Badge>
            <Badge bg="danger">
              No: {pitch.noVotes}
            </Badge>
          </div>
          <Badge bg="info" style={{maxHeight: '50px',padding: '5px', margin:'2px'}}>
            {pitch.timeCommitment}
          </Badge>
        </div>

        <div className="tags-wrapper">
          <Stack 
            direction="horizontal" 
            className="tags-container flex-wrap"
            gap={2}
          >
            {pitch.tags.map((tag: any, index: any) => (
              <Badge 
                key={index} 
                bg="secondary" 
                className="tag"
              >
                {tag}
              </Badge>
            ))}
          </Stack>
        </div>
      </Card.Body>
    </Card>
  );
};

const Track = ({ title, pitches, onPitchClick }: any) => {
  return (
    <div className="track" 

    >
      <h5 className="track-title mb-3" style={{color: title=='Active'||title=='Icebox'? title=='Icebox'? 'skyblue':'lime': 'black'}}>{title}</h5>
      <div className="track-content">
        {pitches.map((pitch: any) => (
          <PitchCard
            key={pitch.id}
            pitch={pitch}
            onClick={() => onPitchClick(pitch.id)}
          />
        ))}
      </div>
    </div>
  );
};

const PitchBoard = () => {
  const navigate = useNavigate();

  // Sample data - replace with your actual data
  const tracks = {
    icebox: [
      {
        id: 1,
        title: "AI-Powered Customer Support",
        yesVotes: 5,
        noVotes: 2,
        timeCommitment: Date().slice(0,11),
        tags: ["AI/ML", "Customer Service", "Automation"]
      },
      // Add more pitches...
    ],
    rnd: [
      {
        id: 2,
        title: "Blockchain Integration",
        yesVotes: 8,
        noVotes: 1,
        timeCommitment: Date().slice(0,11),
        tags: ["Blockchain", "Security", "Web3"]
      },
      {
        id: 2,
        title: "Blockchain Integration",
        yesVotes: 8,
        noVotes: 1,
        timeCommitment: Date().slice(0,11),
        tags: ["Blockchain", "Security", "Web3"]
      },{
        id: 2,
        title: "Blockchain Integration",
        yesVotes: 8,
        noVotes: 1,
        timeCommitment: Date().slice(0,11),
        tags: ["Blockchain", "Security", "Web3"]
      },{
        id: 2,
        title: "Blockchain Integration",
        yesVotes: 8,
        noVotes: 1,
        timeCommitment: Date().slice(0,11),
        tags: ["Blockchain", "Security", "Web3"]
      },{
        id: 2,
        title: "Blockchain Integration",
        yesVotes: 8,
        noVotes: 1,
        timeCommitment: Date().slice(0,11),
        tags: ["Blockchain", "Security", "Web3"]
      },{
        id: 2,
        title: "Blockchain Integration",
        yesVotes: 8,
        noVotes: 1,
        timeCommitment: Date().slice(0,11),
        tags: ["Blockchain", "Security", "Web3"]
      },
      // Add more pitches...
    ],
    betting: [
      {
        id: 3,
        title: "Mobile App Redesign",
        yesVotes: 12,
        noVotes: 0,
        timeCommitment: Date().slice(0,11),
        tags: ["UI/UX", "Mobile", "Design"]
      },
      // Add more pitches...
    ],
    active: [
      {
        id: 4,
        title: "Performance Optimization",
        yesVotes: 15,
        noVotes: 1,
        timeCommitment: Date().slice(0,11),
        tags: ["Performance", "Technical Debt", "Core"]
      },
      // Add more pitches...
    ]
  };

  const handlePitchClick = (pitchId: any) => {
    navigate(`/pitch/${pitchId}`);
  };

  return (
    <Container fluid className="pitch-board">
      <Row className="tracks-container">
        <Col>
          <Track
            title="Icebox"
            pitches={tracks.icebox}
            onPitchClick={handlePitchClick}
          />
        </Col>
        <Col>
          <Track
            title="R&D"
            pitches={tracks.rnd}
            onPitchClick={handlePitchClick}
          />
        </Col>
        <Col>
          <Track
            title="Betting"
            pitches={tracks.betting}
            onPitchClick={handlePitchClick}
          />
        </Col>
        <Col>
          <Track
            title="Active"
            pitches={tracks.active}
            onPitchClick={handlePitchClick}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default PitchBoard;