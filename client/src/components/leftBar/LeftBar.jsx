import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Codeforces from "../../assets/codeforces.png";
import Leetcode from "../../assets/leetcode.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const LeftBar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src={"/upload/" +currentUser.profilePic}
              alt=""
            />
            <span>{currentUser.name}</span>
          </div>
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={Codeforces} alt="" />
            <a href="https://codeforces.com/">Codeforces</a>
          </div>
          <div className="item">
            <img src={Leetcode} alt="" />
            <a href="https://leetcode.com/">Leetcode</a>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Fund} alt="" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src={Tutorials} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt="" />
            <span>Courses</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Calender</span>
          <div className="item">
            <img src={Events} alt="" />
            <span>Codeforces:<br/>
                  Div-3: 22.06.2024<br/>
                  Div-2: 01.07.2024<br/>
                  <br/>
                  Codechef:<br/>

            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
