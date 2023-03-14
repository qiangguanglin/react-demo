import React, {useState} from "react"
import { Button, Col, Form, Input, Row, Select, message } from 'antd';
import {PlusOutlined, LineOutlined} from '@ant-design/icons'
import style from './index.module.scss'

const options = [
    {value: '1',label: '黄金糕'}, 
    {value: '2',label: '双皮奶'}, 
    {value: '3',label: '蚵仔煎'}, 
    {value: '4',label: '龙须面'}, 
    {value: '5',label: '北京烤鸭'}
]
const formTailLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 4, offset: 0 },
};
const MyForm:React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const [ruleForm, setRuleForm] = useState([getDefaultForm(new Date().getTime())])
    let formRef:{[key:string]: any} = {}
    const rules = {
        name: [{required: true, message: '名称必填'}],
        extraInfo: [{required: true, message: '备注必填'}],
    }

    function getDefaultExtra(baseKey:number) {
        return {
            value:'', 
            key: `${baseKey}-extra`
        }
    }
    function getDefaultForm2(baseKey:number) {
        return {
            name: '', 
            type:'', 
            key: `${baseKey}-form2`, 
            extraInfo: [getDefaultExtra(baseKey)]
        }
    }
    function getDefaultForm(baseKey:number) {
        return {
            ruleForm1: {name: '', type: '', key: `${baseKey}-form`},
            ruleForm2: [getDefaultForm2(baseKey)],
            key: `${baseKey}-form1`
        }
    }
    function deleteForm(item: any[], key: any) {
        const index = item.findIndex(v => v.key === key)
        if(index !== -1) {
            item.splice(index, 1)
        }
        setRuleForm([...ruleForm])
    }
    const addForm = (item: any[], type: string) => {
        const baseKey = new Date().getTime()
        const addMethod = {
            extra: getDefaultExtra,
            form: getDefaultForm,
            form2: getDefaultForm2 
        }[type]
        addMethod && item.push(addMethod(baseKey))
        setRuleForm([...ruleForm])
    }
    const reset = () => {
        setRuleForm([getDefaultForm(new Date().getTime())])
    }
    function checkForm() {
        const checkPromise = Object.keys(formRef).map(v =>formRef[v].validateFields())
        return checkPromise
    }
    const confirm = () => {
        const checkPromise = checkForm()
        Promise.all(checkPromise).then((resArr) => {
            if(resArr.every(v => v)) {
                messageApi.success('提交成功')
            }
        }).catch((e) => {
            messageApi.error('提交失败')
            console.log('验证失败', e);
        })
    }
    const handleInput = (e:any, item:any, value:string) => {
        item[value] = e.target.value
    }
    const handleChange = (val:string, item:any, value:string) => {
        item[value] = val;
    }
    const MyForm:React.FC = () => {
        return (
            <>
                {ruleForm.map((form, i) => {
                    return (
                        <div className={style.all_content} key={form.key}>
                            <Button
                            className={style.delete_class_form}
                            disabled={ruleForm.length===1}
                            type='link'
                            onClick={() => deleteForm(ruleForm, form.key)}
                            >删除</Button>
                            <div className={style.form1_content}>
                                <Form
                                {...formTailLayout}
                                ref={(dom) => Object.assign(formRef, {[form.key]:dom})}
                                initialValues={form.ruleForm1}
                                >
                                    <Form.Item name={'name'} label="清单名称" rules={rules.name}>
                                        <Input value={form.ruleForm1.name} onInput={(e) => handleInput(e, form.ruleForm1, 'name')}></Input>
                                    </Form.Item>
                                    <Form.Item name={'type'} label="清单类型">
                                        <Select
                                        style={{ width: 120 }}
                                        options={options}
                                        onChange={(v) => handleChange(v, form.ruleForm1, 'type')}
                                        >
                                        </Select>
                                    </Form.Item>
                                </Form>
                            </div>
                            {form.ruleForm2.map((item, j: number) => {
                                return (
                                    <div key={item.key} className={style.form2_content}>
                                        <Form
                                        {...formTailLayout}
                                        initialValues={item}
                                        ref={(dom) => {
                                            Object.assign(formRef, {[item.key]:dom})
                                        }}
                                        >
                                            <Button
                                            className={style.delete_class_form2}
                                            disabled={form.ruleForm2.length===1}
                                            type='link'
                                            onClick={() => deleteForm(form.ruleForm2, item.key)}
                                            >删除</Button>
                                            <Form.Item name={'name'} label={`活动名称${j+1}`}>
                                                <Input value={item.name} onInput={(e) => handleInput(e, item, 'name')}></Input>
                                            </Form.Item>
                                            <Form.Item name={'type'} label="活动类型">
                                                <Select
                                                style={{ width: 120 }}
                                                options={options}
                                                onChange={(v) => handleChange(v, item,'type')}
                                                >
                                                </Select>
                                            </Form.Item>
                                            {item.extraInfo.map((extra, k) => {
                                                return (
                                                    <div key={extra.key}>
                                                        <Row>
                                                            <Col span={6}>
                                                                <Form.Item labelCol={{span: 8}} wrapperCol={{span: 16}} label={`备注${k+1}`} name={['extraInfo', k, 'value']} rules={rules.extraInfo}>
                                                                    <Input value={extra.value} onInput={(e) => handleInput(e, extra, 'value')}></Input>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col span={8}>
                                                                {item.extraInfo.length !== 1 && 
                                                                    <Button type="text" icon={<LineOutlined />} onClick={() => deleteForm(item.extraInfo, extra.key)}></Button>}
                                                                {k === item.extraInfo.length-1 && 
                                                                    <Button type="text" icon={<PlusOutlined />} onClick={() => addForm(item.extraInfo, 'extra')}></Button>}
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                )
                                            })}
                                        </Form>
                                    </div>
                                )
                            })}
                            <Button block icon={<PlusOutlined />} onClick={() => addForm(form.ruleForm2, 'form2', )}></Button>
                        </div>
                    )
                })}
                <Button block icon={<PlusOutlined />} onClick={() => addForm(ruleForm, 'form')}></Button>
            </>
        )
    }
    return (
        <div className={style.content_style}>
            {contextHolder}
            <MyForm></MyForm>
            <div className={style.final_button}>
                <Button type="primary" style={{marginRight:'10px'}} onClick={reset}>重置</Button>
                <Button type="primary" onClick={confirm}>确定</Button>

            </div>
        </div>
    )
}

export default MyForm