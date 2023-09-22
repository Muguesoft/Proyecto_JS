///////////////////////////////
// DECLARACION DE FUNCIONES. //
///////////////////////////////

// FUNCION DE INPUT DE DATOS.
function entrada_datos(a_texto_muestra, a_valores_validos, a_cantidad_iteraciones) {
    // REALIZA PROMPT.
    let l_respuesta = prompt(a_texto_muestra)

    // Valido si la entrada es nula = CANCELAR o Escape.
    if (l_respuesta == null) {
        return '(cancela)'
    }    	

    // Valido el valor ingresado.
    const l_valido_sn = validar_entrada_datos(l_respuesta,a_valores_validos)

    // Si la respuesta fue valida retorna la respuesta seleccionada
    if (l_valido_sn) {
        return l_respuesta
    } else {

        // Si la respuesta fue invalida, itera. 
        if (a_cantidad_iteraciones === 0) {
            // Cantidad = 0 indica que hay que iterar hasta que de una respuesta valida.
            // LLAMA RECURSIVAMENTE A LA FUNCION DE ENTRADA DE DATOS.
            return entrada_datos(a_texto_muestra, a_valores_validos, a_cantidad_iteraciones)

        } else {
            
        }    
    }
}

// FUNCION ENCARGADA DE VALIDAR ENTRADA DE DATOS DE USUARIO
function validar_entrada_datos(a_valor_ingresado,a_valores_validos){
    
    // Valido si la entrada es vacia.
    if (a_valor_ingresado.trim() === '') {
        alert('Debe ingresar un valor válido')
        return false
    }
    
    // Si el array es vacio, indica que no hay que controlar valores validos.
    if (a_valores_validos.length == 0) {
        return true
    }

    // En el primer elemento del array se pueden guardar diferentes valores
    // para que le indiquen a la funcion como actuar.
    const l_elemento0 = a_valores_validos[0]
    

    switch (l_elemento0) {
        // Indica que en la entrada de datos debe existir la cadena 
        // que esta almacenada en elemento1. 
        // Ej. sirve para validar que en un mail exista la arroba.
        case 'pos':
            const l_elemento1 = a_valores_validos[1].toLowerCase()
            if (a_valor_ingresado.toLowerCase().includes(l_elemento1)) {
                return true
            } else {
                alert('En el valor ingresado no se encuentra "'+l_elemento1+'"; dato inválido...')
                return false
            }
            break;
    
        default:
            // Recorro array de valores validos para ver si concuerda con la entrada.
            for (let i = 0; i < a_valores_validos.length; i++) {
                const elemento = a_valores_validos[i];
                if (elemento == a_valor_ingresado) {
                    // Si coincide retorno verdadero.
                    return true
                }
            }

            // Si ninguno coincide aviso y retorno falso.
            alert('Valor ingresado inválido')
            return false
            break;
    }
    
}

// MENU PRINCIPAL, SE REPITE HASTA QUE SEA VALIDA LA ENTRADA DE DATOS.
function menu_principal() {
    let l_respuesta_entrada = entrada_datos('Elija una opción:\n \n1: Crear nueva cuenta de usuario \n2: Ingresar con cuenta de usuario existente',['1','2'],0)

    switch (l_respuesta_entrada) {
        case '(cancela)':
            break;

        // NUEVA CUENTA DE USUARIO
        case '1':
            nueva_cuenta()    
            break;
        
        // INGRESO A CUENTA EXISTENTE.
        case '2':
            ingresar_cuenta_existente()
            break;
        
        default:
            break;
    }    
}

// MENU NUEVA CUENTA DE USUARIO
function nueva_cuenta() {
    let l_email
    let l_password

    // Entrada de mail.
    let l_respuesta_entrada = entrada_datos('Ingrese una dirección de email',['pos','@'],0)
    
    if (l_respuesta_entrada === '(cancela)') {
        menu_principal()
    }
    l_email = l_respuesta_entrada

    // Entrada de password.
    l_respuesta_entrada = entrada_datos('Ingrese una contraseña',[],0)
    
    if (l_respuesta_entrada === '(cancela)') {
        menu_principal()
    }
}    

// MENU INGRESAR CON CUENTA DE USUARIO EXISTENTE
function ingresar_cuenta_existente() {
    let l_email
    let l_password
    let l_indice_cta

    // Entrada de mail.
    let l_respuesta_entrada = entrada_datos('Ingrese una dirección de email existente',['pos','@'],0)
    
    if (l_respuesta_entrada === '(cancela)') {
        menu_principal()
    }
    l_email = l_respuesta_entrada

    // Busca en array si el mail esta registrado.
    let l_existe = buscar_en_array_cuentas_usuarios(l_email,0)
    
    if (l_existe.substring(0,2) == 'OK') {
                
        // Recupera el indice del array de la cuenta de usuario.
        l_indice_cta = l_existe.substring(2,l_existe.length)
        
        // Entrada de password.
        let l_respuesta_entrada = entrada_datos('Ingrese una contraseña existente',[],0)
    
        if (l_respuesta_entrada === '(cancela)') {
            menu_principal()
        }
        l_password = l_respuesta_entrada

        /* // Busca en array si el mail esta registrado.
        let l_existe_sn = buscar_en_array_cuentas_usuarios(l_password,2)
        if (l_existe_sn) {
        } */
    }


    // Entrada de password.
    l_respuesta_entrada = entrada_datos('Ingrese una contraseña',[],0)
    
    if (l_respuesta_entrada === '(cancela)') {
        menu_principal()
    }
}    

// BUSCA EN ARRAY DE USUARIOS VALIDOS.
function buscar_en_array_cuentas_usuarios(a_valor, a_columna){
    let l_valor_array
    alert(a_valor)
    for (let i = 0; i < g_usuarios_validos.length; i++) {
        l_valor_array = g_usuarios_validos[i][a_columna]
        alert(l_valor_array)

        if ( l_valor_array == a_valor) {
            return 'OK'+i
        }
    }
    return 'XX'
}

///////////////////////////////////
// FIN DECLARACION DE FUNCIONES. //
///////////////////////////////////

//////////////////////////////////////////////////////


// Se inicializa en una variable global de tipo array
// simulando Base de Datos con usuario (mail) y contraseña
let g_usuarios_validos = [];
g_usuarios_validos.push(['cmouguelar@gmail.com','Ramiro'])
g_usuarios_validos.push(['prueba@gmail.com','prueba'])
g_usuarios_validos.push(['coder@gmail.com','coder'])

// INICIA CON MENU PRINCIPAL.
menu_principal()

// SALUDO FINAL.
alert('Vuelvan prontos!') 
