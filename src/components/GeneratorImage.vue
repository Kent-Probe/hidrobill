<!-- filepath: src/components/ImageGenerator.vue -->
<script setup lang="ts">
import html2canvas from "html2canvas";
import { onMounted, ref } from "vue";
import { PaymentWithDetails } from "../models/payments";
import { formatPrice } from "../utilities/format";

/* RECIBIR LOS DATOS DEL RECIBO */
const payment_info = defineModel({
  default: () => ({} as PaymentWithDetails),
  required: true,
  type: Object as PaymentWithDetails,
});
onMounted(() => {
  console.log(payment_info.value);
});

// --- Estado para el resultado ---
const generatedImageSrc = ref<string | null>(null);
const isLoading = ref(false);

// --- Referencia al elemento HTML que queremos capturar ---
const imageSourceRef = ref<HTMLElement | null>(null);

/**
 * Genera la imagen usando html2canvas.
 */
const generateImage = async () => {
  if (!imageSourceRef.value) return;

  isLoading.value = true;
  generatedImageSrc.value = null; // Limpia la imagen anterior

  try {
    // html2canvas toma el elemento HTML y devuelve una promesa con el canvas
    const canvas = await html2canvas(imageSourceRef.value, {
      // Opciones para mejorar la calidad

      scale: 2,
      useCORS: true,
    });

    // Convertimos el canvas a una URL de datos (formato PNG por defecto)
    generatedImageSrc.value = canvas.toDataURL("image/png");
  } catch (error) {
    console.error("Error al generar la imagen:", error);
  } finally {
    isLoading.value = false;
  }
};

const printGeneratedImage = async () => {
  if (!imageSourceRef.value) return;

  isLoading.value = true;
  try {
    // 1. Genera el canvas con alta resolución
    const canvas = await html2canvas(imageSourceRef.value, {
      scale: 3, // Aumenta la escala para una calidad de impresión nítida
      useCORS: true,
      backgroundColor: null, // Usa el fondo del elemento
    });

    // 2. Convierte el canvas a una imagen PNG
    const imageSrc = canvas.toDataURL("image/png");

    // 3. Crea el contenido HTML para la ventana de impresión
    const printContent = `
      <html>
        <head>
          <title>Imprimir Recibo</title>
          <style>
            @page {
              size: letter landscape;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
            }
            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          </style>
        </head>
        <body>
          <img src="${imageSrc}" />
        </body>
      </html>
    `;

    // 4. Abre una nueva ventana y escribe el contenido
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      // Espera a que la imagen se cargue antes de imprimir
      printWindow.onload = () => {
        printWindow.print();
        // Opcional: cierra la ventana después de imprimir
        // printWindow.close();
      };
    }
  } catch (error) {
    console.error("Error al generar o imprimir la imagen:", error);
  } finally {
    isLoading.value = false;
  }
};

const getChargePayment: string = () => {
  const paymentType = payment_info.value.payment.monthly_type_amount;
  const datePayment = new Date(payment_info.value.payment.date);
  const dateEnd = datePayment;
  const monthlyPayment = datePayment
    .toLocaleString("es-ES", {
      month: "long",
    })
    .toUpperCase();

  if (paymentType === "FIXED") return `${monthlyPayment} del ${datePayment.getFullYear()}`;

  if (paymentType === "UP") {
    dateEnd.setMonth(dateEnd.getMonth() + payment_info.value.payment.amount_monthly - 1);
    const monthlyEnd = dateEnd
      .toLocaleString("es-ES", {
        month: "long",
      })
      .toUpperCase();
    return `DESDE ${monthlyPayment} del ${datePayment.getFullYear()} HASTA ${monthlyEnd} del ${dateEnd.getFullYear()}`;
  }

  if (paymentType === "DOWN") {
    dateEnd.setMonth(dateEnd.getMonth() - payment_info.value.payment.amount_monthly + 1);
    const monthlyEnd = dateEnd
      .toLocaleString("es-ES", {
        month: "long",
      })
      .toUpperCase();
    return `DESDE ${monthlyEnd} del ${dateEnd.getFullYear()} HASTA ${monthlyPayment} del ${datePayment.getFullYear()}`;
  }

  return "No se pudo retornar el mes.";
};
</script>

