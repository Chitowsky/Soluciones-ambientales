// Variables globales para la firma digital
let canvas, ctx;
let isDrawing = false;
let currentFirmaType = '';
let firmasGuardadas = {};

// Función para prevenir la entrada de 'e' en inputs numéricos
document.addEventListener('DOMContentLoaded', function() {
    // Configurar campos editables del documento
    configurarCamposDocumento();
    
    // Obtener todos los inputs numéricos
    const numericalInputs = document.querySelectorAll('input[type="number"]');
    
    numericalInputs.forEach(input => {
        // Prevenir la entrada de 'e' y '-'
        input.addEventListener('keydown', function(e) {
            if (e.key === 'e' || e.key === 'E' || e.key === '-' || e.key === '+') {
                e.preventDefault();
            }
        });

        // Validar que solo se ingresen números
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[eE]/g, '');
            if (this.classList.contains('input-cantidad')) {
                this.value = Math.abs(parseInt(this.value) || 0);
            } else if (this.classList.contains('input-peso')) {
                this.value = Math.abs(parseFloat(this.value) || 0);
            } else if (this.classList.contains('form-input')) {
                // Para NIT y Celular - solo números enteros positivos
                this.value = Math.abs(parseInt(this.value) || 0);
            }
        });
    });

    // Validación para los campos de observaciones
    const observacionesInputs = document.querySelectorAll('.input-observaciones');
    observacionesInputs.forEach(input => {
        input.maxLength = 50; // Asegurar el límite de 50 caracteres
        
        // Mostrar contador de caracteres
        input.addEventListener('input', function() {
            if (this.value.length > 50) {
                this.value = this.value.substring(0, 50);
            }
        });
    });

    // Validación para campos de solo texto (nombres, cargos, persona responsable)
    const textOnlyInputs = document.querySelectorAll('input[type="text"].form-input');
    textOnlyInputs.forEach(input => {
        // Identificar si es un campo que debe ser solo texto
        const parentRow = input.closest('tr');
        const labelCell = parentRow ? parentRow.querySelector('.label-cell') : null;
        const labelText = labelCell ? labelCell.textContent.toLowerCase() : '';
        
        if (labelText.includes('nombre') || labelText.includes('cargo') || labelText.includes('persona responsable')) {
            // Prevenir números y caracteres especiales no deseados
            input.addEventListener('keydown', function(e) {
                // Permitir teclas de control (backspace, delete, arrows, etc.)
                if (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'ArrowLeft' || 
                    e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown' || 
                    e.key === 'Tab' || e.key === 'Enter' || e.key === 'Escape') {
                    return;
                }
                
                // Prevenir números
                if (e.key >= '0' && e.key <= '9') {
                    e.preventDefault();
                }
                
                // Prevenir caracteres especiales no deseados
                const forbiddenChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '"', "'", '<', '>', '?', '/', '`', '~'];
                if (forbiddenChars.includes(e.key)) {
                    e.preventDefault();
                }
            });
            
            // Filtrar contenido pegado o ingresado
            input.addEventListener('input', function() {
                // Permitir solo letras, espacios, puntos, comas, guiones y acentos
                this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\.\,\-]/g, '');
            });
        }
    });

    // Función para calcular totales
    function calcularTotales() {
        let totalCantidad = 0;
        let totalPeso = 0;
        
        // Obtener todos los inputs de cantidad y peso
        const cantidades = document.querySelectorAll('.input-cantidad:not([readonly])');
        const pesos = document.querySelectorAll('.input-peso:not([readonly])');
        
        // Sumar cantidades
        cantidades.forEach(input => {
            totalCantidad += parseInt(input.value) || 0;
        });
        
        // Sumar pesos
        pesos.forEach(input => {
            totalPeso += parseFloat(input.value) || 0;
        });
        
        // Actualizar totales
        document.querySelector('.input-cantidad-total').value = totalCantidad;
        document.querySelector('.input-peso-total').value = totalPeso.toFixed(2);
    }

    // Agregar evento de cálculo a todos los inputs numéricos
    document.querySelectorAll('.input-cantidad, .input-peso').forEach(input => {
        input.addEventListener('input', calcularTotales);
    });

    // Función para imprimir/guardar como PDF
    document.getElementById('downloadPDF').addEventListener('click', function() {
        // Validar campos del documento primero
        if (!validarCamposDocumento()) {
            return;
        }
        
        // Validar que hay datos en el formato - buscar el campo "Persona responsable"
        const personaResponsableInput = document.querySelector('td.input-cell[colspan="3"] input.form-input');
        if (!personaResponsableInput || !personaResponsableInput.value.trim()) {
            alert('Por favor, complete el campo "Persona responsable" antes de imprimir el formato.');
            return;
        }
        
        // Mostrar instrucciones al usuario
        const userConfirm = confirm(
            'Se abrirá la ventana de impresión.\n\n' +
            'Para guardar como PDF:\n' +
            '1. En "Destino" selecciona "Guardar como PDF"\n' +
            '2. Haz clic en "Guardar"\n' +
            '3. Elige la ubicación y nombre del archivo\n\n' +
            '¿Continuar?'
        );
        
        if (userConfirm) {
            // Usar la función nativa de impresión del navegador
            window.print();
        }
    });

    // Inicializar canvas de firma
    inicializarCanvasFirma();
});

