import { _decorator, Component, Node, Prefab, instantiate, SpriteFrame, Sprite, math, screen } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property({ type: Prefab })
    public candyPrefab: Prefab | null = null; // Khuân đúc kẹo

    @property({ type: [SpriteFrame] })
    public candySprites: SpriteFrame[] = []; // Mảng 8 ảnh kẹo

    public spawnInterval: number = 1; // 1 giây đẻ 1 viên
    private spawnTimer: number = 0;
    private screenHalfWidth: number = 0;

    start() {
        this.screenHalfWidth = screen.windowSize.width / 2;
    }

    update(dt: number) {
        // Mỗi 1 giây thì gọi hàm đẻ kẹo
        this.spawnTimer += dt;
        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnTimer = 0;
            this.spawnCandy();
        }
    }

    spawnCandy() {
        if (!this.candyPrefab) return;

        //Tạo kẹo mới từ Khuôn 
        let newCandy = instantiate(this.candyPrefab);
        this.node.addChild(newCandy);

        //Rơi vị trí ngẫu nhiên
        let randomX = math.randomRange(-this.screenHalfWidth + 50, this.screenHalfWidth - 50);
        newCandy.setPosition(randomX, 500, 0); 

        //Random lấy 1 trong 8
        if (this.candySprites.length > 0) {
            let randomIndex = math.randomRangeInt(0, this.candySprites.length);
            let spriteComponent = newCandy.getComponent(Sprite);
            if (spriteComponent) {
                spriteComponent.spriteFrame = this.candySprites[randomIndex];
            }
        }
    }
}