<template>
  <v-container>
    <v-row>
      <!-- Columna de Controles -->
      <v-col cols="12">
        <v-btn @click="generateImage" :loading="isLoading" color="warning" text="Generar Imagen"> </v-btn>
      </v-col>

      <!-- Columna de Previsualización -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Previsualización</v-card-title>
          <v-card-text>
            <!-- Este es el DIV que será capturado. Le asignamos la referencia -->
            <div ref="imageSourceRef" class="live-preview">
              <div class="content">
                <section class="content-header">
                  <div>
                    <p>ACUEDUCTO COMUNITARIO CARIBAYONA</p>
                    <p>NOMBRE: {{ payment_info.client.name }} {{ payment_info.client.lastname }}</p>
                    <p>FACTURA: {{ payment_info.payment.id }}</p>
                    <p>CASA No: {{ payment_info.house.id }} - {{ payment_info.house.id }}</p>
                    <p>FECHA: {{ new Date(payment_info.payment.date).toLocaleDateString() }}</p>
                    <p>{{ payment_info.payment.description }}</p>
                  </div>
                  <div>
                    <img src="/i-site-logo.svg" alt="" />
                  </div>
                </section>
                <section class="content-body">
                  <table>
                    <caption>
                      DESCRIPCIÓN DE COBRO
                    </caption>
                    <tbody>
                      <tr>
                        <td>COBRO DE AGUA {{ getChargePayment() }}</td>
                        <td>
                          {{ payment_info.payment.amount_monthly }}
                          {{ payment_info.payment.amount_monthly > 1 ? "Meses" : "Mes" }}
                        </td>
                      </tr>
                      <tr>
                        <td>MATRICULA</td>
                        <td>{{ formatPrice(payment_info.payment.enrollment) }}</td>
                      </tr>
                      <tr>
                        <td>MENSUALIDAD</td>
                        <td>{{ formatPrice(payment_info.payment.monthly_payment) }}</td>
                      </tr>
                      <tr>
                        <td>RECONEXIÓN</td>
                        <td>{{ formatPrice(payment_info.payment.reconnection) }}</td>
                      </tr>
                      <tr>
                        <td>ABONOS</td>
                        <td>{{ formatPrice(payment_info.payment.payments) }}</td>
                      </tr>
                      <tr>
                        <td>CARGO POR PAGO ATRASADO</td>
                        <td>{{ formatPrice(payment_info.payment.late_fee) }}</td>
                      </tr>
                      <tr>
                        <td>Otros cargos</td>
                        <td>{{ formatPrice(payment_info.payment.other_charges) }}</td>
                      </tr>
                      <tr>
                        <td>Sub Total</td>
                        <td>
                          {{ formatPrice(payment_info.payment.amount_monthly * payment_info.payment.monthly_payment) }}
                        </td>
                      </tr>
                      <tr>
                        <td>TOTAL</td>
                        <td>{{ formatPrice(payment_info.payment.value_total) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </section>
                <section class="content-footer">
                  <div>
                    <div>
                      <img src="/Daco.png" alt="img Daco" width="300px" />
                    </div>
                    <div>
                      <p>RECUERDE SEÑOR USUARIO QUE SE COBRA MES VENCIDO ATENCION AL CLIENTE 3133241224-322337788</p>
                      <p>¡NO LA RIEGUES, CUIDA EL AGUA!</p>
                    </div>
                  </div>
                </section>
              </div>
              <div class="content">
                <section class="content-header">
                  <div>
                    <p>ACUEDUCTO COMUNITARIO CARIBAYONA</p>
                    <p>NOMBRE: {{ payment_info.client.name }} {{ payment_info.client.lastname }}</p>
                    <p>FACTURA: {{ payment_info.payment.id }}</p>
                    <p>CASA No: {{ payment_info.house.id }} - {{ payment_info.house.id }}</p>
                    <p>FECHA: {{ new Date(payment_info.payment.date).toLocaleDateString() }}</p>
                    <p>{{ payment_info.payment.description }}</p>
                  </div>
                  <div>
                    <img src="/i-site-logo.svg" alt="" />
                  </div>
                </section>
                <section class="content-body">
                  <table>
                    <caption>
                      DESCRIPCIÓN DE COBRO
                    </caption>
                    <tbody>
                      <tr>
                        <td>COBRO DE AGUA {{ getChargePayment() }}</td>
                        <td>
                          {{ payment_info.payment.amount_monthly }}
                          {{ payment_info.payment.amount_monthly > 1 ? "Meses" : "Mes" }}
                        </td>
                      </tr>
                      <tr>
                        <td>MATRICULA</td>
                        <td>{{ formatPrice(payment_info.payment.enrollment) }}</td>
                      </tr>
                      <tr>
                        <td>MENSUALIDAD</td>
                        <td>{{ formatPrice(payment_info.payment.monthly_payment) }}</td>
                      </tr>
                      <tr>
                        <td>SALDO ANTERIOR</td>
                        <td>{{ formatPrice(payment_info.payment.remaining_debt) }}</td>
                      </tr>
                      <tr>
                        <td>RECONEXIÓN</td>
                        <td>{{ formatPrice(payment_info.payment.reconnection) }}</td>
                      </tr>
                      <tr>
                        <td>ABONOS</td>
                        <td>{{ formatPrice(payment_info.payment.payments) }}</td>
                      </tr>
                      <tr>
                        <td>CARGO POR PAGO ATRASADO</td>
                        <td>{{ formatPrice(payment_info.payment.late_fee) }}</td>
                      </tr>
                      <tr>
                        <td>Otros cargos</td>
                        <td>{{ formatPrice(payment_info.payment.other_charges) }}</td>
                      </tr>
                      <tr>
                        <td>Sub Total</td>
                        <td>
                          {{ formatPrice(payment_info.payment.amount_monthly * payment_info.payment.monthly_payment) }}
                        </td>
                      </tr>
                      <tr>
                        <td>TOTAL</td>
                        <td>{{ formatPrice(payment_info.payment.value_total) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </section>
                <section class="content-footer">
                  <div>
                    <div>
                      <img src="/Daco.png" alt="img Daco" width="300px" />
                    </div>
                    <div>
                      <p>RECUERDE SEÑOR USUARIO QUE SE COBRA MES VENCIDO ATENCION AL CLIENTE 3133241224-322337788</p>
                      <p>¡NO LA RIEGUES, CUIDA EL AGUA!</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <!-- Muestra la imagen generada y el botón de descarga -->
        <v-card v-if="generatedImageSrc" class="mt-4">
          <v-card-title>Resultado</v-card-title>
          <v-card-text>
            <img :src="generatedImageSrc" alt="Imagen Generada" class="generated-image printable-area" />
          </v-card-text>
          <v-card-actions>
            <!-- El truco para descargar es un <a> con el atributo 'download' -->
            <v-btn
              :href="generatedImageSrc"
              :download="`recibo-${payment_info.payment.id}.png`"
              color="success"
              variant="elevated"
              text="Descargar Imagen"
            >
            </v-btn>
            <v-btn
              @click="printGeneratedImage"
              :loading="isLoading"
              color="primary"
              text="Imprimir Recibo"
              variant="flat"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.live-preview {
  display: flex;
  flex-direction: row;
  align-items: space-between;

  color: #1e88e5;
  background-color: #f5f5f5;

  padding: 20px;
  margin: 0;
  gap: 20px;

  font-family: Arial, sans-serif;
  font-weight: bold;

  width: fit-content;
  height: 750px;

  & > .content {
    border: 2px solid #ccc;
    border-radius: 4px;
  }
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  border-bottom: 2px solid #ccc;
}

.content-body {
  margin-top: 10px;
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;

    caption {
      font-weight: bold;
      margin-bottom: 10px;
    }

    td {
      padding: 8px;
      border-top: 2px solid #ccc;
      text-align: left;
    }

    td:first-child {
      border-right: 2px solid #ccc;
    }
  }
}

.content-footer {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 10px;
  border-top: 2px solid #ccc;

  & > div {
    width: 600px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    & > div:last-child {
      width: 100%;
      padding: 20px;
    }

    & > div:first-child {
      max-width: 300px;
      margin: 0;
      font-size: 0.9em;

      & > img {
        max-width: 100px;
        height: auto;
      }
    }
  }
}

.generated-image {
  width: fit-content;
  height: 750px;

  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>

<style>
/* Estas reglas SOLO se aplican cuando el usuario presiona Ctrl+P o imprime */
@media print {
  /* Le dice al navegador que la página debe ser horizontal */
  @page {
    size: landscape;
  }

  /* Oculta todo en la página EXCEPTO el área que queremos imprimir */
  body > * {
    display: none !important;
  }

  /* Muestra solo el contenedor del recibo y sus padres */
  .printable-area {
    display: block !important;
  }

  /* Asegúrate de que el área de impresión ocupe todo el espacio */
  .printable-area {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none !important; /* Quita bordes y sombras al imprimir */
    box-shadow: none !important;
  }
}
</style>
