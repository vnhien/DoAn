import React from 'react';
import $ from 'jquery';
import 'bootstrap';
import api from '../../Api/api';
import '../../css/addroom.css'
import Page500 from '../Page500/Page500';
import { Redirect } from 'react-router';
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, ContentState, EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class AddRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // "editorState": EditorState.createWithContent(ContentState.createFromText('abc')),
            "editorState": EditorState.createEmpty(),
            'id': this.props.id ? this.props.id : 'addroom',
            "priceError": false,
            "sizeError": false,
            "formData": {
                'name': '',
                'price': '',
                'size': '',
                'category': 'Phòng cho thuê',
                'description': '',
                'status': 'Chưa cho thuê',
                'image1': '',
                'image2': '',
                'image3': '',
                'image4': '',
                'image5': '',
            },
            'previewImage1': '',
            'previewImage2': '',
            'previewImage3': '',
            'previewImage4': '',
            'previewImage5': '',
            'serverError': false,
            'unauthorized': false,
        }
    }
    editorContentChangeHandler = (e) => {
        // console.log(e)
        let temp = this.state.formData
        let blocks = convertToRaw(e.getCurrentContent()).blocks
        if (blocks.length >= 1) {
            temp['description'] = blocks[0].text;
            // console.log(temp['description'])
        }
        this.setState({
            "formData": temp,
            "editorState": e,
        })
    }
    openCancel = () => {
        $('#modalAddCancel' + this.state.id).modal('show');
    }

    discardCancel = () => {
        $('#modalAddCancel' + this.state.id).modal('hide');
    }

    acceptCancel = () => {
        this.setState({
            'serverError': false,
            'unauthorized': false,
            "priceError": false,
            "sizeError": false,
        })
        $('#modalAddCancel' + this.state.id).modal('hide');
        $('#' + this.state.id).modal('hide');
    }

    openApply = () => {
        $('#modalAddApply' + this.state.id).modal('show');
    }

    discardApply = () => {
        $('#modalAddApply' + this.state.id).modal('hide');
    }

    acceptApply = async () => {
        // console.log("houseId:", this.props.houseid)
        let data = this.state.formData
        let formData = new FormData()
        let images = [];
        formData.append('images', data.image1)
        formData.append('images', data.image2)
        formData.append('images', data.image3)
        formData.append('images', data.image4)
        formData.append('images', data.image5)
        delete data.image1;
        delete data.image2;
        delete data.image3;
        delete data.image4;
        delete data.image5;
        for (var key in data) {
            formData.append(key, data[key])
        }
        formData.append('houseId', this.props.houseid)
        formData.append('images', images)
        try {
            let alert = '#alert';
            let alertContent = '#alert-content';
            if (this.state.id === 'addroom1') {
                alert += '1';
                alertContent += '1';
            }
            var response = await api.createroom(formData);
            if (response.status === 200) {
                $('#modalAddApply' + this.state.id).modal('hide');
                $('#' + this.state.id).modal('hide');
                $(alertContent).html('Thêm phòng trọ thành công!')
                $(alert).modal('show');
            }
            if (response.status === 401) {
                this.setState({
                    'unauthorized': 'false'
                });
            }
            if (response.status === 403) {
                $('#modalAddApply' + this.state.id).modal('hide');
                $('#' + this.state.id).modal('hide');
                $(alertContent).html('Thao tác không hợp lệ!')
                $(alert).modal('show');
            }

            return
        } catch (err) {
            $('#modalAddApply' + this.state.id).modal('hide');
            this.setState({ serverError: true })
            return
        }
    }
    changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let temp = this.state.formData;

        temp[name] = value;
        this.setState({ formData: temp });
    }
    changeImage = (event, i) => {
        let fieldName = event.target.name;
        let temp = this.state.formData;
        var previewname = 'previewImage' + i;
        var newState = {};
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                temp[fieldName] = event.target.files[0];
                // console.log(event.target.files[0]);
                newState.formData = temp;
                newState[previewname] = e.target.result
                this.setState(newState);
            };
            reader.readAsDataURL(event.target.files[0]);
        } else {
            temp[fieldName] = '';
            newState.formData = temp;
            newState[previewname] = ''
            this.setState(newState);
        }
        // console.log("image1: ", this.state.formData.image1)
        // console.log(this.state.formData)
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        this.openApply()
    }
    closeForm = (e)=>{
        $('#' + this.state.id).modal('hide');
    }

    render() {


        if (this.state.unauthorized === true) {
            $('#modalAddApply' + this.state.id).modal('hide');
            $('#' + this.state.id).modal('hide');
            $('#listroom').modal('hide')
            return <Redirect to={{ pathname: "/login", state: { from: '/listhouse' } }} />
        }
        var body = ''
        var footer = ''
        if (this.state.serverError === true) {

            body = <div className="modal-body addroom"><Page500></Page500></div>
            footer = <div className="modal-footer">
                <button type="button" class="btn btn-secondary" onClick={this.closeForm}>Đóng</button>
            </div>
        } else {
            body = <div className="modal-body addroom">

                <div className="row">
                    <div className="col-3" style={{ 'marginLeft': 'auto' }}>
                        <b>Tên phòng trọ mới (<i className="fa fa-asterisk require" aria-hidden="true"></i>):</b>
                    </div>
                    <div className="col-5" style={{ marginRight: "auto" }}>
                        <input value={this.state.formData.name} type="text" onChange={e => { this.changeHandler(e) }} className="form-control" required="required" name="name" placeholder="Nhập tên phòng trọ mới" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-3" style={{ 'marginLeft': 'auto' }}>
                        <b>Giá phòng/tháng (VNĐ) (<i className="fa fa-asterisk require" aria-hidden="true"></i>):</b>
                    </div>
                    <div className="col-5" style={{ marginRight: "auto" }}>
                        <input value={this.state.formData.price} type="number" onChange={e => { this.changeHandler(e) }} className="form-control" required="required" name="price" placeholder="giá phòng trọ/tháng" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-3" style={{ 'marginLeft': 'auto' }}>
                        <b>Diện tích (m2) (<i className="fa fa-asterisk require" aria-hidden="true"></i>):</b>
                    </div>
                    <div className="col-5" style={{ marginRight: "auto" }}>
                        <input value={this.state.formData.size} type="number" onChange={e => { this.changeHandler(e) }} className="form-control" required="required" name="size" placeholder="Diện tích phòng (m2)" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-3" style={{ 'marginLeft': 'auto' }}>
                        <b>Loại phòng (<i className="fa fa-asterisk require" aria-hidden="true"></i>):</b>
                    </div>
                    <div className="col-5" style={{ marginRight: "auto" }}>
                        <select
                            onChange={(e) => this.changeHandler(e)}
                            className="form-control"
                            name="category"
                            value={this.state.formData.category}
                        >
                            <option value="Phòng cho thuê">Phòng cho thuê</option>
                            <option value="Homestay">Homestay</option>
                            <option value="Phòng trọ">Nguyên căn</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3" style={{ 'marginLeft': 'auto' }}>
                        <b>Mô tả (<i className="fa fa-asterisk require" aria-hidden="true"></i>):</b>
                    </div>
                    <div className="col-5" style={{ marginRight: "auto" }}>
                        <Editor
                            wrapperStyle={{ width: "calc(100% - 26px)", height: 'fit-content' }}
                            toolbarStyle={{ backgroundColor: "#bbebe6" }}
                            editorStyle={{ "resize": "vertical", overflow: "hidden", height: "300px" }}
                            name='description'
                            wrapperClassName="wrapper-class form-control"
                            editorClassName="editor-class form-control"
                            toolbarClassName="toolbar-class"
                            // defaultContentState={this.state.editorState}
                            // contentState={ContentState.createFromText('abc')}
                            editorState={this.state.editorState}
                            onEditorStateChange={e => this.editorContentChangeHandler(e)}
                        // editorClassName="editorClassName"
                        // onEditorStateChange={this.onEditorStateChange}
                        />
                    </div>
                </div>
                <div className="row imageInput-container">
                    <div className="col-3" style={{ 'marginLeft': 'auto' }}>
                        <b>Ảnh đại diện (<i className="fa fa-asterisk require" aria-hidden="true"></i>):</b>
                    </div>
                    <div className="col-5 imageInput" style={{ marginRight: "auto" }}>
                        <input onChange={e => this.changeImage(e, 1)} type="file" name="image1" id="image1" required="required" />
                        <img id="img" height={this.state.previewImage1 ? '240px' : 0} src={this.state.previewImage1} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-3" style={{ 'marginLeft': 'auto' }}>
                        <b>Ảnh thêm:</b>
                    </div>
                    <div className="col-5 imageInput" style={{ marginRight: "auto" }}>
                    </div>
                </div>
                <div className="row imageInput-container">
                    <div className="col-3" style={{ 'marginLeft': 'auto' }}>
                        <b>Ảnh 2 (<i className="fa fa-asterisk require" aria-hidden="true"></i>):</b>
                    </div>
                    <div className="col-5 imageInput" style={{ marginRight: "auto" }}>
                        <input onChange={e => this.changeImage(e, 2)} type="file" name="image2" id="image2" required="required" />
                        <img id="img" height={this.state.previewImage2 ? '240px' : 0} src={this.state.previewImage2} />
                    </div>
                </div>
                <div className="row imageInput-container">
                    <div className="col-3" style={{ 'marginLeft': 'auto' }}>
                        <b>Ảnh 3 (<i className="fa fa-asterisk require" aria-hidden="true"></i>):</b>
                    </div>
                    <div className="col-5 imageInput" style={{ marginRight: "auto" }}>
                        <input onChange={e => this.changeImage(e, 3)} type="file" name="image3" id="image3" required="required" />
                        <img id="img" height={this.state.previewImage3 ? '240px' : 0} src={this.state.previewImage3} />
                    </div>
                </div>
                <div className="row imageInput-container">
                    <div className="col-3" style={{ 'marginLeft': 'auto' }}>
                        <b>Ảnh 4:</b>
                    </div>
                    <div className="col-5 imageInput" style={{ marginRight: "auto" }}>
                        <input onChange={e => this.changeImage(e, 4)} type="file" name="image4" id="image4" />
                        <img id="img" height={this.state.previewImage4 ? '240px' : 0} src={this.state.previewImage4} />
                    </div>
                </div>
                <div className="row imageInput-container">
                    <div className="col-3" style={{ 'marginLeft': 'auto' }}>
                        <b>Ảnh 5:</b>
                    </div>
                    <div className="col-5 imageInput" style={{ marginRight: "auto" }}>
                        <input onChange={e => this.changeImage(e, 5)} type="file" name="image5" id="image5" />
                        <img id="img" hheight={this.state.previewImage5 ? '240px' : 0} src={this.state.previewImage5} />
                    </div>
                </div>

            </div>
            footer = <div className="modal-footer">
                <button type="submit" id='addbtn' className="btn btn-primary">
                    <i className="fas fa-check"></i>&nbsp; Thêm mới
                 </button>
                <button type="button" className="btn btn-danger cancel" onClick={this.openCancel} >
                    <i className="fas fa-times" style={{ fontSize: '18px' }}></i> &nbsp;&nbsp;Huỷ
                </button>
            </div>
        }
        return (
            <div className="add-container">
                <div className="modal fade" data-backdrop="static" id={this.state.id}>
                    <div className="modal-dialog modal-lg addroom">
                        <form className="create-form" onSubmit={this.handleSubmit} id="create-form" method="post" acceptCharset="UTF-8" encType="multipart/form-data">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Thêm phòng trọ mới</h4>
                                    <button type="button" className="close" aria-hidden="true" onClick={this.openCancel}>×</button>
                                </div><div className="container"></div>
`                               {body}
                                {footer}

                            </div>
                        </form>
                    </div>
                </div>
                <div className="modal fade" id={"modalAddApply" + this.state.id} data-backdrop="static">
                    <div className="modal-dialog modalAddApply" >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Xác nhận</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div><div className="container"></div>
                            <div className="modal-body">
                                <p>Bạn có chắc chắn muốn thêm phòng này không?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.acceptApply}>Có</button>
                                <button type="button" className="btn btn-secondary" onClick={this.discardApply}>Không</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade zindex-popover" id={"modalAddCancel" + this.state.id} data-backdrop="static">
                    <div className="modal-dialog modalAddCancel">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Xác nhận</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div><div className="container"></div>
                            <div className="modal-body">
                                <p>Bạn có chắc chắn muốn hủy công việc hiện tại không?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.acceptCancel}>Có</button>
                                <button type="button" className="btn btn-secondary" onClick={this.discardCancel}>Không</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
    componentDidMount = () => {
        $('#' + this.state.id).on('hide.bs.modal', (e) => {
            if (e.target.id === this.state.id) {
                // debugger
                this.setState({
                    "editorState": EditorState.createEmpty(),
                    "priceError": false,
                    "sizeError": false,
                    "formData": {
                        'name': '',
                        'price': '',
                        'size': '',
                        'category': 'Phòng cho thuê',
                        'description': '',
                        'status': 'Chưa cho thuê',
                        'image1': '',
                        'image2': '',
                        'image3': '',
                        'image4': '',
                        'image5': '',
                    },
                    'previewImage1': '',
                    'previewImage2': '',
                    'previewImage3': '',
                    'previewImage4': '',
                    'previewImage5': '',
                    'serverError': false,
                    'unauthorized': false,
                })
                // console.log( "state:", this.state)
                $("#image1").val('');
                $("#image2").val('');
                $("#image3").val('');
                $("#image4").val('');
                $("#image5").val('');
            }
        });
    }
}

export default AddRoom;