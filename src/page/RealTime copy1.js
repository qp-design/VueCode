import React from 'react';
import Websocket from 'react-websocket';
import './RealTime.css'
import Formate from '../utils/formate'
import Card from './Card'
import transferTime from '../utils/transferTime'
import {Table, Button,Alert} from 'antd';
import $store from '../utils/localStorage'

// import func from '../http/index'
class RealTime extends React.Component {

    constructor(props) {
        super(props);
        this.listData = []
        this.state = {
            description:'',
            show:false,
            ticketsData: {},
            cardData: [],
            dataSource: []
        };
        this.token= '3B14430A5E9446B1BD59FB2CBF21F2D6'
        this.columns = [
            {
                title: '销方代码',
                dataIndex: 'sellercode',
                key: 'sellercode',
                width:150
            },
            {
                title: '不含税金额',
                dataIndex: 'amountwithtax',
                key: 'amountwithtax',
                render:text=><span>¥{ Formate(text) }</span>,
                width:150
            },
            {
                title: '税额',
                dataIndex: 'taxamount',
                key: 'taxamount',
                render:text=><span>¥{ Formate(text) }</span>,
                width:150
            },
            {
                title: '发票类型代码',
                dataIndex: 'invoicetypedesc',
                key: 'invoicetypedesc',
                width:180
            },
            {
                title: '红冲状态',
                dataIndex: 'redstatusdesc',
                key: 'redstatusdesc',
                width:120
            },
            {
                title: '开票日期',
                dataIndex: 'paperdrewdate',
                key: 'paperdrewdate',
                render: text => transferTime(text),
                width:260
            },
            {
                title: '操作',
                dataIndex: 'operate',
                key: 'operate',
                render: (text, record) => (
                    this.state.dataSource.length >= 1
                        ? (
                            <Button onClick={this.operate.bind(this,record)} shape="circle" icon="setting"></Button>

                        ) : null
                ),
                width:98
            }
        ];

    }
    componentWillMount(){
        this.token = $store.get('token')
    }
    componentDidMount() {
        fetch('http://stg-bi.xforceplus.com/pentaho/public/invoice/v1/list',
            {
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'X-Access-Token': this.token
                },
            })
            .then(response => response.json())
            .then(res => res.result)
            .then(res => {
                if(!res){
                    res = []
                }
                console.log('res=========>',res)
                res.map((item,key)=>{
                    item.key = key
                })
                this.setState({dataSource: res})
            }).catch(res => {

        })
    }
    shouldComponentUpdate(nextProps,nextState){
        console.log(nextState)
        return true
    }
    handleData(data) {
        console.log('data=========>',data)
        let flag = data.includes('无效')
        this.setState({
            show:flag
        })
        if(flag){
            this.setState({
                description:data
            })
            return false
        }
        let result = JSON.parse(data);
        this.listData = [
            {
                id: 1,
                title: `含税金额`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                unit: '元',
                value: result.amountwithtax || 0
            },
            {
                id: 2,
                title: `发票数量`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                unit: '张',
                value: result.invoicenum || 0
            },
            {
                id: 3,
                title: `红冲量`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                unit: '张',
                value: result.redstatus || 0
            }
        ];
        this.setState({
            cardData: this.listData
        })

        // console.log(data)
    }
    operate(obj){
        fetch('http://stg-bi.xforceplus.com/pentaho/public/invoice/v1/make', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'X-Access-Token': this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then(response => response.json())
          .then(res => res.result)
          .catch(res => {

            })
    }
    render() {
        let url = 'ws://47.99.38.255/websocket/socketServer?token=' + this.token
        return (
            <div>
                {  this.state.show && <Alert
                    message="Warning"
                    description={this.state.description}
                    type="warning"
                    showIcon
                    />}
                <Card cardData={this.state.cardData}/>

                <Table title={() => '开票'}
                       footer={() => 'BI'}
                       scroll={{ x:1108, y:240 }}
                       size="middle"
                       bordered dataSource={this.state.dataSource} columns={this.columns}>
                    </Table>

                <Websocket url={url}
                onMessage={this.handleData.bind(this)}/>
            </div>
        );
    }
}

export default RealTime;
