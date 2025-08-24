import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { http } from '@/utils'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import { useState, useEffect } from 'react'

const { Option } = Select

const Publish = () => {
  // 频道列表
  const [channels, setChannels] = useState([])

  // 调用接口获取频道列表
  useEffect(() => {
    async function fetchChannels() {
      try {
        const res = await http.get('/channels')
        setChannels(res.data.channels)
      } catch (error) {
        message.error('获取频道列表失败')
        console.error(error)
      }
    }
    fetchChannels()
  }, [])

  // 发布文章
  const onFinish = async (formValue) => {
    try {
      const { channel_id, content, title } = formValue
      const params = {
        channel_id,
        content,
        title,
        cover: {
          type: 0,
          images: []
        }
      }
      await http.post('/mp/articles?draft=false', params)
      console.log('发布的数据为',params)
      message.success('发布文章成功')
    } catch (error) {
      message.error('发布文章失败')
      console.error(error)
    }
  }

  const [imageList, setImageList] = useState([])
  // 上传图片
  const onUploadChange = (info) => {
    console.log(info)
    setImageList(info.fileList)
  }

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '发布文章' },
          ]} />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>

          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 200 }}>
              {channels.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            <Upload
              // listType 决定了上传列表的展示方式
              // showUploadList 控制是否展示上传列表
              listType="picture-card"
              showUploadList
              // 上传的字段 根据接口文档 的需求 
              name='image'
              // 上传的接口接口
              action={'http://geek.itheima.net/v1_0/upload'}
              onChange={onUploadChange}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>
          </Form.Item>
  
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
