import React from 'react';
import './kiosk.css';
import { Button, Container, Row, Col} from 'react-bootstrap';
import {Pie, HorizontalBar} from 'react-chartjs-2';

const api_host = 'http://localhost:4000/api/v1'
const endpoint_route = ''

class Kiosk extends React.Component {
    constructor(){
        super()
        this.state = {
            labels: [],
            datasets:[]
        }
    }
    ws = new WebSocket('ws://localhost:8080/')
    componentDidMount(){

        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
        }

        this.ws.onmessage = evt => {
            // listen to data sent from the websocket server
            
            const data = JSON.parse(evt.data)
            console.log(data);
            
            
            let labels = []
            let datapoints = []
            for(var i in data){
                
                labels[i] = data[i].label
                datapoints[i] = data[i].hits
            }
            this.setState({
                labels: labels,
                datasets: [{
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: datapoints
                }]
            })
        }

        this.ws.onclose = () => {
        console.log('disconnected')
        // automatically try to reconnect on connection loss

        }
    
        this.refresh()

        
    }
    refresh = () => {
    }
    render() {
        return(
            <div>
                {this.state.currentMessage}
                <HorizontalBar data={this.state} />
                <Pie data={this.state} />
            </div>
        )
    }
}

export default Kiosk;
