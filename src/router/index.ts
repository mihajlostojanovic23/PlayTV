import type { Router } from "@lightningjs/sdk";
import Home  from "../pages/Home/Home";
import { Sidebar } from "../components/widgets/Sidebar/Sidebar";


export const routes: any = {
  root: "home",
  routes: [
    {
      path: 'home', component: Home, cache:0, widgets: ['sidebar']}
  ],
};
