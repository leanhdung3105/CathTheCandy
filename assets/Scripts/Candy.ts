import { _decorator, Component, RigidBody2D, Vec2 } from 'cc';
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
        // destroy
        if (this.node.position.y < -600) {
            this.node.destroy();
        }
    }
}