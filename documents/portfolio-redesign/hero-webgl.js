/* eslint-disable */
/* Davide DD orb hero - ported verbatim from documents/davide-hero-final.html
   Mount by calling window.mountDDOrb(canvasEl, containerEl)
   The shader, geometry, bevel size, fresnel and band ranges are the design.
   Do NOT add filter:blur, do NOT widen smoothsteps, do NOT lower setPixelRatio.

   NOTE: this file is a DOCUMENTATION stand-in, not the canonical hero geometry.
   Production lives in src/components/hero/createHollowDGeometry.ts and uses a
   hollow-D shape with different proportions. Treat this file as a visual
   placeholder for the brief; do not port it back to src/. If you need higher
   fidelity, screenshot the live hero and swap the canvas mount for a static
   image. */
(function () {
  function mount(canvas, container) {
    if (typeof THREE === 'undefined') { setTimeout(function(){ mount(canvas, container); }, 100); return; }
    if (!canvas || !container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    if (width === 0 || height === 0) { setTimeout(function(){ mount(canvas, container); }, 100); return; }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 3));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    function makeDShape() {
      const shape = new THREE.Shape();
      shape.moveTo(-0.7, 1.2);
      shape.lineTo(-0.1, 1.2);
      shape.bezierCurveTo(0.55, 1.2, 1.0, 0.65, 1.0, 0);
      shape.bezierCurveTo(1.0, -0.65, 0.55, -1.2, -0.1, -1.2);
      shape.lineTo(-0.7, -1.2);
      shape.lineTo(-0.7, 1.2);
      const hole = new THREE.Path();
      hole.moveTo(-0.35, 0.82);
      hole.lineTo(-0.1, 0.82);
      hole.bezierCurveTo(0.3, 0.82, 0.65, 0.45, 0.65, 0);
      hole.bezierCurveTo(0.65, -0.45, 0.3, -0.82, -0.1, -0.82);
      hole.lineTo(-0.35, -0.82);
      hole.lineTo(-0.35, 0.82);
      shape.holes.push(hole);
      return shape;
    }

    const dGeometry = new THREE.ExtrudeGeometry(makeDShape(), {
      depth: 0.5, bevelEnabled: true, bevelSegments: 6,
      bevelSize: 0.06, bevelThickness: 0.06, curveSegments: 40,
    });
    dGeometry.center();

    const noiseGLSL = [
      'vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}',
      'vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}',
      'float snoise(vec3 v){',
      '  const vec2 C = vec2(1.0/6.0, 1.0/3.0);',
      '  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);',
      '  vec3 i = floor(v + dot(v, C.yyy));',
      '  vec3 x0 = v - i + dot(i, C.xxx);',
      '  vec3 g = step(x0.yzx, x0.xyz);',
      '  vec3 l = 1.0 - g;',
      '  vec3 i1 = min(g.xyz, l.zxy);',
      '  vec3 i2 = max(g.xyz, l.zxy);',
      '  vec3 x1 = x0 - i1 + C.xxx;',
      '  vec3 x2 = x0 - i2 + 2.0 * C.xxx;',
      '  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;',
      '  i = mod(i, 289.0);',
      '  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));',
      '  float n_ = 1.0/7.0;',
      '  vec3 ns = n_ * D.wyz - D.xzx;',
      '  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);',
      '  vec4 x_ = floor(j * ns.z);',
      '  vec4 y_ = floor(j - 7.0 * x_);',
      '  vec4 x = x_ * ns.x + ns.yyyy;',
      '  vec4 y = y_ * ns.x + ns.yyyy;',
      '  vec4 h = 1.0 - abs(x) - abs(y);',
      '  vec4 b0 = vec4(x.xy, y.xy);',
      '  vec4 b1 = vec4(x.zw, y.zw);',
      '  vec4 s0 = floor(b0)*2.0 + 1.0;',
      '  vec4 s1 = floor(b1)*2.0 + 1.0;',
      '  vec4 sh = -step(h, vec4(0.0));',
      '  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;',
      '  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;',
      '  vec3 p0 = vec3(a0.xy, h.x);',
      '  vec3 p1 = vec3(a0.zw, h.y);',
      '  vec3 p2 = vec3(a1.xy, h.z);',
      '  vec3 p3 = vec3(a1.zw, h.w);',
      '  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));',
      '  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;',
      '  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);',
      '  m = m * m;',
      '  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));',
      '}'
    ].join('\n');

    const vertexShader = [
      'varying vec3 vNormal; varying vec3 vPosition; varying vec3 vViewPosition;',
      'uniform float uTime;', noiseGLSL,
      'void main() {',
      '  float n = snoise(position * 0.5 + vec3(uTime * 0.06));',
      '  vec3 displaced = position + normal * n * 0.04;',
      '  vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);',
      '  vViewPosition = -mvPosition.xyz;',
      '  vNormal = normalize(normalMatrix * normal);',
      '  vPosition = displaced;',
      '  gl_Position = projectionMatrix * mvPosition;',
      '}'
    ].join('\n');

    const fragmentShader = [
      'varying vec3 vNormal; varying vec3 vPosition; varying vec3 vViewPosition;',
      'uniform float uTime; uniform vec3 uColorCore; uniform vec3 uColorMid; uniform vec3 uColorBright; uniform vec3 uColorRim;',
      noiseGLSL,
      'void main() {',
      '  vec3 viewDir = normalize(vViewPosition);',
      '  float warpX = snoise(vPosition * 0.7 + vec3(uTime * 0.07, 0.0, 0.0));',
      '  float warpY = snoise(vPosition * 0.7 + vec3(0.0, uTime * 0.05, 0.0));',
      '  vec3 warped = vPosition + vec3(warpX, warpY, 0.0) * 0.7;',
      '  float n1 = snoise(warped * 0.85 + vec3(uTime * 0.08));',
      '  float n2 = snoise(warped * 1.6 + vec3(uTime * 0.05, 0.0, uTime * 0.06));',
      '  float rawBand = sin(n1 * 4.5 + length(vPosition) * 1.4 + uTime * 0.18) * 0.5 + 0.5;',
      '  float darkWell = smoothstep(0.0, 0.35, rawBand);',
      '  float brightRidge = smoothstep(0.55, 0.85, rawBand);',
      '  float specularPeak = smoothstep(0.8, 0.98, rawBand);',
      '  vec3 color = uColorCore;',
      '  float radial = length(vPosition.xy) * 0.4 + n2 * 0.18;',
      '  color = mix(color, uColorMid, darkWell * smoothstep(0.15, 0.55, radial));',
      '  color = mix(color, uColorBright, brightRidge * smoothstep(0.25, 0.7, radial));',
      '  color = mix(color, uColorRim, specularPeak * smoothstep(0.4, 0.85, radial));',
      '  float fresnelRaw = 1.0 - max(dot(vNormal, viewDir), 0.0);',
      '  float fresnel = smoothstep(0.3, 0.95, fresnelRaw);',
      '  color = mix(color, uColorRim, fresnel * 0.55);',
      '  gl_FragColor = vec4(color, 1.0);',
      '}'
    ].join('\n');

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorCore:   { value: new THREE.Color(0x000000) },
        uColorMid:    { value: new THREE.Color(0x2c1505) },
        uColorBright: { value: new THREE.Color(0xd07a25) },
        uColorRim:    { value: new THREE.Color(0xffc080) },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    const d1 = new THREE.Mesh(dGeometry, material);
    d1.position.set(-1.3, 0.4, 0.3); d1.rotation.z = 0.18; d1.scale.set(2.3, 2.3, 2.3);
    const d2 = new THREE.Mesh(dGeometry, material);
    d2.position.set(1.7, -0.5, -0.4); d2.rotation.z = -0.28; d2.scale.set(1.8, 1.8, 1.8);
    const group = new THREE.Group();
    group.add(d1); group.add(d2); scene.add(group);

    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    container.addEventListener('mousemove', function (e) {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    });
    container.addEventListener('mouseleave', function () { mouse.x = 0; mouse.y = 0; });

    const clock = new THREE.Clock();
    let rafId = 0;
    let alive = true;
    function animate() {
      if (!alive) return;
      const t = clock.getElapsedTime();
      material.uniforms.uTime.value = t;
      target.x += (mouse.y * 0.06 - target.x) * 0.02;
      target.y += (mouse.x * 0.1  - target.y) * 0.02;
      group.rotation.x = target.x;
      group.rotation.y = target.y;
      d1.rotation.z = 0.18 + Math.sin(t * 0.11) * 0.04;
      d1.rotation.y = Math.sin(t * 0.07) * 0.15;
      d1.rotation.x = Math.cos(t * 0.05) * 0.10;
      d2.rotation.z = -0.28 + Math.cos(t * 0.09) * 0.05;
      d2.rotation.y = Math.cos(t * 0.10) * 0.18;
      d2.rotation.x = Math.sin(t * 0.06) * 0.10;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    }
    animate();

    const ro = new ResizeObserver(function () {
      width = container.clientWidth;
      height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    ro.observe(container);

    return function dispose() {
      alive = false;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      renderer.dispose();
      dGeometry.dispose();
      material.dispose();
    };
  }
  window.mountDDOrb = mount;
})();
