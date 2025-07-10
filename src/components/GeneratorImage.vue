<!-- filepath: src/components/ImageGenerator.vue -->
<script setup lang="ts">
import html2canvas from "html2canvas";
import { onMounted, ref } from "vue";
import { PaymentWithDetails } from "../models/payments";

/* RECIBIR LOS DATOS DEL RECIBO */
const payment_info = defineModel({
  default: () => ({} as PaymentWithDetails),
  required: true,
  type: Object as PaymentWithDetails,
});
onMounted(() => {
  console.log(payment_info.value);
});
// --- Estado para la personalización de la imagen ---
const mainText = ref("Hola, Vue y Tauri!");
const bgColor = ref("#1E88E5"); // Un azul primario de Vuetify
const textColor = ref("#FFFFFF");

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
</script>

<template>
  <v-container>
    <v-row>
      <!-- Columna de Controles -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Personalizar Imagen</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="mainText"
              label="Texto Principal"
              variant="outlined"
              density="compact"
            ></v-text-field>
            <v-text-field v-model="bgColor" label="Color de Fondo" variant="outlined" density="compact"></v-text-field>
            <v-text-field
              v-model="textColor"
              label="Color del Texto"
              variant="outlined"
              density="compact"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="generateImage" :loading="isLoading" color="primary" block> Generar Imagen </v-btn>
          </v-card-actions>
        </v-card>
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
                    <!-- <p>ACUEDUCTO COMUNITARIO CARIBAYONA</p>
                    <p>NOMBRE: {{ payment_info.client.name }} {{ payment_info.client.lastname }}</p>
                    <P>FACTURA: {{ payment_info.payment.id }}</P>
                    <p>CASA No: {{ payment_info.house.id }} - {{ payment_info.house.direction }}</p>
                    <p>FECHA: {{ payment_info.payment.date }}</p>
                    <P>{{ payment_info.payment.description }}</P> -->
                    <p>ACUEDUCTO COMUNITARIO CARIBAYONA</p>
                    <p>NOMBRE: ""</p>
                    <P>FACTURA: ""</P>
                    <p>CASA No: ""</p>
                    <p>FECHA: ""</p>
                    <P>""</P>
                    <P>ULTIMO DIA DE PAGO 30 DE JUNIO</P>
                  </div>
                  <div>
                    <img src="../../public/i-site-logo.svg" alt="" />
                  </div>
                </section>
                <section class="content-body">
                  <table>
                    <caption>
                      DESCRIPCIÓN DE COBRO
                    </caption>
                    <tbody>
                      <tr>
                        <td>COBRO DE AGUA DESDE DIC 2025 HASTA MAYO 2025</td>
                        <td>6 MESES</td>
                      </tr>
                      <tr>
                        <td>MATRICULA</td>
                        <td>asd</td>
                      </tr>
                      <tr>
                        <td>MENSUALIDAD</td>
                        <td>asd</td>
                      </tr>
                      <tr>
                        <td>SALDO ANTERIOR</td>
                        <td>asd</td>
                      </tr>
                      <tr>
                        <td>RECONEXIÓN</td>
                        <td>asd</td>
                      </tr>
                      <tr>
                        <td>ABONOS</td>
                        <td>asd</td>
                      </tr>
                      <tr>
                        <td>CARGO POR PAGO ATRASADO</td>
                        <td>asd</td>
                      </tr>
                      <tr>
                        <td>Otros cargos</td>
                        <td>asd</td>
                      </tr>
                      <tr>
                        <td>TOTAL</td>
                        <td>asd</td>
                      </tr>
                    </tbody>
                  </table>
                </section>
                <section class="content-footer">
                  <div>
                    <div>
                      <p>
                        RECUERDE SEÑOR USUARIO QUE SE COBRA MES VENCIDO ATENCION AL CLIETE: 322 337 7889 - 313 324 1224
                      </p>
                    </div>
                    <div>
                      <img src="../../public/Daco.png" alt="img Daco" width="300px" />
                    </div>
                  </div>
                </section>
              </div>
              <div class="content">
                <section class="content-header">
                  <div>
                    <p>ACUEDUCTO COMUNITARIO CARIBAYONA</p>
                    <p>NOMBRE: ""</p>
                    <P>FACTURA: ""</P>
                    <p>CASA No: ""</p>
                    <p>FECHA: ""</p>
                    <P>""</P>
                    <P>ULTIMO DIA DE PAGO 30 DE JUNIO</P>
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
                        <td>COBRO DE AGUA DESDE DIC 2025 HASTA MAYO 2025</td>
                        <td>6 MESES</td>
                      </tr>
                      <tr>
                        <td>MATRICULA</td>
                        <td>asd</td>
                      </tr>
                      <tr>
                        <td>MENSUALIDAD</td>
                        <td>asd</td>
                      </tr>
                      <tr>
                        <td>SALDO ANTERIOR</td>
                        <td>asd</td>
                      </tr>
                      <tr>
                        <td>RECONEXIÓN</td>
                        <td>asd</td>
                      </tr>
                      <tr>
                        <td>ABONOS</td>
                        <td>asd</td>
                      </tr>
                      <tr>
                        <td>CARGO POR PAGO ATRASADO</td>
                        <td>asd</td>
                      </tr>
                      <tr>
                        <td>Otros cargos</td>
                        <td>asd</td>
                      </tr>
                      <tr>
                        <td>TOTAL</td>
                        <td>asd</td>
                      </tr>
                    </tbody>
                  </table>
                </section>
                <section class="content-footer">
                  <div>
                    <div>
                      <p>
                        RECUERDE SEÑOR USUARIO QUE SE COBRA MES VENCIDO ATENCION AL CLIETE: 322 337 7889 - 313 324 1224
                      </p>
                    </div>
                    <div>
                      <img src="/Daco.png" alt="img Daco" width="300px" />
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
          <v-card-text class="text-center">
            <img :src="generatedImageSrc" alt="Imagen Generada" class="generated-image" />
          </v-card-text>
          <v-card-actions>
            <!-- El truco para descargar es un <a> con el atributo 'download' -->
            <v-btn :href="generatedImageSrc" download="mi-imagen-generada.png" color="success">
              Descargar Imagen
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.live-preview {
  display: flex;
  align-items: space-between;
  font-family: Arial, sans-serif;
  margin: 0;
  gap: 20px;
  font-weight: bold;
  color: #1e88e5;
  width: 100%;
  background-color: #f5f5f5;
  padding: 20px;

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
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-top: 2px solid #ccc;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      margin: 0;
      font-size: 0.9em;
    }
  }
}

.generated-image {
  max-width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