// ===== FUNCIONES PARA LA FIRMA DIGITAL =====

function inicializarCanvasFirma() {
    canvas = document.getElementById('firmaCanvas');
    ctx = canvas.getContext('2d');
    
    // Configurar el contexto del canvas
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Eventos del mouse para dibujar
    canvas.addEventListener('mousedown', iniciarDibujo);
    canvas.addEventListener('mousemove', dibujar);
    canvas.addEventListener('mouseup', terminarDibujo);
    canvas.addEventListener('mouseout', terminarDibujo);
    
    // Eventos táctiles para dispositivos móviles
    canvas.addEventListener('touchstart', manejarTouch);
    canvas.addEventListener('touchmove', manejarTouch);
    canvas.addEventListener('touchend', terminarDibujo);
}

function iniciarDibujo(e) {
    isDrawing = true;
    dibujar(e);
}

function dibujar(e) {
    if (!isDrawing) return;
    
    e.preventDefault();
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function manejarTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 
                                    e.type === 'touchmove' ? 'mousemove' : 'mouseup', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

function terminarDibujo() {
    isDrawing = false;
    ctx.beginPath();
}

function abrirModalFirma(tipo) {
    currentFirmaType = tipo;
    const modal = document.getElementById('modalFirma');
    const titulo = document.getElementById('modalFirmaTitulo');
    
    if (tipo === 'entrega') {
        titulo.textContent = 'Firma de quien entrega';
    } else {
        titulo.textContent = 'Firma de quien recibe';
    }
    
    // Limpiar canvas
    limpiarFirma();
    
    // Mostrar modal
    modal.style.display = 'flex';
}

function cerrarModalFirma() {
    const modal = document.getElementById('modalFirma');
    modal.style.display = 'none';
}

function limpiarFirma() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function guardarFirma() {
    // Verificar si hay algo dibujado
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const hasData = imageData.data.some(channel => channel !== 0);
    
    if (!hasData) {
        alert('Por favor, dibuja una firma antes de guardar.');
        return;
    }
    
    // Convertir canvas a imagen
    const firmaImage = canvas.toDataURL('image/png');
    
    // Guardar la firma
    firmasGuardadas[currentFirmaType] = firmaImage;
    
    // Actualizar el área de firma correspondiente
    const firmaElement = document.getElementById(currentFirmaType === 'entrega' ? 'firmaEntrega' : 'firmaRecibe');
    firmaElement.style.backgroundImage = `url(${firmaImage})`;
    firmaElement.style.backgroundSize = 'contain';
    firmaElement.style.backgroundRepeat = 'no-repeat';
    firmaElement.style.backgroundPosition = 'center';
    firmaElement.classList.add('firma-guardada');
    
    // Cerrar modal
    cerrarModalFirma();
}

// Cerrar modal al hacer clic fuera de él
document.addEventListener('click', function(e) {
    const modal = document.getElementById('modalFirma');
    const modalContent = document.querySelector('.modal-firma-content');
    
    if (e.target === modal) {
        cerrarModalFirma();
    }
});

// Cerrar modal con Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        cerrarModalFirma();
    }
});

