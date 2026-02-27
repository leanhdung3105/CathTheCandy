import { _decorator, Component, Node, input, Input, EventKeyboard, KeyCode, screen, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BasketController')
export class BasketController extends Component {
    @property
    public speed: number = 600; // Tốc độ 

    private moveDirection: number = 0; // -1 trái, 1 phải, 0 đứng yên
    private screenHalfWidth: number = 0; // 1/2 chiều rộng

    start() {
        //BÀN PHÍM
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);

        //CẢM ỨNG
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);

        this.screenHalfWidth = screen.windowSize.width / 2;
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    // --- XỬ LÝ CẢM ỨNG ---
    onTouchMove(event: EventTouch) {
        let deltaX = event.getDeltaX();
        let currentPos = this.node.position;
        let newX = currentPos.x + deltaX;

        // Chặn mép màn hình
        let limit = this.screenHalfWidth - 85;
        if (newX < -limit) newX = -limit;
        if (newX > limit) newX = limit;

        // Cập nhật tọa độ ngay lập tức khi đang chạm và di chuyển
        this.node.setPosition(newX, currentPos.y, currentPos.z);
    }

    // --- XỬ LÝ BÀN PHÍM
    onKeyDown(event: EventKeyboard) {
        if (event.keyCode === KeyCode.KEY_A || event.keyCode === KeyCode.ARROW_LEFT) this.moveDirection = -1;
        else if (event.keyCode === KeyCode.KEY_D || event.keyCode === KeyCode.ARROW_RIGHT) this.moveDirection = 1;
    }

    onKeyUp(event: EventKeyboard) {
        if (event.keyCode === KeyCode.KEY_A || event.keyCode === KeyCode.ARROW_LEFT) {
            if (this.moveDirection === -1) this.moveDirection = 0;
        } else if (event.keyCode === KeyCode.KEY_D || event.keyCode === KeyCode.ARROW_RIGHT) {
            if (this.moveDirection === 1) this.moveDirection = 0;
        }
    }
    // --- CẬP NHẬT VỊ TRÍ ---
    update(deltaTime: number) {
        if (this.moveDirection !== 0) {
            let currentPos = this.node.position;
            let newX = currentPos.x + this.moveDirection * this.speed * deltaTime;

            let limit = this.screenHalfWidth - 85;
            if (newX < -limit) newX = -limit;
            if (newX > limit) newX = limit;

            this.node.setPosition(newX, currentPos.y, currentPos.z);
        }
    }
}