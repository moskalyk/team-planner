// import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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

const PitchDetail = () => {
  const { id } = useParams();
  
  // Find the pitch content from local data
  const pitch = pitchesData.find((p: any)=> p.id === parseInt(id!))?.content || 'Pitch not found';

  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={8} style={{textAlign: 'left'}}>
          <Markdown>{pitch}</Markdown>
        </Col>
      </Row>
    </Container>
    )
}

export default PitchDetail