// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.

const animals = ['🦁','🐨','🐶','🐻','🐷','🐯','🐰','🐼','🐱','🐵']

function getRandomInt() {
  const max = animals.length
  return Math.floor(Math.random() * max);
}

figma.ui.onmessage =  async (msg: {type: string, count: number}) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'create') {
    const nodes: SceneNode[] = [];
    for (let i = 0; i < msg.count; i++) {
      const text = figma.createText()
      await figma.loadFontAsync(text.fontName as FontName)

      const randomInt = getRandomInt()
      text.characters = animals[randomInt]

      text.fontSize = 64
      text.x = i * 100;
      figma.currentPage.appendChild(text);
      nodes.push(text);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  if (msg.type === 'close') {
    figma.closePlugin();
  }
};
