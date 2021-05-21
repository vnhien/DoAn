import React from 'react'
import $ from 'jquery';
import 'bootstrap';
import { Redirect } from 'react-router'
import api from '../../Api/api'
import '../../css/listroom.css'
import Page500 from '../Page500/Page500';
import Paginator from '../Paginator/paginator'
import AddRoom from './addRoom';
import EditRoom from './editRoom'
const SERVER = 'http://localhost:8080/'
export default class ListRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'editId': '',
            'search': '',
            'serverError': false,
            'unauthorized': false,
            'data': [], // Lưu thông tin danh sách các nhà trọ
            'pagination': {  // Lưu thông tin phân trang
                "total": 0,
                "perPage": 8,
                "to": 0,
                "lastPage": 0,
                "currentPage": 1,
                "from": 0
            },
        }
    }
    
    componentDidMount = async(e)=>{
        $('#alert').on('hidden.bs.modal', (e) => {
            if (e.target.id === 'alert') {
                // this.setState({
                //     'editId': '',
                // })
                this.reloadList();
            }
        })
        // $('#comfirmDeleteModal1').on('hidden.bs.modal', (e) => {
        //     if (e.target.id === 'comfirmDeleteModal1') {
        //         $('#deleteRoomId').html('');
        //     }
        // })
    }

    getData = async (page) => {
        try {
            let result = await api.getlisthouseroom(this.props.houseid, page)
            if (result.status === 200) {
                this.setState({ 'data': result.data.data, 'pagination': result.data.pagination })
            } else if (result.status === 401) {
                this.props.setToken('');
                localStorage.removeItem('accessToken');
                this.setState({ 'unauthorized': true });

            } else {
                console.log(result)
            }
            return result.data.pagination;
        } catch (err) {
            console.log(err)
            this.setState({ 'serverError': true })
        }
    }
    reloadList = async () => {
        await this.getData(this.state.pagination.currentPage)
    }
    changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value
        this.setState({ search: value })
    }
    showAddRoomForm = (e) => {
        $('#addroom').modal({ backdrop: 'static', keyboard: false })
        $('#addroom').modal('show');
    }
    showEditRoomForm = (e) => {
        this.setState({ 'editId': e.target.getAttribute('roomid') }, function(){
            $('#editroom').modal({ backdrop: 'static', keyboard: false })
            $('#editroom').modal('show');
        })

        // $('#editroom').on('hidden.bs.modal', (e) => {
        //     if (e.target.id === 'editroom') {
        //         this.setState({
        //             'editId': '',
        //         })
        //     }
        // })
   
    }
    render() {
        if (this.state.unauthorized === true) {
            return <Redirect to={{ pathname: "/login", state: { from: '/listhouse' } }} />
        }
        let paginator = '';
        if (this.props.houseid) {
            paginator = <Paginator getData={this.getData} pagination={this.state.pagination} />
        }
        var roomList = [];
        var addRoom = ''
        var editRoom = ''
        if (this.props.houseid) {
            addRoom = <AddRoom houseid={this.props.houseid} />
            editRoom = <EditRoom roomid={this.state.editId} houseid={this.props.houseid} />

        }
        roomList.push(
            <button
                key={-1}
                className="btn btn-add btn-success addroom" onClick={this.showAddRoomForm}
            ><i className="fas fa-plus" aria-hidden="true"  ></i>&nbsp; Thêm phòng trọ mới</button>
        )
        if (this.state.data.length === 0) {
            roomList.push(
                <div key={-2}>
                    <h2 style={{ textAlign: 'center', marginTop: '48px' }}>Không có phòng trọ nào</h2>
                </div>
            )
        }
        let body = ''
        if (this.state.serverError === true) {
            body = <Page500></Page500>
        } else {
            body = <div className="modal-body list-room container-fluid">
                <div className="room-search-bar">
                    <p className="search-bar-header" style={{ marginLeft: '16px' }}><b>Tìm kiếm phòng trọ của nhà trọ:</b></p>
                    <form>
                        <div className="row">
                            <div className="col-10 autoComplete" id="autoComplete">
                                <input value={this.state.search} onChange={e => this.changeHandler(e)} id="inp" autoComplete="off" type="text" name="search" placeholder="Nhập tên phòng" className="form-control" autoComplete="off" />
                            </div>
                            <div className="col-2">
                                <button type='submit' className="btn btn-primary text-search"><i className="fas fa-search"></i>
                    &nbsp;Tìm kiếm</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="post-list">
                    {roomList}
                </div>
                {paginator}
            </div>
        }
        this.state.data.forEach((room, index) => {
            roomList.push(
                <div className="short-post row" key={index}>
                    <a href="/>">
                        <img src={SERVER + room.image1} alt="Room Image" style={{ imageResolution: '300dpi' }} height="140px" width="180px" />
                    </a>
                    <div className="short-info">
                        <a href="/detailpost?postid=<?php echo $post->postid ?>">
                            <p className="contest-name">{room.name}</p>
                        </a>
                        <div className="room-owner-option row">
                            <button
                                style={{ marginRight: '8px' }}
                                className="btn btn-detail btn-detailroom"
                            ><i className="fa fa-info-circle" aria-hidden="true"></i>&nbsp; Chi tiết</button>
                            <button
                                className="btn btn-warning btn-edit"
                                style={{ marginRight: '8px' }}
                                onClick={this.showEditRoomForm}
                                roomid={room.roomId}
                            ><i className="fa fa-edit" ></i>&nbsp; Sửa</button>
                            <button
                                className="btn btn-danger btn-del"  onClick={e => this.clickDelete(e)} 
                                value={room.roomId}
                            ><i className="fa fa-trash" aria-hidden="true"></i>&nbsp; Xoá</button>
                        </div>
                        <p><b>Giá:</b> {room.price}</p>
                        <p><b>Diện tích:</b> {room.size + ' m2'} </p>
                        <p><b>Loại phòng:</b> {room.category}</p>
                        <p><b>Trạng thái:</b> <span className={(room.status === "Đang sử dụng") ? "text-warning" : ''}>{room.status}</span></p>
                        <p><b>Mô tả:</b> <span className="room-des">{room.description}</span> </p>
                    </div>
                </div>
            )
        });
        return (
            <div class="modal fade " id='listroom' data-backdrop="static" data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg list-room">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle"> {'Danh sách phòng trọ của ' + this.props.housename}  </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {body}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                        </div>
                    </div>
                </div>
                {addRoom}
                {editRoom}
                <div className="modal fade" id="alert" tabIndex="-2" style={{ marginTop: '20px' }} role="dialog" aria-labelledby="comfirmDeleteModal1Label" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"><b>Thông báo</b></h5>
                                <button type="button" className="close" onClick={this.closeAlert} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" id="alert-content">
                                Thêm phòng trọ thành công
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={this.closeAlert}>Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" style={{marginTop: '220px'}} data-backdrop="static" id="comfirmDeleteModal1" tabIndex="-1" role="dialog" aria-labelledby="comfirmDeleteModal1Label" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"><b>Xác nhận</b></h5>
                                <button type="button" className="close" onClick={this.clickCancel} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" id="listreport">
                                Bạn có chắc chắn muốn xoá phòng trọ này không?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger btn-delete" onClick={this.confirmDelete}>Xoá phòng trọ</button>
                                <button type="button" className="btn btn-secondary" onClick={this.clickCancel}>Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id ='deleteRoomId' style={{display: 'none'}}></div>
            </div>
            
        );
    }
    confirmDelete = async (e)=>{
        let roomId = $('#deleteRoomId').html()
        try {
            let response = await api.deletehouseroom(this.props.houseid, roomId);
            if (response.status === 200) {
                $('#comfirmDeleteModal1').modal('hide')
                $('#alert-content').html('Xoá nhà trọ thành công!')
                $('#alert').modal('show');
            }else if (response.status === 403) {
                $('#comfirmDeleteModal1').modal('hide')
                $('#alert-content').html('Thao tác không hợp lệ!')
                $('#alert').modal('show');
            }
            else {
                $('#comfirmDeleteModal1').modal('hide')
                this.setState({ 'serverError': true })
            }
        } catch (err) {
            console.log(err)
            this.setState({ serverError: true })
        }
    }
    closeAlert = (e)=>{
        $('#alert').modal('hide')
    }
    clickCancel = (e)=>{
        $('#comfirmDeleteModal1').modal('hide')
    }
    clickDelete = async (e) => {
        $('#deleteRoomId').html(e.target.value)
        $('#comfirmDeleteModal1').modal('show');
    }
}