import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Candy')
export class Candy extends Component {
    @property
    public speed: number = 300; // Tốc độ rơi

    update(dt: number) {
        let p = this.node.position;
        // Trừ dần tọa độ Y để kẹo rơi xuống
        this.node.setPosition(p.x, p.y - this.speed * dt, p.z);
        if (this.node.position.y < -600) {
            this.node.destroy();
        }
    }
}