import classes from "./Footer.module.css"

function Footer(props) {
  function handleLogOut() {
    const resp = fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    window.location.href = "/"
  }
  return (
    <div className={classes.footer}>
      <i>*Made by Christian Dover</i>
    </div>
  )
}

export default Footer
