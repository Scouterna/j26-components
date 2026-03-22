import { Component, type ComponentInterface, getAssetPath, h, Prop } from "@stencil/core";

/**
 * The avatar component is used to display the user's profile picture.
 * Wrap it with a container, to determine its size, since it scales to fit container.
 */
@Component({
  tag: "scout-avatar",
  styleUrl: "avatar.css",
  shadow: {
    delegatesFocus: true,
  },
  assetsDirs: ['assets'],
})

  /**
   *
   */
export class ScoutAvatar implements ComponentInterface {

  /**
   * The source URL of the user image.
   */
  @Prop() imageSrc = '';

  /**
   * The name of the user.
   */
  @Prop() alt = '';

  render() {
    const getImagePath = () => {
      if (this.imageSrc) {
        return this.imageSrc;
      }
      try {
        return getAssetPath('assets/fallbackImage.png');
      } catch (error) {
        console.info("In storybook, rendering from storybook asset");
        return 'fallbackImage.png';
      }
    };

    return (
      <img src={getImagePath()} alt={this.alt} />
    );
  }
}
