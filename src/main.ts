import { createApp, } from 'vue'
import './style.css'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';

const app = createApp(App)
import {
    Empty,
    Popconfirm,
    Descriptions,
    Drawer,
    Button,
    message,
    Layout,
    Menu,
    Timeline,
    Collapse,
    notification,
    Result,
    Tooltip,
    Table,
    Tag,
    Rate,
    Tabs,
    Spin,
    Divider,
    Dropdown,
    Radio,
    Avatar,
    Badge,
    Select,
    DatePicker,
    Popover,
    Input,
    Modal,
    Form,
    Upload,
    TreeSelect,
    Card,
    Alert,
    Switch,
    Calendar,
    Row,
    Col,
    Pagination,
    TimePicker,
    Skeleton,
    Checkbox,
    ConfigProvider,
    InputNumber,
    Carousel,
    Progress,
    Transfer,
    AutoComplete,
    List,
    Tree,
    Breadcrumb
} from 'ant-design-vue'

app.use(Breadcrumb)
app.use(Tree)
app.use(Row)
app.use(Col)
app.use(Timeline)
app.use(Button)
app.use(Layout)
app.use(Menu)
app.use(Collapse)
app.use(Table)
app.use(Tag)
app.use(Divider)
app.use(Dropdown)
app.use(Avatar)
app.use(Badge)
app.use(Select)
app.use(DatePicker)
app.use(Popover)
app.use(Input)
app.use(Modal)
app.use(Form)
app.use(Upload)
app.use(TreeSelect)
app.use(Alert)
app.use(Switch)
app.use(Card)
app.use(Tabs)
app.use(Radio)
app.use(Spin)
app.use(Tooltip)
app.use(Rate)
app.use(Pagination)
app.use(TimePicker)
app.use(Checkbox)
app.use(InputNumber)
app.use(Drawer)
app.use(Descriptions)
app.use(Popconfirm)
app.use(Empty)
app.use(Carousel)
app.use(Skeleton)
app.use(Calendar)
app.use(Transfer)
app.use(ConfigProvider)
app.use(Progress)
app.use(AutoComplete)
app.use(List)
app.use(Result)


app.config.globalProperties.$message = message
app.config.globalProperties.$notification = notification
app.config.globalProperties.$error = Modal.error
app.config.globalProperties.$confirm = Modal.confirm



app.mount('#app')
