import React from 'react'
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, SubMenu, MenuItem } from 'react-pro-sidebar';
import { FaTachometerAlt, FaSave } from 'react-icons/fa';
import { AiOutlineHome, AiFillHeart, AiFillWarning } from "react-icons/ai";
import { withRouter } from 'react-router-dom';
import { IoIosHome } from "react-icons/io";

// import 'react-pro-sidebar/dist/css/styles.css';
import '../../scss/sideMenu.scss';

class SideMenu extends React.Component {
  constructor(props) {
    super(props)
    let currentLocation =  window.location.pathname.slice(1)
    this.state = {
      image: '',
      collapsed: false,
      rtl: false,
      toggled: true,
      handleToggleSidebar: false,
      menuSelected: currentLocation !== ''? currentLocation : 'home' ,
    }
  }
  collapseMenu = (e) => {
    e.target.classList.toggle('active')
    e.target.classList.toggle('collapsed')
    this.setState({
      collapsed: this.state.collapsed ? false : true
    })
  }
  selectMenu = (e) => {
    let value = e.target.parentNode.getAttribute("value");
    this.setState({
      menuSelected: value
    })
    this.props.history.push('/' + value)

  }
  render() {
    let user = this.props.user
    let dashboard = ''
    let housemange = ''
    let reportmanage = ''
    if (user.acctype === 'Quản trị viên' || user.acctype === 'Chủ nhà trọ') {
      dashboard = <MenuItem
        icon={<FaTachometerAlt />}
        suffix={<span className="badge red">{'New'}</span>}
        value='dashboard'
        active={this.state.menuSelected === 'dashboard' ? true : false}
        onClick={e => this.selectMenu(e)}
      >
        {'Thống kê'}
      </MenuItem>
    }
    if (user.acctype === 'Chủ nhà trọ') {
      reportmanage = <MenuItem
        icon={<AiFillWarning />}
        value='reportmanage'
        active={this.state.menuSelected === 'reportmanage' ? true : false}
        onClick={e => this.selectMenu(e)}
      >
        {'Báo cáo vi phạm'}
      </MenuItem>
    }
    if (user.acctype === 'Chủ nhà trọ') {
      housemange = <SubMenu
        title={'Quản lý nhà trọ'}
        icon={<AiOutlineHome />}
        iconshape="circle"
      >
        <MenuItem
          value='listhouse'
          active={this.state.menuSelected === 'listhouse' ? true : false}
          onClick={e => this.selectMenu(e)}
        >{'Danh sách nhà trọ'}</MenuItem>
        <MenuItem
          value='addhouse'
          active={this.state.menuSelected === 'addhouse' ? true : false}
          onClick={e => this.selectMenu(e)}
        >{'Thêm nhà trọ mới'}</MenuItem>
      </SubMenu>
    }
    return (
      <ProSidebar
        image={this.state.image ? '' : false}
        rtl={this.state.rtl}
        collapsed={this.state.collapsed}
        toggled={this.state.toggled}
        breakPoint="md"
        onToggle={this.state.handleToggleSidebar}
        className='side-menu'
      >
        <SidebarHeader>
          <div
            style={{
              padding: '18px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 14,
              letterSpacing: '1px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'flex',
              paddingRight: '20px'
            }}
          >
            {this.state.collapsed ? '' : 'menu'}
            <a id="hamburger-icon" className='menu-icon active' onClick={e => this.collapseMenu(e)} title="Menu">
              <span className="line line-1"></span>
              <span className="line line-2"></span>
              <span className="line line-3"></span>
            </a>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconshape="circle">
            <MenuItem icon={<IoIosHome />}
              active={true}
              value='home'
              active={this.state.menuSelected === 'home' ? true : false}
              onClick={e => this.selectMenu(e)}>
              {'Trang chủ'}
            </MenuItem>
            {dashboard}
            {housemange}
            {reportmanage}
            <MenuItem icon={<AiFillHeart />}
              active={true}
              value='likedlist'
              active={this.state.menuSelected === 'likedlist' ? true : false}
              onClick={e => this.selectMenu(e)}>
              {'Phòng trọ đã thích'}
            </MenuItem>
            <MenuItem icon={<FaSave />}
              active={true}
              value='savedlist'
              active={this.state.menuSelected === 'savedlist' ? true : false}
              onClick={e => this.selectMenu(e)}>
              {'Phòng trọ đã lưu'}
            </MenuItem>
          </Menu>
          {/* <Menu iconShape="circle">
                <SubMenu
                  suffix={<span className="badge yellow">3</span>}
                  title={'withSuffix'}
                  icon={<FaRegLaughWink />}
                >
                  <MenuItem>{'submenu'} 1</MenuItem>
                  <MenuItem>{'submenu'} 2</MenuItem>
                  <MenuItem>{'submenu'} 3</MenuItem>
                </SubMenu>
                <SubMenu
                  prefix={<span className="badge gray">3</span>}
                  title={'withPrefix'}
                  icon={<FaHeart />}
                >
                  <MenuItem>{ 'submenu' } 1</MenuItem>
                  <MenuItem>{'submenu' } 2</MenuItem>
                  <MenuItem>{'submenu'} 3</MenuItem>
                </SubMenu>
                <SubMenu title={'multiLevel'} icon={<FaList />}>
                  <MenuItem>{'submenu' } 1 </MenuItem>
                  <MenuItem>{ 'submenu' } 2 </MenuItem>
                  <SubMenu title={ `submenu 3`}>
                    <MenuItem>{'submenu'} 3.1 </MenuItem>
                    <MenuItem>{'submenu'} 3.2 </MenuItem>
                    <SubMenu title={`submenu 3.3`}>
                      <MenuItem>{'submenu'} 3.3.1 </MenuItem>
                      <MenuItem>{'submenu'} 3.3.2 </MenuItem>
                      <MenuItem>{'submenu'} 3.3.3 </MenuItem>
                    </SubMenu>
                  </SubMenu>
                </SubMenu>
              </Menu> */}
        </SidebarContent>

        {/* <SidebarFooter style={{ textAlign: 'center' }}>

        </SidebarFooter> */}
      </ProSidebar>
    );
  }
}
export default withRouter(SideMenu)