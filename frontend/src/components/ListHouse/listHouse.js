import React from 'react'
import $ from 'jquery';
import { Redirect } from 'react-router'
import api from '../../Api/api'
import '../../css/listHouse.css'
import Page500 from '../Page500/Page500'
import Paginator from '../Paginator/paginator'
import ListRoom from '../Popup/listroom'
import 'bootstrap';
import AddRoom from '../Popup/addRoom';

const SERVER = 'http://localhost:8080/'
export default class ListHouse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'editId': '',
            'search': '',
            'serverError': false,
            'unauthorized': false,
            'addRoomHouseId': '',
            'selectedHouseId': '', //id phòng trọ được người dùng click xem danh sách
            'selectedHouseName': '', //tên phòng trọ được người dùng click xem danh sách
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
    clickEdit = (e) => {
        let value = e.target.value
        this.setState({ editId: value })
    }
    clickDelete = async (e) => {
        $('#deleteHouseId').html(e.target.value)
        $('#comfirmDeleteModal').modal('show');
        $('#comfirmDeleteModal').on('hidden.bs.modal', (e) => {
            if (e.target.id === 'comfirmDeleteModal') {
                $('#deleteHouseId').html('');
            }
        })
    }
    confirmDelete = async (e)=>{
        let houseId = $('#deleteHouseId').html()
        try {
            let response = await api.deletehouse(houseId);
            if (response.status === 200) {
                $('#comfirmDeleteModal').modal('hide')
                $('#alert-content2').html('Xoá nhà trọ thành công!')
                $('#alert2').modal('show');
            }else if (response.status === 403) {
                $('#comfirmDeleteModal').modal('hide')
                $('#alert-content2').html('Thao tác không hợp lệ!')
                $('#alert2').modal('show');
            }
            else {
                $('#comfirmDeleteModal').modal('hide')
                this.setState({ 'serverError': true })
            }
        } catch (err) {
            console.log(err)
            this.setState({ serverError: true })
        }
    }
    showListRoom = (e) => {
        let houseId = e.target.getAttribute('houseid');
        let houseName = e.target.getAttribute('housename');
        this.setState({
            selectedHouseId: houseId,
            selectedHouseName: houseName
        }, function(){
            $('#listroom').modal('show')
            $('#listroom').on('hidden.bs.modal', (e) => {
                if (e.target.id === 'listroom') {
                    this.setState({
                        selectedHouseId: '',
                        selectedHouseName: ''
                    })
                }
            })
        })
    }
    showAddRoomForm = (e) => {
        let houseId = e.target.getAttribute('houseid');
        this.setState({
            addRoomHouseId: houseId,
        })
        $('#addroom1').modal({ backdrop: 'static', keyboard: false })
        $('#addroom1').modal('show');
        // $('#addroom1').on('hidden.bs.modal', (e) => {
        //     if (e.target.id === 'addroom1') {
        //         this.setState({
        //             addRoomHouseId: '',
        //         })
        //     }
        // })
    }
    reloadPage = async () => {
        await this.getData(this.state.pagination.currentPage)
    }
    changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value
        this.setState({ search: value })
    }
    render() {
        if (this.state.serverError === true) {
            return <Page500 />
        }
        if (this.state.editId !== '') {
            return <Redirect to={{ pathname: "/edithouse", state: { houseId: this.state.editId } }} />
        }
        if (this.state.unauthorized === true) {
            return <Redirect to={{ pathname: "/login", state: { from: '/listhouse' } }} />
        }
        var houseList = [];
        var listRoom = '';
        if(this.state.selectedHouseId){
            listRoom = <ListRoom houseid={this.state.selectedHouseId} housename={this.state.selectedHouseName} />
        }
        houseList.push(
            <a href='/addhouse' key={-1}>
                <button style={{ marginBottom: '-10px', marginTop: '28px' }}
                    className="btn btn-success btn-plus"><i className="fas fa-plus" aria-hidden="true"></i>&nbsp; Thêm nhà trọ mới</button>
            </a>
        )
        if (this.state.data.length === 0) {
            houseList.push(
                <div key={-2}>
                    <h2 style={{ textAlign: 'center', marginTop: '48px' }}>Không nhà trọ nào</h2>
                </div>
            )
        }
        this.state.data.forEach((house) => {
            houseList.push(
                <div className="short-post row" key={house.houseId}>
                    <a>
                        <img src={SERVER + house.image} alt="Main Image" height="160px" width="215px" />
                    </a>
                    <div className="short-info">
                        <a >
                            <p className="contest-name">{house.name}</p>
                        </a>
                        <div className="owner-room-option ">
                            <button style={{ marginRight: '8px' }} onClick={this.showAddRoomForm} houseid={house.houseId} housename={house.name}
                            className="btn btn-success btn-plus"><i className="fas fa-plus" aria-hidden="true"></i>&nbsp; Thêm phòng trọ</button>
                            <button style={{ marginRight: '8px' }} houseid={house.houseId} housename={house.name} onClick={this.showListRoom} className="btn btn-success btn-list"><i className="fas fa-list" aria-hidden="true"></i>&nbsp; Danh sách phòng trọ</button>
                        </div>
                        <div className="owner-option">
                            <button className="btn btn-warning btn-edit" value={house.houseId} onClick={e => this.clickEdit(e)}><i className="fa fa-edit" ></i>&nbsp; Sửa</button>
                            <button value={house.houseId} onClick={e => this.clickDelete(e)} className="btn btn-danger btn-del"><i className="fa fa-trash" aria-hidden="true"></i>&nbsp; Xoá</button>
                        </div>
                        <p><b>Tỉnh/Thành:</b> {house.province}</p>
                        <p><b>Quận/Huyện:</b> {house.district}</p>
                        <p><b>Phường/Xã:</b> {house.ward}</p>
                        <p><b>Địa chỉ:</b> {house.address}</p>
                        <p><b>Trạng thái:</b> <span className={(house.status === "Đã xoá") ? "text-warning" : ''}>{house.status}</span></p>
                        <p><b>Mô tả:</b> {house.description}</p>
                    </div>
                </div>
            )
        });

        return (
            <div className="content-container container-fluid">
                <div className="search-bar">
                    <p className="search-bar-header" style={{ marginLeft: '16px' }}><b>Tìm kiếm nhà trọ:</b></p>
                    <form method="get">
                        <div className="row">
                            <div className="col-8 autoComplete" id="autoComplete">
                                <input value={this.state.search} onChange={e => this.changeHandler(e)} id="inp" autoComplete="off" type="text" name="search" placeholder="Nhập tên nhà trọ" className="form-control" autoComplete="off" />
                            </div>
                            <div className="col-2">
                                <button className="btn btn-primary text-search" type="submit"><i className="fas fa-search"></i>
                                    &nbsp;Tìm kiếm</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal fade" data-backdrop="static" id="comfirmDeleteModal" tabIndex="-1" role="dialog" aria-labelledby="comfirmDeleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"><b>Xác nhận</b></h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" id="listreport">
                                Bạn chắc chắn muốn xoá nhà trọ và tất cả các phòng trọ liên quan đến nhà trọ này không?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger btn-delete" onClick={this.confirmDelete}>Xoá nhà trọ</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="alert2" tabIndex="-2" style={{marginTop : '20px'}} role="dialog" aria-labelledby="comfirmDeleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"><b>Thông báo</b></h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" id="alert-content2">
                                Xoá nhà trọ thành công!
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="alert1" tabIndex="-2" style={{marginTop : '20px'}} role="dialog" aria-labelledby="comfirmDeleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"><b>Thông báo</b></h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" id="alert-content1">
                                Thêm phòng trọ thành công
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="post-list">
                    {houseList}
                </div>
                <div id ='deleteHouseId' style={{display: 'none'}}></div>
                {listRoom}
                <Paginator pagination={this.state.pagination} getData={this.getData} />
                <AddRoom id='addroom1' houseid={this.state.addRoomHouseId} />
            </div >

        );

    }
    componentDidMount = async () => {
        $('#alert2').on('hidden.bs.modal', (e) => {
            if (e.target.id === 'alert2') {
                // debugger
                $('#deleteHouseId').html('')
                this.reloadPage();
            }
        })
        if (this.props.location.state && this.props.location.state.from === 'addhouse') {
            window.location.replace('#head')
            $('#alert-content1').html('Thêm nhà trọ thành công!')
            $('#alert1').modal('show')
        }
        if (this.props.location.state && this.props.location.state.from === 'edithouse') {
            window.location.replace('#head')
            $('#alert-content1').html('Cập nhật nhà trọ thành công!')
            $('#alert1').modal('show')
        }
    }
    getData = async (page) => {
        try {
            let result = await api.getlisthouse(page)
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
}