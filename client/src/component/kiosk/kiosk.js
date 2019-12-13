import React from 'react';
import './kiosk.css';
import { Button, Container, Row, Col} from 'react-bootstrap';


const api_host = 'http://localhost:4000/api/v1'
const endpoint_route = ''

class Kiosk extends React.Component {
    constructor(){
        super()
        this.state = {
            buttons: []
        }
    }
    componentDidMount(){
        this.refresh()
    }
    refresh = () => {
        this.getButtonData()
    }
    getButtonData = () => {
        fetch(api_host+endpoint_route).then(res => res.json()).then((data) => {
            
            this.setState({buttons : data})
        })
        
    }
    hitDataPoint = async (data,e) => {
        console.log(data);
        
        await fetch(api_host+endpoint_route,{
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data),
            
          }).then((data) => {
            
            //very nice.
        })
    }
    render() {
        return(
            <div>
                <Container>
                <Row>
                 {
                    this.state.buttons.map((data, index) => <Col key={index}>
                       <Button onClick={this.hitDataPoint.bind(this,data)}>{data.label}</Button>
                       </Col>)
                }
                </Row>
                </Container>
            </div>
        )
    }
}

export default Kiosk;
