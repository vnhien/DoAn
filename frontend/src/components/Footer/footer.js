import "../../css/footer.css";
import React from "react";

export default class Footer extends React.Component {
  render() {
    return (
      <footer class="footer">
        <div class="container bottom_border">
          <div class="row">
            <div class=" col-sm-4 col-md col-sm-4  col-12 col">
              <h5 class="headin5_amrc col_white_amrc pt2">Về chúng tôi</h5>
              <p class="mb10">Nhóm 7 - Đồ án thiết kế Hệ thống thông tin</p>
              <p>
                <i class="fa fa-phone"></i> (+84)123456789{" "}
              </p>
              <p>
                <i class="fa fa fa-envelope"></i> info@example.com{" "}
              </p>
            </div>

            <div class=" col-sm-4 col-md  col-6 col">
              <h5 class="headin5_amrc col_white_amrc pt2">Loại phòng trọ</h5>
              <ul class="footer_ul_amrc">
                <li>
                  <a href="#">Phòng trọ giá rẻ</a>
                </li>
                <li>
                  <a href="#">Chung cư mini</a>
                </li>
                <li>
                  <a href="#">Chung cư cao cấp</a>
                </li>
                <li>
                  <a href="#">Ở ghép</a>
                </li>
              </ul>
            </div>

            <div class=" col-sm-4 col-md  col-6 col">
              <h5 class="headin5_amrc col_white_amrc pt2">Khu vực</h5>
              <ul class="footer_ul_amrc">
                <li>
                  <a href="#">Hà Nội</a>
                </li>
                <li>
                  <a href="#">TP Hồ Chí Minh</a>
                </li>
                <li>
                  <a href="#">Đà Nẵng</a>
                </li>
                {/* <li>
                  <a href="#"></a>
                </li> */}
              </ul>
            </div>

            <div class=" col-sm-4 col-md  col-12 col">
              <h5 class="headin5_amrc col_white_amrc pt2">Follow us</h5>

              <ul class="footer_ul2_amrc">
                <li>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i class="fab fa-facebook-square fleft padding-right"></i>
                  </a>
                  <p>Hoàng Thị Hảo</p>
                </li>
                <li>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i class="fab fa-facebook-square fleft padding-right"></i>{" "}
                  </a>
                  <p>Vũ Ngọc Hiển</p>
                </li>
                <li>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i class="fab fa-facebook-square fleft padding-right"></i>{" "}
                  </a>
                  <p>Nguyễn Minh Hiếu</p>
                </li>
                <li>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i class="fab fa-facebook-square fleft padding-right"></i>{" "}
                  </a>
                  <p>Đồng Văn Hiệp</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="container">
          <ul class="foote_bottom_ul_amrc">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
          <p class="text-center">
            Copyright @2021 | Designed by <a href="#">Nhóm 7</a>
          </p>

          <ul class="social_footer_ul">
            <li>
              <a href="https://www.facebook.com/" target="_blank">
                <i class="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/" target="_blank">
                <i class="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/" target="_blank">
                <i class="fab fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/" target="_blank">
                <i class="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </footer>
      //         <div className="footer">
      //             <div className="footer-header">
      //                 <p>This's a project made by Group 7 in IT5005 project </p>
      //                 <p className="question">How do you contact us?</p>
      //             </div>
      //             <div className="contact">
      //                 <a href="https://www.facebook.com/nmhieu.561273" target="_blank">
      //                     <i className="fab fa-facebook-square"></i>
      //     Facebook
      // </a>
      //                 <a href="https://github.com/NMHIEU2021999" target="_blank" id="profile-link">
      //                     <i className="fab fa-github"></i>
      //     GitHub
      // </a>
      //                 <a href="https://twitter.com/" target="_blank">
      //                     <i className="fab fa-twitter"></i>
      //     Twitter
      // </a>
      //                 <a href="https://www.instagram.com/" target="_blank">
      //                     <i className="fab fa-instagram"></i>
      //     Instagram
      // </a>
      //                 <a href="https://www.skype.com/" target="_blank">
      //                     <i className="fab fa-skype"></i>
      //     Skype
      // </a>
      //             </div>
      //             <p className="copyright">&copy; Copyright Group7_IT5005 </p>
      //         </div>
    );
  }
}
