// 从项目的 utils 工具库中导入 getToken 函数，该函数用于获取存储的令牌（token）
import { getToken } from '@/utils'

// 从 react-router-dom 库中导入 Navigate 组件，用于路由重定向
import { Navigate } from 'react-router-dom'

// 定义一个名为 AuthRoute 的函数组件，接收 children 作为参数（表示需要保护的子组件）
const AuthRoute = ({ children }) => {
  // 调用 getToken 函数获取令牌，并将结果存储在 isToken 变量中
  const isToken = getToken()
  
  // 判断是否存在令牌：如果存在令牌（用户已登录）
  if (isToken) {
    // 渲染并返回子组件（显示受保护的页面内容）
    return <>{children}</>
  } else {
    // 如果不存在令牌（用户未登录），重定向到登录页面，replace 属性表示替换历史记录（避免回退到受保护页面）
    return <Navigate to="/login" replace />
  }
}

// 导出 AuthRoute 组件，供其他文件导入使用
export default AuthRoute