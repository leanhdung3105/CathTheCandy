import { _decorator, Component, RigidBody2D, Vec2, find } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Candy')
export class Candy extends Component {
    @property
    public speed: number = 10; // Tốc độ rơi

    start() {
        // thiết lập vận tốc rơi xuống
        let rigidBody = this.getComponent(RigidBody2D);
        if (rigidBody) {
            rigidBody.linearVelocity = new Vec2(0, -this.speed);
        }
    }

    update(dt: number) {
        if (this.node.position.y < -350) { 
            
            // Tìm Canvas
            let canvasNode = find('Canvas');
            if (canvasNode) {
                let gm = canvasNode.getComponent(GameManager);
                if (gm) gm.onCandyDropped();
            }

            this.node.destroy(); 
        }
    }
}