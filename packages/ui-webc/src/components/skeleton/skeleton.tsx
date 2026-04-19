import { Component, type ComponentInterface, h, Prop } from "@stencil/core";

/**
 * Render this component while you are waiting for your content.
 * Could be a fetch, or another way of loading data.
 * Either toggle the render of the component, or use the disable property unmount the skeleton.
 */
@Component({
  tag: "scout-skeleton",
  styleUrl: "skeleton.css",
  shadow: {
    delegatesFocus: true,
  },
})
export class ScoutSkeleton implements ComponentInterface {
  /**
   * Disable skeleton, unmounting the skeleton.
   */
  @Prop() disable = false;

  /**
   * If you are in need of a specific background color, you can set it.
   */
  @Prop() backgroundColor: string | null = null;

  render() {
    if (!this.disable) {
      return (
        <div
          class="skeleton"
          style={{
            ...(this.backgroundColor && {
              backgroundColor: this.backgroundColor,
            }),
          }}
        ></div>
      );
    }
  }
}
