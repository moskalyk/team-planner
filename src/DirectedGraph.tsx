// First, you'll need to install these dependencies:
// npm install react-bootstrap bootstrap
// Also add to your index.html or App.js: import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, useRef, useEffect } from 'react';
import { Card, Button, Form, InputGroup, Badge, Container, Row, Col } from 'react-bootstrap';
import { BsArrowRight, BsPlus, BsTrash } from 'react-icons/bs';

const DirectedGraphWidget = () => {
  const [nodes, setNodes] = useState<any>([]);
  const [edges, setEdges] = useState<any>([]);
  const [selectedNodes, setSelectedNodes] = useState<any>([]);
  const [weight, setWeight] = useState<any>('');
  const [nodeName, setNodeName] = useState<any>('');
  const canvasRef: any = useRef(null);

  // Calculate node positions in a circle
  const getNodePosition = (index: any, total: any) => {
    const radius = Math.min(canvasRef.current.width, canvasRef.current.height) / 3;
    const angle = (2 * Math.PI * index) / total;
    const x = radius * Math.cos(angle) + canvasRef.current.width / 2;
    const y = radius * Math.sin(angle) + canvasRef.current.height / 2;
    return { x, y };
  };

  // Add a new node
  const addNode = (e: any) => {
    e.preventDefault();
    if (nodeName.trim()) {
      setNodes([...nodes, { id: Date.now(), label: nodeName }]);
      setNodeName('');
    }
  };

  // Connect selected nodes with weighted edge
  const connectNodes = (e: any) => {
    e.preventDefault();
    if (selectedNodes.length === 2 && weight.trim()) {
      const [source, target] = selectedNodes;
      setEdges([
        ...edges,
        {
          id: Date.now(),
          source,
          target,
          weight: parseFloat(weight)
        }
      ]);
      setSelectedNodes([]);
      setWeight('');
    }
  };

  // Toggle node selection
  const toggleNodeSelection = (nodeId: any) => {
    if (selectedNodes.includes(nodeId)) {
      setSelectedNodes(selectedNodes.filter((id: any) => id !== nodeId));
    } else if (selectedNodes.length < 2) {
      setSelectedNodes([...selectedNodes, nodeId]);
    }
  };

  // Remove a node and its connected edges
  const removeNode = (nodeId: any) => {
    setNodes(nodes.filter((node: any) => node.id !== nodeId));
    setEdges(edges.filter((edge: any) => edge.source !== nodeId && edge.target !== nodeId));
    setSelectedNodes(selectedNodes.filter((id: any) => id !== nodeId));
  };

  // Draw the graph
  const drawGraph = () => {
    const canvas: any = canvasRef.current;
    const ctx: any = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    edges.forEach((edge: any) => {
      const sourceNode = nodes.find((node: any) => node.id === edge.source);
      const targetNode = nodes.find((node: any) => node.id === edge.target);
      if (sourceNode && targetNode) {
        const sourcePos = getNodePosition(nodes.indexOf(sourceNode), nodes.length);
        const targetPos = getNodePosition(nodes.indexOf(targetNode), nodes.length);

        // Draw arrow
        ctx.beginPath();
        ctx.moveTo(sourcePos.x, sourcePos.y);
        ctx.lineTo(targetPos.x, targetPos.y);
        ctx.strokeStyle = '#6c757d';
        ctx.stroke();

        // Draw arrow head
        const angle = Math.atan2(targetPos.y - sourcePos.y, targetPos.x - sourcePos.x);
        const arrowSize = 10;
        ctx.beginPath();
        ctx.moveTo(
          targetPos.x - arrowSize * Math.cos(angle - Math.PI / 6),
          targetPos.y - arrowSize * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(targetPos.x, targetPos.y);
        ctx.lineTo(
          targetPos.x - arrowSize * Math.cos(angle + Math.PI / 6),
          targetPos.y - arrowSize * Math.sin(angle + Math.PI / 6)
        );
        ctx.fillStyle = '#6c757d';
        ctx.fill();

        // Draw weight
        const midX = (sourcePos.x + targetPos.x) / 2;
        const midY = (sourcePos.y + targetPos.y) / 2;
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.fillText(edge.weight.toString(), midX, midY);
      }
    });

    // Draw nodes
    nodes.forEach((node: any, index: any) => {
      const pos = getNodePosition(index, nodes.length);
      
      // Draw node circle
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 35, 0, 2 * Math.PI);
      ctx.fillStyle = selectedNodes.includes(node.id) ? '#0d6efd' : '#fff';
      ctx.fill();
      ctx.strokeStyle = '#6c757d';
      ctx.stroke();

      // Draw node label
      ctx.fillStyle = selectedNodes.includes(node.id) ? '#fff' : '#000';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label, pos.x, pos.y);
    });
  };

  // Update canvas on changes
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = 600;
      canvasRef.current.height = 400;
      drawGraph();
    }
  }, [nodes, edges, selectedNodes]);

  return (
    <Container className="mt-4" style={{height: '500px'}}>
      <Card>
        <Card.Header>
          <Card.Title>Roles Builder</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col>
              <Form onSubmit={addNode}>
                <InputGroup>
                  <Form.Control
                    value={nodeName}
                    onChange={(e) => setNodeName(e.target.value)}
                    placeholder="Enter node name"
                  />
                  <Button type="submit" variant="primary" style={{border:'none'}}>
                    <BsPlus /> Add Node
                  </Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form onSubmit={connectNodes}>
                <InputGroup>
                  <Form.Control
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Edge weight"
                    type="number"
                    disabled={selectedNodes.length !== 2}
                  />
                  <Button 
                    type="submit"
                    variant="success"
                    disabled={selectedNodes.length !== 2 || !weight.trim()}
                  >
                    <BsArrowRight /> Connect Nodes
                  </Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <div className="d-flex flex-wrap gap-2">
                {nodes.map((node: any) => (
                  <Badge 
                    key={node.id}
                    bg={selectedNodes.includes(node.id) ? 'primary' : 'light'}
                    text={selectedNodes.includes(node.id) ? 'white' : 'dark'}
                    className="d-flex align-items-center p-2"
                    style={{ cursor: 'pointer' }}
                  >
                    <span 
                      onClick={() => toggleNodeSelection(node.id)}
                      className="me-2"
                    >
                      {node.label}
                    </span>
                    <BsTrash
                      onClick={() => removeNode(node.id)}
                      style={{ cursor: 'pointer' }}
                    />
                  </Badge>
                ))}
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <canvas
                ref={canvasRef}
                className="border rounded w-100 bg-white"
                style={{ maxWidth: '600px' }}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DirectedGraphWidget;