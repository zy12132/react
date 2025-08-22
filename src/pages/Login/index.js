import './index.scss'
import { Card, Form, Input, Button } from 'antd'
import logo from '@/assets/logo.png'
import { message } from 'antd'
// import useStore from '@/store'
import { fetchLogin } from '@/store/modules/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async formValue => {
          await dispatch(fetchLogin(formValue))
          // 延迟跳转
        setTimeout(() => {
           navigate('/');
         }, 1000);
          message.success('登录成功')
       }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单  
        validateTrigger={['onBlur']} 是表单验证中常用的配置项，用于指定触发表单验证的时机
        ['onBlur'] 表示只有当表单元素失去焦点时才会触发验证逻辑。*/}
        <Form validateTrigger={['onBlur']}
          onFinish={onFinish}>
          <Form.Item
           name='mobile'
           rules={[
             {
               required: true,
               message: '请输入手机号'
             },
             {
               pattern: /^1[3-9]\d{9}$/,
               message: '请输入正确的手机号'
             }
           ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
             <Form.Item
              name="code"
              rules={[
                { required: true, message: '请输入验证码' },
              ]}
            >
            <Input size="large" placeholder="请输入验证码" maxLength={6} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login