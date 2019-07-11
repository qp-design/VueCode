import React from 'react'
import './warning.less'
import Websocket from 'react-websocket';
import {Card, Alert, Avatar,Table} from 'antd';
import Formate from "../utils/formate";
import $store from "../utils/localStorage";
import $http from "../http/http";

class Warning extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isUpdated:false,
            tableTitle:'疑似重复开票',
            type:'1',
            description: '',
            show: false,
            ticketsData: [],
            cardData: [],
            amountsData: [],
            tabColumns : [
            {
                id: 'maybeRepeat',
                title: '疑似重复开票',
                src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: 0
            },
            {
                id: 'repeat',
                title: '重复开票',
                src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: 0
            },
            ],

        };
        this.token='';
        this.flag='1';
        this.columns = [
            {
                title: '结算单号',
                dataIndex: 'settlementNo',
                key: 'settlementNo',
                width: 300
            },
            {
                title: '销方集团代码',
                dataIndex: 'sellerTenantCode',
                key: 'sellerTenantCode',
                width: 150

            },
            {
                title: '销方公司',
                dataIndex: 'sellerName',
                key: 'sellerName',
                width: 150

            },
            {
                title: '销方税号',
                dataIndex: 'sellerTaxNo',
                key: 'sellerTaxNo',
                width: 250

            },
            {
                title: '购方集团代码',
                dataIndex: 'purchaserTenantCode',
                key: 'purchaserTenantCode',
                width: 150

            },
            {
                title: '购方公司',
                dataIndex: 'purchaserName',
                key: 'purchaserName',
                width: 150

            },
            {
                title: '购方税号',
                dataIndex: 'purchaserTaxNo',
                key: 'purchaserTaxNo',
                width: 250

            },
            {
                title: '结算单含税金额',
                dataIndex: 'settlementAmountWithTax',
                key: 'settlementAmountWithTax',
                render:text=><span>¥{ Formate(text) }</span>,
                width: 150

            },
            {
                title: '含税金额',
                dataIndex: 'amountWithTax',
                key: 'amountWithTax',
                render:text=><span>¥{ Formate(text) }</span>,
            }
        ];

    };
    componentWillMount(){
        this.token = $store.get('token')
    }
    componentDidMount() {
        this.fetchHandler()
    }
    shouldComponentUpdate(nextProps,nextState){
        console.log('是否更新',nextState.isUpdated)
        return nextState.isUpdated
    }
    componentWillUpdate(props,state){
        console.log('更新中++++++++++++++++++++++',);
    }
    /**
     * 渲染列表数据
     */
    fetchHandler(params=1){
        $http._init('BiApi','repeatList',{type:params}).then((res,key)=>{
            // console.log(103,res)
            res.forEach((item,key)=>{
                item.key = key
            })

            if(this.state.type === this.flag){
                this.setState({
                    amountsData:res
                })
            }
            else{
                this.setState({
                    ticketsData:res
                })
            }
            this.setState({
                isUpdated:true
            })
        })
    }

    /**
     * websocket Data
     */
    handleData(data){
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
        // {"maybeRepeat":218,"repeat":34}
        let tabColumns = [
                {
                    id: 'maybeRepeat',
                    title: '疑似重复开票',
                    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    description: result.maybeRepeat
                },
                {
                    id: 'repeat',
                    title: '重复开票',
                    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    description: result.repeat
                }]
        this.setState({
            tabColumns:tabColumns
        })
        this.fetchHandler()
    }
    /**
     * 切换开票数据
     */
    switchHandler(e){

        let type = e.id === "maybeRepeat" ? '1' : '0'
        // this.setState({
        //     // type,
        //     tableTitle:e.title
        // })
        this.setState({type,tableTitle:e.title,isUpdated:false}, ()=> {
            this.fetchHandler(this.state.type)
        });
    }
    render() {
        const {Meta} = Card;
        let dataSource = this.state.type === this.flag ? this.state.amountsData : this.state.ticketsData;
        let i = window.location.host
        console.log(i)
        if(i.includes('localhost')){
            i = 'stg-bi.xforceplus.com'
        }
        let url = `wss://${i}/pentaho/public/websocket/socketServer?type=repreat_notify&token=${this.token}`
        let tabData = this.state.tabColumns
        return (
            <div>
                { this.state.show && <Alert
                    message="Warning"
                    description={this.state.description}
                    type="warning"
                    showIcon
                />}
                <div className='tabStyle'>
                    {
                        tabData.map((item,key)=>
                            <Card className={this.state.type !== key ? 'actived' : ''}
                                style={{width: '100%'}} key={item.id}>
                                    <Meta
                                        onClick={this.switchHandler.bind(this,item)}
                                        avatar={<Avatar
                                            src={item.src}/>}
                                        title={item.title}
                                        description={item.description !== 0 ? item.description : '0'}/>

                            </Card>
                        )
                    }
                </div>
                <Table title={() => this.state.tableTitle}
                       footer={() => ''}
                       scroll={{x:1700,y:window.innerHeight - 400}}
                       size="middle"
                       pagination={{ pageSize: 20 }}
                       bordered dataSource={dataSource} columns={this.columns}>
                </Table>
                <Websocket url={url}
                           onMessage={this.handleData.bind(this)}/>
            </div>
        )
    }
}

export default Warning
