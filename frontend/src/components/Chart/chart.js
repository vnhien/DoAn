
import { Line } from 'react-chartjs-2';
import { Pie } from "react-chartjs-2";
import '../../css/dashboard.css';
import React from 'react'
import api from '../../Api/api'
import Page500 from '../Page500/Page500'
const SERVER = 'http://localhost:8080/'


export default class LineChart extends React.Component {
    constructor(props) {
        super(props);

        //this.chartRef = React.createRef();
        this.state = {
            'serverError': false,
            'number_user_': 0,
            'number_post_': 0,
            'number_report': 0,
            'number_report_unprocessed': 0,
            'number_post_reported': 0,
            'number_user': {
                
            },
            'number_room': {
                
            },
            'report': {

            },
            'pie_report': {

            }


        }


    }

    componentDidMount = async () => {
        document.title = "Dashboard"
        let numberuser = await api.getnumberuser()
        let x = 0;

        for (const [key, value] of Object.entries(numberuser.data.numberuser[0])) {
            console.log(`${key}: ${value}`);
            x = value;
        }
        this.setState({ 'number_user_': x })

        let numberroom = await api.getnumberroom()

        for (const [key, value] of Object.entries(numberroom.data.numberroom[0])) {
            console.log(`${key}: ${value}`);
            x = value;
        }
        this.setState({ 'number_post_': x })

        let numberreport = await api.getnumberreport()

        for (const [key, value] of Object.entries(numberreport.data.numberreport[0])) {
            console.log(`${key}: ${value}`);
            x = value;
        }
        this.setState({ 'number_report': x })

        let numberreport_ = await api.getnumberreport_()

        for (const [key, value] of Object.entries(numberreport_.data.numberreport_[0])) {
            console.log(`${key}: ${value}`);
            x = value;
        }
        this.setState({ 'number_report_unprocessed': x })

        let numberpostreported = await api.getnumberpostreported()

        for (const [key, value] of Object.entries(numberpostreported.data.numberpostreported[0])) {
            console.log(`${key}: ${value}`);
            x = value;
        }
        this.setState({ 'number_post_reported': x })
        this.setState({
            'pie_report': {
                labels: ["báo cáo chưa xử lý", "báo cáo đã xử lý"],
                datasets: [
                    {
                        backgroundColor: [


                            "#00A6B4",
                            "#6800B4",
                        ],
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [this.state.number_report_unprocessed, this.state.number_report - this.state.number_report_unprocessed],

                    }
                ]

            }


        })
        let y = [];
        let z = [];
        let statisticreport = await api.getstatisticreport()
        statisticreport.data.statisticreport.map((a)=>{
            y.push('thang '+a["date"].toString());
            z.push(a["numberreport"]);
        })
        this.setState({
            'report': {
                labels: y,
                datasets: [
                    {
                        label: 'number of rp:',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data:z
                    }
                ]
            }
        })
        let u =[]
        let v = []
        let statisticuser = await api.getstatisticuser()
        statisticuser.data.statisticuser.map((a)=>{
            u.push('thang '+a["date"].toString());
            v.push(a["numberuser"]);
        })
        this.setState({
            'number_user': {
                labels: u,
                datasets: [
                    {
                        label: 'số lượng user',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data:v
                    }
                ]
            }
        })

        y = []
        z = []
        let statisticroom = await api.getstatisticroom()
        statisticroom.data.statisticroom.map((a)=>{
            y.push('thang '+a["date"].toString());
            z.push(a["numberroom"]);
        })
        this.setState({
            'number_room': {
                labels: y,
                datasets: [
                    {
                        label: 'số lượng phòng trọ:',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data:z
                    }
                ]
            }
        })


    }
    render() {
        var arechart = <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                    Thống kê số lượng user:
                    </h6>
            </div>
            <div className="card-body">


                <Line ref="chart" data={this.state.number_user} />


            </div>
        </div>

        var barchart = <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                    Thống kê số lượng bài đăng:
                </h6>
            </div>
            <div className="card-body">


                <Line ref="chart" data={this.state.number_room} />
            </div>
        </div>

        var donutchart = <div className="card shadow mb-4">

            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Thống kê số lượng báo cáo:</h6>
            </div>

            <div className="card-body">

                <Line ref="chart" data={this.state.report} />

            </div>
        </div>
        var pie_chart = <div className="card shadow mb-4">

            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Thống kê số lượng bài đăng bị báo cáo:</h6>
            </div>

            <div className="card-body">

                <Pie
                    data={this.state.pie_report}


                />

            </div>
        </div>
        return (

            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <div className="container-fluid">
                        <div>
                            <h5>Tổng quan:</h5>
                            <div className="row">
                                <div className="col-xl-2 col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Số user:</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.number_user_}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-xl-2 col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Số bài đăng:</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.number_post_}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-xl-2 col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Số báo cáo:</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.number_report}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2" >
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Số báo cáo chưa được xử lý:</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.number_report_unprocessed}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Số bài đăng vi phạm:</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.number_post_reported}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-8 col-lg-6">
                                {arechart}



                            </div>

                            <div className="col-xl-4 col-lg-6">
                                {pie_chart}

                            </div>

                        </div>
                        <div className="row">
                            <div className="col-xl-6 col-lg-6">
                                {barchart}

                            </div>

                            <div className="col-xl-6 col-lg-6">
                                {donutchart}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

