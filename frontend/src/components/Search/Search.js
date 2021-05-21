import React, { useEffect } from 'react'
import '../../css/home.css'
import api from '../../Api/api.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';

export default function Search (props){
    useEffect(()=>{
        console.log("unmounted")
    })
    const customStyles = {
        control: base => ({
          ...base,
          width: '100%'
        })
      };
        return( 
                    <div className="row search-content" style={{width: '100%'}} >
                        <div className="row" style={{width: '100%',justifyContent: 'space-between',paddingBottom: '10px'}}  >
                        <div  className='col-3'>
                            <b>Khoảng giá:</b>
                            <Select components={{  IndicatorSeparator:() => null }}  options={[               //price
                            {
                                value: 0,
                                label: 'Tất cả khoảng giá'
                            },
                            {
                                    value: 1,
                                    label: 'Dưới 1.000.000'
                            },
                            {
                                value: 2,
                                label: 'Từ 1.000.000 - 1.500.000'
                            },
                            {
                                value: 3,
                                label: 'Từ 1.500.000 - 2.000.000'
                            },
                            {
                                value: 4,
                                label: 'Từ 2.000.000 - 2.500.000'
                            },
                            {
                                value: 5,
                                label: 'Từ 2.000.000 - 3.000.000'
                            },
                            {
                                value: 6,
                                label: 'Từ 3.000.000 - 6.000.000'
                            },
                            {
                                value: 7,
                                label: 'Trên 6.000.000'
                            }
                            ]} 
                            placeholder="Khoảng Giá" onChange={(e)=>props.handlePriceChange(e)}/> 
                        </div>
                            <div className='col-3'>
                                    <b>Thành phố:</b>                
                                    <Select  options={props.datas.listProvince.data} onChange={(e)=> props.handleProvinceChange(e)}  placeholder="Thành phố" styles={customStyles}/>
                            </div>
                            <div className='col-3'>
                                <b>Quận/Huyện:</b>
                                    <Select options={props.datas.listDistrict.data} onChange={(e)=> props.handleDistrictChange(e)}  placeholder="Quận huyện"/>
                            </div>
                                <div className='col-3'>
                                    <b>Xã/Phường:</b>
                                    <Select options={props.datas.listWard.data} onChange={(e)=> props.handleWardChange(e)}  placeholder="Xã/Phường"/> 
                            </div> 
                        </div>
                        <div className="row" style={{width: '100%',justifyContent: 'space-between',paddingBottom: '10px'}}>
                        
                        <div  className='col-3'>
                            <b>Diện tích:</b>
                            <Select className = {Select} placeholder='Dien tich' options={[               //size
                                {
                                    value: 0,
                                    label: 'Tất cả'
                                },
                                {
                                    value: 1,
                                    label: 'Dưới 10 m2'
                                },
                                {
                                    value: 2,
                                    label: '10 - 20 m2'
                                },
                                {
                                    value: 3,
                                    label: '20 - 30 m2'
                                },
                                {
                                    value: 4,
                                    label: '30 - 60 m2'
                                },
                                {
                                    value: 5,
                                    label: 'Trên 60 m2'
                                }
                            ]}
                             onChange={(e)=>props.handleSizeChange(e)} placeholder="Diện tích"/>
                        </div>
                        <div className='col-3'>
                            <b>Loại phòng:</b>
                            <Select options={[ 
                                {
                                    value: 0,
                                    label: 'Tất cả'
                                },              //category
                                {
                                    value: 1,
                                    label: 'Phòng cho thuê'
                                },
                                {
                                    value: 2,
                                    label: 'Homestay'
                                },
                                {
                                    value: 3,
                                    label: 'Ở ghép'
                                },
                                {
                                    value: 4,
                                    label: 'Nguyên căn'
                                }
                            ]} onChange={(e)=> props.handleCategoryChange(e)} placeholder="Loại phòng"/>
                        </div>
                        <div className='col-3'>
                            <b>Sắp xếp theo:</b>
                            <Select options={[               //ordertype
                                {
                                    value: 0,
                                    label: 'Giá'
                                },
                                {
                                    value: 1,
                                    label: 'Thời gian đăng'
                                },
                                {
                                    value: 2,
                                    label: 'Diện tích'
                                }
                            ]} onChange={(e)=>props.handleOrderTypeChange(e)} placeholder="Sắp xếp theo"/>
                        </div>
                        <div className='col-3'>
                            <b>Thứ tự:</b>
                            <Select options={[               //order
                                {
                                    value: 0,
                                    label: 'tăng dần'
                                },
                                {
                                    value: 1,
                                    label: 'Giảm dần'
                                }
                            ]} onChange={(e)=>props.handleOrderChange(e)} placeholder="Thứ tự"/>
                        </div>
                        </div>  
                           
                    </div>)
}
