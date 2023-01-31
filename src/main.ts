import Game from "./Wolfie2D/Loop/Game";
import MainMenu from "./hw2/scenes/MainMenu";
import RegistryManager from "./Wolfie2D/Registry/RegistryManager";

import { HW2Controls } from "./hw2/HW2Controls";

import BubbleShaderType from "./hw2/shaders/BubbleShaderType";
import LaserShaderType from "./hw2/shaders/LaserShaderType";

// The main function is your entrypoint into Wolfie2D. Specify your first scene and any options here.
(function main(){
    
    // Set up options for our game
    let options = {
        canvasSize: {x: 900, y: 900},          // The size of the game
        clearColor: {r: 0.1, g: 0.1, b: 0.1},   // The color the game clears to
        inputs: [
            { name: HW2Controls.MOVE_UP, keys: ["w"] },   // Forward is assigned to w
            { name: HW2Controls.MOVE_DOWN, keys: ["s"] },  // and so on...
            { name: HW2Controls.MOVE_LEFT, keys: ["a"] },
            { name: HW2Controls.MOVE_RIGHT, keys: ["d"] },
        ],
        useWebGL: true,                        // Tell the game we want to use webgl
        showDebug: false                       // Whether to show debug messages. You can change this to true if you want
    }
    // We have a custom shader, so lets add it to the registry and preload it
    // The registry essentially just ensures that we can locate items by name later, rather than needing
    // the class constructor. Here, we additionally make sure to preload the data so our
    // shader is available throughout the application
    RegistryManager.shaders.registerAndPreloadItem(
        BubbleShaderType.KEY,   // The key of the shader program
        BubbleShaderType,           // The constructor of the shader program
        BubbleShaderType.VSHADER,   // The path to the vertex shader
        BubbleShaderType.FSHADER);  // the path to the fragment shader*/

    RegistryManager.shaders.registerAndPreloadItem(
        LaserShaderType.KEY,
        LaserShaderType,
        LaserShaderType.VSHADER, 
        LaserShaderType.FSHADER
    );

    // Create a game with the options specified
    const game = new Game(options);

    // Start our game
    game.start(MainMenu, {});
})();
