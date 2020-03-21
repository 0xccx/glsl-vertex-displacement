const PI =  3.141592653589793;
const TWOPI = 6.2831853071795862;
const TWOPI_F = 6.2831853;
function TO_RADIANS(x) {
    return (x * 0.017453292519943295);
}
function TO_DEGREES(x) {
    return (x * 57.29577951308232);
}

const DEG2RAD = (PI / 180.0);
const RAD2DEG = (180.0 / PI);

// GET & SET WEBGL CONTEXT
const canvas = document.getElementById("canvas");
//const gl = canvas.getContext("webgl2");
const gl = WebGLDebugUtils.makeDebugContext(canvas.getContext("webgl2"));
gl.canvas.width = window.innerWidth;
gl.canvas.height = window.innerHeight;

