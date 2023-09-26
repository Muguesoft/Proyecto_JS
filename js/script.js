///////////////////////////////
// DECLARACION DE FUNCIONES. //
///////////////////////////////

// FUNCION DE INPUT DE DATOS.
function realizar_entrada_datos(a_texto_muestra, a_valores_validos) {
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

        // LLAMA RECURSIVAMENTE A LA FUNCION DE ENTRADA DE DATOS.
        return realizar_entrada_datos(a_texto_muestra, a_valores_validos)    
    }
}
// FUNCION DE INPUT DE DATOS.


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
    
        case 'copias':
            // Si engresa F es fin de la compra.
            if (a_valor_ingresado.toLowerCase() === 'f') {
                return true
            }

            // Primero busco el * en la entrada.
            // Llamada recursiva a la funcion.
            let l_existe_asterisco_sn = validar_entrada_datos(a_valor_ingresado,['pos','*'])
            if (l_existe_asterisco_sn = false) {
                return false
            }

            // Descompongo la cadena desde la posicion del * hacia la izquierda y hacia la derecha.
            let l_posicion_asterisco = a_valor_ingresado.indexOf('*')
            let l_izq = parseInt(a_valor_ingresado.substring(0,l_posicion_asterisco))

            // Es un numero?
            if (!isNaN(l_izq)) {
                // Verifica si el numero esta entre 1 y 8.
                if (l_izq < 1 || l_izq > 8) {
                    alert('Debe ingresar un N° de foto entre 1 y 8...')
                    return false
                } 
            } else {
                alert('Debe ingresar un N° de foto entre 1 y 8...')
                return false
            }

            // Parte derecha.
            let l_der = parseInt(a_valor_ingresado.substring(l_posicion_asterisco + 1,a_valor_ingresado.length))
            
            // Es un numero?
            if (isNaN(l_der)) {
                alert('Debe ingresar un N° positivo o negativo de copias de fotografias...')
                return false
            }
            
            return true;

        
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
// FIN FUNCION ENCARGADA DE VALIDAR ENTRADA DE DATOS DE USUARIO


// MENU PRINCIPAL, SE REPITE HASTA QUE SEA VALIDA LA ENTRADA DE DATOS.
function mostrar_menu_principal() {
    let l_respuesta_entrada = realizar_entrada_datos('Elija una opción:\n \n1: Crear nueva cuenta de usuario \n2: Ingresar con cuenta de usuario existente',['1','2'])

    switch (l_respuesta_entrada) {
        case '(cancela)':
            break;

        // NUEVA CUENTA DE USUARIO
        case '1':
            ingresar_nueva_cuenta()    
            break;
        
        // INGRESO A CUENTA EXISTENTE.
        case '2':
            ingresar_cuenta_existente()
            break;
        
        default:
            break;
    }    
}
// FIN MENU PRINCIPAL, SE REPITE HASTA QUE SEA VALIDA LA ENTRADA DE DATOS.


// MENU NUEVA CUENTA DE USUARIO
function ingresar_nueva_cuenta() {
    let l_email
    let l_password
    let l_existe

    // Entrada de mail.
    let l_respuesta_entrada = realizar_entrada_datos('Ingrese una dirección de email',['pos','@'])
    
    if (l_respuesta_entrada === '(cancela)') {
        mostrar_menu_principal()
    }
    l_email = l_respuesta_entrada

    // Evalua si ya existe.
    // Busca en array si el mail esta registrado.
    l_existe = buscar_en_array_cuentas_usuarios(l_email,0)
    
    if (l_existe.substring(0,2) == 'OK') {
        alert('La cuenta que desea crear "'+l_email+'" ya se encuentra registrada...')
        mostrar_menu_principal()
    }

    // Entrada de password.
    l_respuesta_entrada = realizar_entrada_datos('Ingrese una contraseña',[])
    
    if (l_respuesta_entrada === '(cancela)') {
        mostrar_menu_principal()
    }
    l_password = l_respuesta_entrada

    // Registra en array global de cuentas.
    g_usuarios_validos.push([l_email,l_password])

    alert('Bienvenido "'+l_email+'"...')
    // INICIA MENU DE COMPRAS.
    ingresar_menu_compras()
}    
// FIN MENU NUEVA CUENTA DE USUARIO


