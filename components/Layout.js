import Head from "next/head"
import Link from "next/link"
import Router from "next/router"
import { isAuth,logout } from "../helpers/auth"
import nProgress from "nprogress"
import 'nprogress/nprogress.css'


Router.onRouteChangeStart = url => nProgress.start()
Router.onRouteChangeComplete = url => nProgress.done()
Router.onRouteChangeError = url => nProgress.done() 

const Layout = (props) => {
    const head = () => (
        <>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
                integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                crossOrigin="anonymous" />
            <link
                rel="stylesheet"
                href="/static/css/styles.css"
            />
        </>
    )

    const nav = () => (
        <ul className="nav nav-tabs bg-warning">
            <li className="nav-item">
                <Link href="/">
                    <a className="nav-link text-dark">Home</a>
                </Link>
            </li>
            <li className="nav-item">
                <Link href="/login">
                    <a className="nav-link text-dark">Login</a>
                </Link>

            </li>
            <li className="nav-item">
                <Link href="/register">
                    <a className="nav-link text-dark">Register</a>
                </Link>
            </li>
            <li className="nav-item">

                    <a onClick={logout} className="nav-link text-dark">Logout</a>
            </li>
        </ul>
    )

    return <>
        {head()} {nav()} <div className="container  pt-5 pb-5">{props.children}</div>
    </>
}

export default Layout

