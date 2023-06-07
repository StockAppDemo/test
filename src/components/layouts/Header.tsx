import Link from 'next/link';
import classes from './Header.module.css';
import Image from 'next/image'
import cookie from "js-cookie"
import { useEffect, useState } from 'react';

function Header(props) {
  function handleLogOut(){
    const resp = fetch("/api/auth/logout", {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
    })
    window.location.href = "/"
  }
  return (
    <div className={classes.header}>
        <Image src="/header/logo.png" alt="" height={100} width={250} className={classes.logo}></Image>
        <div className={classes.topnav}>
          <Link href="/"><a className={classes.navItem}>Home</a></Link>
          <Link href="/stocks"><a className={classes.navItem}>Stocks</a></Link>
          <Link href="/about"><a className={classes.navItem}>About</a></Link>
          {props.user && props.user.length > 0 && 
          <div className={`${classes.navItem} ${classes.dropDown}`}>
            {props.user}
            <span className={classes.loggedInIcon}><Image src="/images/signed-in.png" alt="" height={20} width={20}></Image></span>
            <div className={`${classes.dropDownMenu} ${classes.informationGrid}`}>
              <div>
                <div className={classes.dropDownHeading}>Stocks</div>
                <div className={classes.dropDownLinks}>
                  <Link href="/stocks"><a>My Stocks</a></Link><br/>
                </div>
              </div>
              <div>
                <div className={classes.dropDownHeading}>Account</div>
                <div className={classes.dropDownLinks}>
                  <Link href={"/user/".concat(props.user)}><a>Account Settings</a></Link>
                  {/* <a onClick={handleLogOut}>Sign Out</a> */}
                  <Link href="/"><a onClick={handleLogOut}>Sign Out</a></Link><br/>
                </div>
              </div>
            </div>
          </div>}


          {props.user && props.user.length !=0 || <Link href="/login"><a className={classes.navItem}>Sign In</a></Link>}
        </div>
    </div>
  )
}

export default Header;