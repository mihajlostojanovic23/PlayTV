import { Colors, Lightning, Utils } from "@lightningjs/sdk";
import { Column } from "@lightningjs/ui-components";
import { sidebarItems } from "../../../utils/sidebarItems";
import { SidebarItem } from "./SidebarItems/SidebarItem";
import Router from "@lightningjs/sdk/src/Router";

interface SidebarTemplateSpec extends Lightning.Component.TemplateSpec {
  Logo: {
    Icon: object;
  };
  Menu: {
    Items: any;
  };
}

export class Sidebar
  extends Lightning.Component
  implements Lightning.Component.ImplementTemplateSpec<SidebarTemplateSpec>
{
  readonly Items = this.getByRef("Menu.Items")!;

  static override _template(): Lightning.Component.Template<SidebarTemplateSpec> {
    return {
      w: 120,
      h: 1080,
      collision: true,
      rect: true,
      colorTop: Colors("#17171c").get(),
      colorBottom: Colors("#070708").get(),
      clipping: true,
      zIndex: 100,
      Logo: {
        w: 120,
        flex: {
          direction: "column",
          justifyContent: "center",
          alignItems: "center",
        },
        Icon: {
          y: 60,
          rect: true,
          texture: Lightning.Tools.getSvgTexture(
            Utils.asset("/images/logo.svg"),
            80,
            80
          ),
        },
      },
      Menu: {
        y: 60,
        Items: {
          collision: true,
          zIndex: 200,
          type: Column,
          style: { itemSpacing: 120 },
        },
      },
    };
  }

  $setFocus(index: number) {
    //! Check better way for change certain focus item
    setTimeout(() => {
      this.tag("Menu.Items").selectedIndex = index;
    }, 1);
  }

  override _active() {
    this.tag("Menu.Items").patch({
      w: 300,
      h: 1080,
      y: 200,
      collision: true,
      items: sidebarItems.map((item, index) => ({
        type: SidebarItem,
        w: 280,
        item: item,
        collision: true,
        index,
      })),
    });
  }

  _checkActivePage() {
    const activePage = Router.getActiveHash();
    console.log(activePage);
    sidebarItems.map((item, index) => {
      if (activePage === item.path) {
        this.tag("Menu.Items").selectedIndex = index;
        return;
      }
    });
  }

  override _getFocused() {
    return this.tag("Menu.Items");
  }

  override _focus() {
    this._checkActivePage();
    this.tag("Logo").smooth = { w: 280 };
    this.smooth = { w: 280 };
  }

  override _unfocus() {
    this.tag("Logo").smooth = { w: 120 };
    this.smooth = { w: 120 };
  }

  _handleHover() {
    Router.focusWidget("sidebar");
    this._focus();
  }

  _handleUnhover() {
    Router.focusPage();
    this._unfocus();
  }

  override _handleLeft() {
    return true;
  }

  override _handleUp() {
    return true;
  }

  override _handleDown() {
    return true;
  }
}
