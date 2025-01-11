import {useState} from 'react';
import { Container, Row, Col, Form, Stack, InputGroup, Button, Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown';

// Sample pitch data with markdown content
const pitchesData = [
  {
    id: 1,
    content: `# AI-Powered Customer Support
## Overview
This proposal aims to implement an AI-powered customer support system...

### Key Features
- 24/7 automated responses
- Machine learning for query understanding
- Integration with existing support tools

### Technical Requirements
1. Natural Language Processing
2. Machine Learning Models
3. API Integration`
  },
  {
    id: 2,
    content: `# Blockchain Integration
## Project Scope
Implementing blockchain technology for secure transactions...

### Implementation Plan
- Smart contract development
- Wallet integration
- Security audit process`
  },
  {
    id: 3,
    content: `# Blockchain Integration
## Project Scope
Implementing blockchain technology for secure transactions...

### Implementation Plan
- Smart contract development
- Wallet integration
- Security audit process`
  },
  {
    id: 4,
    content: `# Blockchain Integration
## Project Scope
Implementing blockchain technology for secure transactions...

### Implementation Plan
- Smart contract development
- Wallet integration
- Security audit process`
  },
  // Add more pitch data as needed
];

const PitchDetails = () => {
  const { id } = useParams();
  const [tokens, setTokens] = useState('');
  const [vote, setVote] = useState(null); // null, 'yes', or 'no'
  const [submitted, setSubmitted] = useState(false);
  
  // Find the pitch content from local data
  const pitch = pitchesData.find((p: any)=> p.id === parseInt(id!))?.content || 'Pitch not found';

  const handleTokenChange = (e: any) => {
    // Only allow positive numbers
    const value = e.target.value;
    if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 0)) {
      setTokens(value);
    }
  };

  const handleVote = (voteType: any) => {
    setVote(voteType);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (tokens && vote) {
      // Here you would typically send the vote to your backend
      console.log({
        pitchId: id,
        tokens: parseInt(tokens),
        vote: vote
      });
      setSubmitted(true);
    }
  };

  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={8} style={{textAlign: 'left'}}>
          <Markdown>{pitch}</Markdown>
        </Col>
        <Col md={4}>
          <div className="position-sticky" style={{ top: '20px' }}>
            <Form onSubmit={handleSubmit} className="bg-light p-4 rounded">
              <Stack gap={3}>
                {submitted ? (
                  <div className="text-center">
                    <h5 className="mb-3">Vote Submitted!</h5>
                    <Badge bg="success" className="px-4 py-2">

                    	 {/*@ts-ignore*/}
                      {tokens} tokens {vote.toUpperCase()}
                    </Badge>
                  </div>
                ) : (
                  <>
                    <Form.Group>
                      <Form.Label>Number of Tokens</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          value={tokens}
                          onChange={handleTokenChange}
                          placeholder="Enter tokens"
                          className="text-center"
                        />
                        <InputGroup.Text>🪙</InputGroup.Text>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Your Vote</Form.Label>
                      <div className="d-grid gap-2">
                        <Button
                          variant={vote === 'yes' ? 'success' : 'outline-success'}
                          onClick={() => handleVote('yes')}
                          className="py-2"
                        >
                          👍 Vote Yes
                        </Button>
                        <Button
                          variant={vote === 'no' ? 'danger' : 'outline-danger'}
                          onClick={() => handleVote('no')}
                          className="py-2"
                        >
                          👎 Vote No
                        </Button>
                      </div>
                    </Form.Group>

                    <Button 
                      type="submit"
                      variant="primary"
                      className="w-100 mt-2"
                      disabled={!tokens || !vote}
                    >
                      Submit Vote
                    </Button>
                  </>
                )}
              </Stack>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PitchDetails;