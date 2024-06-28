import { Colors, Lightning, Utils } from "@lightningjs/sdk";
import Router from "@lightningjs/sdk/src/Router";
import { routes } from "./router";
import { Sidebar } from "./components/widgets/Sidebar/Sidebar";

interface AppTemplateSpec extends Lightning.Component.TemplateSpec {
  Pages: object;
  Loading: object;
  Background: object;
  Widgets: {
    Sidebar: typeof Sidebar;
    Dialog: object;
  };
}

export class App
  extends Router.App
  implements Lightning.Component.ImplementTemplateSpec<AppTemplateSpec>
{
  /*
   * The following properties exist to make it more convenient to access elements
   * below in a type-safe way. They are optional.
   *
   * See https://lightningjs.io/docs/#/lightning-core-reference/TypeScript/Components/TemplateSpecs?id=using-a-template-spec
   * for more information.
   */
  // readonly Background = this.getByRef('Background')!
  // readonly Logo = this.Background.getByRef('Logo')!
  // readonly Text = this.Background.getByRef('Text')!
  // readonly Mystery = this.Background.getByRef('Mystery')!
  readonly Pages = this.getByRef("Pages")!;

  static override _template(): Lightning.Component.Template<AppTemplateSpec> {
    return {
      Pages: {
        collision: true,
        w: 1920,
        h: 1080,
      },
      Loading: {
        // rect: true,
        // w: 1920,
        // h: 1080,
        // // zIndex: 102,
        // color: Colors("#000000").get(),
      },
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        zIndex: -900,
        color: Colors("#000000").get(),
        shader: {},
      },
      Widgets: {
        Sidebar: {
          type: Sidebar,
        },
        Dialog: {
          visible: false,
          zIndex: 110,
        },
      },
    };
  }

  static getFonts() {
    return [
      {
        family: "Regular",
        url: Utils.asset("fonts/Roboto-Regular.ttf") as string,
      },
    ];
  }
  override async _setup() {
    super._setup();
    Router.startRouter(routes, this);
  }

  punchHole() {
    this.tag("Background").shader = {
      color: Colors("#1F2227").get(),
      type: Lightning.shaders.Hole,
      x: 0,
      y: 0,
      w: 1920,
      h: 1080,
    };
  }
  $unpunchHole() {
    this.tag("Background").shader = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    };
  }

  override _handleEnter() {
    // this.tag('Background.Logo')?.setSmooth('scale', 2, {
    //   duration: 2.5,
    // })
    // this.Text.setSmooth('y', 800, {
    //   duration: 2.5,
    // })
    // this.Text.setSmooth('alpha', 0, {
    //   duration: 2.5,
    //   timingFunction: 'ease-out',
    // })
    // this.Mystery.smooth = {
    //   x: 1025,
    //   y: 550,
    //   scale: 1,
    // }
  }

  override _init() {
    // this.stage.transitions.defaultTransitionSettings.duration = 3
    // this.Background.animation({
    //   duration: 15,
    //   repeat: -1,
    //   delay: 1,
    //   actions: [
    //     {
    //       p: 'color',
    //       v: {
    //         0: { v: 0xfffbb03b },
    //         0.5: { v: 0xfff46730 },
    //         0.8: { v: 0xfffbb03b },
    //       },
    //     },
    //   ],
    // }).start()
  }
}
