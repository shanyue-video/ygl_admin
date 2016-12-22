import React from 'react';
import { Form, Input, Row, Col, Select } from 'antd';
import { Modal, Button } from 'antd';
const FormItem = Form.Item;

class ReginEditor extends React.Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            visible: false,
            name: null,
            sort: null,
            baiduid: null,
            status: null,
            isopen: null,
            baidupid: null
        };
    }

    componentDidMount() {
        this.setState({
            visible: false
        });
    }

    showModal(e) {
        this.setState({
            visible: true,
        });
    }

    handleOk() {
        this.setState({
            visible: false,
        });
    }

    handleCancel() {
        this.setState({
            visible: false,
        });
    }

    handleSubmit() {
        //console.log(this.props.form.getFieldsValue());
        const r_obj = {
            name: this.state.name,
            sort: this.state.sort,
            baiduid: this.state.baiduid,
            status: this.state.status,
            isopen: this.state.isopen,
            baidupid: this.state.baidupid
        };
        console.log(r_obj);
        this.setState({
            visible: false,
            name: null,
            sort: null,
            baiduid: null,
            status: null,
            isopen: null,
            baidupid: null
        });
    }

    onChange(event) {
        //console.log(event.target.id);
        if (event.target.id == 'name') {
            this.setState({name: event.target.value});
        } else if (event.target.id == 'sort') {
            this.setState({sort: event.target.value});
        } else if (event.target.id == 'baiduid') {
            this.setState({baiduid: event.target.value});
        } else if (event.target.id == 'status') {
            this.setState({status: event.target.value});
        } else if (event.target.id == 'isopen') {
            this.setState({isopen: event.target.value});
        } else if (event.target.id == 'baidupid') {
            this.setState({baidupid: event.target.value});
        }
    }

    render() {
        const editorForm = (
            <Form>
                <Row align='middle' gutter={16}>
                    <Col sm={12}>
                        <FormItem
                            label="名称"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}
                            >
                            <Input id='name' onChange={this.onChange} placeholder="名称" size="default" type="text"
                                   autoComplete="off" value={this.state.name} />
                        </FormItem>
                        <FormItem
                            label="排序"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}
                            >
                            <Input id='sort' onChange={this.onChange}
                                   placeholder="排序" size="default" value={this.state.sort}/>
                        </FormItem>
                        <FormItem
                            label="baiduid"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}
                            >
                            <Input id='baiduid' onChange={this.onChange} placeholder="baiduid" size="default"
                                   type="text" autoComplete="off" value={this.state.baiduid}/>
                        </FormItem>
                    </Col>
                    <Col sm={12}>
                        <FormItem
                            label="状态"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}
                            >
                            <Input id='status' onChange={this.onChange} placeholder="状态" size="default" type="text"
                                   autoComplete="off" value={this.state.status}/>
                        </FormItem>
                        <FormItem
                            label="可转诊"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}
                            >
                            <Input id='isopen' onChange={this.onChange} placeholder="可转诊" size="default" type="text"
                                   autoComplete="off" value={this.state.isopen}/>
                        </FormItem>
                        <FormItem
                            label="baidupid"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}
                            >
                            <Input id='baidupid' onChange={this.onChange} placeholder="baidupid" size="default"
                                   type="text" autoComplete="off" value={this.state.baidupid}/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        );

        return (
            <div>
                <Button type="primary" onClick={this.showModal}>{this.props.text}</Button>
                <Modal style={{ top: 40 }} title={this.props.text} visible={this.state.visible}
                       onCancel={this.handleCancel} onOk={this.handleSubmit}>
                    {editorForm}
                </Modal>
            </div>
        );
    }
}

const r_ReginEditor = Form.create()(ReginEditor);

export default r_ReginEditor;
