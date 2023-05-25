import Link from 'next/link';
import classes from './Footer.module.css';
import Image from 'next/image'
import cookie from "js-cookie"
import { useEffect, useState } from 'react';

function Footer(props) {

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
    <div className={classes.footer}>
        FOOTER
    </div>
  )
}

export default Footer;