// MENU INGRESAR CON CUENTA DE USUARIO EXISTENTE
function ingresar_cuenta_existente() {
    // Definicion de variables locales.
    let l_email
    let l_password
    let l_indice_cta
    let l_indice_pwd
    let l_existe
    let l_respuesta_entrada
    let l_entrada = false
    let l_iteraciones = 0


    // Entrada de mail.
    l_respuesta_entrada = realizar_entrada_datos('Ingrese una dirección de email existente',['pos','@'])
    
    if (l_respuesta_entrada === '(cancela)') {
        mostrar_menu_principal()
    }
    l_email = l_respuesta_entrada

    // Busca en array si el mail esta registrado.
    l_existe = buscar_en_array_cuentas_usuarios(l_email,0)
    
    if (l_existe.substring(0,2) == 'OK') {
                
        // Recupera el indice del array de la cuenta de usuario.
        l_indice_cta = l_existe.substring(2,l_existe.length)
        
        do {
            
            // Incrementa contador de iteraciones.
            l_iteraciones++

            // Entrada de password.
            l_respuesta_entrada = realizar_entrada_datos('Ingrese una contraseña existente (intento '+l_iteraciones+' de 3)',[])
        
            if (l_respuesta_entrada === '(cancela)') {
                mostrar_menu_principal()
                break
            }
            l_password = l_respuesta_entrada

            // Busca en array si la contraseña esta registrada.
            l_existe = buscar_en_array_cuentas_usuarios(l_password,1)
            if (l_existe.substring(0,2) == 'OK') {
                l_indice_pwd = l_existe.substring(2,l_existe.length)
                if (l_indice_cta !== l_indice_pwd) {
                    alert('El usuario no coincide con la contraseña ingresada...')
                } else {
                    l_entrada = true
                    break
                }

            } else {
                alert('Contraseña inválida...')
            }
            
        } while (l_iteraciones < 3 && l_entrada == false );

        // Se alcanzo el maximo de iteraciones o se logueo correctamente?
        if (l_entrada) {
            alert('Bienvenido "'+l_email+'"...')
            // INICIA MENU DE COMPRAS.
            ingresar_menu_compras()
        } else {
            alert('Máxima cantidad de intentos alcanzada!')
            mostrar_menu_principal()
        }

    } else {
        alert('Usuario inexistente...')
        ingresar_cuenta_existente()
    }
}
// FIN MENU INGRESAR CON CUENTA DE USUARIO EXISTENTE


// FUNCION ARMAR STRING DE MENU DE COMPRAS.
function armar_string_menu_compras(){
    let l_menu = 'SELECCIONE QUE FOTOGRAFIAS DESEA IMPRIMIR\n(Formato ingreso: N°foto*cantidad - Ej. 3*2 - Foto N°3, 2 copias - si la cantida es negativa restará esas copias) \n\n'

    let l_foto

    for (let index = 0; index < g_fotos_valores.length; index++) {
        l_foto = g_fotos_valores[index][0]

        switch (index) {
            case 0:
                l_menu = l_menu+'Paisajes: \n'+(index+1)+': '+ l_foto
                break;

            case 1:
                l_menu = l_menu+'\n'+(index+1)+': '+ l_foto
                break;

            case 2:
                l_menu = l_menu+'\n\nProductos: \n'+(index+1)+': '+ l_foto
                break;

            case 3:
                l_menu = l_menu+'\n'+(index+1)+': '+ l_foto
                break;

            case 4:
                l_menu = l_menu+'\n\nAbstractas: \n'+(index+1)+': '+ l_foto        
                break;

            case 5:
                l_menu = l_menu+'\n'+(index+1)+': '+ l_foto
                break;

            case 6:
                l_menu = l_menu+'\n\nRetratos: \n'+(index+1)+': '+ l_foto
                break;
            case 7:
                l_menu = l_menu+'\n'+(index+1)+': '+ l_foto
                break;
        
            default:
                break;
        }
    }

    l_menu = l_menu+'\n\n'+'F: FINALIZA COMPRA'

    return l_menu
}

