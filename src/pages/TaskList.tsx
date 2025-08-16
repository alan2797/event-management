import { useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  List,
  Checkbox,
  Tabs,
  Typography,
  Tag,
  Tooltip,
  Skeleton,
  Badge,
  Modal,
  Input,
  Space,
} from "antd";
import {
    CalendarOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  FileTextOutlined,
  FlagOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useTasks } from "../hooks/useTasks";
import type { Task } from "../types/Task";
import TaskChart from "../components/TaskChart";
import moment from "moment";
const { confirm } = Modal;
const { Text, Paragraph } = Typography;

export default function TaskList() {
  const { tasks, toggleTask, deleteTask, fetchTasks, loading } = useTasks();
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const handleToggle = (task: Task) => {
    toggleTask(task.id);
  };

  const showDetail = (task: Task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const renderTaskItem = (task: Task) => (
    <List.Item
      key={task.id}
      actions={[
        <Tooltip key="view" title="Ver detalle">
                <Button
                  type="text"
                  icon={<EyeOutlined />}
                  onClick={() => showDetail(task)}
                />
        </Tooltip>,
        <Tooltip key="edit" title="Editar Evento">
          <Button
            key="edit"
            type="text"
            icon={<EditOutlined />}
            href={`/edit/${task.id}`}
          />
        </Tooltip>,
        <Tooltip key="delete" title="Eliminar Evento">
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(task.id)}
          />
        </Tooltip>,
      ]}
    >
      <Tooltip
        title={
          task.completed ? "Marcar como evento pendiente" : "Marcar como evento realizado"
        }
        key="toggle"
      >
        <Checkbox
          checked={task.completed}
          onChange={() => handleToggle(task)}
          style={{ marginRight: 8 }}
        />
      </Tooltip>

      <div style={{ flex: 1 }}>
      <Text strong>{task.title}</Text>
      <Paragraph style={{ margin: 4 }}>{task.description}</Paragraph>


      {/* Fechas */}
      <Paragraph style={{ margin: 4, fontSize: 12, color: "#555" }}>
        {`${moment(task.startDate).format("DD/MM/YYYY")} ${moment(task.startTime).format("HH:mm")} - ${moment(task.endDate).format("DD/MM/YYYY")} ${moment(task.endTime).format("HH:mm")}`}
      </Paragraph>

      {/* Ubicación */}
      {task.direction && (
        <Paragraph style={{ margin: 4, fontSize: 12, color: "#555" }}>
          📍 {task.direction}
        </Paragraph>
      )}
      
      {/* Tipo de evento */}
      {task.type && <Tag color="blue">{task.type}</Tag>}
    </div>
    </List.Item>
  );

  const showDeleteConfirm = (taskId: number) => {
    confirm({
      title: "¿Estás seguro de eliminar esta Evento?",
      icon: <ExclamationCircleOutlined />,
      content: "Esta acción no se puede deshacer.",
      okText: "Sí, eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteTask(taskId); // Aquí llamas tu hook para eliminar
      },
      onCancel() {
        // Opcional: algo si cancela
      },
    });
  };

  const filterTasks = (tasks: Task[]) => {
    return tasks
      .filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((task) => (typeFilter ? task.type === typeFilter : true));
  };

  const filteredPendingTasks = filterTasks(pendingTasks);
  const filteredCompletedTasks = filterTasks(completedTasks);

  return (
    <>
    <Row gutter={[16, 16]} justify="center">
      <Col xs={24} sm={20} md={16} lg={12} xl={10}>
        <Card>
          <Row gutter={8} align="middle">
            <Col flex="auto">
              <h1>Lista de Eventos</h1>
            </Col>
            <Col>
              <Tooltip title="Refrescar">
                <Button icon={<ReloadOutlined />} onClick={fetchTasks}></Button>
              </Tooltip>
            </Col>
            <Col>
              <Button type="primary" icon={<PlusOutlined />} href="/add">
                Crear Evento
              </Button>
            </Col>
          </Row>
          <Col span={24}>
            <Card style={{ marginBottom: 16, width: "100%", marginTop: 10 }}>
              <TaskChart tasks={tasks} />
            </Card>
          </Col>
          <Col span={24}>
            <Text strong>Filtros: </Text>
          </Col>
          <Row gutter={8} style={{ marginBottom: 16 }}>
          
            <Col flex="auto">
              <Input
                placeholder="Buscar eventos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                allowClear
              />
            </Col>
          </Row>
          <Row gutter={[8, 8]} style={{ marginBottom: 16 }}>
            {["Conferencia", "Reunión", "Taller"].map((type) => (
              <Col key={type}>
                <Tag
                  color={typeFilter === type ? "blue" : "default"}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setTypeFilter(typeFilter === type ? null : type)
                  }
                >
                  {type}
                </Tag>
              </Col>
            ))}
          </Row>
          {loading ? (
            <List
              bordered
              dataSource={[1, 2, 3, 4, 5]} // placeholders
              renderItem={() => (
                <List.Item
                  actions={[
                    <Skeleton.Avatar
                      key="edit"
                      active
                      shape="circle"
                      size="small"
                    />,
                    <Skeleton.Avatar
                      key="delete"
                      active
                      shape="circle"
                      size="small"
                    />,
                  ]}
                >
                  <Skeleton.Input
                    style={{ width: 200, marginBottom: 8 }}
                    active
                    size="small"
                  />
                  <Skeleton.Input
                    style={{ width: "60%" }}
                    active
                    size="small"
                  />
                </List.Item>
              )}
            />
          ) : (
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              style={{ marginTop: 20 }}
            >
              <Tabs.TabPane
                tab={
                  <Badge count={filteredPendingTasks.length}>Pendientes</Badge>
                }
                key="pending"
              >
                <List
                  bordered
                  dataSource={filteredPendingTasks}
                  renderItem={renderTaskItem}
                  locale={{ emptyText: "No hay Eventos pendientes" }}
                />
              </Tabs.TabPane>

              <Tabs.TabPane
                tab={
                  <Badge count={filteredCompletedTasks.length}>
                    Realizados
                  </Badge>
                }
                key="completed"
              >
                <List
                  bordered
                  dataSource={filteredCompletedTasks}
                  renderItem={renderTaskItem}
                  locale={{ emptyText: "No hay Eventos realizados" }}
                />
              </Tabs.TabPane>
            </Tabs>
          )}
        </Card>
      </Col>
    </Row>
     <Modal
      title={<Text strong style={{ fontSize: 22, color: "#1890ff" }}>Detalle de Evento</Text>}
      open={modalVisible}
      onCancel={() => setModalVisible(false)}
      footer={null}
    >
      {selectedTask && (
        <Space direction="vertical" size="middle" style={{ width: "100%", padding:10 }}>
          <Row align="middle" gutter={8}>
            <Col>
              <FlagOutlined style={{ color: "#1890ff", fontSize: 18 }} />
            </Col>
            <Col>
              <Text strong>Titulo:</Text> {selectedTask.title}
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Paragraph>
                <FileTextOutlined style={{ marginRight: 6, color: "#52c41a" }} />
                <Text strong>Descripción:</Text> {selectedTask.description}
              </Paragraph>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Paragraph>
                <EnvironmentOutlined style={{ marginRight: 6, color: "#fa8c16" }} />
                <Text strong>Ubicación/Dirección:</Text> {selectedTask.direction}
              </Paragraph>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Paragraph>
                <Text strong>Tipo: </Text>
                <Tag color={selectedTask.type === "Proyecto" ? "blue" : selectedTask.type === "Informe" ? "green" : "purple"}>
                  {selectedTask.type}
                </Tag>
              </Paragraph>
            </Col>
          </Row>

          <Row gutter={8}>
            <Col>
              <CalendarOutlined style={{ color: "#f5222d" }} />
            </Col>
            <Col>
              <ClockCircleOutlined style={{ marginRight: 6 }} />
              <Text>
                {moment(selectedTask.startDate).format("DD/MM/YYYY")} {moment(selectedTask.startTime).format("HH:mm")} - {moment(selectedTask.endDate).format("DD/MM/YYYY") } {moment(selectedTask.endTime).format("HH:mm")}
              </Text>
            </Col>
          </Row>
        </Space>
      )}
    </Modal>
    </>
  );
}
