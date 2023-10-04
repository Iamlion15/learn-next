import Head from "next/head"
import Link from "next/link"
import Router from "next/router"
import nProgress from "nprogress"


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
                crossorigin="anonymous" />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
                integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
                crossorigin="anonymous" y
                referrerpolicy="no-referrer"
            />
        </>
    )


const Layout = (props) => {
    const head = () => (
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossorigin="anonymous" />
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
        </ul>
    )

    return <>
        {head()} {nav()} <div className="container  pt-5 pb-5">{props.children}</div>
    </>
}

export default Layout

