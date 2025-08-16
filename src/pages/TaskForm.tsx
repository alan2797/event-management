import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Typography,
  Form,
  Select,
  Breadcrumb,
  Spin,
  DatePicker,
  TimePicker,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useTasks } from "../hooks/useTasks";
import type { Task } from "../types/Task";
import moment from "moment";

const { Title } = Typography;
const { Option } = Select;

export default function TaskForm() {
  const { addTask, updateTask, getTask } = useTasks();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loadingSpin, setLoadingSpin] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
        const fetchTask = async () => {
        const event = await getTask(Number(id));
        if (event) {
          form.setFieldsValue({
            title: event.title,
            description: event.description,
            type: event.type,
            direction: event.direction,
            startDate: event.startDate ? moment(event.startDate) : undefined,
            endDate: event.endDate ? moment(event.endDate) : undefined,
            startTime: event.startTime ? moment(event.startTime) : undefined,
            endTime: event.endTime? moment(event.endTime) : undefined
          });
        }
      };
      fetchTask();
      
    }
  }, [id, getTask, form]);

const handleSubmit = async (values: Task) => {
    const { title, description, type, startDate, endDate, direction, startTime, endTime } = values;
    setLoadingSpin(true)
  if (id) {
    await updateTask(Number(id), { title, description, type, startDate, endDate, direction, startTime, endTime });
    // Simular delay de 2 segundos
    await new Promise((resolve) => setTimeout(resolve, 1500));
  } else {
    await addTask(title, description, type, startDate, endDate, direction,startTime, endTime); // completed por defecto false
    // Simular delay de 2 segundos
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  setLoadingSpin(false)

  navigate("/");
};

  return (
    <Row justify="center" style={{ marginTop: 20 }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={10}>
        {/* Breadcrumb */}
        <Breadcrumb style={{ marginBottom: 16 }}>
          <Breadcrumb.Item onClick={() => navigate("/")}>
            <HomeOutlined style={{ cursor: "pointer" }} />
          </Breadcrumb.Item>
          <Breadcrumb.Item>{id ? "Editar Evento" : "Agregar Evento"}</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Title level={3}>{id ? "Editar Evento" : "Agregar Evento"}</Title>

          <Form
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
          >
            {/* Título */}
            <Form.Item
              label="Título"
              name="title"
              rules={[{ required: true, message: "El título es obligatorio" }]}
            >
              <Input placeholder="Título del Evento" />
            </Form.Item>

            {/* Descripción */}
            <Form.Item
              label="Descripción"
              name="description"
              rules={[{ required: true, message: "La descripción es obligatoria" }]}
            >
              <Input.TextArea placeholder="Descripción de la Evento" />
            </Form.Item>

            {/* Tipo */}
            <Form.Item
              label="Tipo"
              name="type"
              rules={[{ required: true, message: "El tipo de Evento es obligatorio" }]}
            >
              <Select placeholder="Selecciona el tipo de Evento" allowClear>
                <Option value="Conferencia">Conferencia</Option>
                <Option value="Reunión">Reunión</Option>
                <Option value="Taller">Taller</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Ubicación/Direccion" 
            name="direction" rules={[{ required: true, message: "La ubicación es obligatoria" }]}>
                <Input placeholder="Lugar del evento" />
            </Form.Item>
             <Row gutter={8}>
            <Col span={12}>
            <Form.Item label="Fecha de inicio" name="startDate"
            rules={[{ required: true, message: "La fecha es obligatoria" }]}>
                <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item label="Hora de inicio" name="startTime"
            rules={[{ required: true, message: "La Hora es obligatoria" }]}>
                <TimePicker style={{ width: "100%" }} format="HH:mm" />
            </Form.Item>
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span={12}>
                <Form.Item label="Fecha de fin" name="endDate"
                rules={[{ required: true, message: "La fecha es obligatoria" }]}>
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item label="Hora de fin" name="endTime"
                rules={[{ required: true, message: "La Hora es obligatoria" }]}>
                    <TimePicker style={{ width: "100%" }} format="HH:mm" />
                </Form.Item>
                </Col>
            </Row>
            {/* Botones */}
            <Form.Item>
              <Row gutter={8}>
                <Col>
                  <Button type="primary" htmlType="submit" disabled={loadingSpin}>
                    {loadingSpin ? <Spin size="small" /> : id ? "Guardar Cambios" : "Guardar Evento"}
                  </Button>
                </Col>
                <Col>
                  <Button onClick={() => navigate(-1)}>Volver</Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
