import '../../css/header.css'
import React, { useReducer } from 'react'
import api from '../../Api/api'
import { Redirect } from 'react-router'

export default class Header extends React.Component {
    render() {
        var user = this.props.user
        var login, register, userProfile = ''
        var sepLogin = ''
        if (user != null) {
           
            userProfile = <div className="dropdown show">
                <a className="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-user" style={{ "fontSize": "24px" }}></i> &nbsp;<span>{user.username}</span> &nbsp;
                </a>

                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a className="dropdown-item" href={"/profile?username=" + user.username}>
                        <p><i className="fas fa-user-check"></i>&nbsp; Hồ sơ</p>
                    </a>
                    <a className="dropdown-item" href="/editprofile">
                        <p><i className="fas fa-user-edit"></i>&nbsp; Cập nhật</p>
                    </a>
                    <a className="dropdown-item" href="#" onClick={this.logOut}>
                        <p><i className="fas fa-sign-out-alt"></i>&nbsp; Đăng xuất</p>
                    </a>
                </div>
            </div>
            // sepliked = sepsaved = sepmanageHouse = <div className="seperator"></div>
            // if (user.acctype === "Chủ nhà trọ") {
            //     manageHouse = <div className="dropdown show">
            //         <a className="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            //             Quản lý nhà trọ &nbsp;
            //         </a>

            //         <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            //             <a className="dropdown-item" href="/listhouse">Danh sách nhà trọ</a>
            //             <a className="dropdown-item" href="/addhouse">Thêm nhà trọ</a>
            //             <a className="dropdown-item" href="/listroom">Danh sách phòng trọ</a>
            //         </div>
            //     </div>;
            // }
        } else {
            login = <a className="login no-user" href="/login">
                <p>Đăng nhập</p>
            </a>;
            register = <a className="register no-user" href="/register">
                <p>Đăng ký</p>
            </a>
            sepLogin = <div className="seperator no-user"></div>
        }
        return (
            <div className="header" id='head'>
                <div className="Logo">
                    <a className="home" href="/">
                        <p className="logo-name"><i className="fas fa-home"></i>&nbsp;Trọ Đẹp</p>
                    </a>
                </div>
                <div className="user-navigation">
                </div>
                <div className="user">
                    {login}
                    {sepLogin}
                    {register}
                    {userProfile}
                </div>
            </div>
        );
    }
    // componentDidMount = async () => {
    //     document.addEventListener('click', clickOutSide)
    // }
    // clickProfile(event) {
    //     event.stopPropagation();
    //     var target = event.target
    //     if (target.classList.contains('selected')) {
    //         target.classList.remove('selected');
    //         document.getElementById('profile-extend').style.visibility = "hidden";
    //     } else {
    //         target.classList.add('selected');
    //         document.getElementById('profile-extend').style.visibility = "visible";
    //     }
    // }
    logOut = async () => {
        localStorage.removeItem('accessToken')
        try {
            await api.logout()
        } catch (err) {
            console.log(err)
        }
        window.location.replace("/");
    }
}


// function clickOutSide() {
//     var checkElem = document.getElementsByClassName('user-profile')[0]
//     if (checkElem) {
//         checkElem = checkElem.getElementsByTagName('p')[0];
//     }
//     if (checkElem) {
//         if (checkElem.classList.contains('selected')) {
//             checkElem.classList.remove('selected');
//         }
//         document.getElementById('profile-extend').style.visibility = "hidden";
//     }
// }