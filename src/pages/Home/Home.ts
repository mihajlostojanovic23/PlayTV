import { Colors, Lightning } from "@lightningjs/sdk";
import Router from "@lightningjs/sdk/src/Router";
import colors from "../../../reskin/colors.json";
export default class Home extends Lightning.Component {
  static override _template() {
    return {
      w: 1920,
      h: 1080,
      rect: true,
      collision: true,
      color: Colors(colors.primaryColor).get(),
      clipping: true,
    };
  }

  override _handleLeft() {
    Router.focusWidget("sidebar");
  }

  // override _active() {
  //   Router.focusWidget("sidebar");
  // }
}
