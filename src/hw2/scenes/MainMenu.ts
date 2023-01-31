import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Layer from "../../Wolfie2D/Scene/Layer";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Homework1_Scene from "./HW2Scene";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import GameEvent from "../../Wolfie2D/Events/GameEvent";

import RandUtils from "../../Wolfie2D/Utils/RandUtils";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";

// Layers in the main menu
const MainMenuLayer = {
    MAIN_MENU: "MAIN_MENU", 
    CONTROLS: "CONTROLS",
    ABOUT: "ABOUT"
} as const

// Events triggered in the main menu
const MainMenuEvent = {
    PLAY_GAME: "PLAY_GAME",
	CONTROLS: "CONTROLS",
	ABOUT: "ABOUT",
	MENU: "MENU",
    PLAY_RECORDING: "PLAY_RECORDING"
} as const;

export default class MainMenu extends Scene {
    // Layers, for multiple main menu screens
    private mainMenu: Layer;
    private controls: Layer;
    private about: Layer;

    public override startScene(){
        const center = this.viewport.getCenter();

        // Main menu screen
        this.mainMenu = this.addUILayer(MainMenuLayer.MAIN_MENU);

        // Controls screen
        this.controls = this.addUILayer(MainMenuLayer.CONTROLS);
        this.controls.setHidden(true);
        // About screen

        this.about = this.addUILayer(MainMenuLayer.ABOUT);
        this.about.setHidden(true);

        // Add play button, and give it an event to emit on press
        const play = this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.MAIN_MENU, {position: new Vec2(center.x, center.y - 100), text: "Play"});
        play.size.set(200, 50);
        play.borderWidth = 2;
        play.borderColor = Color.WHITE;
        play.backgroundColor = Color.TRANSPARENT;
        play.onClickEventId = MainMenuEvent.PLAY_GAME;

        // Add controls button
        const controls = this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.MAIN_MENU, {position: new Vec2(center.x, center.y), text: "Controls"});
        controls.size.set(200, 50);
        controls.borderWidth = 2;
        controls.borderColor = Color.WHITE;
        controls.backgroundColor = Color.TRANSPARENT;
        controls.onClickEventId = MainMenuEvent.CONTROLS;

        // Add event button
        const about = this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.MAIN_MENU, {position: new Vec2(center.x, center.y + 100), text: "About"});
        about.size.set(200, 50);
        about.borderWidth = 2;
        about.borderColor = Color.WHITE;
        about.backgroundColor = Color.TRANSPARENT;
        about.onClickEventId = MainMenuEvent.ABOUT;

        // Add play recording button
        const playRecording = this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.MAIN_MENU, {position: new Vec2(center.x, center.y + 200), text: "Play Recording"});
        playRecording.size.set(200, 50);
        playRecording.borderWidth = 2;
        playRecording.borderColor = Color.WHITE;
        playRecording.backgroundColor = Color.TRANSPARENT;
        playRecording.onClickEventId = MainMenuEvent.PLAY_RECORDING;

        const header = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y - 250), text: "Controls"});
        header.textColor = Color.WHITE;

        const ws = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y - 50), text: "-Press W to speed up and S to slow down"});
        ws.textColor = Color.WHITE;
        const ad = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y), text: "-Press A and D to to move left and right respectively"});
        ad.textColor = Color.WHITE;
        const click = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y + 50), text: "-Click to shoot bullets"});
        click.textColor = Color.WHITE;
        const shift = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y + 100), text: "-Press shift to speed up, however you cannot shoot bullets"});
        shift.textColor = Color.WHITE
        const shift2 = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y + 150), text: "while moving faster"});
        shift2.textColor = Color.WHITE;

        const back = this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.CONTROLS, {position: new Vec2(center.x, center.y + 250), text: "Back"});
        back.size.set(200, 50);
        back.borderWidth = 2;
        back.borderColor = Color.WHITE;
        back.backgroundColor = Color.TRANSPARENT;
        back.onClickEventId = MainMenuEvent.MENU;

        const aboutHeader = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.ABOUT, {position: new Vec2(center.x, center.y - 250), text: "About"});
        aboutHeader.textColor = Color.WHITE;

        const text1 = "This game was made by <YOUR NAME HERE>, Peter Walsh and Richard McKenna";
        const text2 = "using the Wolfie2D game engine, a TypeScript game engine created by";
        const text3 = "Joe Weaver and Richard McKenna.";

        const line1 = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.ABOUT, {position: new Vec2(center.x, center.y - 50), text: text1});
        const line2 = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.ABOUT, {position: new Vec2(center.x, center.y), text: text2});
        const line3 = <Label>this.add.uiElement(UIElementType.LABEL, MainMenuLayer.ABOUT, {position: new Vec2(center.x, center.y + 50), text: text3});

        line1.textColor = Color.WHITE;
        line2.textColor = Color.WHITE;
        line3.textColor = Color.WHITE;

        const aboutBack = this.add.uiElement(UIElementType.BUTTON, MainMenuLayer.ABOUT, {position: new Vec2(center.x, center.y + 250), text: "Back"});
        aboutBack.size.set(200, 50);
        aboutBack.borderWidth = 2;
        aboutBack.borderColor = Color.WHITE;
        aboutBack.backgroundColor = Color.TRANSPARENT;
        aboutBack.onClickEventId = MainMenuEvent.MENU;

        // Subscribe to the button events
        this.receiver.subscribe(MainMenuEvent.PLAY_GAME);
        this.receiver.subscribe(MainMenuEvent.CONTROLS);
        this.receiver.subscribe(MainMenuEvent.ABOUT);
        this.receiver.subscribe(MainMenuEvent.MENU);
        this.receiver.subscribe(MainMenuEvent.PLAY_RECORDING);
    }

    public override updateScene(){
        while(this.receiver.hasNextEvent()){
            this.handleEvent(this.receiver.getNextEvent());
        }
    }

    protected handleEvent(event: GameEvent): void {
        switch(event.type) {
            case MainMenuEvent.PLAY_GAME: {
                this.sceneManager.changeToScene(Homework1_Scene, {seed: RandUtils.randomSeed(), recording: true});
                break;
            }
            case MainMenuEvent.CONTROLS: {
                this.controls.setHidden(false);
                this.mainMenu.setHidden(true);
                break;
            }
            case MainMenuEvent.ABOUT: {
                this.about.setHidden(false);
                this.mainMenu.setHidden(true);
                break;
            }
            case MainMenuEvent.MENU: {
                this.mainMenu.setHidden(false);
                this.controls.setHidden(true);
                this.about.setHidden(true);
                break;
            }
            case MainMenuEvent.PLAY_RECORDING: {
                // TODO play the recording here
                break;
            }
            default: {
                throw new Error(`Unhandled event caught in MainMenu: "${event.type}"`);
            }
        }
    }
}