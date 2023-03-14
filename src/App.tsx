import {SetStateAction, Suspense, useState, useCallback} from "react"
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { Layout, Breadcrumb, Image } from 'antd'
import MyMenu from './components/menu'
import routes from './routes/index'
import './style/index.scss'
import picture from './assets/pipi.jpeg'

const { Header, Content, Sider } = Layout;
const Routes = () => {
    const element = useRoutes(routes)
    return element
}
const breadCrumbArr: any[] = []
const App = () => {
    const [breadArr, setBredArr] = useState(breadCrumbArr)
    const getBread = useCallback((res: SetStateAction<{ title: string; }[]>) => {
        setBredArr(res)
    }, [])
    return (
        <Router>
            <Layout className="all_content">
                <Header className="header">
                    <img src={require('./assets/home.png')} alt="加载失败" className="home_img"></img>
                    <i className="home_title">LASSETS</i>
                    <div style={{marginLeft:'auto'}}>
                        <Image className="my_picture" src={picture} alt="屁屁失败"></Image>
                        <span>屁屁</span>
                    </div>
                </Header>
                <Layout>
                    <Sider width={256}>
                        <MyMenu bread={getBread}></MyMenu>
                    </Sider>
                    <Layout>
                        <Breadcrumb style={{margin:'16px 20px 0'}} items={breadArr}/>
                        <Content className="content">
                            <Suspense>
                                <Routes></Routes>
                            </Suspense>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </Router>
    )
}

export default App