// ===== FUNCIONES PARA CAMPOS EDITABLES DEL DOCUMENTO =====

function configurarCamposDocumento() {
    const f02Input = document.getElementById('f02-input');
    const documentSuffixInput = document.getElementById('document-suffix');
    
    if (f02Input) {
        // Configurar el campo F02
        f02Input.addEventListener('input', function() {
            // Convertir a mayúsculas y limitar a 10 caracteres
            this.value = this.value.toUpperCase().substring(0, 10);
            
            // Permitir solo letras y números
            this.value = this.value.replace(/[^A-Z0-9]/g, '');
            
            // Ajustar el ancho del input según el contenido
            ajustarAnchoInput(this);
        });
        
        // Configurar eventos de foco
        f02Input.addEventListener('focus', function() {
            this.style.backgroundColor = '#f0fdf4';
            this.style.borderBottomColor = '#10b981';
        });
        
        f02Input.addEventListener('blur', function() {
            this.style.backgroundColor = 'transparent';
            this.style.borderBottomColor = '#333';
            
            // Si está vacío, restaurar valor por defecto
            if (!this.value.trim()) {
                this.value = 'F02';
            }
        });
        
        // Ajustar ancho inicial
        ajustarAnchoInput(f02Input);
    }
    
    if (documentSuffixInput) {
        // Configurar el campo de sufijo del documento
        documentSuffixInput.addEventListener('input', function() {
            // Limitar a 20 caracteres
            this.value = this.value.substring(0, 20);
            
            // Permitir letras, números, guiones y algunos caracteres especiales
            this.value = this.value.replace(/[^A-Za-z0-9\-_./]/g, '');
            
            // Ajustar el ancho del input según el contenido
            ajustarAnchoInput(this);
        });
        
        // Configurar eventos de foco
        documentSuffixInput.addEventListener('focus', function() {
            this.style.backgroundColor = '#f0fdf4';
            this.style.borderBottomColor = '#10b981';
            this.placeholder = 'Ej: 001-2025';
        });
        
        documentSuffixInput.addEventListener('blur', function() {
            this.style.backgroundColor = 'transparent';
            this.style.borderBottomColor = '#333';
            this.placeholder = '';
        });
        
        // Ajustar ancho inicial
        ajustarAnchoInput(documentSuffixInput);
    }
}

function ajustarAnchoInput(input) {
    // Crear un elemento temporal para medir el texto
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.fontSize = window.getComputedStyle(input).fontSize;
    tempSpan.style.fontFamily = window.getComputedStyle(input).fontFamily;
    tempSpan.style.fontWeight = window.getComputedStyle(input).fontWeight;
    tempSpan.textContent = input.value || input.placeholder || 'A';
    
    document.body.appendChild(tempSpan);
    const textWidth = tempSpan.offsetWidth;
    document.body.removeChild(tempSpan);
    
    // Establecer un ancho mínimo y máximo
    const minWidth = input.id === 'f02-input' ? 40 : 120;
    const maxWidth = input.id === 'f02-input' ? 100 : 200;
    const newWidth = Math.max(minWidth, Math.min(textWidth + 10, maxWidth));
    
    input.style.width = newWidth + 'px';
}

// Función para obtener el número completo del documento
function getDocumentNumber() {
    const f02Input = document.getElementById('f02-input');
    const documentSuffixInput = document.getElementById('document-suffix');
    
    const f02Value = f02Input ? f02Input.value : 'F02';
    const suffixValue = documentSuffixInput ? documentSuffixInput.value : '';
    
    return `DG-FC-2025-${f02Value}-No: ${suffixValue}`.trim();
}

// Función para validar que los campos del documento estén completos
function validarCamposDocumento() {
    const documentSuffixInput = document.getElementById('document-suffix');
    
    if (!documentSuffixInput || !documentSuffixInput.value.trim()) {
        alert('Por favor, complete el campo del número de documento después de "No:"');
        if (documentSuffixInput) {
            documentSuffixInput.focus();
        }
        return false;
    }
    
    return true;
} 