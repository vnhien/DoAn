import '../../css/home.css'
import React from "react"
import api from '../../Api/api'
import Page500 from '../Page500/Page500'
import Search from '../Search/Search.js'
import PostComponent from './PostComponent.js'
import { waitForElementToBeRemoved } from '@testing-library/dom'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "serverError": false,
            'errorCount': 0,
            "rooms": [],
            'pagination': {  // Lưu thông tin phân trang
                "total": 0,
                "perPage": 8,
                "to": 0,
                "lastPage": 0,
                "currentPage": 1,
                "from": 0,
                "to":0
            },
            price: {
                'value': 0,
                'label': "Tất cả khoảng giá"
            },
            size : {
                'value': 0,
                'label': "Tất cả"
            },
            category: {
                'value': 0,
                'label': "Tất cả"
            },
            ordertype: {
                'value': 0,
                'label': "Giá"
            },
            order : {
                'value': 0,
                'label': "tăng dần"
            },
            priceval: ['Tất cả khoảng giá','Dưới 1.000.000','Từ 1.000.000 - 1.500.000','Từ 1.500.000 - 2.000.000','Từ 2.000.000 - 3.000.000', 'Từ 3.000.000 - 6.000.000','Trên 6.000.000'],
            sizeval: ['Tất cả','Dưới 1 m2','10 - 20 m2','20 - 30 m2','30 - 60 m2','Trên 60 m2'],
            cateval: ['Tất cả','Phòng cho thuê','Homestay','Ở ghép','Nguyên căn'],
            ordertypeval: ['Giá','Thời gian đăng','Diện tích'],
            orderval: ['tăng dần','Giảm dần'],
            province: {
                'value': 'all',
                'label': 'Tất cả'
            },
            district: {
                'value': 'all',
                'label': 'Tất cả'
            },
            ward: {
                'value': 'all',
                'label': 'Tất cả'
            },
            serverError: false,
            listProvince: {
                data:[]
            },
            listDistrict: {
                data: [{
                    'value': 'all',
                    'label': 'Tất cả'
                }]
            },
            listWard: {
                data:[
                {
                    'value': 'all',
                    'label': 'Tất cả'
                }]
            }

            }    
    }
    changeHandler(e) {
        let name = e.target.name;
        let value = e.target.value;
        let temp = this.state.formData;
        temp[name] = value;
        this.setState({ 'formData': temp })
        
    }

    componentDidMount = async () => {
        document.title = "Trọ Đẹp - Home"
        try {
            let result = api.getlistroom({
                'page': this.state.pagination.currentPage,
                'price': this.state.price.value,
                'size': this.state.size.value,
                'category': this.state.category.value,
                'ordertype': this.state.ordertype.value,
                'order': this.state.order.value,
                'province': this.state.province.value,
                'district': this.state.district.value,
                'ward': this.state.ward.value
            })
            result.then((result)=>{
                if (result.status === 200) {
                this.setState({ 'rooms': result.data.data, 'pagination': result.data.pagination })
                //console.log(result.data.data)
                
            }})
           
            
        } catch (err) {
            console.log("lỗi get all room")
            this.setState({ 'serverError': true })
        }
        try {
            let response = await api.getlistprovince()
            if (response.status === 200) {
                await api.sleep(1000)
                var provincedata = response.data
                provincedata.unshift({
                    'value': 'all',
                    'label': 'Tất cả'
                })
                this.setState({ listProvince: {data: provincedata } })
                //console.log(this.state.listProvince.data)

            } else {
                //console.log("get List province failed")
                this.setState({ serverError: true })
               // console.log('no')
            }
        } catch (err) {
            console.log(err)
            this.setState({ serverError: true })
        }
    }
    // componentDidMount = async () => {
    //     document.title = "Trọ Đẹp - Home"
    //     try {
    //         var res = await api.getlistroom
    //         this.setState({ rooms: res.data, isLoading: false });
    //     } catch (err) {
    //         console.log(err)
    //     }

    // }

    updateListdistrict = async (province)=>{
        try {
            let response = await api.getlistdistrict({ 'province': province })
            if (response.status === 200) {
                await api.sleep(800)
                var districtdata = response.data
               // console.log(districtdata)
                districtdata.unshift({
                    'value': 'all',
                    'label': 'Tất cả'
                })
                this.setState({ listDistrict: { data: districtdata } })
               // console.log(response.data)
            } else {
                this.setState({ 'serverError': true })
            }
        } catch (err) {
            console.log(err)
            this.setState({ 'serverError': true })
        }
    }
    updateListWard = async(district)=>{
        try {
            let response = await api.getlistward({ 'district': district })
            if (response.status === 200) {
                await api.sleep(800)
                var warddata = response.data
                warddata.unshift({
                    'value': 'all',
                    'label': 'Tất cả'
                })
                this.setState({ listWard: { data: warddata } })
            } else {
                this.setState({ 'serverError': true })
            }
        } catch (err) {
            console.log(err)
            this.setState({ 'serverError': true })
        }
    }
    handleProvinceChange =async (event)=>{
        var newvalue = 'all'
        
        if(event){
            newvalue = event.value
            this.setState({
                province: {
                    'value': newvalue,
                    'label': newvalue
                },
                district: {
                    'value': 'all',
                    'label': 'Tất cả'
                },
                ward: {
                    'value': 'all',
                    'label': 'Tất cả'
                }
            })
            //console.log(newvalue,'province changed')
            if((newvalue!=='all')&&(newvalue!=='')){
                console.log("getting district")
                await this.updateListdistrict(newvalue)
            }
            else console.log("smth wrong")
             
        }
    }
    handleDistrictChange = async (event)=>{
        var newdistrict = 'all'
        if(event){
            newdistrict = event.value
            this.setState({
                district:{
                    'value': newdistrict,
                    'label': newdistrict,
                },
                ward: {                 
                        'value': 'all',
                        'label': 'Tất cả'
                }
            })
            if((newdistrict!=='all')){
                await this.updateListWard(newdistrict)
              //  console.log('getting province data')
            }
        }
    }
    
    handleWardChange = async (event)=>{
        var newward = "all"
        if(event){
            newward = event.value
            this.setState({
                ward: {
                    'value': newward,
                    'label': newward
                }
            })
        }
    }
    componentWillUnmount = ()=>{
        console.log("unmounted")
    }
    handleSubmitAction = async ()=>{
        try {
            let result = api.getlistroom({
                'page': this.state.pagination.currentPage,
                'price': this.state.price.value,
                'size': this.state.size.value,
                'category': this.state.category.value,
                'ordertype': this.state.ordertype.value,
                'order': this.state.order.value,
                'province': this.state.province.value,
                'district': this.state.district.value,
                'ward': this.state.ward.value
            })
            result.then((result)=>{
                if (result.status === 200) {
                this.setState({ 'rooms': result.data.data, 'pagination': result.data.pagination })
                console.log(result.data.data)
                
            }})
           
        } catch (err) {
            console.log("lỗi get all room")
            this.setState({ 'serverError': true })
        }
        

    }
    handlePriceChange = async (event)=>{
        var price = 0
        if(event){
            price = event.value
            this.setState({
                price: {
                    'value': price,
                    'label': this.state.priceval[price]
                }
            })
            
        }
    }
    handleSizeChange = async (event)=>{
        var size = 0
        if(event){
            size = event.value
            this.setState({
                size: {
                    'value': size,
                    'label': this.state.sizeval[size]
                }
            })
        }
    }
    handleCategoryChange = async (event)=>{
        var category = 0
        if(event){
            category = event.value
            this.setState({
                category: {
                    'value': category,
                    'label': this.state.cateval[category]
                }
        })
    }
}
    handleOrderTypeChange = async (event)=>{
        var otype = 1
        if(event){
            otype = event.value
            this.setState({
                ordertype: {
                    'value': otype,
                    'label': this.state.ordertypeval[otype]
                }
            })
        }
    }
    handleOrderChange = async (event)=>{
        var order = 1
        if(event){
            order = event.value
            this.setState({
                order: {
                    'value': order,
                    'label': this.state.orderval[order]
                }
            })
        }
    }


    render() {


        if (this.state.serverError === true) {
            return <Page500 />
        }
        let listroom = [];
//         this.state.rooms.forEach(room => {
//             listroom.push(
//                 <div class="post-list">

//                     <div class="short-post row">

//                         <img src={room.image} alt="Main Image" height="160px" width="215px"></img>

//                         <div class="short-info">
//                             <a href="/detailpost?postid={room.postid}">
//                                 <p class="contest-name">{room.name}</p>
//                             </a>
//                             {/* </div>if(isset($user) && (acctype == 'admin')) */}
//                             <div class="admin-home-option">
//                                 <button class="btn btn-danger btn-del">
//                                     <i class="fa fa-trash" aria-hidden="true"></i>&nbsp; Xoá
// </button>
//                                 <p id="postid" hidden>{room.roomid}</p>
//                             </div>
//                             {/* @endif */}
//                             <div class="btn-container">
//                                 <a style="padding-top: 10px; padding-bottom: 10px" href="/detailpost?postid=<?php echo $post->postid ?>" class="btn-detail"><span>Chi tiết</span></a>
//                             </div>
//                             {/* <?php
// $dateupload = date_create($post->dateupload);
// ?> */}
//                             <p><b>Giá phòng/tháng:</b> <span class="price">{room.rice} VNĐ</span></p>
//                             <p><b>Diện tích:</b> {room.size} m2</p>
//                             <p><b>Địa chỉ:</b> {room.address}</p>
//                             <p><b>Loại phòng:</b> {room.category} </p>
//                             <p><b>Ngày đăng:</b> Ngày {room.date}, vào lúc {room.time}</p>
//                             <p><b>Trạng thái:</b> <span class="">{room.status}</span></p>
//                         </div>
//                     </div>

//                 </div>)
//         })
        var doubleBack = '', back = '', next = '', doubleNext = '';
        var currentPage = this.state.pagination.currentPage;
        var lastPage = this.state.pagination.lastPage;
        if (currentPage > 2) {
            doubleBack = <li className="page-item">
                <a className="page-link" href="#">{currentPage - 2}</a>
            </li>
        }
        if (currentPage > 1) {
            back = <li className="page-item">
                <a className="page-link" href="#">{currentPage - 1}</a>
            </li>
        }
        if (lastPage > currentPage) {
            next = <li className="page-item">
                <a className="page-link" href="#">{currentPage + 1}</a>
            </li>
        }
        if (lastPage - currentPage > 1) {
            doubleNext = <li className="page-item">
                <a className="page-link" href="#">{currentPage + 2}</a>
            </li>
        }

        return (
            <div className="content-container container-fluid ">
                <div className="search-bar" style={{height: '185px',borderRadius: '6px'}}>
                <p class="search-bar-header" style={{height: '10px'}}><b>Tìm kiếm theo:</b></p>
                <div class="search-content"style={{marginLeft: '2%'}}>
                    <div class="search-content" style={{width: '90%'}}>
                        <Search 
                            datas = {this.state}
                            updateListdistrict = {this.updateListdistrict}
                            updateListWard = {this.updateListWard}
                            handleProvinceChange = {this.handleProvinceChange}
                            handleDistrictChange = {this.handleDistrictChange}
                            handleWardChange = {this.handleWardChange}
                            handleSubmitAction = {this.handleSubmitAction}
                            handlePriceChange = {this.handlePriceChange}
                            handleSizeChange = {this.handleSizeChange}
                            handleCategoryChange = {this.handleCategoryChange}
                            handleOrderTypeChange = {this.handleOrderTypeChange}
                            handleOrderChange = {this.handleOrderChange}

                        />
                    </div>
                    <div class="search-content btnSubmit" style={{width: '10%'}}>
                        <button className="btn btn-primary" onClick={()=>this.handleSubmitAction()} >Tìm kiếm</button> 
                    </div>
                </div>
            </div>
                <div className="modal fade" data-backdrop="static" id="comfirmDeleteModal" tabindex="-1" role="dialog" aria-labelledby="comfirmDeleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"><b>Xác nhận</b></h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" id="listreport">
                                Bạn chắc chắn muốn xoá bài đăng?
                    </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger btn-delete">Xoá bài đăng</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                
                <div className="post-list">
                { this.state.rooms.map((room)=><PostComponent 
                    price={room.price}
                    size={room.size}
                    type = {room.category}
                    state = {room.status}
                    image = {room.image1}
                    name = {room.name}
                    des = {room.description}
                    diachi = {room.address}
                    tinh = {room.province}
                    quan = {room.district}
                    xa = {room.ward}
                />)}
                </div>
                <div className="paging" style={{ position: "relative" }}>
                    <nav aria-label="Page navigation">
                        <ul className="pagination">
                            <li className="page-item ">
                                <a className={'page-link' + (currentPage === 1) ? 'disable' : ''} href="#">
                                    &#10094;&#10094;
                                 </a>
                            </li>
                            <li className="page-item">
                                <a className={'page-link' + (currentPage === 1) ? 'disable' : ''} href="#">
                                    &#10094;
                                </a>
                            </li>
                            {doubleBack}
                            {back}
                            <li className="page-item  active">
                                <a className="page-link">{currentPage}</a>
                            </li>
                            {next}
                            {doubleNext}
                            <li className="page-item">
                                <a className={'page-link' + (currentPage === lastPage) ? 'disable' : ''} href="/<?<?php echo $currentPage + 1 ?>"> &#10095;</a>
                            </li>
                            <li className="page-item ">
                                <a className={'page-link' + (currentPage === lastPage) ? 'disable' : ''} href="/<?<?php echo $lastPage ?>">&#10095;&#10095;</a>
                            </li>
                        </ul >
                    </nav >
                </div >








            </div>
        )
    }
}