// MENU DE COMPRAS.
function ingresar_menu_compras(){
    let l_menu_compras

    // Arma string por funcion.
    l_menu_compras =  armar_string_menu_compras()
    let l_respuesta_entrada = realizar_entrada_datos(l_menu_compras,['copias'])
    
    if (l_respuesta_entrada.toLowerCase() === 'f') {
        // Finaliza la compra.
        finalizar_compra()
    } else {

        // Descompone la entrada y procesa.
        // No hay validaciones de errores ya que se realizaron en la funcion realizar_entrada_datos()

        // Primero busco el * en la entrada.
        let l_posicion_asterisco = l_respuesta_entrada.indexOf('*')

        // Descompongo la cadena desde la posicion del * hacia la izquierda y hacia la derecha.
        let l_izq = parseInt(l_respuesta_entrada.substring(0,l_posicion_asterisco))

        // Parte derecha.
        let l_der = parseInt(l_respuesta_entrada.substring(l_posicion_asterisco + 1,l_respuesta_entrada.length))

        // Parte izquierda = FOTO, parte derecha = cantidad a imprimir
        procesar_carrito_compras(l_izq,l_der)
    }
}
// FIN MENU DE COMPRAS.


// FUNCION DE CARGA O DESCARGA A CARRITO DE COMPRAS.
function procesar_carrito_compras(a_foto,a_cantidad_imprimir) {
    let l_cant_fotos = g_carrito.length
    
    // Es la primer entrada al array?
    if (l_cant_fotos === 0) {
        if (a_cantidad_imprimir < 0) {
            alert('Para la foto N° "'+a_foto+'" no hay cantidades ingresadas a imprimir; por lo tanto, no puede descontar cantidades...')
        } else {

            // Carga array con la primer entrada.
            g_carrito.push([a_foto,a_cantidad_imprimir])
            alert('Foto N°'+a_foto+': "'+g_fotos_valores[a_foto - 1][0]+'" agregada para imprimir '+a_cantidad_imprimir+' copias...')
        }

    } else {
        
        let l_foto_encontrada

        // Recorre array buscando entrada de foto anterior.
        for (let index = 0; index < g_carrito.length; index++) {
            
            // Coincide la foto ingresada con alguna del array de cantidades a imprimir?
            if (g_carrito[index][0] == a_foto) {
                l_foto_encontrada = true

                if (a_cantidad_imprimir > 0) {
                    // Incrementa las cantidades.
                    g_carrito[index][1] = g_carrito[index][1] + a_cantidad_imprimir
                    alert('Foto N°'+a_foto+': "'+g_fotos_valores[a_foto - 1][0]+'" tiene '+g_carrito[index][1]+' copias para imprimir...')
                } else {

                    // Si la cantidad es negativa verifica que no sea mayor a la cantidad ingresada
                    let l_absoluto
                    l_absoluto = Math.abs(a_cantidad_imprimir)
                    if(l_absoluto <= g_carrito[index][1]) {
                        g_carrito[index][1] = g_carrito[index][1] - l_absoluto
                        alert('Foto N°'+a_foto+': "'+g_fotos_valores[a_foto - 1][0]+'" tiene '+g_carrito[index][1]+' copias para imprimir...')
                    } else {
                        alert('La foto N°'+a_foto+': "'+g_fotos_valores[a_foto - 1][0]+'" tiene '+g_carrito[index][1]+' para imprimir; no se pueden descontar '+l_absoluto+' copias...')
                    }
                }
            }
        }
        
        if (!l_foto_encontrada) {
            // Carga array con la primer entrada.
            g_carrito.push([a_foto,a_cantidad_imprimir])
            alert('Foto N°'+a_foto+': "'+g_fotos_valores[a_foto - 1][0]+'" agregada para imprimir '+a_cantidad_imprimir+' copias...')
        }
    }

    ingresar_menu_compras()
    return
}
// FIN FUNCION DE CARGA O DESCARGA A CARRITO DE COMPRAS.



