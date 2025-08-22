import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchUserInfo } from '@/store/modules/user'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { clearUserInfo } from '@/store/modules/user'

const { Header, Sider } = Layout

const items = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '文章管理',
    key: '/article',
    icon: <DiffOutlined />,
  },
  {
    label: '创建文章',
    key: '/publish',
    icon: <EditOutlined />,
  },
]

const GeekLayout = () => {
    const navigate = useNavigate()
    const menuClick = (route) => {
    navigate(route.key)
  }

   const dispatch = useDispatch()
   const name = useSelector(state => state.user.userInfo.name)
   useEffect(() => {
     dispatch(fetchUserInfo())
   }, [dispatch])


  // 反向高亮
  // 1、获取当前路由路径
  const location = useLocation()
  const selectedKey = location.pathname

  // 退出登录
  const loginOut = () => {
    dispatch(clearUserInfo())
    navigate('/login')
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={loginOut}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
                <Menu
                  mode="inline"
                  theme="dark"
                  // 控制组件的选中状态
                  selectedKeys={selectedKey}
                  items={items}
                  style={{ height: '100%', borderRight: 0 }}
                  onClick={menuClick}
                /> 
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout