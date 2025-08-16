import { Row, Col, Typography } from "antd";


const { Title } = Typography;

export default function Navbar() {

  return (
    <>
      <Row
        justify="space-between"
        align="middle"
        style={{ background: "#1677ff", padding: "0 20px", height: 64 }}
        className="desktop-navbar"
        
      >
        <Col >
          <Title level={4} style={{ color: "#fff", margin: 0 }} >
            Gestion de Eventos
          </Title>
        </Col>
      </Row>
    </>
  );
}
