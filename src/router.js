import './index.css'
import { renderDashboard } from "./dashboard";
import { renderLogin } from "./login";

const routes = {
    "/" : renderLogin,
    "/dashboard" : renderDashboard 
}

const location = window.location.pathname


export function renderPage(path){

    if (localStorage.getItem("user") === null) {
       window.history.pushState({},"","/")
        routes["/"]()
    }
    else{
        window.history.pushState({},"",path)
        routes[path]()}
}

renderPage(location)