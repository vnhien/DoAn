import React from "react"
import { FaRestroom } from "react-icons/fa"

export default function PostComponent(props){

    return(
        <div className="short-post row" style={{borderRadius: '5px'}}>
                <a href="#">
                    <img src={"http://localhost:8080/"+props.image} alt="Main Image" height="160px" width="215px" />
                </a>
                <div className="short-info">
                    <a href="props.image">
                        <p className="contest-name">{props.name}</p>
                    </a>
                    {/* @if(isset($user) && ($user->acctype == 'admin'))
                    <div className="admin-home-option">
                        <button className="btn btn-danger btn-del">
                            <i className="fa fa-trash" aria-hidden="true"></i>&nbsp; Xoá
                        </button>
                        <p id="postid" hidden>{{$post->postid}}</p>
                    </div>
                    @endif */}
                    <div className="btn-container">
                        <a href="#" className="btn-detail"><span>Chi tiết</span></a>
                    </div>
                    {/* <?php
                        $dateupload = date_create($post->dateupload);
                    ?> */}
                    <p><b>Giá phòng/tháng:</b> <span className="price">{props.price}</span></p>
                    <p><b>Diện tích:</b> {props.size}</p>
                    <p><b>Địa chỉ:</b>  {props.diachi} {props.xa} {props.quan} {props.tinh}</p>
                    <p><b>Loại phòng:</b> {props.type}</p>
                    {/* <p><b>Ngày đăng:</b> test</p> */}
                    <p><b>Trạng thái:</b> {(props.state)}</p>
                    {/* <p><b>Miêu tả:</b> {props.des}</p> */}
                </div>
            </div>
    )
}