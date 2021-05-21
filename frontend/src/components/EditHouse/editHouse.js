import React from 'react'
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router';
import Page500 from '../Page500/Page500';
import Select from 'react-select';
import '../../css/editHouse.css';
import api from '../../Api/api'

const customSelectStyles = {
    option: (styles, state) => ({
        ...styles,
        cursor: 'pointer',
    }),
    control: (styles) => ({
        ...styles,
        cursor: 'pointer',
    })
}
const SERVER = 'http://localhost:8080/'

export default class EditHouse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'invalidAccess': false,
            'editState': 'unsubmitted',
            "provinceError": false,
            "districtError": false,
            "wardError": false,
            "serverError": false,
            "clickCancel": false,
            "originImage": '',
            "previewImage": '', //Chứa ảnh về nhà trọ được xem trước khi upload
            "formData": {
                'name': '',
                'province': '',
                'district': '',
                'ward': '',
                'address': '',
                'description': '',
                'image': ''
            },
            "provinceSelect": {
                isLoading: true,
                data: [],
            },
            "districtSelect": {
                isLoading: true,
                data: [],
            },
            "wardSelect": {
                isLoading: true,
                data: [],
            }
        }
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        let data = this.state.formData

        if (data.province === '') {
            this.setState({ provinceError: true });
        } else if (data.district === '') {
            this.setState({ districtError: true });
        } else if (data.ward === '') {
            this.setState({ wardError: true });
        } else {
            let formData = new FormData()
            for (var key in data) {
                if (key === 'image' && data[key] === '') {
                    continue
                }
                formData.append(key, data[key])
            }
            try {
                var response = await api.edithouse(formData);
                if (response.status === 200) {
                    this.setState({
                        'editState': 'success'
                    });
                }
                if (response.status === 401) {
                    this.setState({
                        'editState': 'unAuthorized'
                    });
                }
                return
            } catch (err) {
                this.setState({ serverError: true })
                return
            }
        }
    }
    changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let temp = this.state.formData;
        temp[name] = value;
        this.setState({ formData: temp });
    }
    changeProvice = async (e) => {
        var newValue = '';
        if (e) {
            newValue = e.value;
        }
        let temp = this.state.formData;
        temp['district'] = '';
        temp['ward'] = '';
        temp['province'] = newValue;
        this.setState({
            formData: temp,
            "wardSelect": {
                isLoading: true,
                data: [],
            },
            "districtSelect": {
                isLoading: true,
                data: [],
            },
        });

        if (newValue !== '') {
            if (this.state.provinceError === true) {
                this.setState({ provinceError: false })
            }
            await this.updateListDistrict(newValue);
        } else {
            api.sleep(800)
            this.setState({ districtSelect: { data: [], isLoading: false } })
        }
        this.setState({ wardSelect: { data: [], isLoading: false } })
    }
    updateListDistrict = async (province) => {
        try {
            let response = await api.getlistdistrict({ 'province': province })
            if (response.status === 200) {
                await api.sleep(800)
                this.setState({ 'districtSelect': { isLoading: false, data: response.data } })
            } else {
                this.setState({ 'serverError': true })
            }
        } catch (err) {
            console.log(err)
            this.setState({ 'serverError': true })
        }
    }
    changeDistrict = async (e) => {
        var newValue = '';
        if (e) {
            newValue = e.value;
        }
        let temp = this.state.formData;
        temp['district'] = newValue;
        temp['ward'] = '';
        this.setState({
            'formData': temp,
            "wardSelect": {
                isLoading: true,
                data: [],
            },
        });
        if (newValue !== '') {
            if (this.state.districtError === true) {
                this.setState({ districtError: false })
            }
            await this.updateListWard(newValue)
        } else {
            api.sleep(800)
            this.setState({ 'wardSelect': { data: [], 'isLoading': false } });
        }
        console.log(this.state)
    }
    updateListWard = async (district) => {
        try {
            let response = await api.getlistward({ 'district': district })
            if (response.status === 200) {
                await api.sleep(800)
                this.setState({ 'wardSelect': { isLoading: false, data: response.data } })
            } else {
                this.setState({ 'serverError': true })
            }
        } catch (err) {
            console.log(err)
            this.setState({ 'serverError': true })
        }
    }

    changeWard = async (e) => {
        var newValue = '';
        if (e) {
            newValue = e.value;
        }
        if (newValue !== '' && this.state.wardError === true) {
            this.setState({ wardError: false });
        }
        this.setState({
            'formData': {
                ...this.state.formData,
                'ward': newValue
            }
        });
    }
    render = () => {
        if (this.props.user === null || this.props.user.acctype !== 'Chủ nhà trọ' || this.state.invalidAccess === true) {
            return <Redirect to='/' />
        }
        if (this.state.serverError === true) {
            return <Page500 />
        }
        if (this.state.editState === 'success') {
            return <Redirect to={{ pathname: "/listhouse", state: { from: 'edithouse' } }} />
        }
        let provinceDefaultValue = null, districtDefaultValue = null, wardDefaultValue = null;
        let districtPlaceHolder = 'Vui lòng chọn Tỉnh/Thành phố';
        let wardPlaceHolder = 'Vui lòng chọn Quận/Huyện';
        let errProvince = '', errDistrict = '', errWard = '';
        if (this.state.provinceError === true) {
            errProvince = <div className="row error-notifi">
                <div className="col-2" style={{ marginLeft: "auto" }}>
                </div>
                <div className="col-5 failed-notifi" style={{ marginRight: "auto" }}>
                    Bạn cần chọn Tỉnh/Thành phố
            </div>
            </div>;
        }
        if (this.state.districtError === true) {
            errDistrict = <div className="row error-notifi">
                <div className="col-2 " style={{ marginLeft: "auto" }}>
                </div>
                <div className="col-5 failed-notifi" style={{ marginRight: "auto" }}>
                    Bạn cần chọn Quận/Huyện
            </div>
            </div>;
        }
        if (this.state.wardError === true) {
            errWard = <div className="row error-notifi">
                <div className="col-2 " style={{ marginLeft: "auto" }}>
                </div>
                <div className="col-5 failed-notifi" style={{ marginRight: "auto" }}>
                    Bạn cần chọn Phường/Xã
            </div>
            </div>;
        }
        if (this.state.formData.province !== '') {
            provinceDefaultValue = { value: this.state.formData.province, label: this.state.formData.province }
            districtPlaceHolder = 'Chọn Quận/Huyện';
        }

        // console.log("state district:", this.state.formData.district)
        if (this.state.formData.district !== '') {
            districtDefaultValue = { value: this.state.formData.district, label: this.state.formData.district }
            wardPlaceHolder = 'Chọn Phường/Xã'
            // console.log("đang cập nhật district")
        }
        if (this.state.formData.ward !== '') {
            wardDefaultValue = { value: this.state.formData.ward, label: this.state.formData.ward }
        }
        // console.log("districtDefaultValue", districtDefaultValue)
        return (
            <div className="content-container container-fluid">
                <div className="create-form-container">
                    <div className="navigator row">
                        <a href="/">HOME &nbsp;</a>
                        <p><i className="fas fa-angle-double-right" style={{ color: '#2196F3' }}></i>&nbsp; Cập nhật thông tin nhà trọ</p>
                    </div>
                    <h1 className="create-heading">Vui lòng điền các thông tin để thêm nhà trọ mới</h1>
                    <form className="create-form" id="create-form" method="post" acceptCharset="UTF-8" encType="multipart/form-data"
                        onSubmit={e => this.handleSubmit(e)}>
                        <div className="row">
                            <div className="col-2" style={{ 'marginLeft': 'auto' }}>
                                <b>Tên nhà trọ (<i className="fa fa-asterisk require" aria-hidden="true"></i>):</b>
                            </div>
                            <div className="col-5" style={{ marginRight: "auto" }}>
                                <input value={this.state.formData.name} type="text" onChange={e => { this.changeHandler(e) }} className="form-control" required="required" name="name" placeholder="Nhập tên nhà trọ mới" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-2" style={{ 'marginLeft': 'auto' }}>
                                <b>Tỉnh/Thành (<i className="fa fa-asterisk require" aria-hidden="true"></i>):</b>
                            </div>
                            <div className="col-5" style={{ marginRight: "auto" }}>
                                <Select className={errProvince ? 'error' : ''} value={provinceDefaultValue} styles={customSelectStyles} required name='province' placeholder='Chọn Tỉnh/Thành'
                                    onChange={e => this.changeProvice(e)} options={this.state.provinceSelect.data} isClearable={true} isLoading={this.state.provinceSelect.isLoading} />

                            </div>
                        </div>
                        {errProvince}
                        <div className="row">
                            <div className="col-2" style={{ 'marginLeft': 'auto' }}>
                                <b>Quận/Huyện (<i className="fa fa-asterisk require" aria-hidden="true"></i>):</b>
                            </div>
                            <div className="col-5" style={{ marginRight: "auto" }}>
                                <Select className={errDistrict ? 'error' : ''} value={districtDefaultValue} styles={customSelectStyles} required name='district' placeholder={districtPlaceHolder}
                                    onChange={e => this.changeDistrict(e)} options={this.state.districtSelect.data} isClearable={true} isLoading={this.state.districtSelect.isLoading} />
                            </div>
                        </div>
                        {errDistrict}

                        <div className="row">
                            <div className="col-2" style={{ 'marginLeft': 'auto' }}>
                                <b>Phường/Xã (<i className="fa fa-asterisk require" aria-hidden="true"></i>):</b>
                            </div>
                            <div className="col-5" style={{ marginRight: "auto" }}>
                                <Select className={errWard ? 'error' : ''} value={wardDefaultValue} styles={customSelectStyles} required name='ward' placeholder={wardPlaceHolder}
                                    onChange={e => this.changeWard(e)} options={this.state.wardSelect.data} isClearable={true} isLoading={this.state.wardSelect.isLoading} />
                            </div>
                        </div>
                        {errWard}

                        <div className="row">
                            <div className="col-2" style={{ 'marginLeft': 'auto' }}>
                                <b>Địa chỉ (<i className="fa fa-asterisk require" aria-hidden="true"></i>):</b>
                            </div>
                            <div className="col-5" style={{ marginRight: "auto" }}>
                                <input value={this.state.formData.address} type="text" onChange={e => { this.changeHandler(e) }} className="form-control" required="required" name="address" placeholder="Địa chỉ phòng cho thuê" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-2" style={{ 'marginLeft': 'auto' }}>
                                <b>Mô tả (<i className="fa fa-asterisk require" aria-hidden="true"></i>):</b>
                            </div>
                            <div className="col-5" style={{ marginRight: "auto" }}>
                                <textarea value={this.state.formData.description} onChange={e => { this.changeHandler(e) }} style={{ height: "240px" }} name="description" className="form-control" required="required" placeholder="Thông tin mô tả thêm về nhà trọ" />
                            </div>
                        </div>
                        <div className="row imageInput-container">
                            <div className="col-2" style={{ 'marginLeft': 'auto' }}>
                                <b>Ảnh đại diện :</b>
                            </div>
                            <div className="col-5 imageInput" style={{ marginRight: "auto" }}>
                                <input onChange={this.changeImage} type="file" name="image" id="image" />
                                <img id="img" height="240px" src={this.state.previewImage} />
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: '56px' }}>
                            <button type="submit" className="btn btn-primary" style={{ 'marginLeft': 'auto', 'marginTop': '24px' }}>
                                <i className="fas fa-check"></i>&nbsp; Cập nhật
                    </button>
                            <Link to='/listhouse' style={{ marginTop: '24px', marginRight: 'auto', marginLeft: '12px' }}>
                                <button type="button" className="btn btn-danger cancel" >
                                    <i className="fas fa-times" style={{ fontSize: '18px' }}></i> &nbsp;&nbsp;Huỷ
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
    componentDidMount = async () => {
        if (!this.props.location.state || !this.props.location.state.houseId) {
            this.setState({ 'invalidAccess': true })
        }
        try {
            let response = await api.gethouse(this.props.location.state.houseId)
            if (response.status === 200) {
                var data = response.data
                let image = SERVER + data.image
                data.image = ''
                delete data.userId;
                delete data.status;
                this.setState({ 'originImage': image, 'previewImage': image, 'formData': data })
            } else {
                this.setState({ 'serverError': true })
                return
            }
            let provinces = await api.getlistprovince()
            if (provinces.status !== 200) {
                this.setState({ 'serverError': true })
                return
            }
            let districts = await api.getlistdistrict({ 'province': data.province })
            if (districts.status !== 200) {
                this.setState({ 'serverError': true })
                return
            }
            let wards = await api.getlistward({ 'district': data.district })
            console.log(wards)
            if (wards.status !== 200) {
                this.setState({ 'serverError': true })
                return
            }
            await api.sleep(1000)
            this.setState({
                'provinceSelect': { isLoading: false, data: provinces.data },
                'districtSelect': { isLoading: false, data: districts.data },
                'wardSelect': { isLoading: false, data: wards.data }
            })
        } catch (err) {
            console.log(err)
            this.setState({ 'serverError': true })

        }
    }
    changeImage = (event) => {

        let fieldName = event.target.name;
        let temp = this.state.formData;
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                temp[fieldName] = event.target.files[0]
                this.setState({ formData: temp, previewImage: e.target.result });
            };
            reader.readAsDataURL(event.target.files[0]);
        } else {
            temp[fieldName] = '';
            this.setState({ formData: temp, previewImage: this.state.originImage });
        }
    }

}