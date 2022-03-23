import { BoxGeometry, BufferGeometry, Clock, DirectionalLight, Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial, PointLight, RawShaderMaterial, ShaderMaterial, SphereGeometry, SpotLight, TextureFilter, TextureLoader, Vector2 } from 'three'
import Canvas from './Canvas'
import vertextShader from './shader/vertexShader.glsl'
import fragmentShader from './shader/fragmentShader.glsl'
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare'
import './scss/main.scss'

const init = () => {
  console.log("start...")

  // 初期設定
  const element = document.querySelector('#root-canvas')
  if (element != null) {
    const canvas = new Canvas(element)
    const scene = canvas.getScene()

    // sphere
    const sphereGeo = new SphereGeometry(10, 512, 512)
    const sphereMat = new MeshLambertMaterial({color: 0x0099ff})
    // const sphereMat = new ShaderMaterial({
    //   vertexShader: vertextShader,
    //   fragmentShader: fragmentShader
    // })
    const sphere = new Mesh(sphereGeo, sphereMat)
    sphere.position.set(0, 0, 0)
    sphere.castShadow = true
    sphere.receiveShadow = true
    scene.add(sphere)

    // moon
    const moonGeo = new SphereGeometry(3, 512, 512)
    const moonMat = new MeshLambertMaterial({color: 0xc9c9c9})
    const moon = new Mesh(moonGeo, moonMat)
    moon.position.set(30, 0, 30)
    scene.add(moon)

    // sun
    const sunGeo = new SphereGeometry(100, 512, 512)
    const sunMat = new MeshBasicMaterial({color: 0xffffff})
    const sun = new Mesh(sunGeo, sunMat)
    sun.position.set(0, 0, 3000)
    scene.add(sun)

    // light
    const light = new DirectionalLight(0xffffff, 1.0)
    light.position.set(0, 0, 10000)
    scene.add(light)

    // light1
    // const spotLight1 = new SpotLight(0xffffff, 1.0, 3000)
    // spotLight1.position.set(0, 0, 0)
    // scene.add(spotLight1)

    // time
    const clock = new Clock()

    // 初期角度
    let degree = 180
    // 地球の角度
    let sphereDegree = 180

    // point light
    const pointLight = new PointLight(0xffffff, 1.0, 2000)
    // ローダー
    const textureLoader = new TextureLoader()
    // フレアテクスチャ
    const flareTexture00 = textureLoader.load('./images/lens_flare00.png')
    const flareTexture01 = textureLoader.load('./images/lens_flare01.png')
    const flareTexture02 = textureLoader.load('./images/lens_flare02.png')
    // レンズフレア
    const lensflare = new Lensflare()
    lensflare.addElement(new LensflareElement(flareTexture00, 512, 0))
    lensflare.addElement(new LensflareElement(flareTexture01, 512, 0))
    lensflare.addElement(new LensflareElement(flareTexture02, 60, 0.6))
    pointLight.add(lensflare)
    pointLight.position.set(0, 0, -600)
    // scene.add(pointLight)

    // アニメーション
    const animate = () => {
      window.requestAnimationFrame(() => animate())

      // 時間
      const time = clock.getElapsedTime()
      // 太陽
      sun.material.opacity = 0.5 //Math.sin(time)

      // 地球
      sphere.rotation.y += 0.01

      // // 地球の軌道
      // const sphereRadius = 1000
      // // ラジアン変換
      // const sphereRad = sphereDegree * Math.PI / 180
      // sphereDegree -= 1
      // if (sphereDegree < 0) {
      //   sphereDegree = 360
      // }
      // sphere.position.x = sphereRadius * Math.cos(sphereRad)
      // sphere.position.z = sphereRadius * Math.sin(sphereRad)

      // 月の半径
      const radius = 30
      // ラジアン変換
      const rad = degree * Math.PI / 180
      degree -= 1
      if (degree < 0) {
        degree = 360
      }
      moon.position.x = radius * Math.cos(rad)
      moon.position.z = radius * Math.sin(rad) 

      canvas.onRender()
    }

    // 実行
    animate()
  }
}

window.addEventListener('DOMContentLoaded', init)