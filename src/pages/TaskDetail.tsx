import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Button, Checkbox, Tag, Spin } from "antd";
import { useTasks } from "../hooks/useTasks";
import type { Task } from "../types/Task";

const { Title, Paragraph } = Typography;

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTask, toggleTask, deleteTask } = useTasks();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        const t = await getTask(Number(id));
        setTask(t || null);
        setLoading(false);
      };
      fetchTask();
    }
  }, [id, getTask]);

  if (loading) {
    return (
      <Row justify="center" style={{ marginTop: 20 }}>
        <Col>
          <Spin size="large" />
        </Col>
      </Row>
    );
  }

  if (!task) {
    return (
      <Row justify="center" style={{ marginTop: 20 }}>
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card>
            <Title level={4}>Evento no encontrada</Title>
            <Button type="primary" onClick={() => navigate("/")}>
              Volver
            </Button>
          </Card>
        </Col>
      </Row>
    );
  }

  return (
    <Row justify="center" style={{ marginTop: 20 }}>
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card>
          <Title level={3}>{task.title}</Title>
          <Paragraph>
            <strong>Descripción:</strong> {task.description}
          </Paragraph>
          <Paragraph>
            <strong>Tipo:</strong> {task.type && <Tag color="blue">{task.type}</Tag>}
          </Paragraph>
          <Paragraph>
            <strong>Estado:</strong>{" "}
            <Checkbox
              checked={task.completed}
              onChange={async () => {
                await toggleTask(task.id);
                const updated = await getTask(task.id);
                setTask(updated || null);
              }}
            >
              {task.completed ? "Completada" : "Pendiente"}
            </Checkbox>
          </Paragraph>

          <Row gutter={8}>
            <Col>
              <Button type="primary" onClick={() => navigate(`/edit/${task.id}`)}>
                Editar
              </Button>
            </Col>
            <Col>
              <Button
                danger
                onClick={async () => {
                  await deleteTask(task.id);
                  navigate("/");
                }}
              >
                Eliminar
              </Button>
            </Col>
            <Col>
              <Button onClick={() => navigate("/")}>Volver</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}
