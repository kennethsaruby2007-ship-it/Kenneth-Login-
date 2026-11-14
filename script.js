const formulario = document.getElementById("formLogin");
const mensaje = document.getElementById("mensaje");
const boton = document.getElementById("btnEntrar");

// Creamos la conexión solo cuando tengamos los datos de Supabase.
let supabase = null;

if (
  window.supabase &&
  SUPABASE_URL.startsWith("https://") &&
  SUPABASE_ANON_KEY !== "PEGA_AQUI_LA_CLAVE_PUBLICA"
) {
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

formulario.addEventListener("submit", async function(evento) {
  evento.preventDefault();
  alert("JavaScript está funcionando");

  const usuario = document.getElementById("usuario").value.trim();
  const contrasena = document.getElementById("contrasena").value;

  mensaje.textContent = "";
  mensaje.className = "";

  if (!supabase) {
    mensaje.textContent = "Falta configurar la conexión con Supabase. Cuando tengas los datos, los agregamos en config.js.";
    mensaje.className = "error";
    return;
  }

  boton.disabled = true;
  boton.textContent = "Validando...";

  // Supabase Auth valida que el correo/usuario y la contraseña sean correctos.
  const { data, error } = await supabase.auth.signInWithPassword({
    email: usuario,
    password: contrasena
  });

  boton.disabled = false;
  boton.textContent = "Ingresar";

  if (error) {
    mensaje.textContent = "Usuario o contraseña inválidos.";
    mensaje.className = "error";
    return;
  }

  // Si el inicio de sesión fue correcto, abrimos la página de bienvenida.
  window.location.href = "bienvenida.html";
});
