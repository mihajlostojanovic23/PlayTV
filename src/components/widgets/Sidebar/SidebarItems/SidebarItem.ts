import { Colors, Lightning, Utils } from "@lightningjs/sdk";
import { Column } from "@lightningjs/ui-components";
import colors from "../../../../../reskin/colors.json";

interface SidebarTemplateSpec extends Lightning.Component.TemplateSpec {
  Item: {
    IconWrapper: {
      ItemIcon: object;
    };
    ItemTitle: {
      Title: object;
    };
  };
  Border: object;
}

export class SidebarItem
  extends Lightning.Component
  implements Lightning.Component.ImplementTemplateSpec<SidebarTemplateSpec>
{
  item: any;
  index: any;

  static override _template(): Lightning.Component.Template<SidebarTemplateSpec> {
    return {
      flex: {
        direction: "row",
        justifyContent: "center",
      },
      zIndex: 300,
      collision: true,
      Item: {
        collision: true,
        w: 260,
        h: 80,
        rect: true,
        color: Colors(colors.primaryColor).alpha(0).get(),
        flex: {
          alignItems: "center",
          // justifyContent: "center",
        },
        IconWrapper: {
          w: 100,
          h: 80,
          x: 20,
          flex: {
            alignItems: "center",
            // justifyContent: "center",
          },
          ItemIcon: {},
        },
        ItemTitle: {
          w: 200,
          h: 80,
          flex: {
            direction: "row",
            alignItems: "center",
            // justifyContent: "center",
          },
          Title: {
            x: 30,
            y: 6,
            text: {
              fontSize: 30,
            },
          },
        },
      },
      Border: {},
    };
  }

  set setItem(value: any) {
    this.item = value;
  }

  set setIndex(value: any) {
    this.index = value;
  }

  override _active() {
    console.log(this.item);
    this.tag("Item.IconWrapper.ItemIcon").patch({
      texture: Lightning.Tools.getSvgTexture(
        Utils.asset(`images/${this.item.icon}`),
        50,
        50
      ),
    });
    this.tag("Item.ItemTitle.Title").patch({
      text: { text: this.item.title },
    });
  }

  override _focus() {
    this.tag("Item").patch({
      color: Colors(colors.focusColor).get(),
    });
  }

  override _unfocus() {
    this.tag("Item").patch({
      color: Colors(colors.primaryColor).alpha(0).get(),
    });
  }

  override _handleEnter() {
    console.log(this.item.title);
  }

  _handleHover() {
    (this.fireAncestors as any)("$setFocus", this.index);
    this._focus();
    console.log(this.index);
  }

  _handleUnhover() {
    this._unfocus();
  }

  _handleClick() {
    this._handleEnter();
  }
}
