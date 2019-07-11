import React from 'react'
import Formate from '../utils/formate'
import './Card.less'
const Avatar = (props) => (
    <div className='imgContent'><img alt={props.title} src={props.url} width={40}/></div>
)
const Comment = (props)=>(
    <div className='comment'>
        <h1><span>{props.unit}</span>{props.title}</h1>
        <p>{Formate(props.value)}</p>
    </div>
)
class Card extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tickets: {},
        };
    };
    // props 更新
    componentWillReceiveProps(nextProps){
        console.log('nextProps',nextProps)
    }
    componentWillMount(){
    }
    componentDidMount(){
        console.log('componentDidMount')
    }
    render() {
        console.log('render',this.props)
        return (
            <div className='fixCard' alt={this.state.tickets}>
                {
                    this.props.cardData.map(item => (
                        <div key={item.id}>
                            <Avatar url={item.avatar}/>
                            <Comment {...item}></Comment>
                        </div>
                    ))
                }

            </div>
        );
    }
}
export default Card
