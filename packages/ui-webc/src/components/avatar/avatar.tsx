import { Component, type ComponentInterface, h, Prop } from "@stencil/core";
import { getAssetPath } from '@stencil/core';

@Component({
  tag: "scout-avatar",
  styleUrl: "avatar.css",
  shadow: {
    delegatesFocus: true,
  },
  assetsDirs: ['assets'],
})
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

    const fallback = getAssetPath('fallbackImage.png');
    console.log('Fallback asset path:', fallback);

    return (
      <img src={getAssetPath('./assets/fallbackImage.png')} alt={this.alt} />
    );
  }
}
