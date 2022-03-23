import { BoxGeometry, GridHelper, Mesh, MeshPhongMaterial, PerspectiveCamera, PointLight, Scene, ShaderMaterial, Vector3, WebGLRenderer } from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import vertexShader from './shader/vertexShader.glsl'
import fragmentShader from './shader/fragmentShader.glsl'

type CameraState = {
  fov: number,
  aspect: number,
  near: number,
  far: number,
  lookAt: Vector3 | null
}

export default class Canvas {

  // properties
  protected size = {
    w: 0,
    h: 0
  }
  protected cameraState: CameraState = {
    fov: 0,
    aspect: 0,
    near: 0,
    far: 0,
    lookAt: null,
  }
  protected scene: Scene | null = null
  protected renderer: WebGLRenderer | null = null
  protected camera: PerspectiveCamera | null = null

  // constructor 
  constructor(canvasElement: Element) {

    // 初期設定
    this.size.w = window.innerWidth
    this.size.h = window.innerHeight
    // カメラ初期設定
    this.cameraState.fov = 60
    this.cameraState.aspect = this.size.w / this.size.h
    this.cameraState.near = 0.1
    this.cameraState.far = 10000
    this.cameraState.lookAt = new Vector3(0, 0, 0)
    // シーン生成
    this.scene = new Scene()
    // レンダラー生成
    this.renderer = new WebGLRenderer({
      alpha: true,
      antialias: true
    })
    this.renderer.setSize(this.size.w, this.size.h)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.shadowMap.enabled = true
    // カメラ
    this.camera = new PerspectiveCamera(this.cameraState.fov, this.cameraState.aspect, this.cameraState.near, this.cameraState.far)
    this.camera.position.set(0, 0, 100)
    this.scene.add(this.camera)
    // キャンバスの生成
    canvasElement.appendChild(this.renderer.domElement)

    // コントロール
    new OrbitControls(this.camera, this.renderer.domElement)
    // グリッド
    const gridHelper = new GridHelper(5000, 100, 0x00ff00, 0x00ff99)
    this.scene.add(gridHelper)
  }

  // シーンの取得
  public getScene = (): Scene => {
    // Scene型として確定しておく: constructorを通している場合nullではないとする
    return this.scene as Scene
  }

  // レンダラーの実行
  public onRender = () => {
    if (this.scene != null && this.renderer != null && this.camera != null) {
      this.renderer.render(this.scene, this.camera)
    }
  }
}