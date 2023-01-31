import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Input from "../../Wolfie2D/Input/Input";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import MainMenu from "./MainMenu";

/**
 * The scene after the main HW3Scene. The scene ends when the user clicks anywhere on
 * the screen.
 */
export default class GameOver extends Scene {
    private bubblesPopped: number;
    private minesDestroyed: number;
    private timePassed: number;

    private bubbleTier: number;
    private mineTier: number;
    private timeTier: number;

    // The emojis for the different tiers on the GameOver screen. Your welcome ;) - PeteyLumpkins
    private static tier = [
        0x1F921, 
        0x1F612, 
        0x1F610,
        0x1F60E, 
        0x1F975
    ];

    public initScene(options: Record<string, any>){
        this.bubblesPopped = options.bubblesPopped;
        this.minesDestroyed = options.minesDestroyed;
        this.timePassed = Math.round(options.timePassed);
        this.timeTier = this.getTimeTier(this.timePassed);
        this.mineTier = this.getMineTier(this.minesDestroyed);
        this.bubbleTier = this.getBubbleTier(this.bubblesPopped);
    }

    public getTimeTier(time: number) {
        switch(true) {
            case time <= 30:
                return GameOver.tier[0];
            case time <= 60:
                return GameOver.tier[1];
            case time <= 90:
                return GameOver.tier[2];
            case time <= 120:
                return GameOver.tier[3];
            case time > 120:
                return GameOver.tier[4];
            default: 
                return GameOver.tier[0];
        }
    }

    public getMineTier(mines: number) {
        switch(true) {
            case mines <= 10:
                return GameOver.tier[0];
            case mines <= 20:
                return GameOver.tier[1];
            case mines <= 30:
                return GameOver.tier[2];
            case mines <= 40:
                return GameOver.tier[3];
            case mines > 50:
                return GameOver.tier[4];
            default:
                return GameOver.tier[0];
        }
    }

    public getBubbleTier(bubbles: number) {
        switch(true) {
            case bubbles <= 10:
                return GameOver.tier[0];
            case bubbles <= 20:
                return GameOver.tier[1];
            case bubbles <= 30:
                return GameOver.tier[2];
            case bubbles <= 40:
                return GameOver.tier[3];
            case bubbles > 40:
                return GameOver.tier[4];
            default:
                return GameOver.tier[0];
        }
    }

    public startScene() {
        const center = this.viewport.getCenter();

        this.addUILayer("primary");

        const gameOver = <Label>this.add.uiElement(UIElementType.LABEL, "primary", {position: new Vec2(center.x, center.y - 200), text: "Game Over"});
        gameOver.textColor = Color.WHITE;

        const time = <Label>this.add.uiElement(UIElementType.LABEL, "primary", {position: new Vec2(center.x, center.y), text: `${String.fromCodePoint(this.timeTier)} You lasted ${(this.timePassed)} seconds! ${String.fromCodePoint(this.timeTier)}`});
        time.textColor = Color.GREEN;

        const mines = <Label>this.add.uiElement(UIElementType.LABEL, "primary", {position: new Vec2(center.x, center.y + 100), text: `${String.fromCodePoint(this.mineTier)} You destroyed ${this.minesDestroyed} mines! ${String.fromCodePoint(this.mineTier)}`});
        mines.textColor = Color.GREEN;

        const bubbles = <Label>this.add.uiElement(UIElementType.LABEL, "primary", {position: new Vec2(center.x, center.y + 200), text: `${String.fromCodePoint(this.bubbleTier)} You popped ${this.bubblesPopped} bubbles! ${String.fromCodePoint(this.bubbleTier)}`})
        bubbles.textColor = Color.GREEN;

        const text = <Label>this.add.uiElement(UIElementType.LABEL, "primary", {position: new Vec2(center.x, center.y + 300), text: "Click to return to main menu"});
        text.textColor = Color.WHITE;
    }

    public updateScene(){
        if(Input.isMouseJustPressed()){
            this.sceneManager.changeToScene(MainMenu);
        }
    }
}