// FUNCION FINALIZAR COMPRA.
function finalizar_compra() {
    let l_total_gral = 0
    let l_nro_foto
    let l_cantidad
    let l_desc_foto
    let l_string_carrito
    let l_idx = 0
    let l_precio_unitario

    for (let l_i = 0; l_i < g_carrito.length; l_i++) {
        //alert(l_i)
        
        l_nro_foto = g_carrito[l_i][0]
        //alert('n°:'+l_nro_foto)
        
        l_cantidad = g_carrito[l_i][1]
        //alert('cant:'+l_cantidad)

        l_desc_foto = g_fotos_valores[l_nro_foto - 1][0]
        //alert('Desc: '+l_desc_foto)

        l_precio_unitario = g_fotos_valores[l_nro_foto - 1][1]
        //alert('PU '+l_precio_unitario)
        

        
        // Pueden haber quedado fotos con cantidad 0
        if (l_cantidad === 0) {
            continue
        } else {
            l_idx++
            alert(l_idx)

            // Acumula el total a pagar.
            l_total_gral = l_total_gral + (l_cantidad * l_precio_unitario)
            alert(l_total_gral)

            // Arma string del carrito de compras.
            if (l_idx === 1) {
                l_string_carrito = 'FOTOGRAFIAS A IMPRIMIR:'
                l_string_carrito = l_string_carrito + '\n\n'+'> Foto N°'+l_nro_foto+' "'+l_desc_foto+'" ($'+l_precio_unitario+') - Cant. imprimir: '+l_cantidad+' - Subtotal: $'+(l_cantidad * l_precio_unitario)
            } else {
                l_string_carrito = l_string_carrito+'\n'+'> Foto N°'+l_nro_foto+' "'+l_desc_foto+'" ($'+l_precio_unitario+') - Cant. imprimir: '+l_cantidad+' - Subtotal: $'+(l_cantidad * l_precio_unitario)
            }
        }
    }

    if (l_idx > 0) {
        alert(l_string_carrito+'\n\nTOTAL GENERAL $: '+l_total_gral)

        l_string_carrito = l_string_carrito + '\n\nINGRESE UNA OPCION:\n1: Pagar\n2: Seguir comprando'
        let l_respuesta_entrada = realizar_entrada_datos(l_string_carrito,['1','2'])

        switch (l_respuesta_entrada) {
            case '(cancela)':
                ingresar_menu_compras()
                break;
        
            case '1':
                alert('HEMOS RECIBIDO EL PAGO DE SU COMPRA.\n\nMUCHAS GRACIAS!!!')
                break;

            case '2':
                ingresar_menu_compras()
                break;

            default:
                break;
        }
    } else {
        // Indica que no hay compras.
        l_string_carrito = 'EL CARRITO ESTÁ VACÍO...\n\nINGRESE UNA OPCION:\n1: Seguir comprando\n2: Finalizar'
        let l_respuesta_entrada = realizar_entrada_datos(l_string_carrito,['1','2'])

        switch (l_respuesta_entrada) {
            case '(cancela)':
                alert('MUCHAS GRACIAS!!!')
                break;
        
            case '1':
                ingresar_menu_compras()
                break;

            case '2':
                alert('MUCHAS GRACIAS!!!')
                break;

            default:
                break;
        }
    }
}
// FIN FUNCION FINALIZAR COMPRA.



// BUSCA EN ARRAY DE USUARIOS VALIDOS.
function buscar_en_array_cuentas_usuarios(a_valor, a_columna){
    let l_valor_array
    
    for (let i = 0; i < g_usuarios_validos.length; i++) {
        l_valor_array = g_usuarios_validos[i][a_columna]
        
        if ( l_valor_array == a_valor) {
            return 'OK'+i
        }
    }
    return 'XX'
}
// FIN BUSCA EN ARRAY DE USUARIOS VALIDOS.


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


// En array se almacenan los costos de las fotos a imprimir
let g_fotos_valores = [];
g_fotos_valores.push(['Nevado',5000])
g_fotos_valores.push(['Mar',5000])
g_fotos_valores.push(['Plato de frutos rojos',6500])
g_fotos_valores.push(['Bijouterie',6500])
g_fotos_valores.push(['Hojas en estanque',7000])
g_fotos_valores.push(['Arena negra',7000])
g_fotos_valores.push(['Familia en el mar',9300])
g_fotos_valores.push(['Hombre fumando',9300])


// VARIABLE GLOBAL DONDE SE ALMACENARAN CADA FOTO y LA CANTIDAD A IMPRIMIR.
// EN LA PRIMER COLUMNA SE ALMACENARA EL N° DE FOTO y EN LA SEGUNDA LA CANTIDAD A IMPRIMIR.
let g_carrito = []

// INICIA CON MENU PRINCIPAL.
mostrar_menu_principal()

// SALUDO FINAL.
alert('Vuelvan prontos!') 
