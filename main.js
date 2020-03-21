//-----------------------------------------------------------------------------
// Create our geometry
//-----------------------------------------------------------------------------
var zNear = 0.1;
var zFar = 12000;
var sphereOptions = {long_bands: 100, lat_bands: 100, radius: 10};

var sphere = new Sphere(sphereOptions);


var proj              = mat4.create();
var viewMatrix        = mat4.create();
var normalMatrix      = mat3.create();


//-----------------------------------------------------------------------------
// Settings for shader program
//-----------------------------------------------------------------------------
var eyePos           = vec3.fromValues(0.0, 0.0, 20.);

//-----------------------------------------------------------------------------
// Load and crehate shader program
//-----------------------------------------------------------------------------
const lightProgram = initShaders(gl, 'basic_vertex.glsl', 'basic_fragment.glsl')

//-----------------------------------------------------------------------------
// Load textures
//-----------------------------------------------------------------------------
const explosionTex = loadTexture(gl, "explosion.png");

//-----------------------------------------------------------------------------
// Perspective and view matrix
//-----------------------------------------------------------------------------
mat4.perspective(proj, Math.PI / 2, gl.canvas.width/gl.canvas.height, zNear, zFar);
mat4.lookAt(viewMatrix, eyePos, [0, 0, 0], [0, 1, 0]);

//-----------------------------------------------------------------------------
// Set value for uniform varibles in shader
//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------
// Render here
//-----------------------------------------------------------------------------

var angleX = 0;
var angleY = 0;

function draw(time) {
    resize();
    // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // clear COLOR and DEPTH BUFFE
    gl.enable(gl.DEPTH_TEST);

    angleX += 0.009;
    angleY += 0.006;


    // compute common view projection matrix
    var vp = mat4.create();
    mat4.mul(vp, proj, viewMatrix);

//-----------------------------------------------------------------------------
// Sphere render
//-----------------------------------------------------------------------------
    var sphereM = mat4.create();
    var sphereMVP = mat4.create();
    mat4.mul(sphereMVP, vp, sphereM);

    gl.useProgram(lightProgram);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, explosionTex);
    gl.uniform1i(gl.getUniformLocation(lightProgram, "uTexture0"), 0);
    gl.uniformMatrix4fv(gl.getUniformLocation(lightProgram, "uMVP"), false, sphereMVP);
    gl.uniform1f(gl.getUniformLocation(lightProgram, "time"), time*.00025);
    sphere.render();

    requestAnimationFrame(draw);
}

draw();


//-----------------------------------------------------------------------------
// Function which recompute perspective matrix after resize the window
//-----------------------------------------------------------------------------
var width = window.innerWidth;
var height = window.innerHeight;
function resize()
{
    var canvas = document.getElementById('canvas');
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    if (windowWidth == width && windowHeight == height) return;

    width = windowWidth;
    height = windowHeight;
    canvas.width = width;
    canvas.height = height;

    // Set the viewport and projection matrix for the scene
    gl.viewport(0, 0, width, height);
    mat4.perspective(proj, Math.PI/2, width/height, zNear, zFar);
}

