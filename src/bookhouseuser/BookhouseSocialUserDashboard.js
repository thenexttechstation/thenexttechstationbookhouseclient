import React from "react";
import BookHouseLayout from "../bookhousecore/BookhouseLayout";
import {
  isSocialAuthenticated,
  isAuthenticated
} from "../bookhouseapi/Bookhouseuserapi";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Time from "react-time";
import BookHouseMenu from "../bookhousecore/BookHouseMenu";
//import "../stylesuser.css";
import {
  SearchSharp,
  HomeOutlined,
  CalendarViewDayOutlined,
  ShareOutlined,
  ThumbUp,
  Edit,
  EmailTwoTone,
  SupervisedUserCircleRounded,
  AlternateEmail,
  KeyboardArrowDown,
  LibraryBooks,
  AddShoppingCart,
  MenuBook,
  Star,
  Info
} from "../../node_modules/@material-ui/icons";

const BookhouseSocialUserDashboard = () => {
  var user = isSocialAuthenticated();
  const dateToFormat = new Date();

  const { displayName, email, photoURL, lastLoginAt } = user;
  const {
    providerData: [{ providerId }]
  } = isSocialAuthenticated();
  const bookhouseuserlinks = () => {
    return (
      <div className="card">
        <h3 className="card-header">Customer Links</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/bookhouseprofile/update">
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userinfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header"> Book House User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <label>User Name: {displayName} </label>
          </li>
          <li className="list-group-item">
            <label>Email: {email} </label>
          </li>
          <li className="list-group-item">
            <label>Role : Customer</label>
          </li>
          <li className="list-group-item">
            <label>Auth Provider : {providerId}</label>
          </li>
          <li className="list-group-item">
            <label>
              <Time value={lastLoginAt} format="DD/MM/YYYY">
                {" "}
              </Time>
            </label>
            <label></label>
          </li>

          <div class="polaroid">
            <img src={photoURL} />
            <div class="container">
              <p>Cinque Terre</p>
            </div>
          </div>
        </ul>
      </div>
    );
  };

  const purchaseHistory = () => {
    return (
      <div className="card">
        <h3 className="card-header"> Book House Purchase</h3>
        <ul className="list-group">
          <li className="list-group-item">Books</li>
        </ul>
      </div>
    );
  };
  return (
    <div>
      <BookHouseMenu></BookHouseMenu>
      <main>
        <div id="device-bar-1">
          <button></button>
          <button></button>
          <button></button>
        </div>
        <header>
          <div class="tb">
            <div class="td" id="logo">
              <a href="#">
                <i class="fab fa-facebook-square"></i>
              </a>
            </div>
            <div class="td" id="search-form">
              <form method="get" action="#">
                <input type="text" placeholder="Search Bookhouse" />
                <button type="submit">
                  <SearchSharp></SearchSharp>
                </button>
              </form>
            </div>
            <div class="td" id="f-name-l">
              <span>{displayName}</span>
            </div>
            <div class="td" id="i-links">
              <div class="tb">
                <div class="td" id="m-td">
                  <div class="tb">
                    <span class="td">{email}</span>
                  </div>
                </div>
                <div class="td">
                  <a href="#" id="p-link">
                    <img src={photoURL} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div id="profile-upper">
          <div id="profile-banner-image">
            <img
              src="https://bookhouse.s3.amazonaws.com/14.jpg"
              alt="Banner image"
            />
          </div>
          <div id="profile-d">
            <div id="profile-pic">
              <img src={photoURL} />
            </div>
            <div id="u-name">{displayName}</div>
            <div class="tb" id="m-btns">
              <div class="td">
                <div class="m-btn">{email}</div>
              </div>
              <div class="td">
                <div class="m-btn">
                  <span>{providerId}</span>
                </div>
              </div>
            </div>
          </div>
          <div id="black-grd"></div>
        </div>
        <div id="main-content">
          <div class="tb">
            <div class="td" id="l-col">
              <div class="l-cnt">
                <div class="cnt-label">
                  <i class="l-i" id="l-i-i"></i>
                  <span>My profile</span>
                  <div class="lb-action">
                    <Edit></Edit>{" "}
                  </div>
                </div>
                <div id="i-box">
                  <div id="intro-line">
                    Email <EmailTwoTone></EmailTwoTone>
                  </div>
                  {email}

                  <div id="u-occ">
                    Display Name{" "}
                    <SupervisedUserCircleRounded></SupervisedUserCircleRounded>
                  </div>
                  {displayName}
                  <div id="u-loc">
                    Provider<AlternateEmail></AlternateEmail>
                    <a href="#">{providerId}</a>,
                  </div>
                </div>
              </div>
              <div class="l-cnt l-mrg">
                <div class="cnt-label">
                  <LibraryBooks></LibraryBooks>
                  <span>Books</span>
                  <div class="lb-action" id="b-i">
                    <KeyboardArrowDown></KeyboardArrowDown>
                  </div>
                </div>
                <div id="photos">
                  <div class="tb">
                    <div class="tr">
                      <div class="td"></div>
                      <div class="td"></div>
                      <div class="td"></div>
                    </div>
                    <div class="tr">
                      <div class="td"></div>
                      <div class="td"></div>
                      <div class="td"></div>
                    </div>
                    <div class="tr">
                      <div class="td"></div>
                      <div class="td"></div>
                      <div class="td"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="l-cnt l-mrg">
                <div class="cnt-label">
                  <i class="l-i" id="l-i-k"></i>
                  <span>
                    Did You Know<i id="k-nm">1</i>
                  </span>
                </div>
                <div>
                  <div class="q-ad-c">
                    <a href="#" class="q-ad">
                      <img src="https://imagizer.imageshack.com/img923/1849/4TnLy1.png" />
                      <span>My favorite superhero is...</span>
                    </a>
                  </div>
                  <div class="q-ad-c">
                    <a href="#" class="q-ad" id="add_q">
                      <i class="material-icons">add</i>
                      <span>Add Answer</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="td" id="m-col">
              <div class="m-mrg" id="p-tabs">
                <div class="tb">
                  <div class="td">
                    <div class="tb" id="p-tabs-m">
                      <div class="td active">
                        <HomeOutlined></HomeOutlined>
                        <span>BOOK HOUSE </span>
                      </div>
                      <div class="td">
                        <LibraryBooks></LibraryBooks>
                        <span>Purchased Books</span>
                      </div>
                      <div class="td">
                        <MenuBook></MenuBook>
                        <span>New Arrivals</span>
                      </div>
                      <div class="td">
                        <Star></Star>
                        <span>Top Reads</span>
                      </div>
                      <div class="td">
                        <Info></Info>
                        <span>About</span>
                      </div>
                    </div>
                  </div>
                  <div class="td" id="p-tab-m">
                    <AddShoppingCart></AddShoppingCart>
                    <span>Cart</span>
                  </div>
                </div>
              </div>
              <div class="m-mrg" id="composer">
                <div id="c-tabs-cvr">
                  <div class="tb" id="c-tabs">
                    <div class="td active">
                      <span>Make Post</span>
                    </div>
                    <div class="td">
                      <span>Photo/Video</span>
                    </div>
                    <div class="td">
                      <span>Live Video</span>
                    </div>
                    <div class="td">
                      <span>Life Event</span>
                    </div>
                  </div>
                </div>
                <div id="c-c-main">
                  <div class="tb">
                    <div class="td" id="p-c-i">
                      <img src={photoURL} alt="Profile pic" />
                    </div>
                    <div class="td" id="c-inp">
                      <input type="text" placeholder="What's on your mind?" />
                    </div>
                  </div>
                  <div id="insert_emoji">
                    <i class="material-icons">insert_emoticon</i>
                  </div>
                </div>
              </div>
              <div>
                <div class="post">
                  <div class="tb">
                    <a href="#" class="td p-p-pic">
                      <img
                        src="https://bookhouse.s3.amazonaws.com/17.jpg"
                        alt="Rajeev's profile pic"
                      />
                    </a>
                    <div class="td p-r-hdr">
                      <div class="p-u-info">
                        <a href="#">Book House</a> shared a memory to
                        <a href="#"> {displayName}</a>
                      </div>
                      <div class="p-dt">
                        <CalendarViewDayOutlined></CalendarViewDayOutlined>
                        <span>
                          <Moment format="YYYY/MM/DD" date={dateToFormat} />
                        </span>
                      </div>
                    </div>
                    <div class="td p-opt">
                      <ShareOutlined></ShareOutlined>
                    </div>
                  </div>
                  <a href="#" class="p-cnt-v">
                    <img
                      class="imguser"
                      src="https://bookhouse.s3.amazonaws.com/16.jpg"
                    />
                  </a>
                  <div>
                    <div class="p-acts">
                      <div class="p-act like">
                        <ThumbUp></ThumbUp>
                        <span>25</span>
                      </div>
                      <div class="p-act comment">
                        <i class="material-icons">comment</i>
                        <span>1</span>
                      </div>
                      <div class="p-act share">
                        <i class="material-icons">reply</i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookhouseSocialUserDashboard;
