import "../../css/register.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Redirect } from "react-router-dom";
import React from "react";
import api from "../../Api/api";
import Page500 from "../Page500/Page500";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "serverError": false,
      "invalidUsername": false,
      "invalidConfirm": false,
      "invalidPhone": false,
      "invalidEmail": false,
      "emptyBirthday": false,
      "registerState": "",
      "errorCount": 0,
      "editorState": "",
      formData: {
        "username": "",
        "password": "",
        "confirmPassword": "",
        "acctype": "Người thuê trọ",
        "fullname": "",
        "birthday": "",
        "address": "",
        "phone": "",
        "email": "",
        "job": "",
        "introduction": "abc",
      },
    };
  }
  changeHandler = (event) => {
    console.log(event);
    var name = event.target.name;
    let temp = this.state.formData;
    let value = event.target.value;
    temp[name] = value;
    if (name === "confirmPassword") {
      if (value !== temp["password"]) {
        let errorCount = this.state.errorCount;
        if (this.state.invalidConfirm === false) {
          this.setState({ "invalidConfirm": true, errorCount: errorCount + 1 });
        }
      } else if (this.state.invalidConfirm === true) {
        this.setState({
          "invalidConfirm": false,
          errorCount: this.state.errorCount - 1,
        });
      }
    }
    if (name === "password") {
      if (
        this.state.invalidConfirm === false &&
        temp["confirmPassword"] !== ""
      ) {
        this.setState({
          "invalidConfirm": true,
          errorCount: this.state.errorCount + 1,
        });
      } else {
        if (value === temp["confirmPassword"] && this.state.invalidConfirm === true) {
          this.setState({
            "invalidConfirm": false,
            errorCount: this.state.errorCount - 1,
          });
        }
      }
    }
    if (name === "phone") {
      let regex = /((09|03|07|08|05|02)+([0-9]{8})\b)/g;
      if (regex.test(value) === false) {
        if (this.state.invalidPhone === false) {
          this.setState({
            "invalidPhone": true,
            errorCount: this.state.errorCount + 1,
          });
        }
      } else {
        if (this.state.invalidPhone === true) {
          this.setState({
            "invalidPhone": false,
            errorCount: this.state.errorCount - 1,
          });
        }
      }
    }
    if (name === "email") {
      let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g;
      if (regex.test(value) === false) {
        if (this.state.invalidEmail === false) {
          this.setState({
            "invalidEmail": true,
            errorCount: this.state.errorCount + 1,
          });
        }
      } else {
        if (this.state.invalidEmail === true) {
          this.setState({
            "invalidEmail": false,
            errorCount: this.state.errorCount - 1,
          });
        }
      }
    }
    this.setState({ "formData": temp });
    console.log(this.state);
  };

  // birthday
  changeBirthday = (e) => {
    let temp = this.state.formData;
    let value = e;
    temp['birthday'] = value
    if (this.state.emptyBirthday === true && value) {
      this.setState({
        "formData": temp,
        "emptyBirthday": false,
        "errorCount": this.state.errorCount - 1,
      });
    } else if (this.state.emptyBirthday === false && !value) {
      this.setState({
        "formData": temp,
        "emptyBirthday": true,
        "errorCount": this.state.errorCount + 1,
      });
    } else {
      this.setState({
        "formData": temp,
      });
    }

    // console.log("bd", this.state.formData.birthday)
  }

  editorContentChangeHandler= (e) =>{
    // console.log(e)
    let temp = this.state.formData
    if(e.blocks.length >= 1){
      temp['introduction'] = e.blocks[0].text;
    }
    this.setState({
      "formData": temp,
      "editorState": e,
    })
  }

  render() {
    if (this.state.serverError === true) {
      return <Page500 />;
    }
    if (this.props.user !== null) {
      return <Redirect to="/"></Redirect>;
    }
    if (this.state.registerState === "success") {
      return (
        <Redirect
          to={{ pathname: "/login", state: { successRegister: true } }}
        ></Redirect>
      );
    }
    var invalidUsername,
      invalidConfirm,
      invalidPhone,
      invalidEmail, emptyBirthday = "";
    var userName = (
      <div className="row">
        <div className="col-2" style={{ marginLeft: "auto" }}>
          <b>
            Tên đăng nhập (
            <i className="fa fa-asterisk require" aria-hidden="true"></i>):
          </b>
        </div>
        <div className="col-4" style={{ marginRight: "auto" }}>
          <input
            onChange={(e) => this.changeHandler(e)}
            type="text"
            className="form-control"
            required="required"
            name="username"
            placeholder="Nhập tên tài khoản"
          />
        </div>
      </div>
    );
    var confirmPassword = (
      <div className="row">
        <div className="col-2" style={{ marginLeft: "auto" }}>
          <b>
            Xác nhận mật khẩu (
            <i className="fa fa-asterisk require" aria-hidden="true"></i>):{" "}
          </b>
        </div>
        <div className="col-4" style={{ marginRight: "auto" }}>
          <input
            onChange={(e) => this.changeHandler(e)}
            type="password"
            className="form-control"
            required="required"
            name="confirmPassword"
            placeholder="Xác nhận lại mật khẩu"
          />
        </div>
      </div>
    );
    var phone = (
      <div className="row">
        <div className="col-2" style={{ marginLeft: "auto" }}>
          <b>
            Số điện thoại (
            <i className="fa fa-asterisk require" aria-hidden="true"></i>):
          </b>
        </div>
        <div className="col-4" style={{ marginRight: "auto" }}>
          <input
            onChange={(e) => this.changeHandler(e)}
            type="text"
            className="form-control"
            required="required"
            name="phone"
            placeholder="Nhập số điện thoại của bạn"
          />
        </div>
      </div>
    );
    var email = (
      <div className="row">
        <div className="col-2" style={{ marginLeft: "auto" }}>
          <b>
            Email (<i className="fa fa-asterisk require" aria-hidden="true"></i>
            ):
          </b>
        </div>
        <div className="col-4" style={{ marginRight: "auto" }}>
          <input
            onChange={(e) => this.changeHandler(e)}
            type="email"
            className="form-control"
            required="required"
            name="email"
            placeholder="Nhập tên email của bạn"
          />
        </div>
      </div>
    );
    if (this.state.invalidUsername === true) {
      invalidUsername = (
        <div className="row error-notifi">
          <div
            className="col-2 failed-register"
            style={{ marginLeft: "auto" }}
          ></div>
          <div
            className="col-4 register-failed"
            style={{ marginRight: "auto" }}
          >
            Tài khoản đã được sử dụng, vui lòng chọn tài khoản khác!
          </div>
        </div>
      );
      userName = (
        <div className="row">
          <div className="col-2" style={{ marginLeft: "auto" }}>
            <b>
              Tên đăng nhập (
              <i className="fa fa-asterisk require" aria-hidden="true"></i>):
            </b>
          </div>
          <div className="col-4" style={{ marginRight: "auto" }}>
            <input
              onChange={(e) => this.changeHandler(e)}
              type="text"
              className="form-control error"
              required="required"
              name="username"
              placeholder="Nhập tên tài khoản"
            />
          </div>
        </div>
      );
    }
    if (this.state.invalidConfirm === true) {
      invalidConfirm = (
        <div className="row error-notifi">
          <div className="col-2" style={{ marginLeft: "auto" }}></div>
          <div
            className="col-4 register-failed"
            style={{ marginRight: "auto" }}
          >
            Mật khẩu xác nhận phải giống mật khẩu phía trên!
          </div>
        </div>
      );
      confirmPassword = (
        <div className="row">
          <div className="col-2" style={{ marginLeft: "auto" }}>
            <b>
              Xác nhận mật khẩu (
              <i className="fa fa-asterisk require" aria-hidden="true"></i>):{" "}
            </b>
          </div>
          <div className="col-4" style={{ marginRight: "auto" }}>
            <input
              onChange={(e) => this.changeHandler(e)}
              type="password"
              className="form-control error"
              required="required"
              name="confirmPassword"
              placeholder="Xác nhận lại mật khẩu"
            />
          </div>
        </div>
      );
    }
    if (this.state.invalidPhone === true) {
      phone = (
        <div className="row">
          <div className="col-2" style={{ marginLeft: "auto" }}>
            <b>
              Số điện thoại (
              <i className="fa fa-asterisk require" aria-hidden="true"></i>):
            </b>
          </div>
          <div className="col-4" style={{ marginRight: "auto" }}>
            <input
              onChange={(e) => this.changeHandler(e)}
              type="text"
              className="form-control error"
              required="required"
              name="phone"
              placeholder="Nhập số điện thoại của bạn"
            />
          </div>
        </div>
      );
      invalidPhone = (
        <div className="row error-notifi">
          <div className="col-2" style={{ marginLeft: "auto" }}></div>
          <div
            className="col-4 register-failed"
            style={{ marginRight: "auto" }}
          >
            Vui lòng nhập đúng số điện thoại
          </div>
        </div>
      );
    }

    if (this.state.invalidEmail === true) {
      email = (
        <div className="row">
          <div className="col-2" style={{ marginLeft: "auto" }}>
            <b>
              Email (
              <i className="fa fa-asterisk require" aria-hidden="true"></i>):
            </b>
          </div>
          <div className="col-4" style={{ marginRight: "auto" }}>
            <input
              onChange={(e) => this.changeHandler(e)}
              type="email"
              className="form-control error"
              required="required"
              name="email"
              placeholder="Nhập tên email của bạn"
            />
          </div>
        </div>
      );
      invalidEmail = (
        <div className="row error-notifi">
          <div className="col-2" style={{ marginLeft: "auto" }}></div>
          <div
            className="col-4 register-failed"
            style={{ marginRight: "auto" }}
          >
            Vui lòng nhập địa chỉ email hợp lệ
          </div>
        </div>
      );
    }
    if (this.state.emptyBirthday === true) {
      emptyBirthday = <div className="row error-notifi">
        <div className="col-2" style={{ marginLeft: "auto" }}></div>
        <div
          className="col-4 register-failed"
          style={{ marginRight: "auto" }}
        >
          Vui lòng chọn ngày sinh của bạn
      </div>
      </div>;
    }

    // Local Date Picker
    const months = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];
    const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

    const locale = {
      localize: {
        month: (n) => months[n],
        day: (n) => days[n],
      },
      formatLong: {},
    };

    return (
      <div className="content-container container-fluid">
        <div className="register-form-container">
          <h1 className="register-heading">
            Điền thông tin cá nhân để đăng ký
          </h1>
          <form
            className="register-form"
            method="post"
            acceptCharset="UTF-8"
            action="/register"
            onSubmit={(e) => this.handleSubmit(e)}
          >
            {userName}
            {invalidUsername}
            <div className="row">
              <div className="col-2" style={{ marginLeft: "auto" }}>
                <b>
                  Mật khẩu (
                  <i className="fa fa-asterisk require" aria-hidden="true"></i>
                  ):{" "}
                </b>
              </div>
              <div className="col-4" style={{ marginRight: "auto" }}>
                <input
                  onChange={(e) => this.changeHandler(e)}
                  type="password"
                  className="form-control"
                  required="required"
                  name="password"
                  placeholder="Nhập mật khẩu"
                />
              </div>
            </div>
            {confirmPassword}
            {invalidConfirm}

            <div className="row">
              <div className="col-2" style={{ marginLeft: "auto" }}>
                <b>Loại tài khoản:</b>
              </div>
              <div className="col-4" style={{ marginRight: "auto" }}>
                <select
                  onChange={(e) => this.changeHandler(e)}
                  className="form-control"
                  name="acctype"
                  value={this.state.formData.acctype}
                >
                  <option value="Người thuê trọ">Người thuê trọ</option>
                  <option value="Chủ nhà trọ">Chủ nhà trọ</option>
                  {/* <option value="Người quản trị">Người quản trị</option> */}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-2" style={{ marginLeft: "auto" }}>
                <b>
                  Họ và Tên (
                  <i className="fa fa-asterisk require" aria-hidden="true"></i>
                  ):
                </b>
              </div>
              <div className="col-4" style={{ marginRight: "auto" }}>
                <input
                  onChange={(e) => this.changeHandler(e)}
                  type="text"
                  className="form-control"
                  required="required"
                  name="fullname"
                  placeholder="Nhập họ và tên của bạn"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-2" style={{ marginLeft: "auto" }}>
                <b>
                  Ngày sinh (
                  <i className="fa fa-asterisk require" aria-hidden="true"></i>
                  ):
                </b>
              </div>
              <div className="col-4" style={{ marginRight: "auto" }}>
                {/* <input onChange={e => this.changeHandler(e)} type="text" onFocus={(e) => { e.target.type = 'date' }} className="form-control" required="required" name="birthday" placeholder="Chọn ngày sinh của bạn" /> */}

                <DatePicker
                  name='birthday'
                  required="required"
                  // closeOnScroll={true}
                  placeholderText="Chọn ngày sinh của bạn"
                  selected={this.state.formData.birthday}
                  onChange={(e) => this.changeBirthday(e)}
                  isClearable={this.state.formData.birthday !== ''? true : false}
                  locale={locale}
                  maxDate={new Date()}
                  minDate={new Date(1900, 0, 1)}
                  className={"form-control " + (this.state.emptyBirthday ? "error" : '')}
                  dateFormat='dd/MM/y'
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode='select'
                />
              </div>
            </div>
            {emptyBirthday}
            <div className="row">
              <div className="col-2" style={{ marginLeft: "auto" }}>
                <b>
                  Địa chỉ (
                  <i className="fa fa-asterisk require" aria-hidden="true"></i>
                  ):
                </b>
              </div>
              <div className="col-4" style={{ marginRight: "auto" }}>
                <input
                  onChange={(e) => this.changeHandler(e)}
                  type="text"
                  className="form-control"
                  required="required"
                  name="address"
                  placeholder="Nhập địa chỉ của bạn"
                />
              </div>
            </div>
            {phone}
            {invalidPhone}
            {email}
            {invalidEmail}
            <div className="row">
              <div className="col-2" style={{ marginLeft: "auto" }}>
                <b>
                  Công việc (
                  <i className="fa fa-asterisk require" aria-hidden="true"></i>
                  ):
                </b>
              </div>
              <div className="col-4" style={{ marginRight: "auto" }}>
                <input
                  onChange={(e) => this.changeHandler(e)}
                  type="text"
                  className="form-control"
                  required="required"
                  name="job"
                  placeholder="Nhập công việc hiện tại của bạn"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-2" style={{ marginLeft: "auto" }}>
                <b>Giới thiệu:</b>
              </div>
              <div className="col-4" style={{ marginRight: "auto" }}>
                {/* <textarea
                  onChange={(e) => this.changeHandler(e)}
                  style={{ height: "160px" }}
                  type="text"
                  className="form-control"
                  required="required"
                  name="introduction"
                  placeholder="Bạn có thể giới thiệu ngắn về bản thân"
                /> */}
                <Editor
                  wrapperStyle={{width: "calc(100% - 26px)" , height: 'fit-content'}}
                  toolbarStyle={{backgroundColor: "#bbebe6"}}
                  editorStyle={{"resize": "vertical" , overflow: "hidden", height:'140px'}}
                  name='introduction'
                  wrapperClassName="wrapper-class form-control"
                  editorClassName="editor-class form-control"
                  toolbarClassName="toolbar-class"
                  defaultContentState={this.state.editorState}
                  onContentStateChange={e=>this.editorContentChangeHandler(e)}
                // editorClassName="editorClassName"
                // onEditorStateChange={this.onEditorStateChange}
                />
              </div>
            </div>
            <div className="row">
              <input
                type="submit"
                value="Đăng ký"
                className="btn btn-primary"
                style={{ margin: "auto", marginTop: "24px" }}
              />
            </div>
            <div
              className="row"
              style={{ justifyContent: "center", marginTop: "22px" }}
            >
              Bạn đã có tài khoản? &nbsp;
              <a href="/login">
                <b>Đăng nhập</b>
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.errorCount > 0) {
      return;
    }
    // const data = await register()
    let data = this.state.formData;
    delete data.confirmPassword;
    data.birthday = new Date(data.birthday);
    try {
      var response = await api.register(data);
      if (response.status === 200) {
        this.setState({
          "registerState": "success",
        });
      }
      if (response.status === 409) {
        this.setState({
          "invalidUsername": true,
        });
      }
      return;
    } catch (err) {
      this.setState({ serverError: true });
      return;
    }
  };
  componentDidMount() {
    document.title = "Trọ Đẹp - Đăng ký tài khoản";
  }
}
