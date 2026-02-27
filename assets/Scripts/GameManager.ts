import { _decorator, Component, Node, Prefab, instantiate, SpriteFrame, Sprite, math, view, Label, AudioSource, director, PhysicsSystem2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property({ type: Prefab })
    public candyPrefab: Prefab | null = null; // Khuôn đúc kẹo

    @property({ type: [SpriteFrame] })
    public candySprites: SpriteFrame[] = []; // Mảng 8 ảnh kẹo

    @property({ type: Label })
    public livesLabel: Label | null = null; // Dây cắm chữ Mạng: 3

    @property({ type: Node })
    public gameOverLabel: Node | null = null; // Dây cắm chữ GAME OVER

    @property({ type: AudioSource })
    public missSound: AudioSource | null = null; // Dây cắm tiếng rơi kẹo

    @property({ type: Node })
    public replayButton: Node | null = null; // Ổ cắm Nút Chơi lại

    @property({ type: Node })
    public scoreNode: Node | null = null; 

    public spawnInterval: number = 1; // 1 giây đẻ 1 viên
    private spawnTimer: number = 0;
    private screenHalfWidth: number = 0;

    // Biến trạng thái
    private lives: number = 3;
    private isGameOver: boolean = false;

    start() {
        this.screenHalfWidth = view.getVisibleSize().width / 2;

        // Setup ban đầu
        if (this.livesLabel) this.livesLabel.string = "HP: " + this.lives;
        if (this.gameOverLabel) this.gameOverLabel.active = false;
    }

    update(dt: number) {
        if (this.isGameOver) return;

        // Mỗi 1 giây thì gọi hàm đẻ kẹo
        this.spawnTimer += dt;
        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnTimer = 0;
            this.spawnCandy();
        }
    }

    spawnCandy() {
        if (!this.candyPrefab) return;

        // Tạo kẹo mới từ Khuôn 
        let newCandy = instantiate(this.candyPrefab);
        this.node.addChild(newCandy);

        newCandy.setSiblingIndex(2);

        // Rơi vị trí ngẫu nhiên
        let randomX = math.randomRange(-this.screenHalfWidth + 50, this.screenHalfWidth - 50);
        newCandy.setPosition(randomX, 500, 0); 

        // Random lấy 1 trong 8
        if (this.candySprites.length > 0) {
            let randomIndex = math.randomRangeInt(0, this.candySprites.length);
            let spriteComponent = newCandy.getComponent(Sprite);
            if (spriteComponent) {
                spriteComponent.spriteFrame = this.candySprites[randomIndex];
            }
        }
    }

    // XỬ LÝ KHI KẸO RỚT ĐÁY
    public onCandyDropped() {
        if (this.isGameOver) return; 

        if (this.missSound && this.missSound.clip) {
            this.missSound.playOneShot(this.missSound.clip, 1);
        }

        this.lives--; // Trừ mạng
        if (this.livesLabel) {
            this.livesLabel.string = "HP: " + this.lives; // Cập nhật chữ lên màn hình
        }

        if (this.lives <= 0) { // hiện GAME OVER
            this.isGameOver = true; 
            if (this.gameOverLabel) this.gameOverLabel.active = true;

            if (this.replayButton) this.replayButton.active = true; 
            if (this.scoreNode) this.scoreNode.active = true; 
            if (this.livesLabel) this.livesLabel.node.active = false;

            PhysicsSystem2D.instance.enable = false;
        }
    }

    public onReplayClicked() {
        PhysicsSystem2D.instance.enable = true; 
        
        // Load lại Scene
        director.loadScene("Main");
    }
}