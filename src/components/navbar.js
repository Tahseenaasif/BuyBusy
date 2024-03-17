import React from "react";
import "../Styles/navbar.css";
import singinicon from "../assets/sigin.png";
import homeicon from "../assets/homeicon.png";
import Cartcon from "../assets/trolley.png";
import Order from "../assets/order.png";
import Logout from "../assets/logout.png";
import { useValue } from "../productContext.js";
import { Outlet, NavLink } from "react-router-dom";
import { useAuthValue } from "../authContext";
import { useNavigate } from "react-router-dom";
function Navbar() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const { cartItem, setcartItem, setOrder } = useValue();
    const { signOut } = useAuthValue()
    const navigate = useNavigate();
    const logout = async () => {
        await signOut();
        setcartItem([])
        setOrder([])
        navigate("/")
    }
    return (
        <>
            <header>
                <nav className="navbar" style={{ display: "flex", justifyContent: "space-evenly", boxShadow: "rgba(17, 17, 26, 0.05) 0px 15px 20px", width: "100%" }} >
                    <div className="navbar-container" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <a aria-current="page" className="navbar-logo active" href="/"> Busy Buy</a>
                        <ul className="nav-menu">
                            <li className="nav-item active">
                                <NavLink className="nav-links active" to="/" aria-current="page" activeClassName="active-links" exact={true} >
                                    <span>
                                        <img className="icon_styles" src={homeicon} alt="Home" width="30" height="30" />
                                    </span>
                                    Home
                                </NavLink>
                                {isLoggedIn && (<NavLink className="nav-links active" to="/myorder" aria-current="page" activeClassName="active-links" exact={true} >
                                    <span>
                                        <img className="icon_styles" src={Order} alt="Home" width="30" height="30" />
                                    </span>
                                    My Orders
                                </NavLink>
                                )}
                                {isLoggedIn && (<NavLink className="nav-links active" to="/cart" aria-current="page" activeClassName="active-links" exact={true} >
                                    <span>
                                        <img className="icon_styles" src={Cartcon} alt="Home" width="30" height="30" />

                                    </span>
                                    Cart   <p>&nbsp; {cartItem.length}</p>
                                </NavLink>
                                )}
                                {!isLoggedIn && (<NavLink className="nav-links active" to="/signin" aria-current="page" activeClassName="active-links" exact={true} >
                                    <span>
                                        <img className="icon_styles" src={singinicon} alt="Home" width="30" height="30" />
                                    </span>
                                    SignIn
                                </NavLink>
                                )}
                                {isLoggedIn && (<NavLink className="nav-links active" to="/" aria-current="page" activeClassName="active-links" exact={true}
                                    onClick={logout}
                                >
                                    <span>
                                        <img className="icon_styles" src={Logout} alt="Home" width="30" height="30" />
                                    </span>
                                    Logout
                                </NavLink>
                                )}
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <Outlet />
        </>

    );
}

export default Navbar;
